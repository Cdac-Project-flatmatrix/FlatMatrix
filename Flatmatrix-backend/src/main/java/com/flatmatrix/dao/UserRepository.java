package com.flatmatrix.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.pojos.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByUserName(String userName);
}
