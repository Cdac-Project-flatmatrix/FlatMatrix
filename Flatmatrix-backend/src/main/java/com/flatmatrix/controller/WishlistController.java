package com.flatmatrix.controller;

import com.flatmatrix.service.WishlistServiceImpl;
import com.flatmatrix.dto.PropertyResponseDto;
import com.flatmatrix.security.CustomUserDetails;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    private static final Logger logger = LoggerFactory.getLogger(WishlistController.class);

    private final WishlistServiceImpl wishlistService;

    public WishlistController(WishlistServiceImpl wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/add/{propertyId}")
    public ResponseEntity<String> addToWishlist(@PathVariable Long propertyId) {
        CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("User {} adding property {} to wishlist", currentUser.getUserId(), propertyId);
        String message = wishlistService.addToWishlist(propertyId, currentUser.getUserId());
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/remove/{propertyId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable Long propertyId) {
        CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("User {} removing property {} from wishlist", currentUser.getUserId(), propertyId);
        String message = wishlistService.removeFromWishlist(propertyId, currentUser.getUserId());
        return ResponseEntity.ok(message);
    }
    
    @GetMapping
    public ResponseEntity<?> getWishlist() {
        CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("Fetching wishlist for user {}", currentUser.getUserId());
        List<PropertyResponseDto> wishlistProperties = wishlistService.getWishlist(currentUser.getUserId());
        return ResponseEntity.ok(wishlistProperties);
    }
}
