package com.flatmatrix.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserUpdateDto {
	private String firstName;
	private String lastName;
	private String password;
	private String phoneNumber;
	private String profilePhoto;
	private AddressDto address;
}
