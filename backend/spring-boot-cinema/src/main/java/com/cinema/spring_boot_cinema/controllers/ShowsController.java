package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dao.ShowsRepository;
import com.cinema.spring_boot_cinema.entity.Shows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4200")
public class ShowsController {

    @Autowired
    private ShowsRepository showsRepository;

    @GetMapping("/api/shows")
    public Page<Shows> getShowsByCity(@RequestParam("cityName") String cityName, Pageable pageable) {
        return showsRepository.findAllShowsByCity(cityName, pageable);
    }
}

