package com.hna.brightness.api;

import com.hna.brightness.entity.User;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.security.Credentials;
import com.hna.brightness.security.Token;
import com.hna.brightness.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/token")
public class TokenController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private ValidationCodeService validationCodeService;

    @Autowired
    private WeChatAuthorizationService weChatAuthorizationService;

    @Autowired
    private UserTokenPool userTokenPool;

    @Autowired
    private WechatTokenPool wechatTokenPool;

    @Value("${checkValidationCode:true}")
    private boolean checkValidationCode;

    private static final Logger logger = LoggerFactory.getLogger(TokenController.class);

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Token createToken(@CookieValue(name = "VALIDATION_CODE_TOKEN", required = false) String validationCodeToken, @RequestBody Credentials credentials) throws FormValidationException {
        validationCodeService.validate(validationCodeToken, credentials.getValidationCode());

        User user = accountService.validateCredentials(credentials);
        return accountService.signIn(user);
    }

    @RequestMapping(value = "/{token}", method = RequestMethod.DELETE)
    public ResponseEntity<BasicResponse> removeToken(@PathVariable String token) {
        userTokenPool.removeToken(token);
        SecurityContextHolder.getContext().setAuthentication(null);
        return new ResponseEntity<BasicResponse>(new BasicResponse(HttpStatus.OK.value(), "logout_success"), HttpStatus.OK);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    private ResponseEntity showError(AuthenticationException e) {
        logger.error("Sign in forbidden, error code: {}", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.UNAUTHORIZED.value(

        ), e.getMessage());
        return new ResponseEntity<BasicResponse>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(FormValidationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    private ResponseEntity showError(FormValidationException e) {
        logger.error("Input validation error", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    private ResponseEntity showOtherError(Exception e) {
        logger.error(e.getMessage(), e);
        BasicResponse response = new BasicResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "other");
        return new ResponseEntity<BasicResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
