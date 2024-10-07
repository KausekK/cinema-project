package com.cinema.spring_boot_cinema.dao;

import com.cinema.spring_boot_cinema.entity.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface PromotionsRepository extends JpaRepository<Promotions, Long> {

    List<Promotions> findAll();

    Promotions findById(long id);
}
