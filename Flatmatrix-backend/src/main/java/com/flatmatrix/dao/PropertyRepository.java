package com.flatmatrix.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.pojos.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {

	List<Property> findByAddressCityAndForRentTrue(String city);

	List<Property> findByAddressCityAndForRentFalse(String city);

}
