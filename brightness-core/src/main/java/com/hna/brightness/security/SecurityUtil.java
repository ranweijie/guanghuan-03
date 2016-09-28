package com.hna.brightness.security;

import com.hna.brightness.entity.User;
import com.hna.brightness.repository.UserRepository;
import com.hna.brightness.service.UserTokenPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public final class SecurityUtil {

    private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    @Autowired
    private UserTokenPool userTokenPool;

    @Autowired
    private UserRepository userRepository;

    public SecurityContext getSecurityContext(String tokenStr) {
        SecurityContext securityContext = SecurityContextHolder.getContext();

        if (StringUtils.isEmpty(tokenStr) || !tokenStr.startsWith("Token ")) {
            return SecurityContextHolder.createEmptyContext();
        }
        String token = tokenStr.substring(6);
        User user = getUser(token);

        if (user == null) {
            userTokenPool.removeToken(token);
            return SecurityContextHolder.createEmptyContext();
        }

        userTokenPool.updateToken(token, user, user.isExpired());

        securityContext.setAuthentication(new CustomAuthentication(user));
        return securityContext;
    }

    private synchronized User getUser(String token) {
        User user = userTokenPool.getUser(token);
        if (user == null) {
            return null;
        }
        if (user.isExpired()) {
            logger.info("User {} expired, start to fetch it from DB.", user.getUsername());
            user = userRepository.findOne(user.getUserId());
            if (user == null) {
                return null;
            }
        }
        return user;
    }
}
