package com.hna.brightness.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hna.brightness.exception.FormValidationException;
import sun.misc.BASE64Decoder;

import java.io.IOException;

public class Credentials {
    private String username;
    private String password;
    private String validationCode;

    @JsonIgnore
    private static BASE64Decoder decoder = new BASE64Decoder();

    public String getUsername() {
        return username;
    }

    public String getPassword() throws FormValidationException {
        try {
            return new String(decoder.decodeBuffer(this.password));
        } catch (IOException e) {
            throw new FormValidationException("illegal_character");
        }
    }

    public String getValidationCode() {
        return validationCode;
    }
}
