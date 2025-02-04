package com.flatmatrix.service;

import java.util.List;

import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.GetPropertyDto;
import com.flatmatrix.dto.PropertyReqDto;
import com.flatmatrix.pojos.Property;

public interface PropertyService {
	public ApiResponse addProperty(PropertyReqDto propertyDto);

	public List<Property> getProperty(GetPropertyDto dto);
}
