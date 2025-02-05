package com.flatmatrix.controller;

import com.flatmatrix.service.WishlistService;
import com.flatmatrix.security.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private static final Logger logger = LoggerFactory.getLogger(WishlistController.class);

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
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
}
