package com.flatmatrix.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
@Entity
public class Address extends BaseEntity {
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
