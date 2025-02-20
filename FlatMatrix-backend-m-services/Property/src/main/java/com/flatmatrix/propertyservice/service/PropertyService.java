package com.flatmatrix.propertyservice.service;

import com.flatmatrix.propertyservice.client.UserClient;
import com.flatmatrix.propertyservice.dto.PropertyReqDto;
import com.flatmatrix.propertyservice.dto.PropertyResponseDto;
import com.flatmatrix.propertyservice.entity.Property;
import com.flatmatrix.propertyservice.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserClient userClient;

    public Property addProperty(PropertyReqDto propertyDto) {
        Property property = new Property();
        property.setAddress(propertyDto.getAddress());
        property.setPrice(propertyDto.getPrice());
        property.setSize(propertyDto.getSize());
        property.setBedRooms(propertyDto.getBedRooms());
        property.setType(propertyDto.getType());
        property.setForRent(propertyDto.isForRent());
        property.setStatus(propertyDto.getStatus());
        property.setFurnished(propertyDto.getFurnished());
        property.setDescrption(propertyDto.getDescrption());
        property.setUser(propertyDto.getUser());
        property.setPhotos(propertyDto.getPhotos());
        return propertyRepository.save(property);
    }

    public List<PropertyResponseDto> getPropertiesByUserIdAndStatus(String status) {
        List<Property> properties = propertyRepository.findByUserIdAndStatus(status);
        return properties.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public PropertyResponseDto updateProperty(Long propertyId, PropertyResponseDto propertyDto) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        property.setPrice(propertyDto.getPrice());
        property.setSize(propertyDto.getSize());
        property.setBedRooms(propertyDto.getBedRooms());
        property.setType(propertyDto.getType());
        property.setForRent(propertyDto.isForRent());
        property.setStatus(propertyDto.getStatus());
        property.setFurnished(propertyDto.getFurnished());
        property.setDescrption(propertyDto.getDescrption());
        property.setPhotos(propertyDto.getPhotos());
        propertyRepository.save(property);
        return convertToDto(property);
    }

    public String deleteProperty(Long propertyId) {
        propertyRepository.deleteById(propertyId);
        return "Property deleted successfully";
    }

    public String uploadPhoto(Long propertyId, PropertyResponseDto photoDto) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        property.getPhotos().add(photoDto);
        propertyRepository.save(property);
        return "Photo uploaded successfully";
    }

    private PropertyResponseDto convertToDto(Property property) {
        PropertyResponseDto dto = new PropertyResponseDto();
        dto.setId(property.getId());
        dto.setPrice(property.getPrice());
        dto.setSize(property.getSize());
        dto.setBedRooms(property.getBedRooms());
        dto.setType(property.getType());
        dto.setForRent(property.isForRent());
        dto.setStatus(property.getStatus());
        dto.setFurnished(property.getFurnished());
        dto.setDescription(property.getDescrption());
        dto.setPhotos(property.getPhotos());
        dto.setAddress(property.getAddress());
        dto.setUser(userClient.getUserById(property.getUser().getId()));
        return dto;
    }
}