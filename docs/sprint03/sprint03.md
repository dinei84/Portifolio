# 🚀 Sprint 03 — Padronização da API + DTO + Simplificação do Frontend

## 🎯 Objetivo da Sprint

* Implementar camada DTO no backend
* Padronizar resposta da API
* Mover conversões para o backend
* Remover adapters do frontend
* Adicionar campo `isFeatured`
* Centralizar validações no backend

---

# 🧠 Visão Arquitetural

Nesta sprint o backend passa a ser responsável por:

* Estrutura de dados (DTO)
* Conversões (Entity → DTO)
* Validações
* Contrato da API

👉 O frontend passa a ser apenas consumidor

---

# 🧱 PARTE 1 — Ajustes no Banco (Flyway)

---

## 📄 Migration V3

Criar:

```text
V3__add_is_featured_to_projects.sql
```

```sql
ALTER TABLE projects
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
```

---

# 🧩 PARTE 2 — Atualizar Entidade

📄 `Project.java`

```java
private Boolean isFeatured;
```

---

# 🧱 PARTE 3 — Criar DTOs

---

## 📄 Response DTO

📄 `project/dto/ProjectResponseDTO.java`

```java
public record ProjectResponseDTO(
    UUID id,
    String title,
    String description,
    String imageUrl,
    String githubUrl,
    String demoUrl,
    Boolean isInteractive,
    Boolean isFeatured,
    List<String> technologies
) {}
```

---

## 📄 Request DTO

📄 `project/dto/ProjectRequestDTO.java`

```java
public record ProjectRequestDTO(
    String title,
    String description,
    String imageUrl,
    String githubUrl,
    String demoUrl,
    Boolean isInteractive,
    Boolean isFeatured,
    List<String> technologies
) {}
```

---

# 🔄 PARTE 4 — Converter no Service

---

## 📄 Atualizar `ProjectService`

```java
public List<ProjectResponseDTO> findAll() {
    return repository.findAll()
        .stream()
        .map(this::toResponseDTO)
        .toList();
}

public ProjectResponseDTO findById(UUID id) {
    return repository.findById(id)
        .map(this::toResponseDTO)
        .orElseThrow(() -> new RuntimeException("Project not found"));
}
```

---

## 🔧 Mapper manual

```java
private ProjectResponseDTO toResponseDTO(Project p) {
    return new ProjectResponseDTO(
        p.getId(),
        p.getTitle(),
        p.getDescription(),
        p.getImageUrl(),
        p.getGithubUrl(),
        p.getDemoUrl(),
        p.getIsInteractive(),
        p.getIsFeatured(),
        Arrays.asList(p.getTechnologies().split(","))
    );
}
```

---

## 🔧 Converter Request → Entity

```java
private Project toEntity(ProjectRequestDTO dto) {
    return Project.builder()
        .title(dto.title())
        .description(dto.description())
        .imageUrl(dto.imageUrl())
        .githubUrl(dto.githubUrl())
        .demoUrl(dto.demoUrl())
        .isInteractive(dto.isInteractive())
        .isFeatured(dto.isFeatured())
        .technologies(String.join(",", dto.technologies()))
        .build();
}
```

---

# 🌐 PARTE 5 — Atualizar Controller

---

📄 `ProjectController.java`

```java
@GetMapping
public List<ProjectResponseDTO> findAll() {
    return service.findAll();
}

@GetMapping("/{id}")
public ProjectResponseDTO findById(@PathVariable UUID id) {
    return service.findById(id);
}

@PostMapping
public ProjectResponseDTO create(@RequestBody ProjectRequestDTO dto) {
    return service.create(dto);
}

@PutMapping("/{id}")
public ProjectResponseDTO update(@PathVariable UUID id, @RequestBody ProjectRequestDTO dto) {
    return service.update(id, dto);
}
```

---

# 🧠 PARTE 6 — Validações (Backend)

---

## 📄 Adicionar validações no DTO

```java
public record ProjectRequestDTO(

    @NotBlank
    String title,

    @NotBlank
    String description,

    String imageUrl,

    @NotBlank
    String githubUrl,

    String demoUrl,

    Boolean isInteractive,

    Boolean isFeatured,

    @NotEmpty
    List<String> technologies
) {}
```

---

## 📄 Ativar validação no Controller

```java
public ProjectResponseDTO create(@Valid @RequestBody ProjectRequestDTO dto)
```

---

# 🎨 PARTE 7 — Simplificação do Frontend

---

## 🔥 Remover adapter

📄 `projectService.ts`

ANTES:

```ts
mapProject(...)
```

DEPOIS:

```ts
return response.data;
```

---

## 🔥 Ajustar tipo

```ts
technologies: string[]
isFeatured?: boolean
```

---

## 🔥 Remover fallback de mock (opcional)

Remover lógica:

```ts
if (!VITE_API_URL)
```

---

# 🎯 Critérios de Aceite

* [ ] Backend retorna DTO (não entidade)
* [ ] `technologies` como array
* [ ] `isFeatured` funcionando
* [ ] Frontend sem adapter
* [ ] Validação funcionando (400 em erro)
* [ ] CRUD funcionando com DTO

---

# 🧪 Testes Manuais

### Criar projeto

```http
POST /api/v1/projects
```

```json
{
  "title": "Novo Projeto",
  "description": "Teste",
  "githubUrl": "https://github.com",
  "technologies": ["Java", "Spring"]
}
```

---

# 🚀 Resultado da Sprint 3

Ao final você terá:

✅ API profissional com DTO
✅ Backend controlando contrato
✅ Frontend desacoplado
✅ Dados consistentes
✅ Base pronta para autenticação

---

# 🔮 Próxima Sprint (Preview)

Sprint 4:

* Exception Handler global (padronizado)
* Paginação
* Filtros (featured, interactive)
* Início do Spring Security (login admin)

---

# 💡 Observação Final

Nesta sprint você deixa de ter:

👉 "API funcionando"

E passa a ter:

👉 **API profissional e sustentável**
