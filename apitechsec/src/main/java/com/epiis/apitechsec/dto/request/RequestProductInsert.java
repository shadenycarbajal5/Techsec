package com.epiis.apitechsec.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestProductInsert {
	@NotBlank(message = "El campo \"name\" es requerido.")
	private String name;

	@NotNull(message = "El campo \"categoryId\" es requerido.")
	private Long categoryId;

	private String description;
	private String specifications;

	@NotNull(message = "El campo \"price\" es requerido.")
	private BigDecimal price;

	@NotNull(message = "El campo \"stock\" es requerido.")
	private Integer stock;

	private Integer minStockAlert;
}
