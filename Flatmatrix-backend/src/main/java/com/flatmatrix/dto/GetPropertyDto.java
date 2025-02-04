package com.flatmatrix.dto;

import com.flatmatrix.pojos.Furnished;
import com.flatmatrix.pojos.Type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class GetPropertyDto {
	private boolean forRent;
	private String city;
	private int bedRooms;
	private Type type;
	private Furnished furnished;
}
