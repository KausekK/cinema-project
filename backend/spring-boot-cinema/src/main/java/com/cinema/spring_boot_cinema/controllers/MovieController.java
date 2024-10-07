package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dao.MovieRepository;
import com.cinema.spring_boot_cinema.dto.MoviesPosters;
import com.cinema.spring_boot_cinema.entity.Movie;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin("http://localhost:4200")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping("/posters")
    public List<MoviesPosters> getMoviesPostersUrl() {
        return movieRepository.getAllPosters();
    }
}
