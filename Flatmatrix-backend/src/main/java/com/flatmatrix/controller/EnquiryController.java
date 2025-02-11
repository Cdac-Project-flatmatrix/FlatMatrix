package com.flatmatrix.controller;

import com.flatmatrix.dto.EnquiryDto;
import com.flatmatrix.dto.EnquiryResponseDto;
import com.flatmatrix.security.CustomUserDetails;
import com.flatmatrix.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enquiries")
@CrossOrigin(origins = "http://localhost:3000")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    @PostMapping
//    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<String> submitEnquiry(@RequestBody EnquiryDto enquiryDto,
                                                @AuthenticationPrincipal CustomUserDetails currentUser) {
    	
        enquiryService.submitEnquiry(enquiryDto, currentUser);
        return ResponseEntity.ok("Enquiry submitted successfully");
    }

    @GetMapping("/seller")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<EnquiryResponseDto>> getSellerEnquiries(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @RequestParam(defaultValue = "false") boolean showSolved) {
    	 System.out.println("Received showSolved: " + showSolved); 
        return ResponseEntity.ok(enquiryService.getSellerEnquiries(currentUser, showSolved));
    }

    @PutMapping("/{enquiryId}/solve")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> replyAndMarkEnquiryAsSolved(
            @PathVariable Long enquiryId,
            @RequestParam String reply,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        enquiryService.replyAndMarkEnquiryAsSolved(enquiryId, reply, currentUser);
        return ResponseEntity.ok("Enquiry marked as solved");
    }

    @GetMapping("/buyer")
//    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<List<EnquiryResponseDto>> getBuyerEnquiries(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @RequestParam(defaultValue = "false") boolean showSolved) {
        return ResponseEntity.ok(enquiryService.getBuyerEnquiries(currentUser, showSolved));
    }
}
