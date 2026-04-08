package com.dinei84.portifolio.project.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record ProjectRequestDTO(
        @NotBlank String title,
        @NotBlank String description,
        String imageUrl,
        @NotBlank String githubUrl,
        String demoUrl,
        Boolean isInteractive,
        Boolean isFeatured,
        @NotEmpty List<String> technologies) {
}
