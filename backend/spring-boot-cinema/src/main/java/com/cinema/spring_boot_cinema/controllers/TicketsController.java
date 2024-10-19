package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.Enum.DayOfWeek;
import com.cinema.spring_boot_cinema.entity.TicketPrice;
import com.cinema.spring_boot_cinema.repositories.TicketPriceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/tickets")
public class TicketsController {

    private final TicketPriceRepository ticketPriceRepository;

    public TicketsController(TicketPriceRepository ticketPriceRepository) {
        this.ticketPriceRepository = ticketPriceRepository;
    }

    @GetMapping("/prices")
    List<TicketPrice> getTicketPrices(@RequestParam DayOfWeek dayOfWeek ) {
        return ticketPriceRepository.findTicketPriceByDayOfWeek(dayOfWeek);
    }

}
