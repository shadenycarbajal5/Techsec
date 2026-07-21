package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCategoryInsert {
	@NotBlank(message = "El campo \"name\" es requerido.")
	private String name;

	private String description;
}
