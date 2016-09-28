package com.hna.brightness.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hna.brightness.exception.FormValidationException;
import sun.misc.BASE64Decoder;

import java.io.IOException;

public class PasswordModification {
    private String oldPwd;

    private String newPwd;

    @JsonIgnore
    private static BASE64Decoder decoder = new BASE64Decoder();

    public String getNewPwd() throws FormValidationException{
        return decodePwd(this.newPwd);
    }

    public String getOldPwd()  throws FormValidationException{
        return decodePwd(this.oldPwd);
    }

    private String decodePwd(String pwd) throws FormValidationException {
        try {
            return new String(decoder.decodeBuffer(pwd));
        } catch (IOException e) {
            throw new FormValidationException("illegal_character");
        }
    }
}
