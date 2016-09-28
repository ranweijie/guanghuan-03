package com.hna.brightness.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeChatToken extends Token {

    @JsonProperty("wechat_token")
    private String wechatToken;

    @JsonProperty("message")
    private String message;

    public WeChatToken(Token token, String wechatToken, String message) {
        this(token);
        this.message = message;
        this.wechatToken = wechatToken;
    }

    public WeChatToken(Token token) {
        super(token.getUser(), token.getToken());
    }

    public WeChatToken() {
    }

    public String getWechatToken() {
        return wechatToken;
    }

    public void setWechatToken(String wechatToken) {
        this.wechatToken = wechatToken;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
