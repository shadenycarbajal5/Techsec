package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUserInsert {
	@NotBlank(message = "El campo \"username\" es requerido.")
	private String username;

	@NotBlank(message = "El campo \"password\" es requerido.")
	private String password;

	@NotBlank(message = "El campo \"name\" es requerido.")
	private String name;

	private String document;
	private String phone;
	private String address;
}
