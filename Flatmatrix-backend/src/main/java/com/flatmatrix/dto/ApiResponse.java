package com.flatmatrix.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResponse {
	private LocalDateTime timeStamp;
	private String message;

	public ApiResponse(String message) {
		super();
		this.message = message;
		this.timeStamp = LocalDateTime.now();
	}
}
