package com.flatmatrix.enquiryservice.client;

import com.flatmatrix.enquiryservice.dto.PropertyResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "property-service")
public interface PropertyClient {

    @GetMapping("/properties/{id}")
    PropertyResponseDto getPropertyById(@PathVariable("id") Long id);
}