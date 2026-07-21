package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessProduct;
import com.epiis.apitechsec.dto.request.RequestProductInsert;
import com.epiis.apitechsec.dto.response.ResponseProductGetAll;
import com.epiis.apitechsec.dto.response.ResponseProductInsert;

@RestController
@RequestMapping("/product")
public class ProductController {
	private final BusinessProduct businessProduct;

	public ProductController(BusinessProduct businessProduct) {
		this.businessProduct = businessProduct;
	}

	@GetMapping
	public ResponseProductGetAll getAll() {
		return businessProduct.getAll();
	}

	@PostMapping
	public ResponseProductInsert insert(@Valid @RequestBody RequestProductInsert request) {
		return businessProduct.insert(request);
	}
}
