package com.vti.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.vti.entity.Account;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomAccountSpecification implements Specification<Account> {
	
	@NonNull
	private String field;
	
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(
			Root<Account> root,
			CriteriaQuery<?> query,
			CriteriaBuilder criteriaBuilder) {
		
		if (field.equalsIgnoreCase("username")) {
			return criteriaBuilder.like(root.get("username"), "%" + value.toString() + "%"); 
		}
		return null;
	}

}
