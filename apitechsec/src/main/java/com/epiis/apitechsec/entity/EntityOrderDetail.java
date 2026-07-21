package com.epiis.apitechsec.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "torderdetail")
@Getter
@Setter
public class EntityOrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idOrder")
	private Long idOrder;

	@Column(name = "idProduct")
	private Long idProduct;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "price")
	private BigDecimal price;

	@Column(name = "subtotal")
	private BigDecimal subtotal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idOrder", insertable = false, updatable = false)
	private EntityOrder parentOrder;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProduct", insertable = false, updatable = false)
	private EntityProduct parentProduct;
}
