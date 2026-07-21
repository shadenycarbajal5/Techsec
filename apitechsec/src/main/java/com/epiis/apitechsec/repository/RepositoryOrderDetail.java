package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityOrderDetail;

@Repository
public interface RepositoryOrderDetail extends JpaRepository<EntityOrderDetail, Long> {
	@Query("SELECT d FROM EntityOrderDetail d LEFT JOIN FETCH d.parentProduct WHERE d.idOrder = :idOrder")
	List<EntityOrderDetail> findByOrder(@Param("idOrder") Long idOrder);
}
