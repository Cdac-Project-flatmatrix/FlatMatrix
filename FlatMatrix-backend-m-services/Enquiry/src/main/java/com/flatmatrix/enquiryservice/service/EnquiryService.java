package com.flatmatrix.enquiryservice.service;

import com.flatmatrix.enquiryservice.client.UserClient;
import com.flatmatrix.enquiryservice.client.PropertyClient;
import com.flatmatrix.enquiryservice.dto.EnquiryDto;
import com.flatmatrix.enquiryservice.dto.EnquiryResponseDto;
import com.flatmatrix.enquiryservice.entity.Enquiry;
import com.flatmatrix.enquiryservice.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnquiryService {
    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private PropertyClient propertyClient;

    public void submitEnquiry(EnquiryDto enquiryDto) {
        Enquiry enquiry = new Enquiry();
        enquiry.setPropertyId(enquiryDto.getPropertyId());
        enquiry.setBuyerId(enquiryDto.getBuyerId());
        enquiry.setMessage(enquiryDto.getMessage());
        enquiry.setStatus(EnquiryStatus.PENDING);
        enquiryRepository.save(enquiry);
    }

    public List<EnquiryResponseDto> getSellerEnquiries(boolean showSolved) {
        List<Enquiry> enquiries = enquiryRepository.findByStatus(showSolved ? EnquiryStatus.SOLVED : EnquiryStatus.PENDING);
        return enquiries.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public void replyAndMarkEnquiryAsSolved(Long enquiryId, String reply) {
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));
        enquiry.setReply(reply);
        enquiry.setStatus(EnquiryStatus.SOLVED);
        enquiryRepository.save(enquiry);
    }

    public List<EnquiryResponseDto> getBuyerEnquiries(boolean showSolved) {
        List<Enquiry> enquiries = enquiryRepository.findByBuyerIdAndStatus(showSolved ? EnquiryStatus.SOLVED : EnquiryStatus.PENDING);
        return enquiries.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private EnquiryResponseDto convertToDto(Enquiry enquiry) {
        EnquiryResponseDto dto = new EnquiryResponseDto();
        dto.setId(enquiry.getId());
        dto.setPropertyId(enquiry.getPropertyId());
        dto.setBuyerName(userClient.getUserById(enquiry.getBuyerId()).getUserName());
        dto.setMessage(enquiry.getMessage());
        dto.setReply(enquiry.getReply());
        dto.setStatus(enquiry.getStatus().toString());
        return dto;
    }
}