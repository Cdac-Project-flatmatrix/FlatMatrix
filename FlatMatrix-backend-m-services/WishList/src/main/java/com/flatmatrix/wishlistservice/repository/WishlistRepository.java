package com.flatmatrix.wishlistservice.repository;

import com.flatmatrix.wishlistservice.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    void deleteByPropertyId(Long propertyId);
}