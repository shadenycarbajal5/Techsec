package com.epiis.apitechsec.dto.response;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseAppointmentGetAvailability extends ResponseGeneric {
	private String date;
	private boolean mananaDisponible;
	private boolean tardeDisponible;
}
