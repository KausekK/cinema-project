package com.cinema.spring_boot_cinema.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "hall")
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "hall_number", nullable = false, length = 100)
    private Integer hallNumber;

    @Column(name = "total_seats", nullable = false)
    private int totalSeats;
}
