package com.flatmatrix.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class PropertyPhotos extends BaseEntity{
	@ManyToOne
	private Property property;
	private String url;
	
	
}
