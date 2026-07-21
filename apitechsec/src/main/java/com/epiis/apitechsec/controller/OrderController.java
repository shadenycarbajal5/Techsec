package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessOrder;
import com.epiis.apitechsec.dto.request.RequestOrderInsert;
import com.epiis.apitechsec.dto.request.RequestOrderUpdateStatus;
import com.epiis.apitechsec.dto.response.ResponseOrderGetAll;
import com.epiis.apitechsec.dto.response.ResponseOrderInsert;
import com.epiis.apitechsec.dto.response.ResponseOrderUpdateStatus;

@RestController
@RequestMapping("/order")
public class OrderController {
	private final BusinessOrder businessOrder;

	public OrderController(BusinessOrder businessOrder) {
		this.businessOrder = businessOrder;
	}

	@GetMapping
	public ResponseOrderGetAll getAll() {
		return businessOrder.getAll();
	}

	@PostMapping
	public ResponseOrderInsert insert(@Valid @RequestBody RequestOrderInsert request) {
		return businessOrder.insert(request);
	}

	@PatchMapping("/{id}/status")
	public ResponseOrderUpdateStatus updateStatus(@PathVariable Long id, @Valid @RequestBody RequestOrderUpdateStatus request) {
		return businessOrder.updateStatus(id, request);
	}
}
