package com.youtube.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void checkPassword() {
        // Replace with actual hashed password from your database
        String storedHashedPassword = "$2a$10$YlZ.8F3RoWzZuqmMiIUpXutV8T1wFMcScj/Jfzr9ox/YlWxUpDHPW";
        String inputPassword = "a@ass";

        boolean matches = passwordEncoder.matches(inputPassword, storedHashedPassword);
        System.out.println("Password Match: " + matches);
    }
}
