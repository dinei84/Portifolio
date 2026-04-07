package com.dinei84.portifolio.project.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinei84.portifolio.project.domain.Project;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
}
