package com.epiis.apitechsec.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseContractGetAll extends ResponseGeneric {
	public List<ItemContract> listContract = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemContract {
		public Long id;
		public Long idAppointment;
		public String fileName;
		public String generatedAt;
	}
}
