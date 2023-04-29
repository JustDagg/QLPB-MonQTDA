package com.vti.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.dto.AccountDto;
import com.vti.dto.SignupDTO;
import com.vti.entity.Account;
import com.vti.entity.Department;
import com.vti.form.AccountFilterForm;
import com.vti.form.AccountFormForCreating;
import com.vti.repository.IAccountRepository;
import com.vti.specification.AccountSpecification;
import com.vti.specification.DepartmentSpecification;

@Service
public class AccountService implements IAccountService {
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private IAccountRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Account account = repository.findByUsername(username);
				
		if (account == null) {
			throw new UsernameNotFoundException(username);
		}
		
		return new User(
				account.getUsername(), 
				account.getPassword(), 
				AuthorityUtils.createAuthorityList(account.getRole()));
	}
	
	@Override
	public Account getAccountByUsername(String username) {
		return repository.findByUsername(username);
	}
	

	@Override
	public void deleteAccount(int id) {
		repository.deleteById((short) id);
		
	}
	
	@Override
	public boolean isAccountExistsByUserName(String username) {
		return repository.existsByUsername(username);
	}

	@Override
	public void deleteAccounts(List<Integer> ids) {
		repository.deleteByIds(ids);	
		
	}

	@Override
	public void createAccount(AccountFormForCreating form) {
		TypeMap<AccountFormForCreating, Account> typeMap = modelMapper.getTypeMap(AccountFormForCreating.class, Account.class);
		if (typeMap == null) { // if not already added
			// skip field
			modelMapper.addMappings(new PropertyMap<AccountFormForCreating, Account>() {
				protected void configure() {
					skip(destination.getId());
				}
			});
		}

		// convert form to entity
		Account account = modelMapper.map(form, Account.class);

		repository.save(account);
		
		
	}

	@Override
	public Page<Account> getAllAccounts(Pageable pageable, String search) {
		
		Specification<Account> where = AccountSpecification.buildWhere(search);
		return repository.findAll(where, pageable);
	}


	@Override
	public void addNewAccount(Account account) {
		Account ac = modelMapper.map(account, Account.class);
		Account acc = repository.save(ac);
		System.out.println("account save: ");
		System.out.println(account);		
		
	}

}
