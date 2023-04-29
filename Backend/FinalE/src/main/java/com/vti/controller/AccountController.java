package com.vti.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.AccountDto;
import com.vti.entity.Account;
import com.vti.form.AccountFilterForm;
import com.vti.form.AccountFormForCreating;
import com.vti.service.IAccountService;

@RestController
@RequestMapping(value = "api/v1/accounts")
@CrossOrigin("*")
public class AccountController {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private IAccountService service;

	@GetMapping()
	public Page<AccountDto> getAllAccounts(
			Pageable pageable, 
			@RequestParam(required = false) String search) {

		Page<Account> entityPages = service.getAllAccounts(pageable, search);

		// convert entities --> dtos
		List<AccountDto> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<AccountDto>>() {
		}.getType());

		Page<AccountDto> dtoPages = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());

		return dtoPages;

	}
	
	@PostMapping()
	public void createAccount(@RequestBody AccountFormForCreating form) {
		service.createAccount(form);
	}
	
	@GetMapping(value = "/username/{username}/exists")
	public boolean existsByName(@PathVariable(name = "username") String username) {
		return service.isAccountExistsByUserName(username);
	}
	
	@DeleteMapping(value = "/{id}")
	public void deleteAccount(@PathVariable(name = "id") int id) {
		service.deleteAccount(id);
	}
	
	@DeleteMapping
	public ResponseEntity<?> deleteAccounts(@RequestParam(name = "ids") List<Integer> ids) {
		service.deleteAccounts(ids);
		return new ResponseEntity<String>("Delete accounts successfully!", HttpStatus.OK);
	}
}
