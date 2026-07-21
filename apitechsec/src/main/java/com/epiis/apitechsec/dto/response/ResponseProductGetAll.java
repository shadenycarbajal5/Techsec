package com.epiis.apitechsec.dto.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseProductGetAll extends ResponseGeneric {
	public List<ItemProduct> listProduct = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemProduct {
		public Long id;
		public String name;
		public Long idCategory;
		public String categoryName;
		public String description;
		public String specifications;
		public BigDecimal price;
		public Integer stock;
		public Integer minStockAlert;
	}
}
