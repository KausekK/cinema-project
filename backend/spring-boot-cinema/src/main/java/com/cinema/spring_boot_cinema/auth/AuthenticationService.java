package com.cinema.spring_boot_cinema.auth;

import com.cinema.spring_boot_cinema.config.JwtService;
import com.cinema.spring_boot_cinema.entity.Roles;
import com.cinema.spring_boot_cinema.entity.User;
import com.cinema.spring_boot_cinema.repositories.RolesRepository;
import com.cinema.spring_boot_cinema.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RolesRepository rolesRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        if (request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Email and password cannot be null");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }


    public AuthenticationResponse register(RegisterRequest request) {

        if (request.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }

        Roles userRole = rolesRepository.findByRoleName("USER");
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .build();

        try{
            userRepository.save(user);
        }catch (Exception e){
            throw new IllegalArgumentException("User with this email already exists");
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

}
