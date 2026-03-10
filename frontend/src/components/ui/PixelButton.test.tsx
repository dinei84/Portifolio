import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PixelButton } from './PixelButton';

describe('PixelButton', () => {
  it('should render children text', () => {
    render(<PixelButton>Clique aqui</PixelButton>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<PixelButton onClick={onClick}>Click</PixelButton>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<PixelButton onClick={onClick} disabled>Click</PixelButton>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should render as submit button when type="submit"', () => {
    render(<PixelButton type="submit">Enviar</PixelButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should apply outline variant class', () => {
    render(<PixelButton variant="outline">Outline</PixelButton>);
    expect(screen.getByRole('button')).toHaveClass('pixel-button--outline');
  });
});
