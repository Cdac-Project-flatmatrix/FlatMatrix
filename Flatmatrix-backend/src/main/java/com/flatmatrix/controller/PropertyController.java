package com.flatmatrix.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.GetPropertyDto;
import com.flatmatrix.dto.PropertyPhotosDto;
import com.flatmatrix.dto.PropertyReqDto;
import com.flatmatrix.dto.PropertyResponseDto;
import com.flatmatrix.security.CustomUserDetails;
import com.flatmatrix.service.PropertyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {

	private final static Logger logger = LoggerFactory.getLogger(PropertyController.class);
	@Autowired
	private PropertyService propertyService;

	@PostMapping
	public ResponseEntity<?> addProperty(@RequestBody @Valid PropertyReqDto propertyDto) {
		try {
			CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return ResponseEntity.status(HttpStatus.OK).body(propertyService.addProperty(propertyDto, currentUser));
		} catch (RuntimeException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/filtered-properties")
	public ResponseEntity<?> getFilteredProperty(@RequestBody GetPropertyDto dto) {
		try {
			logger.info("Filter property");
			return ResponseEntity.status(HttpStatus.OK).body(propertyService.getFilteredProperties(dto));
		} catch (RuntimeException e) {
			logger.info("Error to fetch");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@PreAuthorize("hasRole('SELLER')")
	@GetMapping("/my")
    public ResponseEntity<List<PropertyResponseDto>> getMyProperties(@RequestParam(required = false) String status) {
        CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("Fetching properties for logged-in seller with ID: {} and status: {}", currentUser.getUserId(), status);
        List<PropertyResponseDto> myProperties = propertyService.getPropertiesByUserIdAndStatus(currentUser.getUserId(), status);
        return ResponseEntity.ok(myProperties);
    }
	
    @PostMapping("/{propertyId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ApiResponse> updateProperty(
            @PathVariable Long propertyId, 
            @RequestBody PropertyResponseDto propertyDto,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
    	System.out.println(propertyDto);
        ApiResponse response = propertyService.updateProperty(propertyId, propertyDto, currentUser);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{propertyId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ApiResponse> deleteProperty(
            @PathVariable Long propertyId, 
            @AuthenticationPrincipal CustomUserDetails currentUser) {

        ApiResponse response = propertyService.deleteProperty(propertyId, currentUser);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/{propertyId}/upload-photo")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ApiResponse> uploadPhoto(
            @PathVariable Long propertyId,
            @RequestBody PropertyPhotosDto photoDto,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.ok(propertyService.uploadPhoto(propertyId, photoDto, currentUser));
    }
}
