package com.epiis.apitechsec.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseCategoryGetAll extends ResponseGeneric {
	public List<ItemCategory> listCategory = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemCategory {
		public Long id;
		public String name;
		public String description;
	}
}
