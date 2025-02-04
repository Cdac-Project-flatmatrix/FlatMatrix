package com.flatmatrix.controller;

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
@RequestMapping("/property")
public class PropertyController {

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

	@PostMapping("/list")
	public ResponseEntity<?> getProperty(@RequestBody GetPropertyDto dto) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(propertyService.getProperty(dto));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

}
