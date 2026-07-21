package com.epiis.apitechsec.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tquote")
@Getter
@Setter
public class EntityQuote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idClient")
	private Long idClient;

	@Column(name = "total")
	private BigDecimal total;

	@Column(name = "status")
	private String status; // PENDIENTE, ACEPTADA, RECHAZADA

	@Column(name = "notes")
	private String notes;

	@Column(name = "createdAt")
	private Date createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idClient", insertable = false, updatable = false)
	private EntityUser parentClient;

	@OneToMany(mappedBy = "parentQuote", cascade = CascadeType.ALL)
	private List<EntityQuoteDetail> childDetail;
}
