package com.dinei84.portifolio.project.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinei84.portifolio.project.domain.Project;
import com.dinei84.portifolio.project.service.ProjectService;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<Project> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Project findById(@PathVariable UUID id) {
        return service.findById(id);
    }
}
