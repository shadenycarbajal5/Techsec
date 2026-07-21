package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestTechnicianInsert {
	@NotBlank(message = "El campo \"name\" es requerido.")
	private String name;

	@NotBlank(message = "El campo \"document\" es requerido.")
	private String document;

	@NotBlank(message = "El campo \"phone\" es requerido.")
	private String phone;

	private String specialty;
}
