package com.flatmatrix.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.pojos.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
