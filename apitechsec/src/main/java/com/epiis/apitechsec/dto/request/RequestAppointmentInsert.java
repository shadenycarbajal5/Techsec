package com.epiis.apitechsec.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestAppointmentInsert {
	@NotNull(message = "El campo \"clientId\" es requerido.")
	private Long clientId;

	@NotBlank(message = "El campo \"serviceType\" es requerido.")
	private String serviceType; // INSTALACION, SOPORTE, DIAGNOSTICO

	@NotBlank(message = "El campo \"date\" es requerido.")
	private String date; // yyyy-MM-dd

	@NotBlank(message = "El campo \"timeSlot\" es requerido.")
	private String timeSlot; // MANANA, TARDE

	@NotBlank(message = "El campo \"serviceAddress\" es requerido.")
	private String serviceAddress;

	private Boolean isAtEstablishment;

	private String notes;
}
