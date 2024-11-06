package com.cinema.spring_boot_cinema.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Promotions")
public class Promotions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "discount", nullable = false)
    private double discount;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "description", nullable = false, length = 500)
    private String description;

    @Column(name = "full_description", nullable = false)
    private String fullDescription;

    @Column(name = "full_description_en", nullable = false)
    private String fullDescriptionEn;
}
