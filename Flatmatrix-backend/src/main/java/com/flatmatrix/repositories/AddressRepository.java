package com.flatmatrix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
