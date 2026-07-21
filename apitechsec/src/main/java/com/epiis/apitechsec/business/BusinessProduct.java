package com.epiis.apitechsec.business;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestProductInsert;
import com.epiis.apitechsec.dto.response.ResponseProductGetAll;
import com.epiis.apitechsec.dto.response.ResponseProductInsert;
import com.epiis.apitechsec.entity.EntityProduct;
import com.epiis.apitechsec.repository.RepositoryProduct;

@Service
public class BusinessProduct {
	private final RepositoryProduct repositoryProduct;

	public BusinessProduct(RepositoryProduct repositoryProduct) {
		this.repositoryProduct = repositoryProduct;
	}

	public ResponseProductGetAll getAll() {
		ResponseProductGetAll response = new ResponseProductGetAll();

		for (EntityProduct item : repositoryProduct.findAllWithCategory()) {
			ResponseProductGetAll.ItemProduct dto = new ResponseProductGetAll.ItemProduct();
			dto.id = item.getId();
			dto.name = item.getName();
			dto.idCategory = item.getIdCategory();
			dto.categoryName = item.getParentCategory() != null ? item.getParentCategory().getName() : null;
			dto.description = item.getDescription();
			dto.specifications = item.getSpecifications();
			dto.price = item.getPrice();
			dto.stock = item.getStock();
			dto.minStockAlert = item.getMinStockAlert();
			response.listProduct.add(dto);
		}

		response.success();
		return response;
	}

	public ResponseProductInsert insert(RequestProductInsert request) {
		ResponseProductInsert response = new ResponseProductInsert();

		EntityProduct entity = new EntityProduct();
		entity.setName(request.getName());
		entity.setIdCategory(request.getCategoryId());
		entity.setDescription(request.getDescription());
		entity.setSpecifications(request.getSpecifications());
		entity.setPrice(request.getPrice());
		entity.setStock(request.getStock());
		entity.setMinStockAlert(request.getMinStockAlert() != null ? request.getMinStockAlert() : 5);

		repositoryProduct.save(entity);

		response.success();
		response.listMessage.add("Producto creado correctamente.");
		return response;
	}
}
