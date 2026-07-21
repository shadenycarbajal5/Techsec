package com.epiis.apitechsec.dto.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseQuoteGetAll extends ResponseGeneric {
	public List<ItemQuote> listQuote = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemQuoteDetail {
		public Long id;
		public Long idProduct;
		public String productName;
		public Integer quantity;
		public BigDecimal unitPrice;
		public BigDecimal subtotal;
	}

	@Getter
	@Setter
	public static class ItemQuote {
		public Long id;
		public Long idClient;
		public String clientName;
		public String clientDocument;
		public BigDecimal total;
		public String status;
		public String notes;
		public String createdAt;
		public List<ItemQuoteDetail> listDetail = new ArrayList<>();
	}
}
