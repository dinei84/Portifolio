# Relatório Técnico de Implementação V1

## Contexto

Este relatório consolida o estado atual do projeto **DevDinei / Portifolio** com base na estrutura real do monorepo e propõe uma linha de implementação pragmática para evolução segura do backend.

Escopo considerado:

- Monorepo com frontend React + TypeScript + Vite
- Backend Java 21 + Spring Boot + PostgreSQL + Flyway
- Arquitetura alvo de monólito modular
- Evolução inicial focada em projetos públicos

---

## 1. Diagnóstico do Estado Atual

### Nível de maturidade do backend

O backend está em fase inicial de fundação técnica. A base escolhida é correta para um projeto profissional:

- Java 21
- Spring Boot 3.4
- Spring Data JPA
- Flyway
- PostgreSQL
- SpringDoc OpenAPI
- Testcontainers

Na prática, porém, o backend ainda está no estágio de bootstrap. Hoje ele possui:

- aplicação principal configurada
- profiles de ambiente
- migration inicial
- endpoint de health check
- dependências corretas para crescer com segurança

Isso significa que a infraestrutura está bem encaminhada, mas a API de negócio ainda não começou de fato.

### Principais lacunas

Ainda faltam os elementos centrais de uma API profissional:

- entidades JPA
- repositories
- services
- controllers de negócio
- DTOs
- mapeamento entre entidade e DTO
- tratamento global de erros
- validação de entrada
- CORS para integração com o frontend
- testes de unidade e integração dos fluxos reais

Também existe um ponto importante de alinhamento: o frontend hoje consome `Project[]`, enquanto a documentação do backend já sugere paginação em `GET /api/v1/projects`.

### Riscos técnicos

- Expor entidades JPA diretamente no controller para ganhar velocidade no curto prazo
- Misturar responsabilidade HTTP com regra de negócio
- Crescer a estrutura em pacotes genéricos como `controllers`, `services` e `repositories` sem modularização por domínio
- Deixar o contrato da API divergente do que o frontend já espera
- Modelar `technologies` como texto único e depois ter dificuldade de evolução
- Adiar tratamento de erros e padronização de resposta até tarde demais

---

## 2. Avaliação da Arquitetura Atual

### A estrutura atual está adequada?

Para o estágio atual, sim. Para evolução segura, ainda não.

A estrutura atual é suficiente para iniciar a aplicação, validar banco, profiles e documentação. Mas ela ainda não está organizada para sustentar crescimento com clareza, isolamento de responsabilidades e manutenção simples.

### Já existe separação de responsabilidades?

Ainda não de forma real.

Hoje existe basicamente:

- um controller técnico de health check
- migration inicial de banco
- configuração de ambiente

Não existe ainda separação implementada entre:

- camada web
- camada de aplicação / serviço
- persistência
- contratos de entrada e saída

### O projeto está preparado para escalar?

Está preparado para crescer com pouca refatoração, desde que a organização correta seja feita agora.

O ponto positivo é que a stack é adequada e a intenção arquitetural está bem definida. O ponto de atenção é que a implementação ainda não materializou o desenho proposto.

---

## 3. Recomendações Arquiteturais de Curto Prazo

Objetivos considerados:

- simplicidade
- código limpo
- evolução segura
- evitar overengineering

### Estrutura de pacotes ideal

Para um monólito modular pragmático, a melhor organização inicial é por domínio e não por tipo técnico global.

Exemplo recomendado:

```text
com.dinei84.portifolio
  common
    api
    config
    exception
  project
    controller
    domain
    dto
    mapper
    repository
    service
  contact
    controller
    dto
    service
```

Essa organização é melhor que uma estrutura assim:

```text
controllers/
services/
repositories/
entities/
```

Porque evita que o projeto vire um monólito sem fronteiras internas claras.

### Uso correto das camadas

#### Controller

Responsável por:

- receber requisições HTTP
- validar entrada
- chamar a camada de serviço
- devolver DTO e status code

Não deve:

- conter regra de negócio
- conhecer persistência diretamente
- retornar entidade JPA

#### Service

Responsável por:

- implementar caso de uso
- aplicar regra de negócio
- coordenar repository e mapper
- lançar exceções de domínio

Não deve:

- depender de `ResponseEntity`
- tratar detalhe de protocolo HTTP

#### Repository

Responsável por:

- acesso a dados
- queries e paginação

Não deve:

