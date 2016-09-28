package com.hna.brightness.api;

import com.hna.brightness.entity.ValidationCode;
import com.hna.brightness.service.ValidationCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class ValidationCodeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationCodeController.class);

    private static final String VALIDATION_CODE_TOKEN_KEY = "VALIDATION_CODE_TOKEN";

    @Autowired
    private ValidationCodeService validateCodeService;

    @RequestMapping("/api/validation-code")
    public void generateValidationCode(HttpServletResponse response) {
        try {
            ValidationCode validationCode = validateCodeService.create();

            response.setContentType("image/png");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);

            String validationCodeToken = this.validateCodeService.createValidationCodeToken(validationCode.getCode());
            saveValidationCodeTokenCookie(response, validationCodeToken);

            ImageIO.write(validationCode.getBufferedImage(), "png", response.getOutputStream());
        } catch (IOException e) {
            LOGGER.error("error occurs while creating validation code image.", e);
        }
    }

    private void saveValidationCodeTokenCookie(HttpServletResponse response, String validationCodeToken) {
        Cookie cookie = new Cookie(VALIDATION_CODE_TOKEN_KEY, validationCodeToken);

        cookie.setPath("/");
        cookie.setMaxAge(-1);
        response.addCookie(cookie);
    }

    @RequestMapping("/api/validation-code-for-test")
    public String fetchValidationCode(@RequestParam(required = false) String token) {
        if (StringUtils.isEmpty(token)) {
            return null;
        }
        return validateCodeService.getCode(token);
    }

}
