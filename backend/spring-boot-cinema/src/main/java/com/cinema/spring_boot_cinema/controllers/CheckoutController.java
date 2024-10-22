package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dto.PaymentInfo;
import com.cinema.spring_boot_cinema.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) {
        try {
            PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentInfo);
            String paymentStr = paymentIntent.toJson();
            return new ResponseEntity<>(paymentStr, HttpStatus.OK);
        } catch (StripeException e) {
            return new ResponseEntity<>("Failed to create Payment Intent: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
