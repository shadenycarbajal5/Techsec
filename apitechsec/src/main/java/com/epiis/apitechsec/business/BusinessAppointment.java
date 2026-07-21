package com.epiis.apitechsec.business;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestAppointmentInsert;
import com.epiis.apitechsec.dto.request.RequestAppointmentUpdateStatus;
import com.epiis.apitechsec.dto.response.ResponseAppointmentGetAll;
import com.epiis.apitechsec.dto.response.ResponseAppointmentGetAvailability;
import com.epiis.apitechsec.dto.response.ResponseAppointmentInsert;
import com.epiis.apitechsec.dto.response.ResponseAppointmentUpdateStatus;
import com.epiis.apitechsec.entity.EntityAppointment;
import com.epiis.apitechsec.entity.EntityAppointmentStatusHistory;
import com.epiis.apitechsec.entity.EntityTechnician;
import com.epiis.apitechsec.repository.RepositoryAppointment;
import com.epiis.apitechsec.repository.RepositoryAppointmentFile;
import com.epiis.apitechsec.repository.RepositoryAppointmentStatusHistory;
import com.epiis.apitechsec.repository.RepositoryTechnician;

@Service
public class BusinessAppointment {
	private final RepositoryAppointment repositoryAppointment;
	private final RepositoryAppointmentStatusHistory repositoryAppointmentStatusHistory;
	private final RepositoryAppointmentFile repositoryAppointmentFile;
	private final RepositoryTechnician repositoryTechnician;
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

	public BusinessAppointment(RepositoryAppointment repositoryAppointment,
			RepositoryAppointmentStatusHistory repositoryAppointmentStatusHistory,
			RepositoryAppointmentFile repositoryAppointmentFile,
			RepositoryTechnician repositoryTechnician) {
		this.repositoryAppointment = repositoryAppointment;
		this.repositoryAppointmentStatusHistory = repositoryAppointmentStatusHistory;
		this.repositoryAppointmentFile = repositoryAppointmentFile;
		this.repositoryTechnician = repositoryTechnician;
	}

	public ResponseAppointmentGetAll getAll() {
		ResponseAppointmentGetAll response = new ResponseAppointmentGetAll();

		for (EntityAppointment item : repositoryAppointment.findAllWithDetails()) {
			ResponseAppointmentGetAll.ItemAppointment dto = new ResponseAppointmentGetAll.ItemAppointment();
			dto.id = item.getId();
			dto.idClient = item.getIdClient();
			dto.clientName = item.getParentClient() != null ? item.getParentClient().getName() : null;
			dto.idTechnician = item.getIdTechnician();
			dto.technicianName = item.getParentTechnician() != null ? item.getParentTechnician().getName() : null;
			dto.serviceType = item.getServiceType();
			dto.date = item.getAppointmentDate() != null ? item.getAppointmentDate().toString() : null;
			dto.timeSlot = item.getTimeSlot();
			dto.serviceAddress = item.getServiceAddress();
			dto.isAtEstablishment = item.getIsAtEstablishment();
			dto.currentStatus = item.getCurrentStatus();
			dto.notes = item.getNotes();
			dto.createdAt = item.getCreatedAt() != null ? SDF.format(item.getCreatedAt()) : null;

			for (EntityAppointmentStatusHistory h : repositoryAppointmentStatusHistory.findByAppointment(item.getId())) {
				ResponseAppointmentGetAll.ItemAppointmentStatusHistory historyDto = new ResponseAppointmentGetAll.ItemAppointmentStatusHistory();
				historyDto.id = h.getId();
				historyDto.status = h.getStatus();
				historyDto.comment = h.getComment();
				historyDto.updatedAt = h.getUpdatedAt() != null ? SDF.format(h.getUpdatedAt()) : null;
				dto.listStatusHistory.add(historyDto);
			}

			response.listAppointment.add(dto);
		}

		response.success();
		return response;
	}

