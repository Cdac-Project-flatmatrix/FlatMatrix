package com.flatmatrix.propertyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class PropertyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyApplication.class, args);
	}

}
