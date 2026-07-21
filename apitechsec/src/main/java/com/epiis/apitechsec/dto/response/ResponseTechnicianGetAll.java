package com.epiis.apitechsec.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseTechnicianGetAll extends ResponseGeneric {
	public List<ItemTechnician> listTechnician = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemTechnician {
		public Long id;
		public String name;
		public String document;
		public String phone;
		public String specialty;
		public Boolean active;
	}
}
