package com.flatmatrix.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@NoArgsConstructor
@ToString(callSuper = true)
public class User extends BaseEntity {
	@Column(name = "first_name", length = 30, nullable = false)
	private String firstName;
	@Column(name = "last_name", length = 30, nullable = false)
	private String lastName;
	@Column(name = "username", length = 30, nullable = false, unique = true)
	private String userName;
	@Column(name = "email", length = 30, nullable = false, unique = true)
	@Email
	private String email;
	@Column(name = "password", nullable = false)
	@NotBlank(message = "Password cannot be empty")
	private String password;
	@Column(name = "phone_number", length = 10, nullable = false)
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
	private String phoneNumber;
	@Column(name = "profile_photo_url", length = 500)
	private String profilePhoto;
	@Column(length = 10)
	private String gender;
	private boolean status;
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(nullable = false)
	private Address address;
	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private UserRole role;
}