	public ResponseAppointmentInsert insert(RequestAppointmentInsert request) {
		ResponseAppointmentInsert response = new ResponseAppointmentInsert();

		EntityAppointment entity = new EntityAppointment();
		entity.setIdClient(request.getClientId());
		entity.setServiceType(request.getServiceType());
		entity.setAppointmentDate(Date.valueOf(LocalDate.parse(request.getDate())));
		entity.setTimeSlot(request.getTimeSlot());
		entity.setServiceAddress(request.getServiceAddress());
		entity.setIsAtEstablishment(Boolean.TRUE.equals(request.getIsAtEstablishment()));
		entity.setCurrentStatus("RECIBIDO");
		entity.setNotes(request.getNotes());
		entity.setCreatedAt(new java.util.Date());

		repositoryAppointment.save(entity);

		EntityAppointmentStatusHistory history = new EntityAppointmentStatusHistory();
		history.setIdAppointment(entity.getId());
		history.setStatus("RECIBIDO");
		history.setUpdatedAt(new java.util.Date());
		repositoryAppointmentStatusHistory.save(history);

		response.success();
		response.listMessage.add("Cita registrada correctamente.");
		return response;
	}

	public ResponseAppointmentUpdateStatus updateStatus(Long id, RequestAppointmentUpdateStatus request) {
		ResponseAppointmentUpdateStatus response = new ResponseAppointmentUpdateStatus();

		Optional<EntityAppointment> optAppt = repositoryAppointment.findById(id);
		if (optAppt.isEmpty()) {
			response.listMessage.add("La cita no existe.");
			return response;
		}

		EntityAppointment entity = optAppt.get();

		// Validar colisión de horario si se está asignando/reasignando técnico
		if (request.getTechnicianId() != null && !request.getTechnicianId().equals(entity.getIdTechnician())) {
			List<EntityAppointment> sameDate = repositoryAppointment.findByDate(entity.getAppointmentDate());
			boolean collision = sameDate.stream().anyMatch(a ->
					!a.getId().equals(entity.getId()) &&
					request.getTechnicianId().equals(a.getIdTechnician()) &&
					entity.getTimeSlot().equals(a.getTimeSlot())
			);
			if (collision) {
				response.listMessage.add("El técnico ya tiene una cita asignada en ese mismo bloque horario.");
				return response;
			}
			entity.setIdTechnician(request.getTechnicianId());
		}

		entity.setCurrentStatus(request.getStatus());
		repositoryAppointment.save(entity);

		EntityAppointmentStatusHistory history = new EntityAppointmentStatusHistory();
		history.setIdAppointment(entity.getId());
		history.setStatus(request.getStatus());
		history.setComment(request.getComment());
		history.setUpdatedAt(new java.util.Date());
		repositoryAppointmentStatusHistory.save(history);

		response.success();
		response.listMessage.add("Cita actualizada correctamente.");
		return response;
	}

	public ResponseAppointmentGetAvailability getAvailability(String dateStr) {
		ResponseAppointmentGetAvailability response = new ResponseAppointmentGetAvailability();

		Date date = Date.valueOf(LocalDate.parse(dateStr));
		response.setDate(dateStr);
		List<EntityAppointment> sameDate = repositoryAppointment.findByDate(date);
		long activeTechnicians = repositoryTechnician.findAll().stream()
				.filter(EntityTechnician::getActive)
				.count();

		if (activeTechnicians == 0) {
			// Sin técnicos registrados: se permite agendar y el admin asignará después
			response.setMananaDisponible(true);
			response.setTardeDisponible(true);
		} else {
			long mananaOcupadas = sameDate.stream().filter(a -> "MANANA".equals(a.getTimeSlot())).count();
			long tardeOcupadas = sameDate.stream().filter(a -> "TARDE".equals(a.getTimeSlot())).count();
			response.setMananaDisponible(mananaOcupadas < activeTechnicians);
			response.setTardeDisponible(tardeOcupadas < activeTechnicians);
		}

		response.success();
		return response;
	}
}
