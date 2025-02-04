package com.flatmatrix.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.flatmatrix.pojos.Property;

public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {

	List<Property> findByAddressCityAndForRentTrue(String city);

	List<Property> findByAddressCityAndForRentFalse(String city);

	 @EntityGraph(attributePaths = {"photos", "address", "user"})
	    List<Property> findAll(Specification<Property> spec);
}
