package com.cinema.spring_boot_cinema.service;

import com.cinema.spring_boot_cinema.dto.PaymentInfo;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;


}
