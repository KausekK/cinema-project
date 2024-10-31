package com.cinema.spring_boot_cinema.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminInfo {
    Long id;
    String firstName;
    String lastName;
    String email;
}
