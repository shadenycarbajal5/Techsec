package com.epiis.apitechsec.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityAppointment;

@Repository
public interface RepositoryAppointment extends JpaRepository<EntityAppointment, Long> {
	@Query("SELECT a FROM EntityAppointment a LEFT JOIN FETCH a.parentClient LEFT JOIN FETCH a.parentTechnician ORDER BY a.appointmentDate DESC")
	List<EntityAppointment> findAllWithDetails();

	@Query("SELECT a FROM EntityAppointment a WHERE a.appointmentDate = :date AND a.currentStatus <> 'CANCELADO'")
	List<EntityAppointment> findByDate(@Param("date") Date date);
}
