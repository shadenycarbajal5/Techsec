package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestContractInsert {
	@NotNull(message = "El campo \"appointmentId\" es requerido.")
	private Long appointmentId;
}
