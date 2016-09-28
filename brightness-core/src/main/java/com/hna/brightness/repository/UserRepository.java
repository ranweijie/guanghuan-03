package com.hna.brightness.repository;

import com.hna.brightness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findOneByUsername(String username);
    User findOneByWechatUuid(String wechatUuid);
}
