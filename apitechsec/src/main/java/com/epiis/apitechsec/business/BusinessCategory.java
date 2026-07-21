package com.epiis.apitechsec.business;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestCategoryInsert;
import com.epiis.apitechsec.dto.response.ResponseCategoryGetAll;
import com.epiis.apitechsec.dto.response.ResponseCategoryInsert;
import com.epiis.apitechsec.entity.EntityCategory;
import com.epiis.apitechsec.repository.RepositoryCategory;

@Service
public class BusinessCategory {
	private final RepositoryCategory repositoryCategory;

	public BusinessCategory(RepositoryCategory repositoryCategory) {
		this.repositoryCategory = repositoryCategory;
	}

	public ResponseCategoryGetAll getAll() {
		ResponseCategoryGetAll response = new ResponseCategoryGetAll();

		for (EntityCategory item : repositoryCategory.findAll()) {
			ResponseCategoryGetAll.ItemCategory dto = new ResponseCategoryGetAll.ItemCategory();
			dto.id = item.getId();
			dto.name = item.getName();
			dto.description = item.getDescription();
			response.listCategory.add(dto);
		}

		response.success();
		return response;
	}

	public ResponseCategoryInsert insert(RequestCategoryInsert request) {
		ResponseCategoryInsert response = new ResponseCategoryInsert();

		EntityCategory entity = new EntityCategory();
		entity.setName(request.getName());
		entity.setDescription(request.getDescription());

		repositoryCategory.save(entity);

		response.success();
		response.listMessage.add("Categoría creada correctamente.");
		return response;
	}
}
