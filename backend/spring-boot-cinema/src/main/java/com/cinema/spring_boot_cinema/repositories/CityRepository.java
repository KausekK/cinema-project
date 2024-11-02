package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface CityRepository extends JpaRepository<City, Long> {

    @Override
    List<City> findAll();


    @Query("SELECT c.id FROM City c WHERE c.cityName = :cityName")
    Long getIdByCityName(@Param("cityName") String cityName);

}
