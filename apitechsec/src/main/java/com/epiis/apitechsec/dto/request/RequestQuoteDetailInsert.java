package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestQuoteDetailInsert {
	@NotNull(message = "El campo \"productId\" es requerido.")
	private Long productId;

	@NotNull(message = "El campo \"quantity\" es requerido.")
	private Integer quantity;
}
