package com.cinema.spring_boot_cinema.entity;

import com.cinema.spring_boot_cinema.Enum.TicketType;
import jakarta.persistence.*;
import lombok.Data;
import com.cinema.spring_boot_cinema.Enum.DayOfWeek;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "ticket_price")
public class TicketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    @Column(name = "day_of_week", nullable = false)
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

}

