package com.flatmatrix.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;

import com.flatmatrix.entities.Furnished;
import com.flatmatrix.entities.Property;
import com.flatmatrix.entities.Status;
import com.flatmatrix.entities.Type;
import com.flatmatrix.security.CustomUserDetails;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class PropertySpecification {

	public static Specification<Property> filterProperties(
            boolean forRent, String city, Integer bedRooms, Type type, Furnished furnished, Double minPrice, Double maxPrice) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(criteriaBuilder.equal(root.get("forRent"), forRent));

            if (city != null && !city.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("address").get("city"), city));
            }

            if (bedRooms != null && bedRooms > 0) {
                predicates.add(criteriaBuilder.equal(root.get("bedRooms"), bedRooms));
            }

            if (type != null) {
                predicates.add(criteriaBuilder.equal(root.get("type"), type));
            }

            if (furnished != null) {
                predicates.add(criteriaBuilder.equal(root.get("furnished"), furnished));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            predicates.add(criteriaBuilder.equal(root.get("status"), Status.AVAILABLE));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

