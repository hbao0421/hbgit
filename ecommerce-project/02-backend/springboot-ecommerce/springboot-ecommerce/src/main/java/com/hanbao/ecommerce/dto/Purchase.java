package com.hanbao.ecommerce.dto;

import com.hanbao.ecommerce.entity.Address;
import com.hanbao.ecommerce.entity.Customer;
import com.hanbao.ecommerce.entity.Order;
import com.hanbao.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
