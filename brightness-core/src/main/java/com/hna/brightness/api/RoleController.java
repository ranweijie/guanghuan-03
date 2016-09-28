package com.hna.brightness.api;

import com.hna.brightness.entity.Role;
import com.hna.brightness.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

    @Autowired
    private RoleRepository roleRepository;


    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.GET)
    public List<Role> getRoles(){
        return roleRepository.findAll();
    }


}
