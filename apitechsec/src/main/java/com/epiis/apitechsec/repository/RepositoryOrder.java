package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityOrder;

@Repository
public interface RepositoryOrder extends JpaRepository<EntityOrder, Long> {
	@Query("SELECT o FROM EntityOrder o LEFT JOIN FETCH o.parentClient ORDER BY o.createdAt DESC")
	List<EntityOrder> findAllWithClient();
}
