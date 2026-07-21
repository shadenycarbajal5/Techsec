package com.epiis.apitechsec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epiis.apitechsec.entity.EntityUser;

@Repository
public interface RepositoryUser extends JpaRepository<EntityUser, Long> {
	Optional<EntityUser> findByUsername(String username);
}
