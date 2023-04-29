package com.vti.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.entity.Account;
import com.vti.entity.Department;
import com.vti.form.AccountFilterForm;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import utils.Utils;


public class AccountSpecification {

	@SuppressWarnings("deprecation")
	public static Specification<Account> buildWhere(String search) {

	if (StringUtils.isEmpty(search)) {
		return null;
	}
	
	search = search.trim();
	
	CustomAccountSpecification name = new CustomAccountSpecification("username", search);
	
	return Specification.where(name);
	}
}