package com.epiis.apitechsec.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tproduct")
@Getter
@Setter
public class EntityProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idCategory")
	private Long idCategory;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "specifications")
	private String specifications;

	@Column(name = "price")
	private BigDecimal price;

	@Column(name = "stock")
	private Integer stock;

	@Column(name = "minStockAlert")
	private Integer minStockAlert;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCategory", insertable = false, updatable = false)
	private EntityCategory parentCategory;
}
