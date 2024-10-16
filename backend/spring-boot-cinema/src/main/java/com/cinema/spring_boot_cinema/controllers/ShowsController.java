package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.repositories.ShowsRepository;
import com.cinema.spring_boot_cinema.entity.Shows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class ShowsController {

    @Autowired
    private ShowsRepository showsRepository;

    @GetMapping("/shows")
    public Page<Shows> getShowsByCityAndDayOfWeek(@RequestParam("cityName") String cityName, @RequestParam("dayOfWeek") String dayOfWeek ,Pageable pageable) {
        return showsRepository.findAllShowsByCityAndDayOfWeek(cityName, dayOfWeek, pageable);
    }



}

