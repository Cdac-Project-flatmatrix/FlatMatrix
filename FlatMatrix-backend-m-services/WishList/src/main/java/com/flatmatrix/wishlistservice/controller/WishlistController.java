package com.flatmatrix.wishlistservice.controller;

import com.flatmatrix.wishlistservice.dto.PropertyResponseDto;
import com.flatmatrix.wishlistservice.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add/{propertyId}")
    public ResponseEntity<String> addToWishlist(@PathVariable Long propertyId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(propertyId));
    }

    @DeleteMapping("/remove/{propertyId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable Long propertyId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(propertyId));
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponseDto>> getWishlist() {
        return ResponseEntity.ok(wishlistService.getWishlist());
    }
}