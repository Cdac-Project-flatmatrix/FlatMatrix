package com.flatmatrix.dto;

import java.util.List;

import com.flatmatrix.pojos.Furnished;
import com.flatmatrix.pojos.Status;
import com.flatmatrix.pojos.Type;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyResponseDto {
	private double price;
    private int size;
    private int bedRooms;
    private Type type;
    private boolean forRent;
    private Status status;
    private Furnished furnished;
    private String description;
    private List<PropertyPhotosDto> photos;
    private AddressDto address;

}