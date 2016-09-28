package com.hna.brightness.security;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WechatCredentials {
    @JsonProperty("openid")
    private String openId;
    @JsonProperty("wechat_token")
    private String token;

    public WechatCredentials() {
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
