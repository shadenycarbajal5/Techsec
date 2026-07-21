package com.epiis.apitechsec.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tappointment")
@Getter
@Setter
public class EntityAppointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idClient")
	private Long idClient;

	@Column(name = "idTechnician")
	private Long idTechnician;

	@Column(name = "serviceType")
	private String serviceType; // INSTALACION, SOPORTE, DIAGNOSTICO

	@Column(name = "appointmentDate")
	private Date appointmentDate;

	@Column(name = "timeSlot")
	private String timeSlot; // MANANA, TARDE

	@Column(name = "serviceAddress")
	private String serviceAddress;

	@Column(name = "isAtEstablishment")
	private Boolean isAtEstablishment;

	@Column(name = "currentStatus")
	private String currentStatus;

	@Column(name = "notes")
	private String notes;

	@Column(name = "createdAt")
	private java.util.Date createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idClient", insertable = false, updatable = false)
	private EntityUser parentClient;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idTechnician", insertable = false, updatable = false)
	private EntityTechnician parentTechnician;

	@OneToMany(mappedBy = "parentAppointment", cascade = CascadeType.ALL)
	private List<EntityAppointmentStatusHistory> childStatusHistory;

	@OneToMany(mappedBy = "parentAppointment", cascade = CascadeType.ALL)
	private List<EntityAppointmentFile> childFile;
}
