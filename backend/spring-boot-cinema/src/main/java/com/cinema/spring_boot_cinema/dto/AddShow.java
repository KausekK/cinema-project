package com.cinema.spring_boot_cinema.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddShow {
    private Long movieId;
    private String showTime;
    private Long cityId;
    private Long hallId;
    private String dayOfWeek;
    private Integer duration;
}
