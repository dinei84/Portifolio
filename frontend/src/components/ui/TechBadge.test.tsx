import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechBadge } from './TechBadge';

describe('TechBadge', () => {
  it('should render technology name', () => {
    render(<TechBadge name="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should render multiple badges independently', () => {
    render(
      <>
        <TechBadge name="TypeScript" />
        <TechBadge name="Java" />
      </>
    );
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });
});
