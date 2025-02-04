package com.flatmatrix.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
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
import com.flatmatrix.pojos.User;
import com.flatmatrix.specification.PropertySpecification;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private static final Logger logger = LoggerFactory.getLogger(PropertyServiceImpl.class); // SLF4J Logger

    @Autowired
    private UserRepository userDao;

    @Autowired
    private PropertyRepository propertyDao;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public ApiResponse addProperty(PropertyReqDto propertyDto) {
        logger.info("Adding property for user ID: {}", propertyDto.getUserid());

        User user = userDao.findById(propertyDto.getUserid())
                .orElseThrow(() -> {
                    logger.error("User not found with ID: {}", propertyDto.getUserid());
                    return new ResourceNotFoundException("User not found");
                });

        Property property = mapper.map(propertyDto, Property.class);
        property.setUser(user);
        property.setPhotos(new ArrayList<>());

        propertyDto.getPhotos().forEach(photoDto -> {
            PropertyPhotos photo = mapper.map(photoDto, PropertyPhotos.class);
            property.setPhoto(photo);
        });

        logger.debug("Mapped Property: {}", property);

        propertyDao.save(property);
        logger.info("Property saved successfully with ID: {}", property.getId());

        return new ApiResponse("Success");
    }

    @Override
    public List<PropertyReqDto> getFilteredProperties(GetPropertyDto dto) {
        logger.info("Fetching properties with filters: {}", dto);

        Specification<Property> spec = PropertySpecification.filterProperties(
                dto.isForRent(), dto.getCity(), dto.getBedRooms(), dto.getType(),
                dto.getFurnished(), dto.getMinPrice(), dto.getMaxPrice()
        );

        List<Property> properties = propertyRepository.findAll(spec);

        logger.info("Total properties fetched: {}", properties.size());

        List<PropertyReqDto> propertyDtos = properties.stream()
                .map(property -> mapper.map(property, PropertyReqDto.class))
                .collect(Collectors.toList());

        return propertyDtos;
    }
}
