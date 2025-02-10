package com.flatmatrix.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.entities.Enquiry;
import com.flatmatrix.entities.EnquiryStatus;
import com.flatmatrix.entities.User;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    List<Enquiry> findByPropertyUser(User seller);  
    List<Enquiry> findByBuyer(User buyer);
	List<Enquiry> findByPropertyUserAndStatus(User seller, EnquiryStatus solved);
	List<Enquiry> findByBuyerAndStatus(User buyer, EnquiryStatus solved);
}