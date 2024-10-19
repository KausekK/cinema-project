package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.Enum.DayOfWeek;
import com.cinema.spring_boot_cinema.Enum.TicketType;
import com.cinema.spring_boot_cinema.entity.TicketPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface TicketPriceRepository extends JpaRepository<TicketPrice, Long> {

    List<TicketPrice> findTicketPriceByDayOfWeek(DayOfWeek dayOfWeek);
}
