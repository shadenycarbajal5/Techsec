package com.epiis.apitechsec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityAppointmentFile;

@Repository
public interface RepositoryAppointmentFile extends JpaRepository<EntityAppointmentFile, Long> {
	@Query("SELECT f FROM EntityAppointmentFile f WHERE f.idAppointment = :idAppointment")
	List<EntityAppointmentFile> findByAppointment(@Param("idAppointment") Long idAppointment);
}
