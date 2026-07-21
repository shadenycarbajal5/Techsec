package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessTechnician;
import com.epiis.apitechsec.dto.request.RequestTechnicianInsert;
import com.epiis.apitechsec.dto.response.ResponseTechnicianGetAll;
import com.epiis.apitechsec.dto.response.ResponseTechnicianInsert;

@RestController
@RequestMapping("/technician")
public class TechnicianController {
	private final BusinessTechnician businessTechnician;

	public TechnicianController(BusinessTechnician businessTechnician) {
		this.businessTechnician = businessTechnician;
	}

	@GetMapping
	public ResponseTechnicianGetAll getAll() {
		return businessTechnician.getAll();
	}

	@PostMapping
	public ResponseTechnicianInsert insert(@Valid @RequestBody RequestTechnicianInsert request) {
		return businessTechnician.insert(request);
	}
}
