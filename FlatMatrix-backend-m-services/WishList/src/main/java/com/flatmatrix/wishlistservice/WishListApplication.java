package com.flatmatrix.wishlistservice;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class WishListApplication {

	public static void main(String[] args) {
		SpringApplication.run(WishListApplication.class, args);
	}

}
