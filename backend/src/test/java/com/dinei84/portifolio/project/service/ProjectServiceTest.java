package com.dinei84.portifolio.project.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dinei84.portifolio.project.domain.Project;
import com.dinei84.portifolio.project.dto.ProjectRequestDTO;
import com.dinei84.portifolio.project.dto.ProjectResponseDTO;
import com.dinei84.portifolio.project.repository.ProjectRepository;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository repository;

    private ProjectService service;

    @BeforeEach
    void setUp() {
        service = new ProjectService(repository);
    }

    @Test
    void shouldMapEntityListToResponseDto() {
        Project project = buildProject();
        when(repository.findAll()).thenReturn(List.of(project));

        List<ProjectResponseDTO> response = service.findAll();

        assertThat(response).hasSize(1);
        assertThat(response.getFirst().technologies()).containsExactly("Java", "Spring Boot", "React");
        assertThat(response.getFirst().isFeatured()).isTrue();
    }

    @Test
    void shouldCreateProjectFromRequestDto() {
        ProjectRequestDTO dto = new ProjectRequestDTO(
                "Novo Projeto",
                "Descricao",
                "https://image.test/project.png",
                "https://github.com/test/project",
                "https://demo.test/project",
                true,
                true,
                List.of("Java", "Spring Boot"));

        when(repository.save(any(Project.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProjectResponseDTO response = service.create(dto);
        ArgumentCaptor<Project> captor = ArgumentCaptor.forClass(Project.class);
        verify(repository).save(captor.capture());

        Project savedProject = captor.getValue();
        assertThat(savedProject.getId()).isNotNull();
        assertThat(savedProject.getCreatedAt()).isNotNull();
        assertThat(savedProject.getTechnologies()).isEqualTo("Java,Spring Boot");
        assertThat(savedProject.getIsFeatured()).isTrue();
        assertThat(response.technologies()).containsExactly("Java", "Spring Boot");
    }

    @Test
    void shouldUpdateExistingProject() {
        UUID id = UUID.randomUUID();
        Project existingProject = buildProject();
        existingProject.setId(id);

        ProjectRequestDTO dto = new ProjectRequestDTO(
                "Projeto Atualizado",
                "Descricao nova",
                null,
                "https://github.com/test/new-project",
                null,
                false,
                false,
                List.of("TypeScript", "React"));

        when(repository.findById(id)).thenReturn(Optional.of(existingProject));
        when(repository.save(any(Project.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProjectResponseDTO response = service.update(id, dto);

        assertThat(response.title()).isEqualTo("Projeto Atualizado");
        assertThat(response.technologies()).containsExactly("TypeScript", "React");
        assertThat(existingProject.getIsInteractive()).isFalse();
        assertThat(existingProject.getIsFeatured()).isFalse();
    }

    @Test
    void shouldThrowWhenProjectDoesNotExist() {
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById(id))
                .isInstanceOf(ProjectNotFoundException.class)
                .hasMessageContaining(id.toString());
    }

    private Project buildProject() {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setTitle("Projeto Base");
        project.setDescription("Descricao base");
        project.setImageUrl("https://image.test/base.png");
        project.setGithubUrl("https://github.com/test/base");
        project.setDemoUrl("https://demo.test/base");
        project.setIsInteractive(true);
        project.setIsFeatured(true);
        project.setTechnologies("Java,Spring Boot,React");
        project.setCreatedAt(LocalDateTime.now());
        return project;
    }
}
