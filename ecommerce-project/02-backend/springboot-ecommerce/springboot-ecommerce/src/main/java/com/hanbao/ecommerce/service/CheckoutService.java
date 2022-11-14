package com.hanbao.ecommerce.service;

import com.hanbao.ecommerce.dto.Purchase;
import com.hanbao.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
