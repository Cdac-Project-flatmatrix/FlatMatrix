package com.flatmatrix.propertyservice.controller;

import com.flatmatrix.propertyservice.dto.PropertyReqDto;
import com.flatmatrix.propertyservice.dto.PropertyResponseDto;
import com.flatmatrix.propertyservice.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @PostMapping
    public ResponseEntity<?> addProperty(@RequestBody PropertyReqDto propertyDto) {
        return ResponseEntity.ok(propertyService.addProperty(propertyDto));
    }

    @GetMapping("/my")
    public ResponseEntity<List<PropertyResponseDto>> getMyProperties(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(propertyService.getPropertiesByUserIdAndStatus(status));
    }

    @PostMapping("/{propertyId}")
    public ResponseEntity<?> updateProperty(@PathVariable Long propertyId, @RequestBody PropertyResponseDto propertyDto) {
        return ResponseEntity.ok(propertyService.updateProperty(propertyId, propertyDto));
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long propertyId) {
        return ResponseEntity.ok(propertyService.deleteProperty(propertyId));
    }

    @PostMapping("/{propertyId}/upload-photo")
    public ResponseEntity<?> uploadPhoto(@PathVariable Long propertyId, @RequestBody PropertyResponseDto photoDto) {
        return ResponseEntity.ok(propertyService.uploadPhoto(propertyId, photoDto));
    }
}