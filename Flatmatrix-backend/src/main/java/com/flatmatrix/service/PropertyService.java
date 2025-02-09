package com.flatmatrix.service;

import java.util.List;

import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.GetPropertyDto;
import com.flatmatrix.dto.PropertyPhotosDto;
import com.flatmatrix.dto.PropertyReqDto;
import com.flatmatrix.dto.PropertyResponseDto;
import com.flatmatrix.entities.Property;
import com.flatmatrix.security.CustomUserDetails;

public interface PropertyService {
	public ApiResponse addProperty(PropertyReqDto propertyDto, CustomUserDetails currentUser);

	public List<PropertyResponseDto> getFilteredProperties(GetPropertyDto dto);

	List<PropertyResponseDto> getPropertiesByUserIdAndStatus(Long userId, String status);

	public ApiResponse updateProperty(Long propertyId, PropertyResponseDto propertyDto, CustomUserDetails currentUser);

	public ApiResponse deleteProperty(Long propertyId, CustomUserDetails currentUser);

	public ApiResponse uploadPhoto(Long propertyId, PropertyPhotosDto photoDto, CustomUserDetails currentUser);
}
