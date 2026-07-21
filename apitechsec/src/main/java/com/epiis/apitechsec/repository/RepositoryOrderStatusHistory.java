package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityOrderStatusHistory;

@Repository
public interface RepositoryOrderStatusHistory extends JpaRepository<EntityOrderStatusHistory, Long> {
	@Query("SELECT h FROM EntityOrderStatusHistory h WHERE h.idOrder = :idOrder ORDER BY h.updatedAt ASC")
	List<EntityOrderStatusHistory> findByOrder(@Param("idOrder") Long idOrder);
}
