package com.flatmatrix.dto;

import com.flatmatrix.entities.Address;
import com.flatmatrix.entities.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserDto {
	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	@Pattern(
		regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
        message = "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
	private String password;
	private Long phoneNumber;
	private String profilePhotoUrl;
	private String gender;
	private boolean status;
	private AddressDto address;
	private UserRole role;

}
