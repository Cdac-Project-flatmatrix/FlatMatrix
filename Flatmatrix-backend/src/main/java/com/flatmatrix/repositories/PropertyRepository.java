package com.flatmatrix.repositories;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.flatmatrix.entities.Property;
import com.flatmatrix.entities.Status;

public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {

	List<Property> findByUserId(Long userId);
	List<Property> findByUserIdAndStatus(Long userId, Status status);
	List<Property> findByAddressCityAndForRentTrue(String city);

	List<Property> findByAddressCityAndForRentFalse(String city);

	 @EntityGraph(attributePaths = {"photos", "address", "user"})
	    List<Property> findAll(Specification<Property> spec);
}
