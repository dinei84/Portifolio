# 🎨 Frontend — React + Vite + TypeScript

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Framework UI |
| TypeScript | 5.x | Tipagem estática |
| Vite | 5 | Build tool + Dev server |
| Tailwind CSS | 3 | Estilização utilitária |
| React Router | 6 | Roteamento SPA |
| Axios | 1.x | HTTP client |
| TanStack Query | 5 | Cache e estado assíncrono (Fase 3) |
| Vitest | latest | Test runner (nativo Vite) |
| React Testing Library | latest | Testes de componentes |
| @testing-library/user-event | latest | Simulação de interações |

## Estrutura de Pastas

```
frontend/src/
├── components/
│   ├── Navbar.tsx          + Navbar.test.tsx
│   ├── Footer.tsx          + Footer.test.tsx
│   └── ui/
│       ├── PixelCard.tsx   + PixelCard.test.tsx
│       ├── PixelButton.tsx + PixelButton.test.tsx
│       ├── SkillBar.tsx    + SkillBar.test.tsx
│       ├── TechBadge.tsx   + TechBadge.test.tsx
│       └── ProjectCard.tsx + ProjectCard.test.tsx
├── pages/
│   ├── Home.tsx       + Home.test.tsx
│   ├── About.tsx      + About.test.tsx
│   ├── Projects.tsx   + Projects.test.tsx
│   └── Contact.tsx    + Contact.test.tsx
├── services/
│   ├── api.ts              ← Instância Axios
│   ├── projectService.ts
│   ├── skillService.ts
│   └── contactService.ts
├── types/
│   ├── Project.ts
│   ├── Skill.ts
│   └── Contact.ts
├── mocks/
│   ├── projects.ts
│   └── skills.ts
├── hooks/
│   └── useProjects.ts      ← Custom hook (futuro)
├── App.tsx
├── router.tsx
├── main.tsx
├── index.css
└── setupTests.ts
```

## Convenções de Código

### Nomenclatura
- **Componentes:** PascalCase (`PixelCard.tsx`)
- **Hooks:** camelCase prefixado com `use` (`useProjects.ts`)
- **Serviços:** camelCase sufixado com `Service` (`projectService.ts`)
- **Tipos:** PascalCase em arquivo próprio (`Project.ts`)
- **Testes:** mesmo nome do arquivo + `.test.tsx` (`PixelCard.test.tsx`)

### Estrutura de Componente
```tsx
// Sempre tipar props explicitamente
interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function PixelButton({ children, onClick, variant = 'primary', ...props }: PixelButtonProps) {
  // ...
}
```

### Regras TypeScript
- `strict: true` no tsconfig — obrigatório
- Proibido usar `any` — usar `unknown` se necessário
- Todas as props com tipos explícitos
- Preferir `interface` para props e contratos de API
- Usar `type` para unions e aliases

## TDD — Abordagem

### Ciclo Red → Green → Refactor
1. **Escrever o teste** (falha)
2. **Escrever o mínimo de código** para passar
3. **Refatorar** mantendo testes verdes

### Padrão dos Testes
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PixelButton } from './PixelButton';

describe('PixelButton', () => {
  it('should render children text', () => {
    render(<PixelButton>Click me</PixelButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<PixelButton onClick={onClick}>Click</PixelButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

### Scripts de Teste
```bash
npm run test          # modo watch (desenvolvimento)
npm run test:run      # uma execução (CI)
npm run test:coverage # relatório de cobertura
```

## Tema Pixel Art — Tailwind

```ts
// tailwind.config.ts — cores e tokens
colors: {
  'pixel-primary':   '#FF6B6B',
  'pixel-secondary': '#4ECDC4',
  'pixel-accent':    '#FFE66D',
  'pixel-dark':      '#1A535C',
  'pixel-light':     '#F7FFF7',
}

// Fontes
fontFamily: {
  'pixel': ['Press Start 2P', 'monospace'],
  'mono':  ['Space Mono', 'monospace'],
}

// Animações customizadas
animation: {
  'pixel-bounce': 'pixel-bounce 1s infinite',
  'pixel-float':  'pixel-float 3s ease-in-out infinite',
  'pixel-glitch': 'pixel-glitch 2s steps(10) infinite',
  'pixel-pulse':  'pixel-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

## Variáveis de Ambiente

```env
# frontend/.env.local (não commitar)
VITE_API_URL=http://localhost:8080/api/v1

# frontend/.env.example (commitar)
VITE_API_URL=http://localhost:8080/api/v1
```

## Roteamento

| Rota | Página | Componente |
|---|---|---|
| `/` | Home | `pages/Home.tsx` |
| `/sobre` | Sobre mim | `pages/About.tsx` |
| `/projetos` | Projetos | `pages/Projects.tsx` |
| `/contato` | Contato | `pages/Contact.tsx` |

## Comandos

```bash
# Desenvolvimento
npm run dev

# Testes (TDD)
npm run test

# Build de produção
npm run build

# Preview do build
npm run preview
```
