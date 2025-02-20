package com.flatmatrix.enquiryservice.controller;

import com.flatmatrix.enquiryservice.dto.EnquiryDto;
import com.flatmatrix.enquiryservice.dto.EnquiryResponseDto;
import com.flatmatrix.enquiryservice.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enquiries")
public class EnquiryController {
    @Autowired
    private EnquiryService enquiryService;

    @PostMapping
    public ResponseEntity<String> submitEnquiry(@RequestBody EnquiryDto enquiryDto) {
        enquiryService.submitEnquiry(enquiryDto);
        return ResponseEntity.ok("Enquiry submitted successfully");
    }

    @GetMapping("/seller")
    public ResponseEntity<List<EnquiryResponseDto>> getSellerEnquiries(@RequestParam(defaultValue = "false") boolean showSolved) {
        return ResponseEntity.ok(enquiryService.getSellerEnquiries(showSolved));
    }

    @PutMapping("/{enquiryId}/solve")
    public ResponseEntity<String> replyAndMarkEnquiryAsSolved(@PathVariable Long enquiryId, @RequestParam String reply) {
        enquiryService.replyAndMarkEnquiryAsSolved(enquiryId, reply);
        return ResponseEntity.ok("Enquiry marked as solved");
    }

    @GetMapping("/buyer")
    public ResponseEntity<List<EnquiryResponseDto>> getBuyerEnquiries(@RequestParam(defaultValue = "false") boolean showSolved) {
        return ResponseEntity.ok(enquiryService.getBuyerEnquiries(showSolved));
    }
}