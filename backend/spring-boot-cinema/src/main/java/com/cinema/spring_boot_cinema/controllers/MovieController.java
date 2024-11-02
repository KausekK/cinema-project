package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.repositories.MovieRepository;
import com.cinema.spring_boot_cinema.dto.MoviesPosters;
import com.cinema.spring_boot_cinema.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin("http://localhost:4200")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }


    @GetMapping()
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/posters")
    public List<MoviesPosters> getMoviesPostersUrl() {
        return movieRepository.getAllPosters();
    }

    @GetMapping("/details")
    public List<Movie> getMoviesByTitle(@RequestParam String title) {
        return movieRepository.findByTitle(title);
    }


}
