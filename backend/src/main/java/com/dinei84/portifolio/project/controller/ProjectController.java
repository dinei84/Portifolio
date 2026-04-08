package com.dinei84.portifolio.project.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinei84.portifolio.project.dto.ProjectRequestDTO;
import com.dinei84.portifolio.project.dto.ProjectResponseDTO;
import com.dinei84.portifolio.project.service.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProjectResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProjectResponseDTO findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PostMapping
    public ProjectResponseDTO create(@Valid @RequestBody ProjectRequestDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ProjectResponseDTO update(@PathVariable UUID id, @Valid @RequestBody ProjectRequestDTO dto) {
        return service.update(id, dto);
    }
}
