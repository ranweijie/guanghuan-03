package com.hna.brightness.service;

import com.hna.brightness.entity.PasswordOnCreate;
import com.hna.brightness.entity.User;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.exception.UserNameExsitsException;
import com.hna.brightness.repository.UserRepository;
import com.hna.brightness.security.Credentials;
import com.hna.brightness.security.CustomAuthentication;
import com.hna.brightness.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTokenPool userTokenPool;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private DataValidator dataValidator;

    @Autowired
    private UserValidator userValidator;

    public User validateCredentials(Credentials credentials) throws FormValidationException {
        if (invalidateCredentials(credentials)) {
            throw new BadCredentialsException("format_error");
        }
        dataValidator.check(credentials.getUsername());
        dataValidator.check(credentials.getPassword());
        User user = userRepository.findOneByUsername(credentials.getUsername());
        if (user == null) {
            throw new BadCredentialsException("invalid_credentials");
        }
        if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("invalid_credentials");
        }
        return user;
    }

    @Transactional
    public void updatePassword(User user, String newPwd) throws FormValidationException {
        userValidator.checkPassword(newPwd);
        user = userRepository.findOne(user.getUserId());
        user.setPassword(newPwd);
        this.update(user, true);
    }

    @Transactional
    public User create(User user) throws FormValidationException, UserNameExsitsException {
        setDefaultRoleIfNeeded(user);
        userValidator.checkUser(user);
        userValidator.checkUserName(user.getUsername());
        dataValidator.check(user.getRealname());
        initPassword(user);
        return userRepository.save(user);
    }

    public Token signIn(User user) {
        String tokenStr = userTokenPool.createToken(user);
        Token token = new Token(user, tokenStr);
        SecurityContextHolder.getContext().setAuthentication(new CustomAuthentication(user));
        return token;
    }

    public boolean isOpenIdOccupied(String openId) {
        User user = userRepository.findOneByWechatUuid(openId);
        return user != null;
    }

    @Transactional
    public User update(User user, boolean isUpdatePassword) throws FormValidationException {
        userValidator.checkUserBeforeUpdating(user);
        if (isUpdatePassword) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setPasswordOnCreate(null);
        } else {
            User originUser = userRepository.findOne(user.getUserId());
            user.setPassword(originUser.getPassword());
            user.setPasswordOnCreate(originUser.getPasswordOnCreate());
        }
        return userRepository.save(user);
    }

    public User getCurrentUser() {
        CustomAuthentication authentication = (CustomAuthentication) SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findOne(((User) authentication.getPrincipal()).getUserId());
    }

    private boolean invalidateCredentials(Credentials credentials) throws FormValidationException {
        return StringUtils.isEmpty(credentials) ||
                StringUtils.isEmpty(credentials.getUsername()) ||
                StringUtils.isEmpty(credentials.getPassword()) ||
                StringUtils.isEmpty(credentials.getValidationCode());
    }

    private void setDefaultRoleIfNeeded(User user) {
        if (StringUtils.isEmpty(user.getRoleCode())) {
            user.setRoleCode("ROLE_VOLUNTEER");
        }
    }

    @Transactional
    public void delete(List<Integer> userIds) {
        userRepository.delete(userRepository.findAll(userIds));
    }

    @Transactional
    public List<User> reset(List<Integer> userIds) {
        List<User> usersInDB = userRepository.findAll(userIds);
        List<User> resetUsers = usersInDB.stream().map(user -> {
            user.setRealname(null);
            user.setWechatUuid(null);
            initPassword(user);
            return user;
        }).collect(Collectors.toList());
        return userRepository.save(resetUsers);
    }

    private void initPassword(User user) {
        String generatedPassword = generateRandomEightDigits();
        String encodedPassword = new String(Base64.encode(generatedPassword.getBytes()));
        PasswordOnCreate passwordOnCreate = user.getPasswordOnCreate();
        if (passwordOnCreate != null) {
            passwordOnCreate.setEncodedPassword(encodedPassword);
        }else {
            user.setPasswordOnCreate(new PasswordOnCreate(encodedPassword, user));
        }
        user.setPassword(passwordEncoder.encode(generatedPassword));
    }

    private String generateRandomEightDigits() {
        return String.valueOf(ThreadLocalRandom.current().nextInt(10000000, 99999999 + 1));
    }

    public void deleteUser(Integer userId) {
        userRepository.delete(userId);
    }
}
