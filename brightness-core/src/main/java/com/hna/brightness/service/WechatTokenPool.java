package com.hna.brightness.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class WechatTokenPool {

    @Autowired
    private RedisTemplate<String, String> template;

    @Value("${wechat_access_token_timeout_days:15}")
    private int wechatAccessTokenTimeoutDays;

    public String createToken(String openId) {
        ValueOperations<String, String> valueOperations = this.template.opsForValue();
        String token = UUID.randomUUID().toString();
        valueOperations.set(token, openId, wechatAccessTokenTimeoutDays, TimeUnit.DAYS);
        return token;
    }

    public String getOpenId(String token) {
        ValueOperations<String, String> valueOperations = this.template.opsForValue();
        return valueOperations.get(token);
    }

    public void removeToken(String token) {
        this.template.delete(token);
    }
//
//    @Bean
//    RedisTemplate template(RedisConnectionFactory connectionFactory) {
//        RedisTemplate template = new RedisTemplate();
//        template.setConnectionFactory(connectionFactory);
//        template.afterPropertiesSet();
//        return template;
//    }
}
