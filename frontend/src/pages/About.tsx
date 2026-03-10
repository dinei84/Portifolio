import { mockSkills } from '@/mocks/skills';
import { SkillBar } from '@/components/ui/SkillBar';

const timeline = [
  {
    id: '1',
    color: 'bg-pixel-primary',
    title: 'Primeiro Código',
    text: 'Meu primeiro "Hello World" marcou o início de tudo. A sensação de ver algo que criei funcionando na tela foi indescritível!',
  },
  {
    id: '2',
    color: 'bg-pixel-accent',
    title: 'Primeiro Projeto',
    text: 'Desenvolvi meu primeiro projeto completo, enfrentando desafios reais e aprendendo a importância do planejamento e da organização.',
  },
  {
    id: '3',
    color: 'bg-pixel-secondary',
    title: 'Aprendizado Contínuo',
    text: 'Descobri que na programação, o aprendizado nunca termina. Cada nova tecnologia dominada abre portas para possibilidades ainda mais interessantes.',
  },
  {
    id: '4',
    color: 'bg-pixel-dark',
    title: 'Hoje',
    text: 'Continuo evoluindo e buscando criar projetos que combinem funcionalidade, acessibilidade e uma estética única.',
  },
];

export function About() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="pixel-heading text-2xl md:text-4xl mb-8 text-center">Sobre Mim</h1>

        {/* Intro */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
          <div className="w-full md:w-1/3">
            <div className="pixel-border p-2 animate-pixel-float">
              <div className="bg-pixel-secondary w-full aspect-square flex items-center justify-center">
                <div className="text-white font-pixel text-xs text-center p-4" aria-label="Foto pixelada do desenvolvedor">
                  FOTO<br />PIXEL<br />AQUI
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 pixel-card">
            <h2 className="pixel-heading text-xl mb-4">Minha Jornada</h2>
            <p className="mb-4">
              Olá! Sou um desenvolvedor apaixonado por criar experiências digitais únicas.
              Minha jornada na programação começou quando descobri que poderia transformar
              ideias em realidade através do código.
            </p>
            <p className="mb-4">
              Ao longo dos anos, enfrentei diversos desafios que me ajudaram a crescer como
              profissional. Desde bugs aparentemente impossíveis até projetos complexos com
              prazos apertados, cada obstáculo superado se tornou um degrau na minha evolução.
            </p>
            <p>
              O que me motiva é a possibilidade de criar soluções que impactem positivamente
              a vida das pessoas, combinando funcionalidade com uma experiência visual memorável.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="pixel-heading text-xl mb-6 text-center">Minha Linha do Tempo</h2>
        <div className="space-y-6 mb-12">
          {timeline.map(({ id, color, title, text }) => (
            <div key={id} className="pixel-card relative">
              <div className={`absolute -left-3 -top-3 w-6 h-6 ${color}`} />
              <h3 className="font-pixel text-lg mb-2">{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* Habilidades */}
        <h2 className="pixel-heading text-xl mb-6 text-center">Minhas Habilidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {mockSkills.map((skill) => (
            <SkillBar key={skill.id} name={skill.name} level={skill.level} />
          ))}
        </div>
      </section>
    </main>
  );
}
