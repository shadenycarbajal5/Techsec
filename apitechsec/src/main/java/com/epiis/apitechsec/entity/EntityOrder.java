package com.epiis.apitechsec.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "torder")
@Getter
@Setter
public class EntityOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idClient")
	private Long idClient;

	@Column(name = "idQuote")
	private Long idQuote;

	@Column(name = "total")
	private BigDecimal total;

	@Column(name = "shippingAddress")
	private String shippingAddress;

	@Column(name = "currentStatus")
	private String currentStatus; // RECIBIDO, PREPARANDO_ALMACEN, LISTO_RECOJO

	@Column(name = "createdAt")
	private Date createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idClient", insertable = false, updatable = false)
	private EntityUser parentClient;

	@OneToMany(mappedBy = "parentOrder", cascade = CascadeType.ALL)
	private List<EntityOrderDetail> childDetail;

	@OneToMany(mappedBy = "parentOrder", cascade = CascadeType.ALL)
	private List<EntityOrderStatusHistory> childStatusHistory;
}
