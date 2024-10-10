package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface CityRepository extends JpaRepository<City, Long> {

    @Override
    List<City> findAll();
}
