package com.cinema.spring_boot_cinema.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Tickets")
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Shows_id", nullable = false)
    private Shows show;

    @ManyToOne
    @JoinColumn(name = "Client_id", nullable = false)
    private Client client;

    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;
}
