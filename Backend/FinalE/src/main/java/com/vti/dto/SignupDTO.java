package com.vti.dto;



import com.vti.entity.Department;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SignupDTO {
	private String username;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String password;
	
	private String role;
}
