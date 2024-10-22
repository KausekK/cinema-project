package com.cinema.spring_boot_cinema.service;

import com.cinema.spring_boot_cinema.dto.PaymentInfo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CheckoutServiceImpl implements CheckoutService {


    public CheckoutServiceImpl(@Value("${stripe.key.secret}") String secretKey) {
        Stripe.apiKey = secretKey;
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethods = new ArrayList<>();
        paymentMethods.add("card");

        Map<String, Object> data = new HashMap<>();
        data.put("amount", paymentInfo.getAmount());
        data.put("currency", paymentInfo.getCurrency());
        data.put("receipt_email", paymentInfo.getReceiptEmail());
        data.put("payment_method_types", paymentMethods);
        data.put("description", "Diamond Cinema purchase");
        return PaymentIntent.create(data);
    }
}
