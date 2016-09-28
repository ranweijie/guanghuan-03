package com.hna.brightness.security;

import com.hna.brightness.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class CustomAuthenticationFilter extends AbstractPreAuthenticatedProcessingFilter {

    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationFilter.class);

    @Autowired
    private SecurityUtil securityUtil;

    @Autowired
    public CustomAuthenticationFilter(@Qualifier(value = "authenticationManager") AuthenticationManager authenticationManager) {
        setAuthenticationManager(authenticationManager);
    }

    @Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
        String tokenStr = request.getHeader("Authorization");
        SecurityContext securityContext = securityUtil.getSecurityContext(tokenStr);
        if (securityContext.getAuthentication() != null && securityContext.getAuthentication().isAuthenticated()) {
            CustomAuthentication customAuthentication = (CustomAuthentication) securityContext.getAuthentication();
            SecurityContextHolder.setContext(securityContext);
            logger.info("User {} try to access {}", customAuthentication.getName(), request.getRequestURI());
            return customAuthentication.getDetails();
        }
        logger.info("anonymous try to access {}", request.getRequestURI());
        return new User();
    }

    @Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
        return null;
    }
}
