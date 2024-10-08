package com.cinema.spring_boot_cinema.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "type", nullable = false, length = 255)
    private String type;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "Language", nullable = false, length = 100)
    private String language;

    @Column(name = "format", nullable = false, length = 20)
    private String format;

    @Column(name = "poster_url", nullable = false)
    private String posterUrl;

    @Column(name = "trailer_url", nullable = false)
    private String trailerUrl;

    @Column(name = "director", nullable = false, length = 100)
    private String director;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "age_restriction")
    private Integer ageRestriction;
}
