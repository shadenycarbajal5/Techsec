package com.epiis.apitechsec.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tcontract")
@Getter
@Setter
public class EntityContract {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idAppointment")
	private Long idAppointment;

	@Column(name = "fileName")
	private String fileName;

	@Column(name = "generatedAt")
	private Date generatedAt;

	@Column(name = "createdAt")
	private Date createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idAppointment", insertable = false, updatable = false)
	private EntityAppointment parentAppointment;
}
