package com.youtube.ecommerce.Controller;

import com.youtube.ecommerce.Entity.User;
import com.youtube.ecommerce.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")  // Allow frontend to call this API
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

  @PostMapping({"/registerNewUser"})
  public User registerNewUser(@RequestBody User user) throws Exception {
   return      userService.registerNewUser(user);
  }

//    @PostMapping({"/registerNewUser"})
//    public User registerNewUser(@RequestBody User user) {
//        return userService.registerNewUser(user);
//    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasAnyRole('User','Admin')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
}