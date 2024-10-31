package com.cinema.spring_boot_cinema.service;

import com.cinema.spring_boot_cinema.entity.Roles;
import com.cinema.spring_boot_cinema.entity.User;
import com.cinema.spring_boot_cinema.repositories.RolesRepository;
import com.cinema.spring_boot_cinema.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository roleRepository;

    public User toggleUserRole(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Roles adminRole = roleRepository.findByRoleName("ADMIN");
        if (adminRole == null) {
            throw new ResourceNotFoundException("Role 'ADMIN' not found");
        }

        Roles userRole = roleRepository.findByRoleName("USER");
        if (userRole == null) {
            throw new ResourceNotFoundException("Role 'USER' not found");
        }

        if (user.getRole().equals(adminRole)) {
            user.setRole(userRole);
        } else {
            user.setRole(adminRole);
        }

        return userRepository.save(user);
    }


}
