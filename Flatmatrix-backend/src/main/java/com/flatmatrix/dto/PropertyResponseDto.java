package com.flatmatrix.dto;

import java.util.List;

import com.flatmatrix.entities.Furnished;
import com.flatmatrix.entities.Status;
import com.flatmatrix.entities.Type;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyResponseDto {
	private Long id;
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