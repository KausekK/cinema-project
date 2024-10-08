package com.cinema.spring_boot_cinema.dao;

import com.cinema.spring_boot_cinema.entity.Shows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ShowsRepository extends JpaRepository<Shows, Long> {


    @Query("SELECT s FROM Shows s " +
            "JOIN FETCH s.movie m " +
            "JOIN FETCH s.city c " +
            "WHERE c.cityName = :cityName AND s.dayOfWeek = :dayOfWeek " +
            "ORDER BY s.showTime")
    Page<Shows> findAllShowsByCityAndDayOfWeek(@Param("cityName") String cityName, @Param("dayOfWeek") String dayOfWeek, Pageable pageable);



}
