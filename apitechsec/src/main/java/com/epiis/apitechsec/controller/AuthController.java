package com.epiis.apitechsec.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.epiis.apitechsec.business.BusinessUser;
import com.epiis.apitechsec.dto.request.RequestUserInsert;
import com.epiis.apitechsec.dto.request.RequestUserLogin;
import com.epiis.apitechsec.dto.request.RequestUserRefresh;
import com.epiis.apitechsec.dto.response.ResponseUserInsert;
import com.epiis.apitechsec.dto.response.ResponseUserLogin;
import com.epiis.apitechsec.dto.response.ResponseUserRefresh;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private final BusinessUser businessUser;

	public AuthController(BusinessUser businessUser) {
		this.businessUser = businessUser;
	}

	@PostMapping("/login")
	public ResponseUserLogin login(@Valid @RequestBody RequestUserLogin request) {
		return businessUser.login(request);
	}

	@PostMapping("/refresh")
	public ResponseUserRefresh refresh(@Valid @RequestBody RequestUserRefresh request) {
		return businessUser.refresh(request);
	}

	@PostMapping("/register")
	public ResponseUserInsert register(@Valid @RequestBody RequestUserInsert request) {
		return businessUser.insert(request);
	}
}
