package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityQuote;

@Repository
public interface RepositoryQuote extends JpaRepository<EntityQuote, Long> {
	@Query("SELECT q FROM EntityQuote q LEFT JOIN FETCH q.parentClient ORDER BY q.createdAt DESC")
	List<EntityQuote> findAllWithClient();
}
