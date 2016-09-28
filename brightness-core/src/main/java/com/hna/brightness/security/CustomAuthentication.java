package com.hna.brightness.security;

import com.hna.brightness.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

public class CustomAuthentication implements Authentication {

    public static final String ROLE_USER_CODE = "ROLE_USER";
    private User currentUser;

    public CustomAuthentication(User currentUser) {
        this.currentUser = currentUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();

        authorities.add(new SimpleGrantedAuthority(ROLE_USER_CODE));
        authorities.add(new SimpleGrantedAuthority(currentUser.getRoleCode()));

        return authorities;
    }

    @Override
    public Object getCredentials() {
        throw new UnsupportedOperationException("Do not expose user credential here");
    }

    @Override
    public Object getDetails() {
        return this.currentUser;
    }

    @Override
    public Object getPrincipal() {
        return this.currentUser;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        throw new UnsupportedOperationException("value could not be modified here");
    }

    @Override
    public String getName() {
        return this.currentUser.getUsername();
    }
}
