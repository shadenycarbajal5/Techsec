package com.epiis.apitechsec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityContract;

@Repository
public interface RepositoryContract extends JpaRepository<EntityContract, Long> {
}
