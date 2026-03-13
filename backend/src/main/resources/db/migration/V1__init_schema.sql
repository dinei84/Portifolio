-- V1__init_schema.sql
-- Tabela de projetos inicial conforme docs/database.md

CREATE TABLE projects (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    is_interactive BOOLEAN DEFAULT FALSE,
    technologies TEXT
);
