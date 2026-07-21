package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessContract;
import com.epiis.apitechsec.dto.request.RequestContractInsert;
import com.epiis.apitechsec.dto.response.ResponseContractGetAll;
import com.epiis.apitechsec.dto.response.ResponseContractInsert;

@RestController
@RequestMapping("/contract")
public class ContractController {
	private final BusinessContract businessContract;

	public ContractController(BusinessContract businessContract) {
		this.businessContract = businessContract;
	}

	@GetMapping
	public ResponseContractGetAll getAll() {
		return businessContract.getAll();
	}

	@PostMapping
	public ResponseContractInsert insert(@Valid @RequestBody RequestContractInsert request) {
		return businessContract.insert(request);
	}
}
