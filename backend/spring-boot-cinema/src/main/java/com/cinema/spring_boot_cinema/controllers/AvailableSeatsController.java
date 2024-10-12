package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dto.SeatProjection;
import com.cinema.spring_boot_cinema.entity.AvailableSeats;
import com.cinema.spring_boot_cinema.repositories.AvailableSeatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/seats")
public class AvailableSeatsController {

    private final AvailableSeatsRepository availableSeatsRepository;

    @Autowired
    public AvailableSeatsController(AvailableSeatsRepository availableSeatsRepository) {
        this.availableSeatsRepository = availableSeatsRepository;
    }

    @GetMapping("/available")
    public List<SeatProjection> getAvailableSeats(
            @RequestParam String cityName,
            @RequestParam String movieTitle,
            @RequestParam String showTime
    ) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        LocalDateTime showTimeParsed = LocalDateTime.parse(showTime, formatter);

        return availableSeatsRepository.findTakenSeatsByCityMovieAndShowTime(cityName, movieTitle, showTime);
    }
}
