package com.hanbao.ecommerce.dao;

import com.hanbao.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country,Integer> {
}
