package com.hna.brightness.security;

import com.hna.brightness.entity.User;
import com.hna.brightness.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        PreAuthenticatedAuthenticationToken token = (PreAuthenticatedAuthenticationToken) authentication;
        User user = (User) token.getPrincipal();

        if (user != null && user.getUsername() != null) {
            logger.info("User {} authenticated via token.", user.getUsername());
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(new CustomAuthentication(user));
            return new CustomAuthentication(user);
        }
        throw new UnauthorizedException("Unauthorized");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (PreAuthenticatedAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
