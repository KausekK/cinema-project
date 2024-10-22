package com.cinema.spring_boot_cinema.dto;

import lombok.Data;

@Data
public class PaymentInfo {
    private int amount;
    private String currency;
    private String receiptEmail;
}
