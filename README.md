# Documentação do Site de Portfólio com Tema Pixel Art

## Visão Geral
Este projeto é um site de portfólio com tema pixel art, desenvolvido utilizando HTML e Tailwind CSS. O site apresenta um design moderno, divertido e totalmente responsivo, com estética inspirada em videogames retrô e arte pixelada.

## Estrutura do Projeto
```
portfolio-pixel-art/
├── css/
│   ├── styles.css     # Arquivo fonte do Tailwind CSS
│   └── output.css     # CSS compilado
├── js/
├── img/
├── index.html         # Página inicial
├── about.html         # Página Sobre Mim
├── projects.html      # Página de Projetos
├── contact.html       # Página de Contato
├── package.json       # Configurações do npm
├── tailwind.config.js # Configuração do Tailwind
└── postcss.config.js  # Configuração do PostCSS
```

## Páginas
1. **Home (index.html)**: Apresenta um avatar pixelado, uma frase de boas-vindas e um botão para conhecer os projetos.
2. **About (about.html)**: Contém informações sobre o desenvolvedor, uma linha do tempo com marcos importantes e uma seção de habilidades.
3. **Projects (projects.html)**: Exibe cards para cada projeto, com descrição, tecnologias utilizadas e links.
4. **Contact (contact.html)**: Oferece um formulário de contato, informações de contato e uma seção de FAQ.

## Características Principais
- **Design Pixel Art**: Utiliza bordas pixeladas, cores vibrantes e elementos estilizados como pixelados.
- **Responsividade**: Layout mobile-first, adaptável a diferentes tamanhos de tela.
- **Acessibilidade**: Inclui atributos aria-labels e alt para melhor acessibilidade.
- **Animações**: Efeitos sutis como flutuação, pulso e glitch em elementos específicos.
- **Componentes Reutilizáveis**: Navbar, footer, cards e botões estilizados consistentemente.

## Personalização
### Cores
As cores principais do tema estão definidas no arquivo `tailwind.config.js`:
- **pixel-primary**: #FF6B6B (vermelho)
- **pixel-secondary**: #4ECDC4 (turquesa)
- **pixel-accent**: #FFE66D (amarelo)
- **pixel-dark**: #1A535C (azul escuro)
- **pixel-light**: #F7FFF7 (branco)

Para alterar as cores, modifique os valores no arquivo de configuração do Tailwind.

### Fontes
O site utiliza as seguintes fontes:
- **Press Start 2P**: Para títulos e elementos destacados
- **Space Mono**: Para texto e conteúdo geral

As fontes são carregadas via Google Fonts nos arquivos HTML.

## Preparação para Futuras Melhorias
O código foi estruturado para facilitar a adição de bibliotecas de interatividade como:
- GSAP (GreenSock Animation Platform)
- AOS (Animate On Scroll)
- Framer Motion

Há comentários no código indicando onde essas bibliotecas podem ser integradas.

## Instruções para Deploy
1. Certifique-se de que todos os arquivos estão presentes na estrutura correta
2. Faça upload dos arquivos para seu servidor web ou serviço de hospedagem
3. Não são necessárias configurações adicionais de servidor, pois o site é estático

## Instruções para Desenvolvimento
Para continuar o desenvolvimento:
1. Instale as dependências: `npm install`
2. Para compilar o CSS: `npx tailwindcss -i ./css/styles.css -o ./css/output.css`
3. Para modo de desenvolvimento com recompilação automática: `npx tailwindcss -i ./css/styles.css -o ./css/output.css --watch`

## Créditos
- Fontes: Google Fonts (Press Start 2P, Space Mono)
- Framework CSS: Tailwind CSS
