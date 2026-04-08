package com.dinei84.portifolio.project.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import com.dinei84.portifolio.common.exception.GlobalExceptionHandler;
import com.dinei84.portifolio.project.dto.ProjectRequestDTO;
import com.dinei84.portifolio.project.dto.ProjectResponseDTO;
import com.dinei84.portifolio.project.service.ProjectService;

@ExtendWith(MockitoExtension.class)
class ProjectControllerTest {

    @Mock
    private ProjectService service;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();

        mockMvc = MockMvcBuilders.standaloneSetup(new ProjectController(service))
                .setControllerAdvice(new GlobalExceptionHandler())
                .setMessageConverters(new MappingJackson2HttpMessageConverter())
                .setValidator(validator)
                .build();
    }

    @Test
    void shouldCreateProjectAndReturnDto() throws Exception {
        UUID id = UUID.randomUUID();
        ProjectResponseDTO response = new ProjectResponseDTO(
                id,
                "Novo Projeto",
                "Descricao",
                null,
                "https://github.com/test/project",
                null,
                true,
                true,
                List.of("Java", "Spring Boot"));

        when(service.create(any(ProjectRequestDTO.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/projects")
                        .contentType("application/json")
                        .content("""
                                {
                                  "title": "Novo Projeto",
                                  "description": "Descricao",
                                  "githubUrl": "https://github.com/test/project",
                                  "isInteractive": true,
                                  "isFeatured": true,
                                  "technologies": ["Java", "Spring Boot"]
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.isFeatured").value(true))
                .andExpect(jsonPath("$.technologies[0]").value("Java"));
    }

    @Test
    void shouldReturnBadRequestWhenPayloadIsInvalid() throws Exception {
        mockMvc.perform(post("/api/v1/projects")
                        .contentType("application/json")
                        .content("""
                                {
                                  "title": "",
                                  "description": "",
                                  "githubUrl": "",
                                  "technologies": []
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("title")))
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("technologies")));
    }

    @Test
    void shouldUpdateProjectAndReturnDto() throws Exception {
        UUID id = UUID.randomUUID();
        ProjectResponseDTO response = new ProjectResponseDTO(
                id,
                "Projeto Atualizado",
                "Descricao nova",
                null,
                "https://github.com/test/project",
                null,
                false,
                false,
                List.of("React", "TypeScript"));

        when(service.update(eq(id), any(ProjectRequestDTO.class))).thenReturn(response);

        mockMvc.perform(put("/api/v1/projects/{id}", id)
                        .contentType("application/json")
                        .content("""
                                {
                                  "title": "Projeto Atualizado",
                                  "description": "Descricao nova",
                                  "githubUrl": "https://github.com/test/project",
                                  "isInteractive": false,
                                  "isFeatured": false,
                                  "technologies": ["React", "TypeScript"]
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Projeto Atualizado"))
                .andExpect(jsonPath("$.isInteractive").value(false));
    }
}
