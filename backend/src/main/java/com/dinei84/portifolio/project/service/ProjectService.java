package com.dinei84.portifolio.project.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dinei84.portifolio.project.domain.Project;
import com.dinei84.portifolio.project.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> findAll() {
        return repository.findAll();
    }

    public Project findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }
}
