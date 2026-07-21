package com.epiis.apitechsec.business;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestOrderDetailInsert;
import com.epiis.apitechsec.dto.request.RequestOrderInsert;
import com.epiis.apitechsec.dto.request.RequestOrderUpdateStatus;
import com.epiis.apitechsec.dto.response.ResponseOrderGetAll;
import com.epiis.apitechsec.dto.response.ResponseOrderInsert;
import com.epiis.apitechsec.dto.response.ResponseOrderUpdateStatus;
import com.epiis.apitechsec.entity.EntityOrder;
import com.epiis.apitechsec.entity.EntityOrderDetail;
import com.epiis.apitechsec.entity.EntityOrderStatusHistory;
import com.epiis.apitechsec.entity.EntityProduct;
import com.epiis.apitechsec.repository.RepositoryOrder;
import com.epiis.apitechsec.repository.RepositoryOrderDetail;
import com.epiis.apitechsec.repository.RepositoryOrderStatusHistory;
import com.epiis.apitechsec.repository.RepositoryProduct;

@Service
public class BusinessOrder {
	private final RepositoryOrder repositoryOrder;
	private final RepositoryOrderDetail repositoryOrderDetail;
	private final RepositoryOrderStatusHistory repositoryOrderStatusHistory;
	private final RepositoryProduct repositoryProduct;
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

	public BusinessOrder(RepositoryOrder repositoryOrder, RepositoryOrderDetail repositoryOrderDetail,
			RepositoryOrderStatusHistory repositoryOrderStatusHistory, RepositoryProduct repositoryProduct) {
		this.repositoryOrder = repositoryOrder;
		this.repositoryOrderDetail = repositoryOrderDetail;
		this.repositoryOrderStatusHistory = repositoryOrderStatusHistory;
		this.repositoryProduct = repositoryProduct;
	}

	public ResponseOrderGetAll getAll() {
		ResponseOrderGetAll response = new ResponseOrderGetAll();

		for (EntityOrder item : repositoryOrder.findAllWithClient()) {
			ResponseOrderGetAll.ItemOrder dto = new ResponseOrderGetAll.ItemOrder();
			dto.id = item.getId();
			dto.idClient = item.getIdClient();
			dto.clientName = item.getParentClient() != null ? item.getParentClient().getName() : null;
			dto.total = item.getTotal();
			dto.shippingAddress = item.getShippingAddress();
			dto.currentStatus = item.getCurrentStatus();
			dto.createdAt = item.getCreatedAt() != null ? SDF.format(item.getCreatedAt()) : null;

			for (EntityOrderDetail d : repositoryOrderDetail.findByOrder(item.getId())) {
				ResponseOrderGetAll.ItemOrderDetail detailDto = new ResponseOrderGetAll.ItemOrderDetail();
				detailDto.id = d.getId();
				detailDto.idProduct = d.getIdProduct();
				detailDto.productName = d.getParentProduct() != null ? d.getParentProduct().getName() : null;
				detailDto.quantity = d.getQuantity();
				detailDto.price = d.getPrice();
				detailDto.subtotal = d.getSubtotal();
				dto.listDetail.add(detailDto);
			}

			for (EntityOrderStatusHistory h : repositoryOrderStatusHistory.findByOrder(item.getId())) {
				ResponseOrderGetAll.ItemOrderStatusHistory historyDto = new ResponseOrderGetAll.ItemOrderStatusHistory();
				historyDto.id = h.getId();
				historyDto.status = h.getStatus();
				historyDto.comment = h.getComment();
				historyDto.updatedAt = h.getUpdatedAt() != null ? SDF.format(h.getUpdatedAt()) : null;
				dto.listStatusHistory.add(historyDto);
			}

			response.listOrder.add(dto);
		}

		response.success();
		return response;
	}

	public ResponseOrderInsert insert(RequestOrderInsert request) {
		ResponseOrderInsert response = new ResponseOrderInsert();

		EntityOrder entity = new EntityOrder();
		entity.setIdClient(request.getClientId());
		entity.setIdQuote(request.getQuoteId());
		entity.setShippingAddress(request.getShippingAddress());
		entity.setCurrentStatus("RECIBIDO");
		entity.setCreatedAt(new Date());

		BigDecimal total = BigDecimal.ZERO;

		for (RequestOrderDetailInsert detailReq : request.getDetails()) {
			Optional<EntityProduct> optProduct = repositoryProduct.findById(detailReq.getProductId());
			if (optProduct.isEmpty()) {
				response.listMessage.add("El producto con id " + detailReq.getProductId() + " no existe.");
				return response;
			}
			total = total.add(optProduct.get().getPrice().multiply(BigDecimal.valueOf(detailReq.getQuantity())));
		}

		entity.setTotal(total);
		repositoryOrder.save(entity);

		for (RequestOrderDetailInsert detailReq : request.getDetails()) {
			EntityProduct product = repositoryProduct.findById(detailReq.getProductId()).get();

			EntityOrderDetail detail = new EntityOrderDetail();
			detail.setIdOrder(entity.getId());
			detail.setIdProduct(detailReq.getProductId());
			detail.setQuantity(detailReq.getQuantity());
			detail.setPrice(product.getPrice());
			detail.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(detailReq.getQuantity())));
			repositoryOrderDetail.save(detail);

			// Descontar stock
			product.setStock(product.getStock() - detailReq.getQuantity());
			repositoryProduct.save(product);
		}

		EntityOrderStatusHistory history = new EntityOrderStatusHistory();
		history.setIdOrder(entity.getId());
		history.setStatus("RECIBIDO");
		history.setUpdatedAt(new Date());
		repositoryOrderStatusHistory.save(history);

		response.success();
		response.listMessage.add("Pedido registrado correctamente.");
		return response;
	}

	public ResponseOrderUpdateStatus updateStatus(Long id, RequestOrderUpdateStatus request) {
		ResponseOrderUpdateStatus response = new ResponseOrderUpdateStatus();

		Optional<EntityOrder> optOrder = repositoryOrder.findById(id);
		if (optOrder.isEmpty()) {
			response.listMessage.add("El pedido no existe.");
			return response;
		}

		EntityOrder entity = optOrder.get();
		entity.setCurrentStatus(request.getStatus());
		repositoryOrder.save(entity);

		EntityOrderStatusHistory history = new EntityOrderStatusHistory();
		history.setIdOrder(entity.getId());
		history.setStatus(request.getStatus());
		history.setComment(request.getComment());
		history.setUpdatedAt(new Date());
		repositoryOrderStatusHistory.save(history);

		response.success();
		response.listMessage.add("Estado del pedido actualizado.");
		return response;
	}
}
