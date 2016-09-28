package com.hna.brightness.service;

import com.hna.brightness.entity.Role;
import com.hna.brightness.entity.User;
import com.hna.brightness.entity.UserForExport;
import com.hna.brightness.repository.RoleRepository;
import com.hna.brightness.repository.UserRepository;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExcelService {
    @Value("${excelTemplatePath:excel_template}")
    private String templatePath;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void setTemplatePath(String templatePath) {
        this.templatePath = templatePath;
    }

    public void exportUsers(List<Integer> userIds, OutputStream outputStream) throws IOException {
        List<User> users = userRepository.findAll(userIds);
        List<Role> roles = roleRepository.findAll();

        List<UserForExport> usersForExport = users.stream().map(user -> {
            String username = user.getUsername();
            String password = user.getPlaintextPassword();
            String role = getRoleName(user, roles);
            String realname = user.getRealname();
            return new UserForExport(username, password, role, realname);
        }).collect(Collectors.toList());

        export(usersForExport, outputStream);
    }

    private void export(List<UserForExport> users, OutputStream outputStream) throws IOException {
        String path = Paths.get(templatePath, "user_template.xlsx").toString();
        InputStream inputStream = new ClassPathResource(path).getInputStream();
        Context context = new Context();
        context.putVar("users", users);
        JxlsHelper.getInstance().processTemplate(inputStream, outputStream, context);
    }

    private String getRoleName(User user, List<Role> roles) {
        Optional<String> roleName = roles.stream()
                .filter(role -> role.getRoleCode().equals(user.getRoleCode()))
                .map(Role::getRoleName).findFirst();
        return roleName.orElse("");
    }

}
