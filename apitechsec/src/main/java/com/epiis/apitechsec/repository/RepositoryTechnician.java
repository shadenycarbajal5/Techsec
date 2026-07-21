package com.epiis.apitechsec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityTechnician;

@Repository
public interface RepositoryTechnician extends JpaRepository<EntityTechnician, Long> {
}
