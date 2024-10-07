package com.cinema.spring_boot_cinema.controllers;


import com.cinema.spring_boot_cinema.dao.PromotionsRepository;
import com.cinema.spring_boot_cinema.entity.Promotions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/promotions")
public class PromotionsController {

    private final PromotionsRepository promotionsRepository;

    @Autowired
    public PromotionsController(PromotionsRepository promotionsRepository) {
        this.promotionsRepository = promotionsRepository;
    }

    @GetMapping
    public List<Promotions> getAllPromotions() {
        return promotionsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Promotions getPromotionById(@PathVariable long id) {
        return promotionsRepository.findById(id);
    }
}

