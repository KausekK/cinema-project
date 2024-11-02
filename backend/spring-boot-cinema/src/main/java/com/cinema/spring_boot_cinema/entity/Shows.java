package com.cinema.spring_boot_cinema.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Shows")
public class Shows {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Movies_id", nullable = false)
    private Movie movie;

    @Column(name = "show_time", nullable = false)
    private String showTime;

    @ManyToOne
    @JoinColumn(name = "City_id", nullable = false)
    private City city;

    @ManyToOne
    @JoinColumn(name = "Hall_id", nullable = false)
    private Hall hall;

    @Column(name = "day_of_week")
    private String dayOfWeek;
}
