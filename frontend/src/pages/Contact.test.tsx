import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from './Contact';

const renderContact = () => render(<MemoryRouter><Contact /></MemoryRouter>);

describe('Contact', () => {
  it('should render page heading', () => {
    renderContact();
    expect(screen.getByRole('heading', { name: /entre em contato/i })).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    renderContact();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it('should show error when submitting empty required fields', async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
  });

  it('should show error for invalid email format', async () => {
    const user = userEvent.setup();
    renderContact();
    await user.type(screen.getByLabelText(/nome/i), 'João');
    await user.type(screen.getByLabelText(/email/i), 'email-invalido');
    await user.type(screen.getByLabelText(/mensagem/i), 'Olá!');
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
  });

  it('should show success message after valid submission', async () => {
    const user = userEvent.setup();
    renderContact();
    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/email/i), 'joao@email.com');
    await user.type(screen.getByLabelText(/mensagem/i), 'Olá, tenho interesse!');
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() =>
      expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
});
