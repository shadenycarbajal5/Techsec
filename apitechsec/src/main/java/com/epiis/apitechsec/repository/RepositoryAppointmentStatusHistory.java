package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityAppointmentStatusHistory;

@Repository
public interface RepositoryAppointmentStatusHistory extends JpaRepository<EntityAppointmentStatusHistory, Long> {
	@Query("SELECT h FROM EntityAppointmentStatusHistory h WHERE h.idAppointment = :idAppointment ORDER BY h.updatedAt ASC")
	List<EntityAppointmentStatusHistory> findByAppointment(@Param("idAppointment") Long idAppointment);
}
