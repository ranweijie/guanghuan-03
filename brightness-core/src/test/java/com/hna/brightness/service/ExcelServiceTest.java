package com.hna.brightness.service;

import com.hna.brightness.BrightnessApp;
import com.hna.brightness.entity.User;
import com.hna.brightness.repository.RoleRepository;
import com.hna.brightness.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.Collectors;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(BrightnessApp.class)
@ActiveProfiles("local")
@WebIntegrationTest
public class ExcelServiceTest {
    @Rule
    public TemporaryFolder folder = new TemporaryFolder();
    private ExcelService excelService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private String username;

    @Before
    public void setUp() throws Exception {
        User user = new User();
        username = "testUser";
        user.setUsername(username);
        user.setWechatUuid("wechatUUID");
        user.setRealname("realName");
        accountService.create(user);

        excelService = new ExcelService();
        excelService.setTemplatePath("");
        excelService.setRoleRepository(roleRepository);
        excelService.setUserRepository(userRepository);
    }

    @After
    public void tearDown() throws Exception {
        User user = userRepository.findOneByUsername(username);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    @Test
    public void name() throws Exception {
        File file = folder.newFile("object_collection_output.xlsx");
        OutputStream os = new FileOutputStream(file.getPath());
        List<Integer> userIds = userRepository.findAll().stream().map(User::getUserId).collect(Collectors.toList());

        excelService.exportUsers(userIds, os);
    }

}