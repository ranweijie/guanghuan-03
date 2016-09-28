package com.hna.brightness.entity;

public class UserForExport {
    private final String name;
    private final String password;
    private final String role;
    private final String realName;

    public UserForExport(String name, String password, String role, String realName) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.realName = realName;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public String getRealName() {
        return realName;
    }
}
