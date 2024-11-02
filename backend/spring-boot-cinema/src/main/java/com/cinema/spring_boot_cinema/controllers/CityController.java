package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.entity.City;
import com.cinema.spring_boot_cinema.repositories.CityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/city")
public class CityController {

    CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping("/all")
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    @GetMapping("/id")
    public Long getCityIdByCityName(@RequestParam String cityName) {
        return this.cityRepository.getIdByCityName(cityName);
    }

}
