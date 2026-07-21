package com.epiis.apitechsec.dto.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseOrderGetAll extends ResponseGeneric {
	public List<ItemOrder> listOrder = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemOrderDetail {
		public Long id;
		public Long idProduct;
		public String productName;
		public Integer quantity;
		public BigDecimal price;
		public BigDecimal subtotal;
	}

	@Getter
	@Setter
	public static class ItemOrderStatusHistory {
		public Long id;
		public String status;
		public String comment;
		public String updatedAt;
	}

	@Getter
	@Setter
	public static class ItemOrder {
		public Long id;
		public Long idClient;
		public String clientName;
		public BigDecimal total;
		public String shippingAddress;
		public String currentStatus;
		public String createdAt;
		public List<ItemOrderDetail> listDetail = new ArrayList<>();
		public List<ItemOrderStatusHistory> listStatusHistory = new ArrayList<>();
	}
}
