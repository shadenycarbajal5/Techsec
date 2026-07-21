package com.epiis.apitechsec.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ttechnician")
@Getter
@Setter
public class EntityTechnician {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "document")
	private String document;

	@Column(name = "phone")
	private String phone;

	@Column(name = "specialty")
	private String specialty;

	@Column(name = "active")
	private Boolean active;
}
