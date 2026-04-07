# Relatório de Implementação da Sprint 01

## Objetivo da Sprint

Implementar a base do backend com:

- arquitetura organizada
- integração com PostgreSQL
- migrations com Flyway
- API REST funcional para projetos
- dados reais via seed no banco

---

## Itens implementados com sucesso

### 1. Estrutura modular básica do backend

Foi criado o módulo `project` com separação de responsabilidades em:

- `project/domain`
- `project/repository`
- `project/service`
- `project/controller`

Também foi adicionado suporte comum para tratamento de exceções em:

- `common/exception`

Arquivos principais criados:

- [Project.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/domain/Project.java)
- [ProjectRepository.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/repository/ProjectRepository.java)
- [ProjectService.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/service/ProjectService.java)
- [ProjectController.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/controller/ProjectController.java)

### 2. Entidade JPA `Project`

Foi implementada a entidade JPA mapeando a tabela `projects` com os campos:

- `id`
- `title`
- `description`
- `imageUrl`
- `githubUrl`
- `demoUrl`
- `isInteractive`
- `technologies`
- `createdAt`

### 3. Repository para acesso ao banco

Foi criado o repositório:

- `ProjectRepository extends JpaRepository<Project, UUID>`

Isso já habilita leitura por ID e listagem sem código adicional de persistência.

### 4. Service com regra de leitura

Foi implementado `ProjectService` com os métodos:

- `findAll()`
- `findById(UUID id)`

Quando o projeto não é encontrado, o service lança exceção específica de domínio:

- [ProjectNotFoundException.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/service/ProjectNotFoundException.java)

### 5. Controller REST funcional

Foram implementados os endpoints:

- `GET /api/v1/projects`
- `GET /api/v1/projects/{id}`

Arquivo:

- [ProjectController.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/controller/ProjectController.java)

### 6. Tratamento de erro para projeto não encontrado

Foi criado um `@RestControllerAdvice` com resposta padronizada para `404` em projeto inexistente.

Arquivos:

- [GlobalExceptionHandler.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/common/exception/GlobalExceptionHandler.java)
- [ApiErrorResponse.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/common/exception/ApiErrorResponse.java)

### 7. Evolução das migrations Flyway

Foram adicionadas novas migrations sem alterar a migration inicial existente.

Novas migrations:

- [V2__add_created_at_to_projects.sql](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/resources/db/migration/V2__add_created_at_to_projects.sql)
- [V3__insert_projects.sql](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/resources/db/migration/V3__insert_projects.sql)

Essas migrations fazem:

- ajuste do tamanho de `title` para `VARCHAR(120)`
- inclusão do campo `created_at`
- inserção de dois projetos iniciais

### 8. Seed inicial com dados reais

Foram inseridos dois registros iniciais:

- `SaaS Controle de Cargas`
- `Portfolio DevDinei`

Isso permite que a API já responda com conteúdo real assim que a aplicação subir com Flyway executando normalmente.

---

## Decisões pragmáticas adotadas

Algumas decisões foram tomadas para manter a sprint simples e funcional:

- mantido o package raiz atual `com.dinei84.portifolio` para evitar refactor estrutural maior
- não foi adicionado Lombok, porque o projeto não possui a dependência configurada
- a API retorna a entidade `Project` diretamente nesta sprint, seguindo o escopo simples definido no documento
- foi adicionado tratamento mínimo de erro, mesmo não sendo exigência explícita, por ser um ganho de qualidade com baixo custo

---

## Critérios da sprint atendidos

### Implementados

- arquitetura básica organizada
- entidade JPA de projetos
- repository
- service
- controller REST
- migrations adicionais do Flyway
- seed inicial
- endpoints de leitura

### Endpoints entregues

- `GET /api/v1/projects`
- `GET /api/v1/projects/{id}`

---

## Pendências e limitações encontradas

### Validação automatizada com Maven

Não foi possível concluir a execução do comando de validação do backend no ambiente atual porque o wrapper Maven local falhou antes de iniciar o Maven.

Falha observada:

- `mvnw.cmd` retorna `Cannot start maven from wrapper`

Impacto:

- a implementação foi concluída em código
- a validação por build/teste automatizado ficou pendente de execução no ambiente

### O que validar assim que o Maven estiver funcional

1. subir o PostgreSQL do `docker-compose.yml`
2. rodar `mvn test` ou `mvn spring-boot:run`
3. confirmar execução das migrations
4. validar os endpoints manualmente

---

## Resultado final da Sprint 01

Ao final da implementação, o backend agora possui:

- base modular inicial
- persistência com JPA
- leitura de projetos via API REST
- seed de dados no banco
- evolução segura por Flyway
- tratamento mínimo para `404`

Em termos práticos, a Sprint 01 saiu do estágio de backend apenas estrutural para backend já preparado para expor dados reais de projetos.

---

## Próximo passo recomendado

A próxima evolução mais segura é:

1. validar a aplicação rodando com PostgreSQL real
2. integrar o frontend React ao endpoint `GET /api/v1/projects`
3. substituir os mocks de projetos
4. na sprint seguinte, introduzir DTOs para desacoplar a API da entidade
