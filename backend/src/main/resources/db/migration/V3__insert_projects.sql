INSERT INTO projects (
    id,
    title,
    description,
    image_url,
    github_url,
    demo_url,
    is_interactive,
    technologies,
    created_at
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'SaaS Controle de Cargas',
    'Sistema para gestao de cargas com controle logistico',
    'https://via.placeholder.com/300',
    'https://github.com/devdinei/cargas-saas',
    'https://demo-cargas.com',
    TRUE,
    'Java,Spring Boot,PostgreSQL,React',
    CURRENT_TIMESTAMP
),
(
    '22222222-2222-2222-2222-222222222222',
    'Portfolio DevDinei',
    'Aplicacao full-stack com React e Spring Boot',
    'https://via.placeholder.com/300',
    'https://github.com/devdinei/portfolio',
    NULL,
    FALSE,
    'Java,Spring Boot,React',
    CURRENT_TIMESTAMP
);
