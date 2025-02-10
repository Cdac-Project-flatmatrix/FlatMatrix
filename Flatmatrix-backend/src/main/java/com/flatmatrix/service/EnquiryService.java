package com.flatmatrix.service;

import com.flatmatrix.dto.EnquiryDto;
import com.flatmatrix.dto.EnquiryResponseDto;
import com.flatmatrix.security.CustomUserDetails;
import java.util.List;

public interface EnquiryService {

    void submitEnquiry(EnquiryDto enquiryDto, CustomUserDetails currentUser);

    List<EnquiryResponseDto> getSellerEnquiries(CustomUserDetails currentUser, boolean showSolved);

    void replyAndMarkEnquiryAsSolved(Long enquiryId, String reply, CustomUserDetails currentUser);

    List<EnquiryResponseDto> getBuyerEnquiries(CustomUserDetails currentUser, boolean showSolved);
}
