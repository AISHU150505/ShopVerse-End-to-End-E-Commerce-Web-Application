package com.youtube.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/check-password")
    public boolean checkPassword(@RequestParam String inputPassword, @RequestParam String storedHashedPassword) {
        return passwordEncoder.matches(inputPassword, storedHashedPassword);
    }
}
