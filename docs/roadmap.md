# 🗺️ Roadmap — Fases de Desenvolvimento

## Status Atual

| Fase | Descrição | Status |
|---|---|---|
| 🟡 **Fase 1** | Frontend React + Vite + TypeScript + TDD | 🔄 Em andamento |
| 🟠 **Fase 2** | Backend Java Spring Boot + PostgreSQL + TDD | ⏳ Pendente |
| 🔴 **Fase 3** | Integração Frontend ↔ Backend | ⏳ Pendente |
| 🟣 **Fase 4** | Projetos Interativos com API ao vivo | ⏳ Pendente |

---

## 🟡 Fase 1 — Frontend React + Vite + TypeScript

**Objetivo:** Transformar o HTML estático em SPA React com TypeScript, mantendo visual pixel-art.  
**TDD:** Vitest + React Testing Library

### Entregas
- [ ] Projeto Vite inicializado com Tailwind + typescript
- [ ] Tema pixel-art migrado (cores, fontes, animações)
- [ ] Componentes: `Navbar`, `Footer`, `PixelCard`, `PixelButton`, `SkillBar`, `ProjectCard`, `TechBadge`
- [ ] Páginas: `Home`, `About`, `Projects`, `Contact`
- [ ] Roteamento com React Router v6
- [ ] Dados mock para projetos e skills
- [ ] Formulário de contato com validação
- [ ] Cobertura de testes ≥ 80%

---

## 🟠 Fase 2 — Backend Spring Boot + TDD

**Objetivo:** API RESTful com Java 21 + Spring Boot, PostgreSQL e Flyway.

### Entregas
- [ ] Projeto Spring Boot inicializado (Spring Initializr)
- [ ] Docker Compose com PostgreSQL
- [ ] Migrations Flyway (V1–V4)
- [ ] Módulo `Project`: Entity → Repository → Service → Controller → DTOs
- [ ] Módulo `Skill`: Entity → Repository → Service → Controller → DTOs
- [ ] Módulo `Contact`: Entity → Service → Controller → DTOs + envio de e-mail
- [ ] CORS configurado
- [ ] Swagger UI (SpringDoc OpenAPI)
- [ ] Testes: Unit (Mockito) + Integration (MockMvc + Testcontainers)
- [ ] Profiles: `dev`, `test`, `prod`

---

## 🔴 Fase 3 — Integração Frontend ↔ Backend

**Objetivo:** Substituir mocks pelos dados reais da API.

### Entregas
- [ ] Axios configurado com `VITE_API_URL`
- [ ] TanStack Query para cache e loading states
- [ ] Projetos e skills carregados da API
- [ ] Formulário de contato enviando para `POST /api/v1/contact`
- [ ] Tratamento de erros e estados de loading

---

## 🟣 Fase 4 — Projetos Interativos

**Objetivo:** Feature diferenciada — demos ao vivo para recrutadores.

### Entregas
- [ ] Definir 2–3 projetos com API pública
- [ ] Componente `InteractiveProjectCard` com widget de interação
- [ ] Badge online/offline via health check
- [ ] Visualizador de resposta JSON com syntax highlight
- [ ] Serviço separado ou novo módulo no backend

---

## Backlog (Futuro)

- [ ] Painel administrativo (autenticado) para gerenciar projetos via CRUD
- [ ] Blog pessoal com CMS simples
- [ ] i18n (português/inglês)
- [ ] Dark/Light mode toggle
- [ ] SEO com React Helmet Async
- [ ] CI/CD com GitHub Actions
- [ ] Deploy: Vercel (frontend) + Railway/Fly.io (backend + DB)
- [ ] PWA com service worker
