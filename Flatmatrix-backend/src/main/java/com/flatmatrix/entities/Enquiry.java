package com.flatmatrix.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter 
public class Enquiry extends BaseEntity {

    @ManyToOne
    @JoinColumn(nullable = false)
    private Property property; 

    @ManyToOne
    @JoinColumn(nullable = false)
    private User buyer;

    private String message;

    @Enumerated(EnumType.STRING)
    private EnquiryStatus status; 
    private boolean isRead; 
}
