package com.dinei84.portifolio.project.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinei84.portifolio.project.domain.Project;
import com.dinei84.portifolio.project.dto.ProjectRequestDTO;
import com.dinei84.portifolio.project.dto.ProjectResponseDTO;
import com.dinei84.portifolio.project.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<ProjectResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponseDTO findById(UUID id) {
        return repository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Transactional
    public ProjectResponseDTO create(ProjectRequestDTO dto) {
        Project project = toEntity(dto);
        project.setId(UUID.randomUUID());
        project.setCreatedAt(LocalDateTime.now());

        return toResponseDTO(repository.save(project));
    }

    @Transactional
    public ProjectResponseDTO update(UUID id, ProjectRequestDTO dto) {
        Project existingProject = repository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));

        existingProject.setTitle(dto.title());
        existingProject.setDescription(dto.description());
        existingProject.setImageUrl(dto.imageUrl());
        existingProject.setGithubUrl(dto.githubUrl());
        existingProject.setDemoUrl(dto.demoUrl());
        existingProject.setIsInteractive(Boolean.TRUE.equals(dto.isInteractive()));
        existingProject.setIsFeatured(Boolean.TRUE.equals(dto.isFeatured()));
        existingProject.setTechnologies(String.join(",", dto.technologies()));

        return toResponseDTO(repository.save(existingProject));
    }

    private ProjectResponseDTO toResponseDTO(Project project) {
        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getImageUrl(),
                project.getGithubUrl(),
                project.getDemoUrl(),
                project.getIsInteractive(),
                project.getIsFeatured(),
                toTechnologiesList(project.getTechnologies()));
    }

    private Project toEntity(ProjectRequestDTO dto) {
        Project project = new Project();
        project.setTitle(dto.title());
        project.setDescription(dto.description());
        project.setImageUrl(dto.imageUrl());
        project.setGithubUrl(dto.githubUrl());
        project.setDemoUrl(dto.demoUrl());
        project.setIsInteractive(Boolean.TRUE.equals(dto.isInteractive()));
        project.setIsFeatured(Boolean.TRUE.equals(dto.isFeatured()));
        project.setTechnologies(String.join(",", dto.technologies()));
        return project;
    }

    private List<String> toTechnologiesList(String technologies) {
        if (technologies == null || technologies.isBlank()) {
            return List.of();
        }

        return Arrays.stream(technologies.split(","))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .toList();
    }
}
