package com.flatmatrix.service;

import java.util.List;

import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.GetPropertyDto;
import com.flatmatrix.dto.PropertyReqDto;
import com.flatmatrix.dto.PropertyResponseDto;
import com.flatmatrix.entities.Property;

public interface PropertyService {
	public ApiResponse addProperty(PropertyReqDto propertyDto);

	public List<PropertyReqDto> getFilteredProperties(GetPropertyDto dto);

	List<PropertyResponseDto> getPropertiesByUserIdAndStatus(Long userId, String status);
}
