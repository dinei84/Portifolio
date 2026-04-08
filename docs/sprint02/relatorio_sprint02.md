# Relatorio Sprint 02

## Estrutura atual do frontend

- O frontend React esta em [frontend/src](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src).
- Os tipos ficam em [frontend/src/types](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/types).
- Os mocks ficam em [frontend/src/mocks](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/mocks).
- A camada de servicos fica em [frontend/src/services](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/services).
- A renderizacao da listagem de projetos acontece em [frontend/src/pages/Projects.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.tsx) e os cards em [frontend/src/components/ui/ProjectCard.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/components/ui/ProjectCard.tsx).

## Onde os mocks estao sendo usados

- Projetos mockados definidos em [frontend/src/mocks/projects.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/mocks/projects.ts).
- Skills mockadas definidas em [frontend/src/mocks/skills.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/mocks/skills.ts).
- A pagina About ainda consome `mockSkills` diretamente em [frontend/src/pages/About.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/About.tsx).
- A pagina Projects consumia `mockProjects` diretamente e foi migrada para `getProjects()` em [frontend/src/pages/Projects.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.tsx).
- O fallback para mock continua disponivel em [frontend/src/services/projectService.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/services/projectService.ts) quando `VITE_API_URL` nao estiver definido.

## Estrutura de dados atual

### Frontend

- O tipo de projeto do frontend esta em [frontend/src/types/Project.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/types/Project.ts).
- Campos atuais:
  - `id: string`
  - `title: string`
  - `description: string`
  - `imageUrl?: string`
  - `githubUrl: string`
  - `demoUrl?: string`
  - `technologies: string[]`
  - `isFeatured?: boolean`
  - `isInteractive?: boolean`

### Backend

- O endpoint real esta em [backend/src/main/java/com/dinei84/portifolio/project/controller/ProjectController.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/controller/ProjectController.java).
- A entidade retornada hoje esta em [backend/src/main/java/com/dinei84/portifolio/project/domain/Project.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/project/domain/Project.java).
- Campos atuais:
  - `id: UUID`
  - `title: String`
  - `description: String`
  - `imageUrl: String`
  - `githubUrl: String`
  - `demoUrl: String`
  - `isInteractive: Boolean`
  - `technologies: String`
  - `createdAt: LocalDateTime`

## Fluxo de dados

- Entrada de dados: agora a pagina de projetos chama `getProjects()` em [frontend/src/pages/Projects.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.tsx).
- Adaptacao: o service converte a resposta do backend para o shape do frontend em [frontend/src/services/projectService.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/services/projectService.ts).
- Consumo: cada item e renderizado por [frontend/src/components/ui/ProjectCard.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/components/ui/ProjectCard.tsx).
- Paginacao: nao existe.
- Loading: foi adicionado na pagina Projects.
- Tratamento de erro: foi adicionado na pagina Projects.

## Divergencias frontend vs backend

- `technologies`: frontend espera `string[]`, backend retorna `String` simples.
- `id`: frontend usa string genérica; backend retorna UUID serializado como string.
- `isFeatured`: existe no frontend mockado, nao existe no backend atual.
- `/projects/featured`: esperado pelo service antigo, nao existe no backend atual.
- `/projects/interactive`: esperado pelo service antigo, nao existe no backend atual.
- `createdAt`: existe no backend, nao e usado pelo frontend.

## Estrategia aplicada

- Foi mantida uma camada de adaptacao em [frontend/src/services/projectService.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/services/projectService.ts).
- O service agora:
  - usa mock quando `VITE_API_URL` nao estiver definido
  - chama `GET /projects` quando a API estiver configurada
  - converte `technologies` de string para array
  - normaliza campos opcionais
- O primeiro componente integrado com API real foi [frontend/src/pages/Projects.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.tsx).

## CORS

- Nao havia configuracao de CORS no backend.
- Foi adicionada configuracao em [backend/src/main/java/com/dinei84/portifolio/config/CorsConfig.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/config/CorsConfig.java) liberando `http://localhost:5173` para `/api/**`.

## Componentes impactados

- [frontend/src/pages/Projects.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.tsx)
- [frontend/src/services/projectService.ts](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/services/projectService.ts)
- [frontend/src/pages/Projects.test.tsx](/C:/Users/g10ar/Documents/GitHub/Portifolio/frontend/src/pages/Projects.test.tsx)
- [backend/src/main/java/com/dinei84/portifolio/config/CorsConfig.java](/C:/Users/g10ar/Documents/GitHub/Portifolio/backend/src/main/java/com/dinei84/portifolio/config/CorsConfig.java)

## Proximos passos

- Criar DTO no backend para devolver `technologies` como array.
- Decidir se `isFeatured` continuara existindo e expor esse campo na API se necessario.
- Migrar o restante do frontend que ainda usa mocks diretamente, comecando por skills.
