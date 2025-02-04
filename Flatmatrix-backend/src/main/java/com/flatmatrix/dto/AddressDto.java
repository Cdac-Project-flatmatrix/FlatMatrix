package com.flatmatrix.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddressDto {
	private String street;
	private String city;
	private String state;
	private String country;
	private int pinCode;
	private double longitude;
	private double latitude;
}
