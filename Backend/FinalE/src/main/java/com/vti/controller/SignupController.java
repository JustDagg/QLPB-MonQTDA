package com.vti.controller;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.SignupDTO;
import com.vti.entity.Account;
import com.vti.repository.IAccountRepository;
import com.vti.service.IAccountService;

@RestController
@RequestMapping(value = "api/v1/signup")
@CrossOrigin("*")
public class SignupController {
	
	@Autowired
	private IAccountRepository acRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private IAccountService service;
	
	@PostMapping("") 
	@Transactional
	public ResponseEntity<?> registerUser(@RequestBody SignupDTO signupDTO) {
		System.out.println(signupDTO.toString());
		if (acRepository.existsByUsername(signupDTO.getUsername())) {
			return ResponseEntity.badRequest().body("Error: Username is already taken!");
		}
		
		Account ac = modelMapper.map(signupDTO, Account.class);
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String enCryptPassword = passwordEncoder.encode(signupDTO.getPassword());
		ac.setPassword(enCryptPassword);
		
		//acRepository.save(ac);
		
		service.addNewAccount(ac);//Send mail active
		
		return ResponseEntity.ok().body("User registered successfully!");
	}
}
