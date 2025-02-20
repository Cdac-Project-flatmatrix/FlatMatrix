package com.flatmatrix.wishlistservice.service;

import com.flatmatrix.wishlistservice.client.PropertyClient;
import com.flatmatrix.wishlistservice.dto.PropertyResponseDto;
import com.flatmatrix.wishlistservice.entity.Wishlist;
import com.flatmatrix.wishlistservice.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private PropertyClient propertyClient;

    public String addToWishlist(Long propertyId) {
        Wishlist wishlist = new Wishlist();
        wishlist.setPropertyId(propertyId);
        wishlistRepository.save(wishlist);
        return "Property added to wishlist";
    }

    public String removeFromWishlist(Long propertyId) {
        wishlistRepository.deleteByPropertyId(propertyId);
        return "Property removed from wishlist";
    }

    public List<PropertyResponseDto> getWishlist() {
        List<Wishlist> wishlists = wishlistRepository.findAll();
        return wishlists.stream()
                .map(wishlist -> propertyClient.getPropertyById(wishlist.getPropertyId()))
                .collect(Collectors.toList());
    }
}