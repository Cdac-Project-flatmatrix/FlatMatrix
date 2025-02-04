package com.flatmatrix.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.flatmatrix.pojos.UserRole;

public class CustomUserDetails implements UserDetails {

	private Long userId;
	private String username;
	private String password;
	private UserRole role;

	public CustomUserDetails(Long userId, String username, String password, UserRole role) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.role = role;
		System.out.println("Creating Custom User details");
	}

	public Long getUserId() {
		return userId;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
