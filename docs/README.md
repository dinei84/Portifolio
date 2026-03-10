# 📚 Documentação — Portfólio Pixel Art

Esta pasta centraliza toda a documentação técnica do projeto para facilitar contexto em futuras features, onboarding e decisões de arquitetura.

## Índice

| Arquivo | Descrição |
|---|---|
| [architecture.md](./architecture.md) | Visão geral da arquitetura full-stack, decisões técnicas e ADRs |
| [frontend.md](./frontend.md) | Stack front-end, componentes, convenções de código e TDD |
| [backend.md](./backend.md) | Stack back-end, entidades, DTOs, API REST e estratégia TDD (Fase 2) |
| [database.md](./database.md) | Modelo de dados, migrations Flyway e seeds (Fase 2) |
| [api-contracts.md](./api-contracts.md) | Contratos REST, DTOs de request/response e exemplos (Fase 2) |
| [roadmap.md](./roadmap.md) | Fases de desenvolvimento, status e próximos passos |

## Estrutura do Monorepo

```
Portifolio/
├── frontend/    ← React + Vite + TypeScript (Fase 1 — atual)
├── backend/     ← Java 21 + Spring Boot 3 (Fase 2)
├── docs/        ← Você está aqui
├── docker-compose.yml
└── README.md
```

## Convenções Gerais

- **Commits:** `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`
- **Branches:** `main` (produção), `develop` (integração), `feature/<nome>`
- **Idioma do código:** Inglês (variáveis, funções, comentários técnicos)
- **Idioma da UI:** Português Brasil
