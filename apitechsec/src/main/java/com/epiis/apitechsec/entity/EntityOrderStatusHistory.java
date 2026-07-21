package com.epiis.apitechsec.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "torderstatushistory")
@Getter
@Setter
public class EntityOrderStatusHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idOrder")
	private Long idOrder;

	@Column(name = "status")
	private String status;

	@Column(name = "comment")
	private String comment;

	@Column(name = "updatedAt")
	private Date updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idOrder", insertable = false, updatable = false)
	private EntityOrder parentOrder;
}
