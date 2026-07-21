package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestOrderUpdateStatus {
	@NotBlank(message = "El campo \"status\" es requerido.")
	private String status; // RECIBIDO, PREPARANDO_ALMACEN, LISTO_RECOJO

	private String comment;
}
