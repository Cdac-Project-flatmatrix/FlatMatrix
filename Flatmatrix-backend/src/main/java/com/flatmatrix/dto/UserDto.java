package com.flatmatrix.dto;

import com.flatmatrix.entities.UserRole;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDto {
	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	@Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character")
	private String password;
	private Long phoneNumber;
	private String gender;
	private String profilePhoto;
	private boolean status;
	private AddressDto address;

	private UserRole role;

}
