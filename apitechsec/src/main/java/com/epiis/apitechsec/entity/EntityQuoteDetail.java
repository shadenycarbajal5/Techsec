package com.epiis.apitechsec.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tquotedetail")
@Getter
@Setter
public class EntityQuoteDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idQuote")
	private Long idQuote;

	@Column(name = "idProduct")
	private Long idProduct;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "unitPrice")
	private BigDecimal unitPrice;

	@Column(name = "subtotal")
	private BigDecimal subtotal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idQuote", insertable = false, updatable = false)
	private EntityQuote parentQuote;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProduct", insertable = false, updatable = false)
	private EntityProduct parentProduct;
}
