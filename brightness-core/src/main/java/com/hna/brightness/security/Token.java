package com.hna.brightness.security;

import com.hna.brightness.entity.User;

public class Token {

    private User user;
    private String token;

    public Token(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public Token() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }
}
