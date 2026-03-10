import { Link } from 'react-router-dom';
import { mockProjects } from '@/mocks/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PixelButton } from '@/components/ui/PixelButton';

export function Projects() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <section className="max-w-6xl mx-auto">
        <h1 className="pixel-heading text-2xl md:text-4xl mb-8 text-center">Meus Projetos</h1>

        <p className="text-center max-w-3xl mx-auto mb-12">
          Aqui estão alguns dos projetos que desenvolvi. Cada um representa um
          desafio superado e novas habilidades adquiridas. Clique nos links para
          ver mais detalhes!
        </p>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Card "Em Breve" */}
          <div className="pixel-card border-dashed flex flex-col items-center justify-center min-h-64">
            <div className="text-pixel-dark font-pixel text-center mb-4 text-sm">
              NOVO PROJETO<br />EM BREVE
            </div>
            <p className="text-center mb-4 text-sm">
              Espaço reservado para futuros projetos. Fique ligado!
            </p>
            <div className="animate-pixel-pulse">
              <div className="w-12 h-12 border-4 border-dashed border-pixel-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-6">Interessado em ver mais projetos ou colaborar em algo novo?</p>
          <Link to="/contato">
            <PixelButton>Entre em contato</PixelButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
