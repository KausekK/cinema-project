package com.cinema.spring_boot_cinema.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HallForSpecificShow {
    Integer hallNumber;
    String moviePosterUrl;
}
