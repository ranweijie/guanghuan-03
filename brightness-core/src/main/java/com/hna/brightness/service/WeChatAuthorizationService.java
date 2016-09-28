package com.hna.brightness.service;

import com.hna.brightness.entity.User;
import com.hna.brightness.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeChatAuthorizationService {

    private static final Logger logger = LoggerFactory.getLogger(WeChatAuthorizationService.class);

    @Autowired
    private UserRepository userRepository;

    public synchronized User bindUser(Integer userId, String openId) {
        User user = userRepository.findOne(userId);
        logger.info("User {} is ready to bind wechat {}", user.getUsername(), openId);
        user.setWechatUuid(openId);
        return userRepository.save(user);
    }
}