- concentrar regra de negócio
- decidir comportamento da API

### DTO desde o início?

Sim. Deve usar DTO desde o primeiro endpoint.

Isso não é complexidade desnecessária. É a proteção mínima para:

- desacoplar API e banco
- preservar liberdade de evolução
- evitar expor detalhes internos da entidade
- manter contrato estável para o frontend

Sugestão inicial:

- `ProjectSummaryResponse`
- `ProjectDetailResponse`
- `CreateProjectRequest`
- `UpdateProjectRequest`
- `PageResponse<T>`

Preferência: usar `record` em Java 21 para DTOs.

### Mapper manual ou MapStruct?

Neste estágio, prefira mapper manual.

Motivos:

- baixo número de classes
- baixo volume de transformação
- mais transparência
- menos ferramenta para manter

MapStruct passa a valer quando o número de DTOs e regras de mapeamento crescer o bastante para gerar repetição real.

### Como evitar acoplamento

- nunca expor entidade JPA no controller
- não deixar service depender de HTTP
- não colocar regra no repository
- não montar resposta de API a partir de entidade sem DTO
- separar contrato público e contrato admin
- alinhar API com o frontend antes de integrar

---

## 4. Modelo de Implementação Inicial do MVP

Fluxos alvo:

- `GET /api/v1/projects`
- `GET /api/v1/projects/{id}`

### Responsabilidade de cada camada

#### GET /api/v1/projects

**Controller**

- recebe `page` e `size`
- aplica validação de limites
- chama o service
- devolve resposta paginada

**Service**

- consulta projetos paginados
- define ordenação padrão, se necessário
- converte o resultado para DTO de saída

**Repository**

- executa `findAll(Pageable)`

**Mapper**

- converte `Project` para `ProjectSummaryResponse`

#### GET /api/v1/projects/{id}

**Controller**

- recebe `UUID`
- chama o service
- devolve DTO detalhado

**Service**

- busca projeto por id
- lança exceção de domínio quando não encontrado

**Repository**

- executa `findById`

**Mapper**

- converte `Project` para `ProjectDetailResponse`

### Onde usar DTO

Usar DTO em toda borda HTTP.

Sugestão:

- lista: `ProjectSummaryResponse`
- detalhe: `ProjectDetailResponse`
- paginação: `PageResponse<ProjectSummaryResponse>`

### Onde aplicar validação

Para os dois GETs:

- `@PathVariable UUID id`
- limites para `page` e `size`
- tamanho máximo de página, por exemplo `20`

Nos endpoints de escrita, a validação deve ser mais forte com Bean Validation.

### Como tratar erros

Criar `@RestControllerAdvice` desde o início.

Mapeamentos mínimos:

- `ProjectNotFoundException` -> `404 Not Found`
- erro de parâmetro inválido -> `400 Bad Request`
- exceção inesperada -> `500 Internal Server Error`

Formato recomendado de erro:

```json
{
  "timestamp": "2026-04-07T10:00:00Z",
  "status": 404,
  "error": "PROJECT_NOT_FOUND",
  "message": "Project not found",
  "path": "/api/v1/projects/123"
}
```

---

## 5. Roadmap Técnico Seguro

Ordem sugerida de evolução:

1. Revisar o schema da tabela `projects`
2. Criar entidade `Project`
3. Criar `ProjectRepository`
4. Criar DTOs de saída
5. Criar mapper manual
6. Criar `ProjectService`
7. Criar `ProjectController`
8. Criar exceções de domínio
9. Implementar `GlobalExceptionHandler`
10. Criar testes unitários de service
11. Criar testes de controller
12. Criar testes de integração com banco
13. Ajustar contrato do frontend para consumir a resposta real
14. Configurar CORS
15. Refinar Swagger/OpenAPI
16. Só então avançar para CRUD admin e contato

---

## 6. Erros Comuns a Evitar

- retornar entidade JPA diretamente no controller
- colocar regra de negócio no controller
- criar service apenas como repasse sem responsabilidade clara
- usar o mesmo DTO para leitura e escrita
- misturar contratos públicos e administrativos
- crescer sem padronizar resposta de erro
- ignorar paginação desde o início
- modelar banco apenas pensando no mock do frontend
- adotar abstrações demais cedo demais
- deixar testes para o final
- criar pacotes genéricos demais sem modularização real

---

## 7. Nível de Maturidade Esperado Após as Melhorias

