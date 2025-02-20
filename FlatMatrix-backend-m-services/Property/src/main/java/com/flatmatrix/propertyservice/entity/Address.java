package com.flatmatrix.propertyservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String street;

    @Column(length = 50, nullable = false)
    private String city;

    @Column(length = 20, nullable = false)
    private String state;

    @Column(length = 20, nullable = false)
    private String country;

    @Column(nullable = false)
    private int pinCode;

    private double longitude;

    private double latitude;
}