package com.epiis.apitechsec.business;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestQuoteDetailInsert;
import com.epiis.apitechsec.dto.request.RequestQuoteInsert;
import com.epiis.apitechsec.dto.request.RequestQuoteUpdateStatus;
import com.epiis.apitechsec.dto.response.ResponseQuoteGetAll;
import com.epiis.apitechsec.dto.response.ResponseQuoteInsert;
import com.epiis.apitechsec.dto.response.ResponseQuoteUpdateStatus;
import com.epiis.apitechsec.entity.EntityProduct;
import com.epiis.apitechsec.entity.EntityQuote;
import com.epiis.apitechsec.entity.EntityQuoteDetail;
import com.epiis.apitechsec.repository.RepositoryProduct;
import com.epiis.apitechsec.repository.RepositoryQuote;
import com.epiis.apitechsec.repository.RepositoryQuoteDetail;

@Service
public class BusinessQuote {
	private final RepositoryQuote repositoryQuote;
	private final RepositoryQuoteDetail repositoryQuoteDetail;
	private final RepositoryProduct repositoryProduct;
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

	public BusinessQuote(RepositoryQuote repositoryQuote, RepositoryQuoteDetail repositoryQuoteDetail, RepositoryProduct repositoryProduct) {
		this.repositoryQuote = repositoryQuote;
		this.repositoryQuoteDetail = repositoryQuoteDetail;
		this.repositoryProduct = repositoryProduct;
	}

	public ResponseQuoteGetAll getAll() {
		ResponseQuoteGetAll response = new ResponseQuoteGetAll();

		for (EntityQuote item : repositoryQuote.findAllWithClient()) {
			ResponseQuoteGetAll.ItemQuote dto = new ResponseQuoteGetAll.ItemQuote();
			dto.id = item.getId();
			dto.idClient = item.getIdClient();
			dto.clientName = item.getParentClient() != null ? item.getParentClient().getName() : null;
			dto.clientDocument = item.getParentClient() != null ? item.getParentClient().getDocument() : null;
			dto.total = item.getTotal();
			dto.status = item.getStatus();
			dto.notes = item.getNotes();
			dto.createdAt = item.getCreatedAt() != null ? SDF.format(item.getCreatedAt()) : null;

			for (EntityQuoteDetail d : repositoryQuoteDetail.findByQuote(item.getId())) {
				ResponseQuoteGetAll.ItemQuoteDetail detailDto = new ResponseQuoteGetAll.ItemQuoteDetail();
				detailDto.id = d.getId();
				detailDto.idProduct = d.getIdProduct();
				detailDto.productName = d.getParentProduct() != null ? d.getParentProduct().getName() : null;
				detailDto.quantity = d.getQuantity();
				detailDto.unitPrice = d.getUnitPrice();
				detailDto.subtotal = d.getSubtotal();
				dto.listDetail.add(detailDto);
			}

			response.listQuote.add(dto);
		}

		response.success();
		return response;
	}

	public ResponseQuoteInsert insert(RequestQuoteInsert request) {
		ResponseQuoteInsert response = new ResponseQuoteInsert();

		EntityQuote entity = new EntityQuote();
		entity.setIdClient(request.getClientId());
		entity.setStatus("PENDIENTE");
		entity.setNotes(request.getNotes());
		entity.setCreatedAt(new Date());

		BigDecimal total = BigDecimal.ZERO;

		for (RequestQuoteDetailInsert detailReq : request.getDetails()) {
			Optional<EntityProduct> optProduct = repositoryProduct.findById(detailReq.getProductId());
			if (optProduct.isEmpty()) {
				response.listMessage.add("El producto con id " + detailReq.getProductId() + " no existe.");
				return response;
			}
			BigDecimal subtotal = optProduct.get().getPrice().multiply(BigDecimal.valueOf(detailReq.getQuantity()));
			total = total.add(subtotal);
		}

		entity.setTotal(total);
		repositoryQuote.save(entity);

		for (RequestQuoteDetailInsert detailReq : request.getDetails()) {
			EntityProduct product = repositoryProduct.findById(detailReq.getProductId()).get();

			EntityQuoteDetail detail = new EntityQuoteDetail();
			detail.setIdQuote(entity.getId());
			detail.setIdProduct(detailReq.getProductId());
			detail.setQuantity(detailReq.getQuantity());
			detail.setUnitPrice(product.getPrice());
			detail.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(detailReq.getQuantity())));
			repositoryQuoteDetail.save(detail);
		}

		response.success();
		response.listMessage.add("Cotización registrada correctamente.");
		return response;
	}

	public ResponseQuoteUpdateStatus updateStatus(Long id, RequestQuoteUpdateStatus request) {
		ResponseQuoteUpdateStatus response = new ResponseQuoteUpdateStatus();

		Optional<EntityQuote> optQuote = repositoryQuote.findById(id);
		if (optQuote.isEmpty()) {
			response.listMessage.add("La cotización no existe.");
			return response;
		}

		EntityQuote entity = optQuote.get();
		entity.setStatus(request.getStatus());
		repositoryQuote.save(entity);

		response.success();
		response.listMessage.add("Estado de la cotización actualizado.");
		return response;
	}
}
