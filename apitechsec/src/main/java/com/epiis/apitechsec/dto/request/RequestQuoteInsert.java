package com.epiis.apitechsec.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestQuoteInsert {
	@NotNull(message = "El campo \"clientId\" es requerido.")
	private Long clientId;

	@NotEmpty(message = "Debe incluir al menos un producto en \"details\".")
	@Valid
	private List<RequestQuoteDetailInsert> details;

	private String notes;
}
