# 🗄️ Banco de Dados — PostgreSQL + Flyway

> **Status:** ⏳ Fase 2 — Ainda não iniciado.
> Este arquivo será preenchido quando a Fase 2 começar.

## Planejado

### Migrations Flyway (versionadas)
| Arquivo | Descrição |
|---|---|
| `V1__create_projects_table.sql` | Tabela de projetos |
| `V2__create_skills_table.sql` | Tabela de habilidades |
| `V3__create_contact_messages_table.sql` | Tabela de mensagens de contato |
| `V4__seed_initial_data.sql` | Dados iniciais |

### Entidades planejadas
- `Project` — projetos no portfólio
- `Technology` — tecnologias usadas nos projetos
- `ProjectTechnology` — relação N:N
- `Skill` — habilidades do desenvolvedor
- `ContactMessage` — mensagens recebidas pelo formulário

Ver [architecture.md](./architecture.md) para o diagrama ER completo.
