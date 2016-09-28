package com.hna.brightness.auth;

import com.hna.brightness.entity.User;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.exception.UnauthorizedException;
import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.repository.UserRepository;
import com.hna.brightness.security.Credentials;
import com.hna.brightness.security.Token;
import com.hna.brightness.security.WeChatToken;
import com.hna.brightness.security.WechatCredentials;
import com.hna.brightness.service.AccountService;
import com.hna.brightness.service.ValidationCodeService;
import com.hna.brightness.service.WeChatAuthorizationService;
import com.hna.brightness.service.WechatTokenPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wechat")
public class WeChatAuthController {

    @Autowired
    private WechatTokenPool wechatTokenPool;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ValidationCodeService validationCodeService;

    @Autowired
    private WeChatAuthorizationService weChatAuthorizationService;

    private static final Logger logger = LoggerFactory.getLogger(WeChatAuthController.class);

    @RequestMapping(value = "/autologin", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Token getTokenForWeChat(@RequestBody WechatCredentials wechatCredentials) {
        if (!isTokenMatch(wechatCredentials)) {
            logger.error("no webchat credentials");
            if (StringUtils.isEmpty(wechatCredentials.getToken()))
                throw new UnauthorizedException("other");
        }
        User user = userRepository.findOneByWechatUuid(wechatCredentials.getOpenId());
        if (user == null) {
            throw new UnauthorizedException("other");
        }
        return accountService.signIn(user);
    }

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public WeChatToken createToken(@RequestBody Credentials credentials, @CookieValue(name = "VALIDATION_CODE_TOKEN", required = false) String validationCodeToken, @CookieValue(name = "openid", required = false) String openId) throws FormValidationException {
        validationCodeService.validate(validationCodeToken, credentials.getValidationCode());
        User user = accountService.validateCredentials(credentials);
        Token token = accountService.signIn(user);
        if (StringUtils.isEmpty(openId)) {
            return new WeChatToken(token);
        }

        String message = null;
        if (!openId.equals(user.getWechatUuid())) {
            if (accountService.isOpenIdOccupied(openId)) {
                message = "account_not_match_current_wechat";
            } else if (!StringUtils.isEmpty(user.getWechatUuid())) {
                message = "wechat_occupied_by_other_user";
            } else {
                user = weChatAuthorizationService.bindUser(user.getUserId(), openId);
            }
        }
        String wechatToken = null;
        if (!StringUtils.isEmpty(user.getWechatUuid())) {
            wechatToken = wechatTokenPool.createToken(user.getWechatUuid());
        }
        return new WeChatToken(token, wechatToken, message);
    }

    private boolean isTokenMatch(WechatCredentials wechatCredentials) {
        if (StringUtils.isEmpty(wechatCredentials.getOpenId()) || StringUtils.isEmpty(wechatCredentials.getToken())) {
            return false;
        }
        String existedOpenId = wechatTokenPool.getOpenId(wechatCredentials.getToken());
        return wechatCredentials.getOpenId().equals(existedOpenId);
    }

    @ExceptionHandler(FormValidationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    private BasicResponse showError(FormValidationException e) {
        logger.error("Validation code not match, error code: {}", e.getMessage());
        return new BasicResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    private BasicResponse showError(UnauthorizedException e) {
        logger.error("Forbidden, error code: {}", e.getMessage());
        return new BasicResponse(HttpStatus.UNAUTHORIZED.value(), e.getMessage() != null && e.getMessage().equals("other") ? "other" : null);
    }
}
