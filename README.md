# 🕹️ Portfólio Pixel Art — Full Stack

Portfólio pessoal com tema pixel art, construído como uma aplicação full-stack moderna.

## Estrutura do Monorepo

```
Portifolio/
├── docs/        ← Documentação técnica e arquitetural
├── frontend/    ← SPA React + Vite + TypeScript (Fase 1 ✅)
└── backend/     ← Java 21 + Spring Boot 3 + PostgreSQL (Fase 2 - em breve)
```

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite 5 + TypeScript + Tailwind CSS v4 |
| Testes | Vitest + React Testing Library (46 testes ✅) |
| Roteamento | React Router v6 |
| HTTP | Axios |
| Backend | Java 21 + Spring Boot 3 _(Fase 2)_ |
| Banco | PostgreSQL 16 + Flyway _(Fase 2)_ |

## Como rodar

```bash
# Frontend (SPA React)
cd frontend
npm install
npm run dev          # http://localhost:5173

# Testes
npm run test:run     # all 46 tests
npm run test         # watch mode
```

## Documentação

Consulte a pasta [`docs/`](./docs/README.md) para:
- Arquitetura e decisões técnicas (ADRs)
- Convenções de código e TDD
- Roadmap das 4 fases
- Contratos da API REST _(Fase 2)_

## Roadmap

- ✅ **Fase 1** — Frontend React + Vite + TypeScript + TDD
- ⏳ **Fase 2** — Backend Spring Boot + PostgreSQL + TDD
- ⏳ **Fase 3** — Integração Frontend ↔ API
- ⏳ **Fase 4** — Projetos interativos com API ao vivo
