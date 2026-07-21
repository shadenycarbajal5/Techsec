package com.epiis.apitechsec.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestOrderInsert {
	@NotNull(message = "El campo \"clientId\" es requerido.")
	private Long clientId;

	private Long quoteId;

	@NotEmpty(message = "Debe incluir al menos un producto en \"details\".")
	@Valid
	private List<RequestOrderDetailInsert> details;

	@NotBlank(message = "El campo \"shippingAddress\" es requerido.")
	private String shippingAddress;
}
