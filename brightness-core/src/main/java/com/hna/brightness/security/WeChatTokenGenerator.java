package com.hna.brightness.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class WeChatTokenGenerator {

    @Value("${wechat_client_id}")
    private String clientId;

    @Value("${wechat_client_secret}")
    private String clientSecret;

    @Value("${wechat_mid}")
    private String mid;

    @Value("${wechat_exchage_token_uri}")
    private String exchangeTokenUri;

    @Value("${wechat_auth_url}")
    private String externalAuthUrl;

    public String generateToken(long time) {
        return new Md5PasswordEncoder().encodePassword(clientId + clientSecret + String.valueOf(time), null);
    }

    public long getTime() {
        long rawTime = new Date().getTime();
        return (rawTime / 10000000) * 10000000;
    }
}
