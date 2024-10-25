package com.cinema.spring_boot_cinema.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "upcoming_movies")
public class UpcomingMovies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "type", length = 100)
    private String type;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "language", length = 50)
    private String language;

    @Column(name = "format", length = 50)
    private String format;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "director")
    private String director;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "age_restriction")
    private Integer ageRestriction;

}
