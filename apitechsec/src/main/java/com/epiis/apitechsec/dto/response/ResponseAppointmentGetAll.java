package com.epiis.apitechsec.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseAppointmentGetAll extends ResponseGeneric {
	public List<ItemAppointment> listAppointment = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemAppointmentStatusHistory {
		public Long id;
		public String status;
		public String comment;
		public String updatedAt;
	}

	@Getter
	@Setter
	public static class ItemAppointmentFile {
		public Long id;
		public String name;
		public String extension;
	}

	@Getter
	@Setter
	public static class ItemAppointment {
		public Long id;
		public Long idClient;
		public String clientName;
		public Long idTechnician;
		public String technicianName;
		public String serviceType;
		public String date;
		public String timeSlot;
		public String serviceAddress;
		public Boolean isAtEstablishment;
		public String currentStatus;
		public String notes;
		public String createdAt;
		public List<ItemAppointmentStatusHistory> listStatusHistory = new ArrayList<>();
		public List<ItemAppointmentFile> listFile = new ArrayList<>();
	}
}
