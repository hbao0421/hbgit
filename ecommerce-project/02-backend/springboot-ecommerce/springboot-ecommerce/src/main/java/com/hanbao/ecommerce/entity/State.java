package com.hanbao.ecommerce.entity;

import lombok.Data;
import lombok.Value;


import javax.persistence.*;


@Entity
@Table(name = "state")
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private  int id;
    @Column(name = "name")
    private String  name;
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;


}
