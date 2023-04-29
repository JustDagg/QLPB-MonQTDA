package com.vti.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountDto {


	private String username;

	private short id;

	private String fullName;
	
	private String firstName;
	
	private String lastName;
	
	private String role;
	
	private String avatarUrl;
	

	public AccountDto(short id, String fullName) {
		super();
		this.id = id;
		this.fullName = fullName;
	}

	


}
