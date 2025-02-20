package com.flatmatrix.enquiryservice.repository;

import com.flatmatrix.enquiryservice.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    List<Enquiry> findByStatus(EnquiryStatus status);

    List<Enquiry> findByBuyerIdAndStatus(Long buyerId, EnquiryStatus status);
}