Depois dessas melhorias, o projeto passa a ser percebido como um backend com direção profissional.

O diferencial para recrutadores não será apenas a stack usada, mas a qualidade da estrutura:

- separação clara de responsabilidades
- contrato de API consistente
- uso correto de DTO
- tratamento de erro padronizado
- migrations versionadas
- testes cobrindo fluxo real
- organização pronta para evolução

Isso transmite maturidade de engenharia sem cair em complexidade desnecessária.

---

## 8. Sugestões Práticas de Implementação

Esta seção resume decisões concretas para a primeira versão do backend.

### 8.1. Estrutura inicial recomendada para o módulo `project`

```text
backend/src/main/java/com/dinei84/portifolio/project
  controller/
    ProjectController.java
  domain/
    Project.java
  dto/
    ProjectSummaryResponse.java
    ProjectDetailResponse.java
    PageResponse.java
  mapper/
    ProjectMapper.java
  repository/
    ProjectRepository.java
  service/
    ProjectService.java
    ProjectServiceImpl.java
```

Suporte comum:

```text
backend/src/main/java/com/dinei84/portifolio/common
  exception/
    GlobalExceptionHandler.java
    ProjectNotFoundException.java
  api/
    ErrorResponse.java
```

### 8.2. Contrato sugerido para `GET /api/v1/projects`

```json
{
  "content": [
    {
      "id": "uuid",
      "title": "DevDinei API",
      "description": "Projeto backend com Spring Boot",
      "imageUrl": "https://...",
      "githubUrl": "https://github.com/...",
      "demoUrl": "https://...",
      "isInteractive": false,
      "technologies": ["Java", "Spring Boot", "PostgreSQL"]
    }
  ],
  "page": {
    "number": 0,
    "size": 10,
    "totalElements": 1
  }
}
```

### 8.3. Contrato sugerido para `GET /api/v1/projects/{id}`

```json
{
  "id": "uuid",
  "title": "DevDinei API",
  "description": "Projeto backend com Spring Boot",
  "imageUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "demoUrl": "https://...",
  "isInteractive": false,
  "technologies": ["Java", "Spring Boot", "PostgreSQL"]
}
```

### 8.4. Sugestão de interface do repository

```java
public interface ProjectRepository extends JpaRepository<Project, UUID> {
}
```

Se quiser manter o MVP simples, isso já basta no início.

### 8.5. Sugestão de responsabilidades do service

O service deve expor algo próximo disso:

```java
PageResponse<ProjectSummaryResponse> findAll(int page, int size);
ProjectDetailResponse findById(UUID id);
```

Isso evita que controller precise conhecer entidade, `Page<Project>` ou detalhes de persistência.

### 8.6. Sugestão para modelagem de `technologies`

Hoje o banco usa `TEXT`. Para o MVP, há duas rotas pragmáticas:

**Opção A: manter simples no início**

- persistir como texto delimitado
- converter para lista no mapper
- aceitar que isso é provisório

**Opção B: já corrigir antes de crescer**

- criar tabela relacionada para tecnologias do projeto
- modelar como coleção
- ganhar consistência e evolução futura

Recomendação pragmática:

Se o foco é publicar rápido o MVP, a opção A é aceitável com consciência técnica.
Se você quer deixar o backend mais sólido desde o começo, a opção B é melhor.

### 8.7. Sugestão de testes mínimos

Primeira camada de testes relevante:

- teste unitário de `ProjectService`
- teste de controller para `GET /api/v1/projects`
- teste de controller para `GET /api/v1/projects/{id}`
- teste de integração com banco validando migration + leitura

### 8.8. Sugestão de próximos passos imediatos

1. criar módulo `project`
2. modelar entidade `Project`
3. implementar repository
4. criar DTOs e mapper manual
5. implementar os dois endpoints GET
6. padronizar erro com `@RestControllerAdvice`
7. alinhar frontend ao payload real

---

## Conclusão

O projeto já tem uma base técnica correta para crescer com qualidade. O principal agora não é adicionar tecnologia, mas transformar a intenção arquitetural já documentada em implementação concreta, simples e consistente.

O melhor caminho para a V1 é:

- modularizar por domínio
- usar DTO desde o início
- manter mapper manual
- concentrar regra no service
- padronizar erros
- começar pelo fluxo público de projetos

Essa abordagem mantém o backend limpo, compreensível e pronto para evoluir sem retrabalho desnecessário.
