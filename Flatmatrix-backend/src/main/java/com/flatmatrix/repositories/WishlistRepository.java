package com.flatmatrix.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.entities.Property;
import com.flatmatrix.entities.User;
import com.flatmatrix.entities.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByUserAndProperty(User user, Property property);
    List<Wishlist> findByUser(User user);
}
