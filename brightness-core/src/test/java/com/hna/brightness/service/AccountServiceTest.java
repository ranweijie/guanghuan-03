package com.hna.brightness.service;

import com.google.common.collect.Lists;
import com.hna.brightness.BrightnessApp;
import com.hna.brightness.entity.User;
import com.hna.brightness.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(BrightnessApp.class)
@ActiveProfiles("local")
@WebIntegrationTest
public class AccountServiceTest {

    @Autowired
    AccountService accountService;

    @Autowired
    UserRepository userRepository;
    private String username;
    private User createdUser;

    @Before
    public void setUp() throws Exception {
        User user = new User();
        username = "testUser";
        user.setUsername(username);
        user.setWechatUuid("wechatUUID");
        user.setRealname("realName");
        createdUser = accountService.create(user);
    }

    @After
    public void tearDown() throws Exception {
        User user = userRepository.findOneByUsername(username);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    @Test
    public void needChangePasswordForNewlyCreateUser() throws Exception {
        assertThat(createdUser.needChangePassword(), is(true));
    }

    @Test
    public void shouldSetDefaultRoleAsVolunteerForNewlyCreateUser() throws Exception {
        assertThat(createdUser.getRoleCode(), is("ROLE_VOLUNTEER"));
    }

    @Test
    public void shouldUpdatePasswordSuccess() throws Exception {

        accountService.updatePassword(createdUser, "newPassword");

        User updatedUser = userRepository.findOne(createdUser.getUserId());
        assertThat(createdUser.getPassword(), is(not(equalTo(updatedUser.getPassword()))));
        assertThat(updatedUser.needChangePassword(), is(false));
    }

    @Test
    public void batchDeleteShouldSuccess() throws Exception {
        List<Integer> userIds = Lists.newArrayList(createdUser.getUserId());
        accountService.delete(userIds);

        assertThat(userRepository.findOne(createdUser.getUserId()), is(nullValue()));
    }

    @Test
    public void batchDeleteShouldSuccessIfContainNonExistUserId() throws Exception {
        Integer nonExistId = 0;
        List<Integer> userIds = Lists.newArrayList(nonExistId);
        accountService.delete(userIds);
    }

    @Test
    public void batchResetUserShouldSuccess() throws Exception {
        List<Integer> userIds = Lists.newArrayList(createdUser.getUserId());
        User resetUser = accountService.reset(userIds).get(0);

        assertThat(resetUser.getRoleCode(), is(equalTo(createdUser.getRoleCode())));
        assertThat(resetUser.getUsername(), is(equalTo(createdUser.getUsername())));
        assertThat(resetUser.getWechatUuid(), is(nullValue()));
        assertThat(resetUser.getRealname(), is(nullValue()));
        assertThat(resetUser.needChangePassword(), is(true));
    }

    @Test
    public void batchResetUserShouldSuccessIfUserUpdatePassword() throws Exception {
        createdUser.setPasswordOnCreate(null);
        userRepository.save(createdUser);

        List<Integer> userIds = Lists.newArrayList(createdUser.getUserId());
        User resetUser = accountService.reset(userIds).get(0);

        assertThat(resetUser.getRoleCode(), is(equalTo(createdUser.getRoleCode())));
        assertThat(resetUser.getUsername(), is(equalTo(createdUser.getUsername())));
        assertThat(resetUser.getWechatUuid(), is(nullValue()));
        assertThat(resetUser.getRealname(), is(nullValue()));
        assertThat(resetUser.needChangePassword(), is(true));
    }
}