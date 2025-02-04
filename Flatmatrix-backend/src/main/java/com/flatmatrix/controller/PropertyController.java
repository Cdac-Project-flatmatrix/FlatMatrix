package com.flatmatrix.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.GetPropertyDto;
import com.flatmatrix.dto.PropertyReqDto;
import com.flatmatrix.service.PropertyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/properties")
public class PropertyController {

	private final static Logger logger = LoggerFactory.getLogger(PropertyController.class);
	@Autowired
	private PropertyService propertyService;

	@PostMapping
	public ResponseEntity<?> addProperty(@RequestBody @Valid PropertyReqDto propertyDto) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(propertyService.addProperty(propertyDto));
		} catch (RuntimeException e) {
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

}
