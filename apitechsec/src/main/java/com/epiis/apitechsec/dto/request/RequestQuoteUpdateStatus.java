package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestQuoteUpdateStatus {
	@NotBlank(message = "El campo \"status\" es requerido.")
	private String status; // PENDIENTE, ACEPTADA, RECHAZADA
}
