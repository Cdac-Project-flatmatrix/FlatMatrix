package com.flatmatrix.service;

import com.flatmatrix.repositories.WishlistRepository;
import com.flatmatrix.repositories.UserRepository;
import com.flatmatrix.repositories.PropertyRepository;
import com.flatmatrix.entities.Wishlist;
import com.flatmatrix.entities.User;
import com.flatmatrix.entities.Property;
import com.flatmatrix.custom_exception.ResourceNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WishlistService {

    private static final Logger logger = LoggerFactory.getLogger(WishlistService.class);

    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    
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
}
