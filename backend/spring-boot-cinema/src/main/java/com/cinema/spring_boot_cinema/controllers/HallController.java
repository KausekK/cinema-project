package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dto.HallForSpecificShow;
import com.cinema.spring_boot_cinema.entity.Hall;
import com.cinema.spring_boot_cinema.repositories.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/hall")
public class HallController {

    HallRepository hallRepository;

    @Autowired
    public HallController(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    @GetMapping()
    public List<HallForSpecificShow> getHallByCityAndMovieAndShowTime(
            @RequestParam String cityName,
            @RequestParam String movieTitle,
            @RequestParam String showTime) {
        return hallRepository.findHallByCityMovieAndShowTime(cityName, movieTitle, showTime);
    }

    @GetMapping("/all")
    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }
}
