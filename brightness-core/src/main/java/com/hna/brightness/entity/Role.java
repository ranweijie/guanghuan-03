package com.hna.brightness.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "role")
public class Role implements Serializable{

    @Id
    @Column(name = "role_code")
    @NotNull
    private String roleCode;

    @Column(name = "role_name")
    @NotNull
    private String roleName;

    public String getRoleCode() {
        return roleCode;
    }

    public String getRoleName() {
        return roleName;
    }
}
