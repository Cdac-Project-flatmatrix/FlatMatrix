package com.flatmatrix.dto;

import com.flatmatrix.entities.UserRole;

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
public class UserDtoOnLongin {
	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	private String password;
	private long phoneNumber;
	private String profilePhotoUrl;
	private String gender;
	private AddressDto address;
	private UserRole role;
}

//	  "firstName": "Snehal",
//	  "lastName": "Patil",
//	  "userName": "sonu",
//	  "email": "sonu@gmail.com",
//	  "password": "ss",
//	  "phoneNumber": 54740991,
//	  "profilePhotoUrl": "string",
//	  "gender": "female",
//	  "status": true,
//	
//	    "street": "string",
//	    "city": "string",
//	    "state": "string",
//	    "country": "string",
//	    "pinCode": 1073741824,
//	    "longitude": 0.1,
//	    "latitude": 0.1
//	  },
//	  "role": "SELLER"
//	}
