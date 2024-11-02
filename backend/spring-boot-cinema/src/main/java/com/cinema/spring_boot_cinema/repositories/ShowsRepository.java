package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.entity.Shows;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface ShowsRepository extends JpaRepository<Shows, Long> {


    @Query("SELECT s FROM Shows s " +
            "JOIN FETCH s.movie m " +
            "JOIN FETCH s.city c " +
            "WHERE c.cityName = :cityName AND s.dayOfWeek = :dayOfWeek " +
            "ORDER BY s.showTime")
    List<Shows> findAllShowsByCityAndDayOfWeek(@Param("cityName") String cityName, @Param("dayOfWeek") String dayOfWeek);


    @Query("SELECT s FROM Shows s " +
            "JOIN FETCH s.movie m " +
            "JOIN FETCH s.city c " +
            "WHERE c.cityName = :cityName AND DATE(s.showTime) = :showDate AND m.title = :title " +
            "ORDER BY s.showTime")
    List<Shows> findShowsByCityTitleAndDate(@Param("cityName") String cityName,
                                            @Param("title") String title,
                                            @Param("showDate") LocalDate showDate);

    @Override
    void deleteById(Long showId);

    List<Shows> findByHallId(Long hallId);


}
