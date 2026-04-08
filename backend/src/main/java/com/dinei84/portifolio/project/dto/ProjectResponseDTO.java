package com.dinei84.portifolio.project.dto;

import java.util.List;
import java.util.UUID;

public record ProjectResponseDTO(
        UUID id,
        String title,
        String description,
        String imageUrl,
        String githubUrl,
        String demoUrl,
        Boolean isInteractive,
        Boolean isFeatured,
        List<String> technologies) {
}
