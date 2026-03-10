# 🏗️ Arquitetura do Projeto

## Visão Geral

Portfólio full-stack com separação completa entre frontend (SPA React) e backend (Spring Boot REST API), usando PostgreSQL como banco relacional.

```
┌──────────────────────────────────────────────────────┐
│               INTERNET / RECRUTADOR                  │
└───────────────────┬──────────────────────────────────┘
                    │
          ┌─────────▼──────────┐
          │   FRONTEND (SPA)   │
          │  React 18 + Vite 5 │  porta 5173 (dev)
          │  TypeScript 5      │  porta 80/443 (prod)
          │  Tailwind CSS v3   │
          └─────────┬──────────┘
                    │ HTTP REST / JSON
          ┌─────────▼──────────┐
          │   BACKEND (API)    │
          │ Java 21 + Spring   │  porta 8080
          │ Boot 3.x + JPA     │
          │ DTOs + Validation  │
          └─────────┬──────────┘
                    │ JDBC
          ┌─────────▼──────────┐
          │    PostgreSQL 16   │  porta 5432
          │  Flyway Migrations │
          └────────────────────┘

     [Serviço de projetos interativos — Fase 4]
          ┌─────────────────────┐
          │  Projects Live API  │  porta 8081
          └─────────────────────┘
```

## Stack Completa

| Camada | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| Frontend language | TypeScript | 5.x | Tipagem estática, DX, menos erros runtime |
| Frontend framework | React | 18 | Demanda mercado, ecossistema |
| Build tool | Vite | 5 | HMR instantâneo, performance |
| CSS | Tailwind CSS | 3 | Já utilizado, utilitários, consistência |
| Roteamento | React Router | 6 | Padrão SPA |
| HTTP client | Axios | 1.x | Interceptors, tipagem |
| State/Cache | TanStack Query | 5 | Cache automático, loading states (Fase 3) |
| Testes front | Vitest + RTL | latest | Nativo Vite, maturidade |
| Backend language | Java | 21 LTS | Suporte longo prazo, Records |
| Backend framework | Spring Boot | 3.x | Enterprise, ecossistema |
| ORM | Spring Data JPA | 3.x | Produtividade, repositórios |
| Banco | PostgreSQL | 16 | Relacional robusto, open source |
| Migrations | Flyway | 9.x | Versionamento explícito |
| Testes back | JUnit 5 + Mockito + Testcontainers | latest | Pirâmide TDD completa |
| API Docs | SpringDoc OpenAPI | 2.x | Swagger UI automático |
| Containerização | Docker + Compose | latest | Ambiente reproduzível |

## Decisões Arquiteturais (ADRs)

### ADR-001 — SPA com REST API separada
**Decisão:** Frontend e backend completamente separados.  
**Motivo:** Permite deploy independente, escala horizontal separada, frontend pode ser servido via CDN.  
**Consequência:** CORS precisa ser configurado no backend.

### ADR-002 — DTOs em todas as trocas de dados
**Decisão:** Nunca expor entidades JPA diretamente nos controllers.  
**Motivo:** Desacopla contrato de API do modelo de dados, evita expor campos internos, facilita versionamento.  
**Consequência:** Mapeamento adicional (usar `record` do Java 21 para DTO imutável).

### ADR-003 — TDD (Red → Green → Refactor)
**Decisão:** Escrever testes antes da implementação em frontend e backend.  
**Motivo:** Força design de API limpa, documenta comportamento esperado, previne regressões.  
**Consequência:** Curva inicial mais lenta, mas velocidade maior a longo prazo.

### ADR-004 — Flyway para migrations
**Decisão:** Todas as mudanças de schema via arquivos `Vx__description.sql` versionados.  
**Motivo:** Rastreabilidade, reprodutibilidade em qualquer ambiente, histórico no git.  
**Consequência:** Nunca alterar migrations já commitadas; criar nova migration para correções.

### ADR-005 — Tailwind CSS (mantido da versão estática)
**Decisão:** Manter Tailwind CSS para a migração do frontend.  
**Motivo:** Visual pixel-art já funciona com as classes customizadas existentes; migração suave.  
**Consequência:** Configurar `tailwind.config.ts` com o tema completo do projeto anterior.

## Princípios de Código

- **SOLID** no backend Java
- **Componentes pequenos e focados** no React
- **Tipagem estrita** (`strict: true` no tsconfig)
- **Sem `any`** no TypeScript
- **Props explícitas** com tipos definidos em `src/types/`
- **Serviços separados** da UI (nunca chamar API diretamente do componente)
