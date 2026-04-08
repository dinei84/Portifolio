# 🚀 Sprint 02 — Diagnóstico do Frontend + Estratégia de Integração

## 🎯 Objetivo da Sprint

* Analisar o estado atual do frontend existente
* Identificar dependências de dados (mocks vs API)
* Mapear pontos de integração com backend
* Definir estratégia segura de integração
* Preparar base para substituir mocks por API real

---

# 🧠 CONTEXTO DO PROJETO

* Frontend já está desenvolvido (React + TypeScript + Vite)
* Backend foi implementado com:

  * Spring Boot
  * PostgreSQL
  * Flyway
  * API REST (`/api/v1/projects`)

👉 O frontend atualmente utiliza **dados mockados**

---

# 🔍 PARTE 1 — Diagnóstico do Frontend

## 🎯 Objetivo

Identificar:

* Onde os dados estão sendo consumidos
* Como os dados estão estruturados
* Onde estão os mocks
* Como os componentes dependem desses dados

---

## 📋 Tarefas

### 1. Localizar mocks

Procurar arquivos como:

```text
mocks/
data/
fakeData/
```

---

### 2. Identificar estrutura dos dados

Encontrar interface/type usada:

```ts
type Project = {
  id: string;
  title: string;
  description: string;
  ...
}
```

---

### 3. Identificar pontos de uso

Buscar por:

```ts
import { projects } from ...
```

ou:

```ts
useState(mockProjects)
```

---

### 4. Mapear fluxo de dados

Responder:

* Onde os dados entram?
* Quais componentes consomem?
* Existe paginação?
* Existe loading?
* Existe tratamento de erro?

---

# 📊 Resultado Esperado do Diagnóstico

Gerar um relatório contendo:

## ✔ Estrutura atual do frontend

## ✔ Onde os mocks estão sendo usados

## ✔ Como os dados são renderizados

## ✔ Quais componentes serão impactados

---

# 🔗 PARTE 2 — Comparação Frontend vs Backend

---

## 🎯 Objetivo

Garantir compatibilidade entre:

👉 Estrutura do frontend
👉 Resposta da API

---

## 📋 Tarefas

### 1. Validar contrato da API

Endpoint:

```http
GET /api/v1/projects
```

Resposta esperada:

```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "githubUrl": "string",
    "demoUrl": "string",
    "isInteractive": true,
    "technologies": "string"
  }
]
```

---

### 2. Comparar com interface do frontend

Verificar:

* Nomes dos campos
* Tipos
* Campos opcionais

---

### 3. Identificar divergências

Exemplo:

* frontend usa `name` vs backend usa `title`
* frontend espera array, backend envia string
* campos faltando

---

# 🛠 PARTE 3 — Estratégia de Integração

---

## 🎯 Abordagem recomendada

👉 NÃO quebrar o frontend existente
👉 Criar camada de adaptação (service)

---

## 📦 Criar camada de API

📄 `src/services/api.ts`

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
```

---

## 📦 Criar adapter de dados

📄 `src/services/projectService.ts`

Responsável por:

* Buscar dados da API
* Adaptar formato se necessário
* Retornar no formato esperado pelo frontend

---

## 🧠 Exemplo de adaptação

```ts
const mapProject = (p: any) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  image: p.imageUrl,
});
```

---

# 🔄 PARTE 4 — Substituição Gradual dos Mocks

---

## 🎯 Estratégia segura

👉 NÃO remover tudo de uma vez

---

## 📋 Passos

### 1. Criar nova fonte de dados (API)

### 2. Testar em um componente isolado

### 3. Validar renderização

### 4. Substituir mocks gradualmente

---

# ⚠️ PARTE 5 — CORS (Obrigatório)

Sem isso a integração NÃO funciona.

---

## Backend Config

```java
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return registry -> registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("*");
    }
}
```

---

# 🎯 Critérios de Aceite

* [ ] Diagnóstico completo do frontend
* [ ] Estrutura de dados mapeada
* [ ] Divergências identificadas
* [ ] Service de integração criado
* [ ] Primeiro componente consumindo API real
* [ ] Mocks parcialmente substituídos

---

# 🚀 Resultado da Sprint 2

Ao final desta sprint você terá:

✅ Entendimento completo do frontend
✅ Integração iniciada com segurança
✅ API conectada sem quebrar UI
✅ Base pronta para migração total

---

# 🔮 Próxima Sprint (Preview)

Sprint 3:

* Substituir 100% dos mocks
* DTO no backend
* Padronização de resposta
* Tratamento de erros
* Loading states no frontend

---
