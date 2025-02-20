package com.flatmatrix.enquiryservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Enquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long propertyId;
    private Long buyerId;
    private String message;
    private String reply;

    @Enumerated(EnumType.STRING)
    private EnquiryStatus status;
}