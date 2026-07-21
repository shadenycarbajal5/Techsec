package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUserRefresh {
	@NotBlank(message = "El campo \"refresh_token\" es requerido.")
	private String refresh_token;
}
