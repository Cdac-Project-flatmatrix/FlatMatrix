package com.flatmatrix.userservice.dto;

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
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String phoneNumber;
    private String profilePhoto;
    private String gender;
    private String role;
}