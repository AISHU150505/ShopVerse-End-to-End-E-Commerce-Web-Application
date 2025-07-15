package com.youtube.ecommerce.Service;

import com.youtube.ecommerce.Dao.RoleDao;
import com.youtube.ecommerce.Dao.UserDao;
import com.youtube.ecommerce.Entity.Role;
import com.youtube.ecommerce.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {
        if (roleDao.count() == 0) { // Ensure roles are created only once
            System.out.println("Initializing roles...");

            Role adminRole = new Role();
            adminRole.setRoleName("ADMIN"); // Ensure uppercase consistency
            adminRole.setRoleDescription("Admin role");
            roleDao.save(adminRole);

            Role userRole = new Role();
            userRole.setRoleName("USER");
            userRole.setRoleDescription("Default role for newly created users");
            roleDao.save(userRole);

            System.out.println("Roles created successfully.");
        }

        if (!userDao.existsByUserName("a123")) { // Prevent duplicate admin user creation
            System.out.println("Creating admin user...");

            User adminUser = new User();
            adminUser.setUserName("a123");
            adminUser.setUserPassword(getEncodedPassword("a@ass"));
            adminUser.setUserFirstName("Admin");
            adminUser.setUserLastName("User");

            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(roleDao.findByRoleName("ADMIN").orElseThrow(() -> new RuntimeException("Admin role not found!")));
            adminUser.setRole(adminRoles);

            userDao.save(adminUser);
            System.out.println("Admin user created successfully.");
        }

        if (!userDao.existsByUserName("raj123")) {
            System.out.println("Creating test user raj123...");

            User user = new User();
            user.setUserFirstName("Raj");
            user.setUserLastName("Sharma");
            user.setUserName("raj123");
            user.setUserPassword(getEncodedPassword("raj@pass"));

            Set<Role> userRoles = new HashSet<>();
            userRoles.add(roleDao.findByRoleName("USER").orElseThrow(() -> new RuntimeException("User role not found!")));
            user.setRole(userRoles);

            userDao.save(user);
            System.out.println("Test user raj123 created successfully.");
        }
    }

    public User registerNewUser(User user) throws Exception {
        if (userDao.existsByUserName(user.getUserName())) {
            throw new Exception("User already exists with username: " + user.getUserName());
        }

        Optional<Role> roleOptional = roleDao.findByRoleName("USER");
        if (!roleOptional.isPresent()) {
            throw new Exception("User role not found in database!");
        }

        Set<Role> roleSet = new HashSet<>();
        roleSet.add(roleOptional.get());
        user.setRole(roleSet);

        String encodedPassword = getEncodedPassword(user.getUserPassword());
        user.setUserPassword(encodedPassword);

        System.out.println("Registering new user: " + user.getUserName());
        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
