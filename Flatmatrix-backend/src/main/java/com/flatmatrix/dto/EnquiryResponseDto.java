package com.flatmatrix.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnquiryResponseDto {
    private Long id;
    private Long propertyId;
    private String buyerName;
    private String message;
    private String reply;
    private String status;
}

