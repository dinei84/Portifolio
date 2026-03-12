# 🔧 Backend — Java Spring Boot

> **Status:** ✅ Fase 2 — Em andamento.  
> Este documento define o plano de inicialização do backend em etapas, com foco em TDD, área admin de projetos e envio de e‑mail no contato.

Ver [architecture.md](./architecture.md) para ADRs e decisões técnicas gerais.

---

## 1. Objetivos da Fase de Backend

- **Expor uma API REST** estável para o frontend (`/api/v1/**`).
- **Manter projetos de forma dinâmica** via área admin (CRUD completo de projetos).
- **Enviar e‑mails de contato** a partir do endpoint público, sem persistir mensagens.
- **Aplicar TDD rigoroso** em serviços, controllers e integrações principais.

Critério macro de sucesso:
- Backend rodando em ambiente `dev` com Postgres via Docker,  
  Swagger acessível, endpoints principais funcionando e cobertos por testes automatizados.

---

## 2. Stack Backend Planejada

- Java 21 + Spring Boot 3.x
- Spring Data JPA + Hibernate
- PostgreSQL 16 + Flyway Migrations
- DTOs com `record` do Java 21
- Validação com Bean Validation
- TDD: JUnit 5 + Mockito + Testcontainers
- Swagger UI via SpringDoc OpenAPI
- Profiles: `dev`, `test`, `prod`
- Docker Compose: `postgres:16`, ferramenta de administração (Adminer/PgAdmin)

---

## 3. Etapa 1 — Bootstrapping do Projeto

**Objetivo:** ter uma aplicação Spring Boot mínima rodando com profiles configurados e banco via Docker.

### 3.1. Criar projeto base

- Gerar projeto Spring Boot 3.x com:
  - `spring-boot-starter-web`
  - `spring-boot-starter-validation`
  - `spring-boot-starter-data-jpa`
  - `postgresql`
  - `flyway-core`
  - `springdoc-openapi-starter-webmvc-ui`
  - `spring-boot-starter-test` (para TDD)

**Critério de pronto:**
- Aplicação sobe com `mvn spring-boot:run` (ou equivalente) usando Java 21.
- Endpoint de teste (ex.: `GET /api/v1/health`) responde `200 OK`.

### 3.2. Configurar profiles (`dev`, `test`, `prod`)

- `application.yml` com:
  - Configuração base (porta, prefixo de contexto, etc.).
  - `application-dev.yml` apontando para Postgres do Docker.
  - `application-test.yml` preparado para Testcontainers.
  - `application-prod.yml` preparado para futuro deploy.

**Critério de pronto:**
- É possível subir a aplicação explicitamente com `spring.profiles.active=dev` e `test`.

### 3.3. Docker Compose para infraestrutura

- Criar `docker-compose.yml` com:
  - Serviço `db` usando `postgres:16`.
  - Serviço opcional `adminer` ou `pgadmin`.
- Configurar usuário, senha e database via variáveis de ambiente.

**Critério de pronto:**
- `docker-compose up` sobe Postgres e a aplicação conecta com sucesso ao profile `dev`.

---

## 4. Etapa 2 — Modelagem de Domínio e Migrations

**Objetivo:** definir o modelo de dados para projetos e preparar o banco com Flyway.

### 4.1. Modelar domínio inicial

- Entidade `Project` (para área pública + admin), incluindo campos:
  - `id`, `title`, `description`, `imageUrl`, `githubUrl`, `demoUrl`,
    `isInteractive`, `technologies` (lista ou tabela relacionada).
- Entidade auxiliar para tecnologias (se necessário), por exemplo `ProjectTechnology`.

> **Nota:** Contato **não será persistido** neste momento; domínio foca em projetos.

### 4.2. Criar migrations Flyway

- `V1__init_schema.sql` contendo:
  - Tabela(s) de `projects` e tecnologias relacionadas.
- (Futuras mudanças de domínio entram como `V2__...`, `V3__...`, etc.).

**Critério de pronto:**
- Ao subir a aplicação, Flyway aplica `V1__init_schema.sql` sem erros.
- Tabelas essenciais existem no Postgres `dev`.

---

## 5. Etapa 3 — Camada de Persistência e Serviços

**Objetivo:** implementar entidades JPA, repositórios e serviços com TDD.

### 5.1. Entidades JPA

- Implementar entidades de acordo com o schema criado por Flyway.
- Garantir:
  - `@Entity`, `@Table`, chaves primárias, relacionamentos.
  - Restrições importantes (`nullable`, tamanhos) refletidas no banco.

### 5.2. Repositórios Spring Data

- Criar `ProjectRepository extends JpaRepository<Project, UUID>`.
- Preparar métodos básicos de consulta, começando por:
  - Paginação simples (`findAll(Pageable)`).

### 5.3. Serviços de domínio (com TDD)

- Criar `ProjectService` com responsabilidades:
  - Listar projetos paginados para o frontend público.
  - CRUD de projetos para área admin.
- **TDD by the book:**
  - Escrever primeiro os testes de unidade dos serviços (usando mocks de repository).
  - Depois implementar o código até os testes passarem.

**Critério de pronto:**
- Testes de serviço cobrindo casos principais:
  - Lista vazia / não vazia.
  - Criação, atualização, remoção de projetos.

