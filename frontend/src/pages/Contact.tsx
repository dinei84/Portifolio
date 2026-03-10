import { useState } from 'react';
import { PixelButton } from '@/components/ui/PixelButton';
import { sendContactMessage } from '@/services/contactService';
import type { ContactForm } from '@/types/Contact';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateForm(data: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Nome é obrigatório';
  if (!data.email.trim()) {
    errors.email = 'Email é obrigatório';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }
  if (!data.message.trim()) errors.message = 'Mensagem é obrigatória';
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await sendContactMessage(form);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <div className="pixel-card text-center py-16">
            <h2 className="font-pixel text-xl text-pixel-primary mb-4">Mensagem Enviada!</h2>
            <p className="mb-8">Obrigado pelo seu contato! Responderei o mais breve possível.</p>
            <div className="animate-pixel-float inline-block">
              <div className="w-16 h-16 bg-pixel-accent mx-auto flex items-center justify-center">
                <span className="font-pixel text-pixel-dark text-2xl">:)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="pixel-heading text-2xl md:text-4xl mb-8 text-center">Entre em Contato</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Info de contato */}
          <div className="w-full md:w-1/3">
            <div className="pixel-card h-full">
              <h2 className="font-pixel text-lg mb-6 text-pixel-primary">Vamos Conversar!</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pixel-primary flex items-center justify-center mr-4">
                    <span className="font-pixel text-white text-xs">@</span>
                  </div>
                  <p className="text-sm">email@exemplo.com</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pixel-accent flex items-center justify-center mr-4">
                    <span className="font-pixel text-pixel-dark text-xs">#</span>
                  </div>
                  <p className="text-sm">@dinei84</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pixel-secondary flex items-center justify-center mr-4">
                    <span className="font-pixel text-white text-xs">in</span>
                  </div>
                  <p className="text-sm">linkedin.com/in/dinei</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="w-full md:w-2/3">
            <form className="pixel-card" onSubmit={handleSubmit} noValidate>
              {/* Nome */}
              <div className="mb-6">
                <label htmlFor="name" className="block font-pixel text-sm mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="pixel-input"
                  aria-required="true"
                />
                {errors.name && (
                  <p className="text-pixel-primary text-xs mt-1 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block font-pixel text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="pixel-input"
                  aria-required="true"
                />
                {errors.email && (
                  <p className="text-pixel-primary text-xs mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Assunto */}
              <div className="mb-6">
                <label htmlFor="subject" className="block font-pixel text-sm mb-2">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="pixel-input"
                />
              </div>

              {/* Mensagem */}
              <div className="mb-6">
                <label htmlFor="message" className="block font-pixel text-sm mb-2">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="pixel-input"
                  aria-required="true"
                />
                {errors.message && (
                  <p className="text-pixel-primary text-xs mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              <div className="text-center">
                <PixelButton type="submit" disabled={loading} className="animate-pixel-pulse">
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                </PixelButton>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8">
          <h2 className="pixel-heading text-xl mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Qual é o seu processo de trabalho?',
                a: 'Meu processo envolve entender profundamente as necessidades do projeto, planejar a arquitetura, desenvolver com foco em código limpo e realizar testes rigorosos antes da entrega.',
              },
              {
                q: 'Quanto tempo leva para desenvolver um projeto?',
                a: 'O tempo varia conforme a complexidade do projeto. Projetos simples podem levar algumas semanas, enquanto projetos mais complexos podem levar alguns meses.',
              },
              {
                q: 'Você oferece manutenção após a entrega?',
                a: 'Sim! Ofereço suporte e manutenção para garantir que seu projeto continue funcionando perfeitamente mesmo após a entrega inicial.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="pixel-card">
                <h3 className="font-pixel text-base mb-2 text-pixel-primary">{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
