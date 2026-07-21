package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUserLogin {
	@NotBlank(message = "El campo \"username\" es requerido.")
	private String username;

	@NotBlank(message = "El campo \"password\" es requerido.")
	private String password;
}
