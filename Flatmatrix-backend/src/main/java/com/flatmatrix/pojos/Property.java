package com.flatmatrix.pojos;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class Property extends BaseEntity {
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(nullable = false)
	private Address address;
	@Column(nullable = false)
	private double price;
	private int size;
	
	@Max(value = 4, message = "Value must be at most 10 digits long")
	private int bedRooms;
	@Column(length = 20)
	@Enumerated(EnumType.STRING)
	private Type type;
	private boolean forRent;
	@Enumerated(EnumType.STRING) 
	private Status status;
	@Enumerated(EnumType.STRING)
	@Column(length=20)
	private Furnished furnished;
	@Column(length = 200)
	private String descrption;
	@ManyToOne
	private User user;
	
	@OneToMany(mappedBy="property", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PropertyPhotos> photos = new ArrayList<>();
	
	public void setPhoto(PropertyPhotos photo) {
		photos.add(photo);
		photo.setProperty(this);
	}
}
