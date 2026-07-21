package com.epiis.apitechsec.business;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestTechnicianInsert;
import com.epiis.apitechsec.dto.response.ResponseTechnicianGetAll;
import com.epiis.apitechsec.dto.response.ResponseTechnicianInsert;
import com.epiis.apitechsec.entity.EntityTechnician;
import com.epiis.apitechsec.repository.RepositoryTechnician;

@Service
public class BusinessTechnician {
	private final RepositoryTechnician repositoryTechnician;

	public BusinessTechnician(RepositoryTechnician repositoryTechnician) {
		this.repositoryTechnician = repositoryTechnician;
	}

	public ResponseTechnicianGetAll getAll() {
		ResponseTechnicianGetAll response = new ResponseTechnicianGetAll();

		for (EntityTechnician item : repositoryTechnician.findAll()) {
			ResponseTechnicianGetAll.ItemTechnician dto = new ResponseTechnicianGetAll.ItemTechnician();
			dto.id = item.getId();
			dto.name = item.getName();
			dto.document = item.getDocument();
			dto.phone = item.getPhone();
			dto.specialty = item.getSpecialty();
			dto.active = item.getActive();
			response.listTechnician.add(dto);
		}

		response.success();
		return response;
	}

	public ResponseTechnicianInsert insert(RequestTechnicianInsert request) {
		ResponseTechnicianInsert response = new ResponseTechnicianInsert();

		EntityTechnician entity = new EntityTechnician();
		entity.setName(request.getName());
		entity.setDocument(request.getDocument());
		entity.setPhone(request.getPhone());
		entity.setSpecialty(request.getSpecialty());
		entity.setActive(true);

		repositoryTechnician.save(entity);

		response.success();
		response.listMessage.add("Técnico registrado correctamente.");
		return response;
	}
}
