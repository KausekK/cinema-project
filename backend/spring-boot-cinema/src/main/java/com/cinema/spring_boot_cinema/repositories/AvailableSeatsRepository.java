package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.dto.SeatProjection;
import com.cinema.spring_boot_cinema.entity.AvailableSeats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")

public interface AvailableSeatsRepository extends JpaRepository<AvailableSeats, Long> {

    @Query("SELECT a.seatNumber AS seatNumber, a.isAvailable AS available, s.hall.hallName as hallName FROM AvailableSeats a " +
            "JOIN  a.show s " +
            "JOIN  s.city c " +
            "JOIN  s.movie m " +
            "WHERE c.cityName = :cityName " +
            "AND m.title = :title " +
            "AND s.showTime = :showTime ")
    List<SeatProjection> findTakenSeatsByCityMovieAndShowTime(@Param("cityName") String cityName, @Param("title") String title, @Param("showTime") String showTime );
}
