package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessQuote;
import com.epiis.apitechsec.dto.request.RequestQuoteInsert;
import com.epiis.apitechsec.dto.request.RequestQuoteUpdateStatus;
import com.epiis.apitechsec.dto.response.ResponseQuoteGetAll;
import com.epiis.apitechsec.dto.response.ResponseQuoteInsert;
import com.epiis.apitechsec.dto.response.ResponseQuoteUpdateStatus;

@RestController
@RequestMapping("/quote")
public class QuoteController {
	private final BusinessQuote businessQuote;

	public QuoteController(BusinessQuote businessQuote) {
		this.businessQuote = businessQuote;
	}

	@GetMapping
	public ResponseQuoteGetAll getAll() {
		return businessQuote.getAll();
	}

	@PostMapping
	public ResponseQuoteInsert insert(@Valid @RequestBody RequestQuoteInsert request) {
		return businessQuote.insert(request);
	}

	@PatchMapping("/{id}/status")
	public ResponseQuoteUpdateStatus updateStatus(@PathVariable Long id, @Valid @RequestBody RequestQuoteUpdateStatus request) {
		return businessQuote.updateStatus(id, request);
	}
}
