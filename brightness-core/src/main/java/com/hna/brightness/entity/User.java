package com.hna.brightness.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

import static org.springframework.security.crypto.codec.Base64.decode;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "username")
    @NotNull
    private String username;

    @Column(name = "password")
    @NotNull
    @JsonIgnore
    private String password;

    @Column(name = "realname")
    private String realname;

    @Column(name = "wechat_uuid")
    @JsonProperty
    private String wechatUuid;

    @Column(name = "role_code")
    private String roleCode;

    @Transient
    @JsonIgnore
    private Date expireTime;

    @OneToOne(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnore
    private PasswordOnCreate passwordOnCreate;

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    @JsonProperty
    public String getWechatUuid() {
        return wechatUuid;
    }

    public String getRealname() {
        return realname;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    @JsonIgnore
    public void setWechatUuid(String wechatUuid) {
        this.wechatUuid = wechatUuid;
    }

    @JsonIgnore
    public Date getExpireTime() {
        return expireTime;
    }

    @JsonIgnore
    public boolean isExpired() {
        return expireTime == null || expireTime.before(new Date());
    }

    @JsonIgnore
    public void refreshExpireTime(int durationInMin) {
        this.expireTime = new Date(new Date().getTime() + durationInMin * 60000);
    }

    @JsonProperty
    public boolean needChangePassword(){
        return null != this.passwordOnCreate;
    }

    public void setPasswordOnCreate(PasswordOnCreate passwordOnCreate) {
        this.passwordOnCreate = passwordOnCreate;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public PasswordOnCreate getPasswordOnCreate() {
        return passwordOnCreate;
    }

    @JsonIgnore
    public String getPlaintextPassword() {
        if (needChangePassword()) {
            return new String(decode(this.passwordOnCreate.getEncodedPassword().getBytes()));
        }
        return "********";
    }
}
