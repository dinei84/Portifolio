package com.dinei84.portifolio.project.service;

import java.util.UUID;

public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException(UUID id) {
        super("Project not found: " + id);
    }
}
