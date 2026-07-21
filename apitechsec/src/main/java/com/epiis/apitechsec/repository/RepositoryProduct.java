package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityProduct;

@Repository
public interface RepositoryProduct extends JpaRepository<EntityProduct, Long> {
	@Query("SELECT p FROM EntityProduct p LEFT JOIN FETCH p.parentCategory ORDER BY p.name ASC")
	List<EntityProduct> findAllWithCategory();
}
