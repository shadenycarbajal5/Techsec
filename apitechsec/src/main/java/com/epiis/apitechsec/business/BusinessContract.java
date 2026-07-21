package com.epiis.apitechsec.business;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestContractInsert;
import com.epiis.apitechsec.dto.response.ResponseContractGetAll;
import com.epiis.apitechsec.dto.response.ResponseContractInsert;
import com.epiis.apitechsec.entity.EntityAppointment;
import com.epiis.apitechsec.entity.EntityContract;
import com.epiis.apitechsec.repository.RepositoryAppointment;
import com.epiis.apitechsec.repository.RepositoryContract;

@Service
public class BusinessContract {
	private final RepositoryContract repositoryContract;
	private final RepositoryAppointment repositoryAppointment;
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

	public BusinessContract(RepositoryContract repositoryContract, RepositoryAppointment repositoryAppointment) {
		this.repositoryContract = repositoryContract;
		this.repositoryAppointment = repositoryAppointment;
	}

	public ResponseContractGetAll getAll() {
		ResponseContractGetAll response = new ResponseContractGetAll();

		for (EntityContract item : repositoryContract.findAll()) {
			ResponseContractGetAll.ItemContract dto = new ResponseContractGetAll.ItemContract();
			dto.id = item.getId();
			dto.idAppointment = item.getIdAppointment();
			dto.fileName = item.getFileName();
			dto.generatedAt = item.getGeneratedAt() != null ? SDF.format(item.getGeneratedAt()) : null;
			response.listContract.add(dto);
		}

		response.success();
		return response;
	}

	// Nota: por ahora solo registra la referencia del contrato; la generación real
	// del .docx se hará con Apache POI/plantilla cuando se implemente ese módulo.
	public ResponseContractInsert insert(RequestContractInsert request) {
		ResponseContractInsert response = new ResponseContractInsert();

		Optional<EntityAppointment> optAppt = repositoryAppointment.findById(request.getAppointmentId());
		if (optAppt.isEmpty()) {
			response.listMessage.add("La cita no existe.");
			return response;
		}

		String fileName = "contrato_instalacion_" + request.getAppointmentId() + ".docx";

		EntityContract entity = new EntityContract();
		entity.setIdAppointment(request.getAppointmentId());
		entity.setFileName(fileName);
		entity.setGeneratedAt(new Date());
		entity.setCreatedAt(new Date());
		repositoryContract.save(entity);

		response.fileName = fileName;
		response.success();
		response.listMessage.add("Contrato generado correctamente.");
		return response;
	}
}
