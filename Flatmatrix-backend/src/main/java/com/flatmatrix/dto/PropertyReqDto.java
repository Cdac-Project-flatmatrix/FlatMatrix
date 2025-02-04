package com.flatmatrix.dto;

import java.util.List;

import com.flatmatrix.pojos.Furnished;
import com.flatmatrix.pojos.Status;
import com.flatmatrix.pojos.Type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PropertyReqDto {
	private AddressDto address;
	private double price;
	private int size;
	private int bedRooms;
	private Type type;
	private Status status;
	private Furnished furnished;
	private String descrption;
	private Long userid;
	private boolean forRent;
	private List<PropertyPhotosDto> photos;
}