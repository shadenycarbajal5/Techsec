package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestAppointmentUpdateStatus {
	@NotBlank(message = "El campo \"status\" es requerido.")
	private String status;

	private Long technicianId;

	private String comment;
}
