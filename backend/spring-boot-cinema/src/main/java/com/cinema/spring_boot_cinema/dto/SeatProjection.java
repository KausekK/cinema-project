package com.cinema.spring_boot_cinema.dto;

public interface SeatProjection {
    Integer getSeatNumber();
    boolean isAvailable();
    Integer getHallNumber();
}

