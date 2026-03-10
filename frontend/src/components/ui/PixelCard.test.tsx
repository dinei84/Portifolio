import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PixelCard } from './PixelCard';

describe('PixelCard', () => {
  it('should render children content', () => {
    render(<PixelCard><p>Conteúdo do card</p></PixelCard>);
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
  });

  it('should apply pixel-card class', () => {
    render(<PixelCard><span>test</span></PixelCard>);
    const card = screen.getByText('test').closest('div');
    expect(card).toHaveClass('pixel-card');
  });

  it('should merge additional className', () => {
    render(<PixelCard className="custom-class"><span>test</span></PixelCard>);
    const card = screen.getByText('test').closest('div');
    expect(card).toHaveClass('pixel-card', 'custom-class');
  });
});
