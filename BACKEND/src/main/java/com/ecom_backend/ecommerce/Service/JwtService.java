//package com.youtube.ecommerce.Service;
//
//import com.youtube.ecommerce.Dao.UserDao;
//import com.youtube.ecommerce.Entity.JwtRequest;
//import com.youtube.ecommerce.Entity.JwtResponse;
//import com.youtube.ecommerce.Entity.User;
//import com.youtube.ecommerce.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Service
//public class JwtService implements UserDetailsService {
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private UserDao userDao;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
//        String userName = jwtRequest.getUserName();
//        String userPassword = jwtRequest.getUserPassword();
//        authenticate(userName, userPassword);
//
//        UserDetails userDetails = loadUserByUsername(userName);
//        String newGeneratedToken = jwtUtil.generateToken(userDetails);
//
//        User user = userDao.findById(userName).get();
//
//        // Debugging Logs
//        System.out.println("✅ Authentication Successful for: " + userName);
//        System.out.println("🔑 Generated Token: " + newGeneratedToken);
//
//        return new JwtResponse(user, newGeneratedToken);
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userDao.findById(username).get();
//
//        if (user != null) {
//            return new org.springframework.security.core.userdetails.User(
//                    user.getUserName(),
//                    user.getUserPassword(),
//                    getAuthority(user)
//            );
//        } else {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//    }
//
//    private Set getAuthority(User user) {
//        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
//        user.getRole().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
//        });
//        return authorities;
//    }
//
//
//
//    private void authenticate(String userName, String userPassword) throws Exception {
//        try {
//            User user = userDao.findById(userName).orElseThrow(() ->
//                    new UsernameNotFoundException("User not found: " + userName));
//
//            // Check hashed password
//            if (!passwordEncoder.matches(userPassword, user.getUserPassword())) {
//                throw new BadCredentialsException("Invalid credentials");
//            }
//
//            // Authenticate using Spring Security
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
//
//        } catch (DisabledException e) {
//            throw new Exception("USER_DISABLED", e);
//        } catch (BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
//        }
//    }
//
//}
package com.youtube.ecommerce.Service;

import com.youtube.ecommerce.Dao.UserDao;
import com.youtube.ecommerce.Entity.JwtRequest;
import com.youtube.ecommerce.Entity.JwtResponse;
import com.youtube.ecommerce.Entity.User;
import com.youtube.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();

        authenticate(userName, userPassword);

        UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        // ✅ Corrected Optional Handling
        User user = userDao.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userName));

        // Debugging Logs
        System.out.println("✅ Authentication Successful for: " + userName);
        System.out.println("🔑 Generated Token: " + newGeneratedToken);

        return new JwtResponse(user, newGeneratedToken);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("🔍 Attempting to authenticate user: " + username);

        User user = userDao.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("❌ User not found: " + username));

        System.out.println("✅ User found: " + user.getUserName());
        System.out.println("🔐 Stored Password: " + user.getUserPassword());  // Check if it's hashed correctly

        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getUserPassword(),
                getAuthority(user)
        );
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });
        return authorities;
    }
    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            System.out.println("🔍 Authenticating user: " + userName);

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userName, userPassword)
            );

            System.out.println("✅ Authentication successful for: " + userName);

        } catch (DisabledException e) {
            System.out.println("🚫 User is disabled: " + userName);
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            System.out.println("❌ Invalid credentials for: " + userName);
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }




}
