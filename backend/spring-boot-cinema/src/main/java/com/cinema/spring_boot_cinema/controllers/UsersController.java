package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dto.AdminInfo;
import com.cinema.spring_boot_cinema.entity.User;
import com.cinema.spring_boot_cinema.repositories.UserRepository;
import com.cinema.spring_boot_cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user")
public class UsersController {

    private final UserRepository userRepository;
    private final UserService userService;
    @Autowired
    public UsersController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/admins")
    List<AdminInfo> getAdmins(){
        return this.userRepository.findAdmins();
    }
    @PutMapping("/update/role/{id}")
    public ResponseEntity<User> toggleUser(@PathVariable Long id){
        User updatedUser = userService.toggleUserRole(id);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Object[]>> getDynamicAdminsFilter(@RequestParam String email) {
        List<Object[]> emails = userRepository.findEmailsByPartialMatch(email);
        return ResponseEntity.ok(emails);
    }

}
