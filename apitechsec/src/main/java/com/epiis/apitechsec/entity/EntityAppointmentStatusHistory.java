package com.epiis.apitechsec.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tappointmentstatushistory")
@Getter
@Setter
public class EntityAppointmentStatusHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idAppointment")
	private Long idAppointment;

	@Column(name = "status")
	private String status;

	@Column(name = "comment")
	private String comment;

	@Column(name = "updatedAt")
	private Date updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idAppointment", insertable = false, updatable = false)
	private EntityAppointment parentAppointment;
}
