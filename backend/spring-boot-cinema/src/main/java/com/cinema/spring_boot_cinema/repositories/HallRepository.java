package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.dto.HallForSpecificShow;
import com.cinema.spring_boot_cinema.entity.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface HallRepository extends JpaRepository<Hall, Long> {

    @Query("SELECT new com.cinema.spring_boot_cinema.dto.HallForSpecificShow(s.hall.hallNumber, m.posterUrl) FROM Shows s " +
            "JOIN s.city c " +
            "JOIN s.movie m " +
            "WHERE c.cityName = :cityName " +
            "AND m.title = :title " +
            "AND s.showTime = :showTime")
    List<HallForSpecificShow> findHallByCityMovieAndShowTime(@Param("cityName") String cityName,
                                                             @Param("title") String title,
                                                             @Param("showTime") String showTime);

    @Override
    List<Hall> findAll();
}