---

## 6. Etapa 4 — DTOs, Mappers e Controllers Públicos

**Objetivo:** expor os endpoints públicos conforme `api-contracts.md` usando DTOs imutáveis.

### 6.1. DTOs com `record`

- Criar DTOs para camada pública:
  - `ProjectResponse` alinhado com `GET /api/v1/projects`.
  - Estrutura de paginação (`PageResponse` ou similar).
- Manter **entidades JPA escondidas** da camada de controller.

### 6.2. Mapeamento entidade ↔ DTO

- Implementar mappers manuais (ex.: `ProjectMapper`) para:
  - Converter `Project` → `ProjectResponse`.
  - Converter pedidos da área admin (DTOs de criação/atualização) → `Project`.

### 6.3. Controller público de projetos (com TDD)

- Implementar `ProjectPublicController` com:
  - `GET /api/v1/projects`:
    - Suporte a `page`, `size`.
    - Retorno no formato documentado em `api-contracts.md`.
- Testes de controller:
  - Usar `@WebMvcTest` (ou testes de integração) para garantir contrato da API.

**Critério de pronto:**
- Endpoint público de projetos responde conforme contrato planejado.
- Testes garantem estrutura e códigos de status.

---

## 7. Etapa 5 — Área Admin de Projetos (CRUD)

**Objetivo:** habilitar CRUD completo de projetos para interface administrativa.

### 7.1. Definir contratos da área admin

- Desenhar (no `api-contracts.md`) endpoints admin, exemplo:
  - `GET /api/v1/admin/projects`
  - `POST /api/v1/admin/projects`
  - `PUT /api/v1/admin/projects/{id}`
  - `DELETE /api/v1/admin/projects/{id}`
- Inicialmente, podem ser **sem autenticação**, mas já pensando em futura `Spring Security`.

### 7.2. Implementar controllers admin (com TDD)

- Escrever testes primeiro para os casos:
  - Criar projeto válido.
  - Atualizar projeto existente.
  - Remover projeto.
  - Lidando com `id` inexistente (404).
- Implementar controllers + integração com `ProjectService`.

**Critério de pronto:**
- CRUD de projetos funcional.
- Erros de negócio (ex.: projeto não encontrado) retornam respostas adequadas.

---

## 8. Etapa 6 — Endpoint de Contato com Envio de E‑mail

**Objetivo:** implementar `POST /api/v1/contact` que apenas envia e‑mail, sem persistir dados.

### 8.1. DTO de contato e validação

- Criar `ContactRequest` com campos:
  - `name`, `email`, `subject`, `message`.
- Anotar com Bean Validation:
  - `@NotBlank`, `@Email`, `@Size`, etc.

### 8.2. Serviço de envio de e‑mail (com TDD)

- Criar `ContactService` responsável por:
  - Validar dados (via Bean Validation + regras adicionais, se houver).
  - Chamar um componente de envio de e‑mail (ex.: `EmailSender`).
- No TDD:
  - Testar `ContactService` com `EmailSender` mockado.
  - Garantir que, para dados válidos, o e‑mail é disparado.

### 8.3. Controller de contato

- Implementar `ContactController` com:
  - `POST /api/v1/contact` recebendo `ContactRequest`.
  - Retornando `201 Created` + mensagem de sucesso.

**Critério de pronto:**
- Envio de e‑mail funciona em `dev` (mesmo que usando um SMTP fake/sandbox).
- Erros de validação retornam respostas claras.

---

## 9. Etapa 7 — Tratamento Global de Erros, CORS e Swagger

### 9.1. Tratamento global de erros

- Criar `@RestControllerAdvice` para:
  - `MethodArgumentNotValidException` → erros de validação.
  - Exceções de domínio (ex.: `ProjectNotFoundException`).
  - Exceção genérica.

### 9.2. CORS para o frontend

- Configurar CORS para permitir a SPA (porta 5173 em `dev`) acessar `/api/v1/**`.
- Restringir origens apropriadamente em `prod`.

### 9.3. Documentação com SpringDoc

- Configurar Swagger UI com:
  - Título, descrição, versão.
  - Agrupamento dos endpoints públicos e admin.
- Atualizar `api-contracts.md` com exemplos extraídos da documentação real.

**Critério de pronto:**
- Swagger disponível e refletindo todos os endpoints principais.
- CORS funcionando para o frontend em `dev`.

---

## 10. Etapa 8 — Testes de Integração e Qualidade

**Objetivo:** consolidar TDD com testes de integração usando Testcontainers.

- Configurar Testcontainers com PostgreSQL para testes de integração.
- Criar testes cobrindo fluxos principais:
  - Listagem de projetos (público).
  - CRUD de projetos (admin).
  - Fluxo de contato (sem envio real de e‑mail, usando mocks ou SMTP fake).

**Critério de pronto:**
- Suite de testes rodando em `mvn test` (ou equivalente) sem falhas.
- Cobertura mínima razoável nos módulos principais (serviços + controllers).

---

## 11. Próximos Passos Futuramente

- Adicionar autenticação/autorization para área admin (Spring Security + JWT ou similar).
- Observabilidade adicional (Actuator, métricas).
- Otimizações de performance e melhorias de log.

