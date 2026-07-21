package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessUser;
import com.epiis.apitechsec.dto.request.RequestUserInsert;
import com.epiis.apitechsec.dto.response.ResponseUserGetAll;
import com.epiis.apitechsec.dto.response.ResponseUserInsert;

@RestController
@RequestMapping("/user")
public class UserController {
	private final BusinessUser businessUser;

	public UserController(BusinessUser businessUser) {
		this.businessUser = businessUser;
	}

	@GetMapping
	public ResponseUserGetAll getAll() {
		return businessUser.getAll();
	}

	@PostMapping
	public ResponseUserInsert insert(@Valid @RequestBody RequestUserInsert request) {
		return businessUser.insert(request);
	}
}
