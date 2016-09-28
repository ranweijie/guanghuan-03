package com.hna.brightness.api;

import com.hna.brightness.entity.User;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.exception.UserNameExsitsException;
import com.hna.brightness.exception.UserNotFoundException;
import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.repository.UserRepository;
import com.hna.brightness.security.CustomAuthentication;
import com.hna.brightness.security.PasswordModification;
import com.hna.brightness.service.AccountService;
import com.hna.brightness.service.ExcelService;
import com.hna.brightness.service.UserValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private ExcelService excelService;


    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.POST)
    public User create(@RequestBody User user) throws FormValidationException, UserNameExsitsException {
        return accountService.create(user);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{userId}", method = RequestMethod.POST)
    public User updateWithoutPwd(@PathVariable Integer userId, @RequestBody User user) throws UserNotFoundException, FormValidationException {
        User originUserInfo = userRepository.findOne(userId);
        if (originUserInfo == null) {
            throw new UserNotFoundException("user_not_found");
        }
        user.setUserId(userId);
        user.setUsername(originUserInfo.getUsername());
        return accountService.update(user, false);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/username/{username}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void checkUserName(@PathVariable String username) throws UserNameExsitsException {
        userValidator.checkUserName(username);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.GET)
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public User getUser(@PathVariable Integer userId) throws UserNotFoundException{
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw new UserNotFoundException("user_not_found");
        }
        return user;
    }

    @RequestMapping(value = "/password", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePassword(@RequestBody PasswordModification passwordModification) throws FormValidationException {
        User user = this.getCurrentUser();
        if (!passwordEncoder.matches(passwordModification.getOldPwd(), user.getPassword())) {
            throw new BadCredentialsException("invalid_old_password");
        }
        this.accountService.updatePassword(user, passwordModification.getNewPwd());
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void batchDelete(@RequestBody List<Integer> userIds) {
        this.accountService.delete(userIds);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteUser(@PathVariable("id") Integer userId) {
        this.accountService.deleteUser(userId);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(path = "/reset", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void batchReset(@RequestBody List<Integer> userIds) {
        this.accountService.reset(userIds);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/export", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void exportWordById(@RequestBody List<Integer> userIds, HttpServletResponse response) throws IOException {
        String fileName = "user.xlsx";
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8");
        response.setHeader("pragma", "no-cache");
        response.setHeader("Content-disposition", "attachment; filename=" + fileName);
        excelService.exportUsers(userIds, new BufferedOutputStream(response.getOutputStream()));
    }

    @ExceptionHandler(FormValidationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    private ResponseEntity showError(FormValidationException e) {
        logger.error("Input validation error", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(UserNameExsitsException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    private ResponseEntity showError(UserNameExsitsException e) {
        logger.error("Use name exsits", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.NO_CONTENT.value(), e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    private ResponseEntity showError(BadCredentialsException e) {
        logger.error("Invaild credentials, error code: {}", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.FORBIDDEN.value(), e.getMessage());
        return new ResponseEntity<BasicResponse>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private ResponseEntity showError(UserNotFoundException e) {
        logger.error("User not found", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<BasicResponse>(response, HttpStatus.NOT_FOUND);
    }

    private User getCurrentUser() {
        CustomAuthentication authentication = (CustomAuthentication) SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findOneByUsername(authentication.getName());
    }

}
