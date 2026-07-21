package com.epiis.apitechsec.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.epiis.apitechsec.business.BusinessAppointment;
import com.epiis.apitechsec.dto.request.RequestAppointmentInsert;
import com.epiis.apitechsec.dto.request.RequestAppointmentUpdateStatus;
import com.epiis.apitechsec.dto.response.ResponseAppointmentGetAll;
import com.epiis.apitechsec.dto.response.ResponseAppointmentGetAvailability;
import com.epiis.apitechsec.dto.response.ResponseAppointmentInsert;
import com.epiis.apitechsec.dto.response.ResponseAppointmentUpdateStatus;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
	private final BusinessAppointment businessAppointment;

	public AppointmentController(BusinessAppointment businessAppointment) {
		this.businessAppointment = businessAppointment;
	}

	@GetMapping
	public ResponseAppointmentGetAll getAll() {
		return businessAppointment.getAll();
	}

	@GetMapping("/availability")
	public ResponseAppointmentGetAvailability getAvailability(@RequestParam String date) {
		return businessAppointment.getAvailability(date);
	}

	@PostMapping
	public ResponseAppointmentInsert insert(@Valid @RequestBody RequestAppointmentInsert request) {
		return businessAppointment.insert(request);
	}

	@PatchMapping("/{id}/status")
	public ResponseAppointmentUpdateStatus updateStatus(@PathVariable Long id, @Valid @RequestBody RequestAppointmentUpdateStatus request) {
		return businessAppointment.updateStatus(id, request);
	}
}
