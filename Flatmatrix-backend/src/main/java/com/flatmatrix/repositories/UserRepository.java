package com.flatmatrix.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatmatrix.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByUserName(String userName);
}
