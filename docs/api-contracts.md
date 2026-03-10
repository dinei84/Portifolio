# 📡 Contratos da API REST

> **Status:** ⏳ Fase 2 — Ainda não iniciado.  
> Este arquivo será preenchido com os contratos reais quando o backend estiver implementado.  
> Após a Fase 2, o Swagger UI (`/swagger-ui.html`) será a fonte de verdade interativa.

## Endpoints Planejados

### Projetos — `GET /api/v1/projects`
```json
// Response (200 OK)
{
  "content": [
    {
      "id": "uuid",
      "title": "App de Tarefas",
      "description": "...",
      "imageUrl": "...",
      "githubUrl": "https://github.com/...",
      "demoUrl": "https://...",
      "isInteractive": false,
      "technologies": ["React", "Node.js", "MongoDB"]
    }
  ],
  "page": { "number": 0, "size": 10, "totalElements": 5 }
}
```

### Skills — `GET /api/v1/skills`
```json
// Response (200 OK)
[
  { "id": "uuid", "name": "HTML5", "level": 90, "category": "frontend" }
]
```

### Contato — `POST /api/v1/contact`
```json
// Request Body
{ "name": "João", "email": "joao@email.com", "subject": "Proposta", "message": "Olá!" }

// Response (201 Created)
{ "message": "Mensagem recebida com sucesso!" }
```

## Versionamento

- Prefixo: `/api/v1/`
- Versão no path para facilitar evolução sem quebrar clientes existentes
