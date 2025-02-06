package com.flatmatrix.controller;

import com.flatmatrix.dto.EnquiryDto;
import com.flatmatrix.security.CustomUserDetails;
import com.flatmatrix.service.EnquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
//    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<String> submitEnquiry(@RequestBody EnquiryDto enquiryDto,
                                                @AuthenticationPrincipal CustomUserDetails currentUser) {
        enquiryService.submitEnquiry(enquiryDto, currentUser);
        return ResponseEntity.ok("Enquiry submitted successfully");
    }

    @GetMapping("/seller")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<EnquiryDto>> getSellerEnquiries(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.ok(enquiryService.getSellerEnquiries(currentUser));
    }

    @PutMapping("/{enquiryId}/solve")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> markEnquiryAsSolved(@PathVariable Long enquiryId, @AuthenticationPrincipal CustomUserDetails currentUser) {
        enquiryService.markEnquiryAsSolved(enquiryId, currentUser);
        return ResponseEntity.ok("Enquiry marked as solved");
    }
}

