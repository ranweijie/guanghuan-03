package com.hna.brightness.service;

import com.hna.brightness.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class UserTokenPool {

    @Autowired
    private RedisTemplate<String, User> template;

    @Value("${web_access_token_timeout_min:60}")
    private int webAccessTokenTimeoutInMin;

    @Value("${user_info_refresh_duration_in_min:5}")
    private int userInfoRefreshDurationInMin;

    public String createToken(User user) {
        String token = UUID.randomUUID().toString();
        updateToken(token, user, true);
        return token;
    }

    public User getUser(String token) {
        ValueOperations<String, User> valueOperations = this.template.opsForValue();
        return valueOperations.get(token);
    }

    public void removeToken(String token) {
        this.template.delete(token);
    }

    public User updateToken(String token, User user, boolean isRefreshUserExpireTime) {
        ValueOperations<String, User> valueOperations = this.template.opsForValue();
        if (isRefreshUserExpireTime) {
            user.refreshExpireTime(userInfoRefreshDurationInMin);
        }
        valueOperations.set(token, user, webAccessTokenTimeoutInMin, TimeUnit.MINUTES);
        return user;
    }
}
