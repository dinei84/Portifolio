# Sprint 03 Finaly

## Status

Sprint 03 concluida.

## Objetivo entregue

Foram concluidos os objetivos principais definidos em [sprint03.md](/C:/Users/g10ar/Documents/GitHub/Portifolio/docs/sprint03/sprint03.md):

- backend passou a expor DTO em vez de entidade JPA
- campo `isFeatured` foi adicionado na persistencia e no contrato da API
- conversoes passaram para o backend
- frontend foi simplificado para consumir o contrato final
- validacoes de request foram centralizadas no backend
- endpoints de criacao e atualizacao foram adicionados ao modulo `Project`

## Alteracoes implementadas

### Backend

- Entidade atualizada em [Project.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/domain/Project.java)
  - adicionado campo `isFeatured`

- DTOs criados:
  - [ProjectRequestDTO.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/dto/ProjectRequestDTO.java)
  - [ProjectResponseDTO.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/dto/ProjectResponseDTO.java)

- Service atualizado em [ProjectService.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/service/ProjectService.java)
  - `findAll()` retorna `List<ProjectResponseDTO>`
  - `findById()` retorna `ProjectResponseDTO`
  - criado `create(ProjectRequestDTO)`
  - criado `update(UUID, ProjectRequestDTO)`
  - mapeamento `Entity -> DTO`
  - mapeamento `Request DTO -> Entity`
  - conversao de `technologies` entre `String` e `List<String>`

- Controller atualizado em [ProjectController.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/controller/ProjectController.java)
  - `GET /api/v1/projects`
  - `GET /api/v1/projects/{id}`
  - `POST /api/v1/projects`
  - `PUT /api/v1/projects/{id}`

- Validacao e erro `400` adicionados em [GlobalExceptionHandler.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/common/exception/GlobalExceptionHandler.java)
  - tratamento de `MethodArgumentNotValidException`
  - resposta padronizada com `VALIDATION_ERROR`

- Migration criada em [V4__add_is_featured_to_projects.sql](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/resources/db/migration/V4__add_is_featured_to_projects.sql)
  - adiciona coluna `is_featured`
  - marca os projetos seedados atuais como `featured`

### Frontend

- Service simplificado em [projectService.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/services/projectService.ts)
  - removido adapter `mapProject`
  - removida normalizacao local de `technologies`
  - `getProjects()` agora retorna `response.data` diretamente

- A pagina [Projects.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.tsx) permaneceu no fluxo assíncrono criado na sprint anterior
  - loading
  - erro
  - consumo do service

- Configuracao de build corrigida em [vite.config.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/vite.config.ts)
  - `defineConfig` foi ajustado para `vitest/config`
  - isso corrigiu o erro de tipagem da chave `test` durante `npm run build`

## Correcoes necessarias que foram feitas

Durante a implementacao foi necessario corrigir alguns pontos para a sprint fechar de forma consistente:

- O documento da sprint sugeria a migration `V3__add_is_featured_to_projects.sql`, mas esse nome nao podia ser usado porque o projeto ja possui [V3__insert_projects.sql](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/resources/db/migration/V3__insert_projects.sql).
  - correcao aplicada: criada `V4__add_is_featured_to_projects.sql`

- O exemplo da sprint usava `Project.builder()`, mas a entidade atual nao usa builder.
  - correcao aplicada: mapeamento feito com construcao manual da entidade

- O frontend ainda compensava divergencias do backend em `projectService.ts`.
  - correcao aplicada: a conversao foi movida para o backend e o adapter foi removido

- O backend so possuia leitura (`GET`) e ainda expunha a entidade JPA diretamente.
  - correcao aplicada: a API agora expõe DTO e suporta `POST` e `PUT`

- O backend tinha tratamento para `404`, mas nao para erro de validacao.
  - correcao aplicada: `400 VALIDATION_ERROR` foi implementado

- A validacao final revelou que o frontend nao buildava por causa da tipagem do `vite.config.ts`.
  - correcao aplicada: troca de import de `defineConfig` para `vitest/config`

## Validacao executada

### Frontend

Comando executado:

```powershell
npm run test:run -- src/pages/Projects.test.tsx src/components/ui/ProjectCard.test.tsx
npm run build
```

Resultado:

- 12 testes aprovados
- build de producao concluida com sucesso

### Backend

Comandos executados:

```powershell
.\mvnw.cmd -q -DskipTests compile
.\mvnw.cmd -q "-Dtest=ProjectServiceTest,ProjectControllerTest" test
```

Resultado:

- compilacao do backend concluida sem erro
- testes unitarios novos do modulo `Project` aprovados

## Testes adicionados

- [ProjectServiceTest.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/test/java/com/dinei84/portifolio/project/service/ProjectServiceTest.java)
  - mapeamento de DTO
  - criacao
  - atualizacao
  - not found

- [ProjectControllerTest.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/test/java/com/dinei84/portifolio/project/controller/ProjectControllerTest.java)
  - criacao com payload valido
  - erro `400` com payload invalido
  - atualizacao com payload valido

## Resultado final da sprint

Ao final desta sprint o projeto ficou com:

- API de projetos com DTO
- `technologies` retornando como array no contrato de resposta
- `isFeatured` persistido e exposto pela API
- validacao centralizada no backend
- frontend desacoplado da conversao de dados
- base pronta para filtros e evolucoes da sprint 04

## Observacao

Existem mudancas nao relacionadas ja presentes no worktree em `docs/`. Elas nao foram revertidas nem alteradas por esta entrega.
