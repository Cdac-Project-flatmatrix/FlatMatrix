package com.flatmatrix.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flatmatrix.custom_exception.ResourceNotFoundException;
import com.flatmatrix.dao.PropertyRepository;
import com.flatmatrix.dao.UserRepository;
import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.GetPropertyDto;
import com.flatmatrix.dto.PropertyReqDto;
import com.flatmatrix.pojos.Property;
import com.flatmatrix.pojos.PropertyPhotos;
import com.flatmatrix.pojos.Type;
import com.flatmatrix.pojos.User;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

	@Autowired
	private UserRepository userDao;
	@Autowired
	private PropertyRepository propertyDao;
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addProperty(PropertyReqDto propertyDto) {
		User user = userDao.findById(propertyDto.getUserid())
				.orElseThrow(() -> new ResourceNotFoundException("user not found"));

		Property property = mapper.map(propertyDto, Property.class);
		property.setUser(user);

//	    // Ensure photos list is initialized
//	    if (property.getPhotos() == null) {
//	        property.setPhotos(new ArrayList<>());
//	    }
		property.setPhotos(new ArrayList<>());
		// Map propertyPhotosDto to PropertyPhotos and set property reference
		propertyDto.getPhotos().forEach(photoDto -> {
			PropertyPhotos photo = mapper.map(photoDto, PropertyPhotos.class);
			property.setPhoto(photo);
		});

//	    System.out.println("Mapped Property: " + property);
//	    System.out.println("Mapped Photos: " + property.getPhotos());

		propertyDao.save(property);
		return new ApiResponse("success");
	}

	@Override
	public List<Property> getProperty(GetPropertyDto dto) {
		if (dto.isForRent()) {
			List<Property> property = propertyDao.findByAddressCityAndForRentTrue(dto.getCity());
			if (dto.getBedRooms() != 0) {
				property = property.stream().filter((prop) -> prop.getBedRooms() == dto.getBedRooms())
						.collect(Collectors.toList());
			}
			if (dto.getFurnished() != null) {
				property = property.stream().filter((prop) -> prop.getFurnished().equals(dto.getFurnished()))
						.collect(Collectors.toList());
			}
			return property;
		} else {
			List<Property> property = propertyDao.findByAddressCityAndForRentFalse(dto.getCity());
			if (dto.getType().equals(Type.UNDER_CONSTRUCTION)) {
				return property;
			}
			if (dto.getBedRooms() != 0) {
				property = property.stream().filter((prop) -> prop.getBedRooms() == dto.getBedRooms())
						.collect(Collectors.toList());
			}
			if (dto.getFurnished() != null) {
				property = property.stream().filter((prop) -> prop.getFurnished().equals(dto.getFurnished()))
						.collect(Collectors.toList());
			}
			return property;
		}
	}

}
