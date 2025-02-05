package com.flatmatrix.service;

import com.flatmatrix.repositories.WishlistRepository;

import jakarta.transaction.Transactional;

import com.flatmatrix.repositories.UserRepository;
import com.flatmatrix.repositories.PropertyRepository;
import com.flatmatrix.entities.Wishlist;
import com.flatmatrix.entities.User;
import com.flatmatrix.entities.Property;
import com.flatmatrix.custom_exception.ResourceNotFoundException;
import com.flatmatrix.dto.PropertyResponseDto;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class WishlistService {

    private static final Logger logger = LoggerFactory.getLogger(WishlistService.class);

    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public String addToWishlist(Long propertyId, Long userId) {
        logger.info("Adding property {} to wishlist for user {}", propertyId, userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id " + propertyId));

        Optional<Wishlist> existing = wishlistRepository.findByUserAndProperty(user, property);
        if (existing.isPresent()) {
            logger.info("Property {} is already in wishlist for user {}", propertyId, userId);
            return "Property is already in wishlist.";
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProperty(property);
        wishlistRepository.save(wishlist);
        logger.info("Property {} added to wishlist for user {}", propertyId, userId);
        return "Property added to wishlist successfully.";
    }

    public String removeFromWishlist(Long propertyId, Long userId) {
        logger.info("Removing property {} from wishlist for user {}", propertyId, userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id " + propertyId));

        Wishlist wishlist = wishlistRepository.findByUserAndProperty(user, property)
                .orElseThrow(() -> new ResourceNotFoundException("Property is not in wishlist for this user."));
        wishlistRepository.delete(wishlist);
        logger.info("Property {} removed from wishlist for user {}", propertyId, userId);
        return "Property removed from wishlist successfully.";
    }
    
    public List<PropertyResponseDto> getWishlist(Long userId) {
        logger.info("Fetching wishlist for user {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        List<Wishlist> wishlistItems = wishlistRepository.findByUser(user);
        List<Property> properties = wishlistItems.stream()
                .map(Wishlist::getProperty)
                .collect(Collectors.toList());
        return properties.stream()
                .map(property -> modelMapper.map(property, PropertyResponseDto.class))
                .collect(Collectors.toList());
    }
}
