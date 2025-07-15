package com.youtube.ecommerce;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EcommerceApplicationTest {
	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String rawPassword = "a@ass";
		String hashedPassword = "$2a$10$MNhkKeOXE9OImQDzfnix8OwWhi.3rboJl.pnXJlw4gCTLFWyBogc."; // Replace with DB value
		System.out.println(encoder.matches(rawPassword, hashedPassword));
	}
}
