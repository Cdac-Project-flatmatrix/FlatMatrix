package com.flatmatrix.service;

import java.util.Base64;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flatmatrix.custom_exception.ResourceNotFoundException;
import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.JwtResponse;
import com.flatmatrix.dto.LoginDto;
import com.flatmatrix.dto.UserDto;
import com.flatmatrix.entities.User;
import com.flatmatrix.entities.UserRole;
import com.flatmatrix.repositories.AddressRepository;
import com.flatmatrix.repositories.UserRepository;
import com.flatmatrix.security.CustomUserDetails;
import com.flatmatrix.security.JWTHelper;

@Service
@Transactional
public class UserServiceImp implements UserService {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private JWTHelper jwtHelper;

	@Autowired
	UserRepository userDao;

	@Autowired
	AddressRepository addressDao;

	@Autowired
	ModelMapper modelMapper;

	private Logger logger = LoggerFactory.getLogger(UserServiceImp.class);

	@Override
	public ApiResponse newUser(UserDto userDto) {
		User user = modelMapper.map(userDto, User.class);
		User f_user = userDao.findByEmail(user.getEmail()).orElseGet(() -> null);
		if (f_user != null) {
			throw new ResourceNotFoundException("email already exist");
		}
		f_user = userDao.findByUserName(user.getUserName()).orElse(null);
		if (f_user != null) {
			throw new ResourceNotFoundException("username already taken");
		}

		 user.setPassword(encoder.encode(user.getPassword()));
		userDao.save(user);
		return new ApiResponse("Registered successfully");
	}

	public CustomUserDetails loadCustomUserDetailsByUsername(String username) {
		User user = userDao.findByUserName(username)
				.orElseThrow(() -> new RuntimeException("User not found with username: " + username));

		return new CustomUserDetails(user.getId(), user.getUserName(), user.getPassword(), user.getRole());
	}

	public JwtResponse authenticateUser(LoginDto request) {

		authenticateWithUsernamePassword(request.getUsername(), request.getPassword());

		CustomUserDetails customUserDetails = this.loadCustomUserDetailsByUsername(request.getUsername());

		String token = jwtHelper.generateToken(customUserDetails);
		System.out.println("token");
		return JwtResponse.builder().token(token).build();
	}

	public void authenticateWithUsernamePassword(String username, String password) {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);
		try {
			authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException("Invalid Username or Password!");
		}
	}
}