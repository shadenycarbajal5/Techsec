package com.epiis.apitechsec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityCategory;

@Repository
public interface RepositoryCategory extends JpaRepository<EntityCategory, Long> {
}
