package com.flatmatrix.service;

import java.util.List;

import com.flatmatrix.dto.EnquiryDto;
import com.flatmatrix.security.CustomUserDetails;

public interface EnquiryService {

	void submitEnquiry(EnquiryDto enquiryDto, CustomUserDetails currentUser);

	List<EnquiryDto> getSellerEnquiries(CustomUserDetails currentUser);

	void markEnquiryAsSolved(Long enquiryId, CustomUserDetails currentUser);

}
