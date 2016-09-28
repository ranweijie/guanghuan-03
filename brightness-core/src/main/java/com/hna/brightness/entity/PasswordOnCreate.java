package com.hna.brightness.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "password")
public class PasswordOnCreate implements Serializable{
    @Column(name = "encoded_password")
    private String encodedPassword;

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @OneToOne
    @JoinColumn(name = "user_id")
    @MapsId
    @JsonIgnore
    private User user;

    public PasswordOnCreate() {
    }

    public PasswordOnCreate(String encodedPassword, User user) {
        this.encodedPassword = encodedPassword;
        this.user = user;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }
}
