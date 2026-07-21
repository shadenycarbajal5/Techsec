package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityQuoteDetail;

@Repository
public interface RepositoryQuoteDetail extends JpaRepository<EntityQuoteDetail, Long> {
	@Query("SELECT d FROM EntityQuoteDetail d LEFT JOIN FETCH d.parentProduct WHERE d.idQuote = :idQuote")
	List<EntityQuoteDetail> findByQuote(@Param("idQuote") Long idQuote);
}
