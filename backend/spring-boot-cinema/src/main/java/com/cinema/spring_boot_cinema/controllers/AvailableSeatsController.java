package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dto.SeatProjection;
import com.cinema.spring_boot_cinema.repositories.AvailableSeatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam String showTime) {
        return availableSeatsRepository.findTakenSeatsByCityMovieAndShowTime(cityName, movieTitle, showTime);
    }

    @PutMapping("/add-seats")
    public ResponseEntity<String> updateSeatsAvailability(@RequestParam Long showId, @RequestParam List<String> seatNumbers) {
        if (showId == null || seatNumbers == null || seatNumbers.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            for (String seatNumber : seatNumbers) {
                availableSeatsRepository.insertAvailableSeat(showId, seatNumber);
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
