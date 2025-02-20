package com.flatmatrix.enquiryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class EnquiryApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnquiryApplication.class, args);
	}

}
