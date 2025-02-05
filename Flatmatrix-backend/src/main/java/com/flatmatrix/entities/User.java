package com.flatmatrix.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

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
//    @Pattern(
//        regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
//        message = "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
//    )
	private String password;
	@Column(name = "phone_number", length = 10, nullable = false)
	
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
	private String phoneNumber;
	
	@NotBlank(message = "Photo not uploaded")
	@Column(name = "profile_photo_url", length = 50)
	private String profilePhotoUrl;
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
