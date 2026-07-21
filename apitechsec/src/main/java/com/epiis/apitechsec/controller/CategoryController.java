package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessCategory;
import com.epiis.apitechsec.dto.request.RequestCategoryInsert;
import com.epiis.apitechsec.dto.response.ResponseCategoryGetAll;
import com.epiis.apitechsec.dto.response.ResponseCategoryInsert;

@RestController
@RequestMapping("/category")
public class CategoryController {
	private final BusinessCategory businessCategory;

	public CategoryController(BusinessCategory businessCategory) {
		this.businessCategory = businessCategory;
	}

	@GetMapping
	public ResponseCategoryGetAll getAll() {
		return businessCategory.getAll();
	}

	@PostMapping
	public ResponseCategoryInsert insert(@Valid @RequestBody RequestCategoryInsert request) {
		return businessCategory.insert(request);
	}
}
