package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.dto.MoviesPosters;
import com.cinema.spring_boot_cinema.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findAll();

    @Query("SELECT new com.cinema.spring_boot_cinema.dto.MoviesPosters(m.id, m.posterUrl, m.title) FROM Movie m")
    List<MoviesPosters> getAllPosters();

    List<Movie> findByTitle(String title);
}
