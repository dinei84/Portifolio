# 🚀 Sprint 01 — Backend Base (DevDinei)

## 🎯 Objetivo da Sprint

Implementar a base do backend com:

* Arquitetura organizada (monólito modular simples)
* Integração com PostgreSQL
* Migrations com Flyway
* API REST funcional para projetos
* Dados reais (seed no banco)

---

# 🧱 Arquitetura (Simples e Correta)

Estrutura base:

```
com.devdinei.portfolio

common/
  exception/
  config/

project/
  controller/
  service/
  domain/
  repository/
```

### Responsabilidades

* **Controller** → HTTP (entrada/saída)
* **Service** → regra de negócio
* **Repository** → acesso ao banco
* **Domain** → entidade JPA

---

# 🗄 Banco de Dados (Flyway)

## 📁 Local padrão

```
src/main/resources/db/migration
```

---

## 🧩 Migration V1 — Criação da tabela

📄 `V1__create_projects_table.sql`

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    is_interactive BOOLEAN DEFAULT FALSE,
    technologies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌱 Migration V2 — Seed inicial

📄 `V2__insert_projects.sql`

```sql
INSERT INTO projects (
    id, title, description, image_url, github_url, demo_url, is_interactive, technologies
) VALUES
(
    gen_random_uuid(),
    'SaaS Controle de Cargas',
    'Sistema para gestão de cargas com controle logístico',
    'https://via.placeholder.com/300',
    'https://github.com/devdinei/cargas-saas',
    'https://demo-cargas.com',
    true,
    'Java,Spring Boot,PostgreSQL,React'
),
(
    gen_random_uuid(),
    'Portfólio DevDinei',
    'Aplicação full-stack com React e Spring Boot',
    'https://via.placeholder.com/300',
    'https://github.com/devdinei/portfolio',
    null,
    false,
    'Java,Spring Boot,React'
);
```

---

# ☕ Backend — Implementação

## 📦 Entidade (Domain)

📄 `project/domain/Project.java`

```java
@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    private UUID id;

    private String title;

    private String description;

    private String imageUrl;

    private String githubUrl;

    private String demoUrl;

    private Boolean isInteractive;

    private String technologies;

    private LocalDateTime createdAt;
}
```

---

## 🗃 Repository

📄 `project/repository/ProjectRepository.java`

```java
public interface ProjectRepository extends JpaRepository<Project, UUID> {
}
```

---

## ⚙️ Service

📄 `project/service/ProjectService.java`

```java
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;

    public List<Project> findAll() {
        return repository.findAll();
    }

    public Project findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }
}
```

---

## 🌐 Controller

📄 `project/controller/ProjectController.java`

```java
@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    @GetMapping
    public List<Project> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Project findById(@PathVariable UUID id) {
        return service.findById(id);
    }
}
```

---

# 🔧 Configuração (application.yml)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/devdinei_portfolio
    username: postgres
    password: postgres

  jpa:
    hibernate:
      ddl-auto: validate

  flyway:
    enabled: true
    locations: classpath:db/migration
```

---

# ✅ Critérios de Aceite

* [ ] Aplicação sobe sem erro
* [ ] Flyway executa migrations automaticamente
* [ ] Tabela `projects` criada
* [ ] Dados inseridos automaticamente
* [ ] Endpoint funcionando:

```
GET /api/v1/projects
GET /api/v1/projects/{id}
```

---

# 🧪 Teste Manual

Acessar:

```
http://localhost:8080/api/v1/projects
```

Resposta esperada:

```json
[
  {
    "title": "SaaS Controle de Cargas",
    "isInteractive": true
  }
]
```

---

# ⚠️ Regras importantes (Flyway)

* Nunca editar migrations já executadas
* Sempre criar novas versões (V3, V4, etc)
* Nome padrão obrigatório:

```
V<versao>__<descricao>.sql
```

---

# 🚀 Próxima Sprint (Preview)

Sprint 2 será responsável por:

* Integração com frontend (React)
* Remover mocks
* Consumir API real
* Renderizar projetos dinâmicos

---

# 🏁 Resultado esperado da Sprint 1

Ao final desta sprint você terá:

✅ Backend funcional
✅ Banco versionado com Flyway
✅ API REST real
✅ Dados persistidos
✅ Arquitetura organizada

---

## 💡 Observação Final

Nesta sprint:

* Simplicidade > perfeição
* Funcionando > complexo
* Evolução gradual > overengineering
