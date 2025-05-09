package com.flatmatrix.service;

import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.JwtResponse;
import com.flatmatrix.dto.LoginDto;
import com.flatmatrix.dto.UserDto;
import com.flatmatrix.dto.UserDtoOnLongin;
import com.flatmatrix.dto.UserUpdateDto;
import com.flatmatrix.entities.User;

public interface UserService {

	ApiResponse newUser(UserDto userDto);
	JwtResponse authenticateUser(LoginDto request);
	ApiResponse updateUser(UserUpdateDto updateDto);
	UserDto getUser();
}
