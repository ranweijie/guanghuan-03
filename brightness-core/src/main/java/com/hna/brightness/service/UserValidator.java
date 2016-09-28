package com.hna.brightness.service;

import com.hna.brightness.entity.User;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.exception.UserNameExsitsException;
import com.hna.brightness.repository.RoleRepository;
import com.hna.brightness.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class UserValidator {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserValidator.class);

    @Value("${user_name_pattern}")
    private String userNamePattern;

    @Value("${password_pattern}")
    private String passwordPattern;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public void checkUser(User user) throws FormValidationException {
        if (StringUtils.isEmpty(user.getUsername()) || !user.getUsername().matches(userNamePattern)
                || StringUtils.isEmpty(user.getRoleCode()) || roleRepository.findOne(user.getRoleCode()) == null) {
            LOGGER.info("User creation format is illegal");
            throw new FormValidationException("user_creation_illegal_format");
        }
    }

    public void checkUserBeforeUpdating(User user) throws FormValidationException {
        if ((!StringUtils.isEmpty(user.getUsername()) && !user.getUsername().matches(userNamePattern))
                || (!StringUtils.isEmpty(user.getRoleCode()) && roleRepository.findOne(user.getRoleCode()) == null)){
            LOGGER.info("User updating format is illegal");
            throw new FormValidationException("user_creation_illegal_format");

        }
        if(!StringUtils.isEmpty(user.getPassword())) checkPassword(user.getPassword());
    }

    public void checkUserName(String userName) throws UserNameExsitsException {
        if (userRepository.findOneByUsername(userName) != null) {
            LOGGER.info("User name exists");
            throw new UserNameExsitsException("duplicated_user_name");
        }
    }

    public void checkPassword(String password) throws FormValidationException {
        if (StringUtils.isEmpty(password) || !password.matches(passwordPattern)) {
            LOGGER.debug("Password \"{}\" is illegal", password);
            throw new FormValidationException("illegal_password");
        }
    }


}
