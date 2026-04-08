import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { getProjects } from '@/services/projectService';
import type { Project } from '@/types/Project';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        const data = await getProjects();

        if (!active) return;

        setProjects(data);
        setError(null);
      } catch {
        if (!active) return;
        setError('Nao foi possivel carregar os projetos no momento.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <section className="max-w-6xl mx-auto">
        <h1 className="pixel-heading text-2xl md:text-4xl mb-8 text-center">Meus Projetos</h1>

        <p className="text-center max-w-3xl mx-auto mb-12">
          Aqui estao alguns dos projetos que desenvolvi. Cada um representa um
          desafio superado e novas habilidades adquiridas. Clique nos links para
          ver mais detalhes!
        </p>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {loading && (
            <div className="pixel-card flex items-center justify-center min-h-64 text-center">
              Carregando projetos...
            </div>
          )}

          {!loading && error && (
            <div className="pixel-card flex items-center justify-center min-h-64 text-center">
              {error}
            </div>
          )}

          {!loading && !error && projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Card "Em Breve" */}
          <div className="pixel-card border-dashed flex flex-col items-center justify-center min-h-64">
            <div className="text-pixel-dark font-pixel text-center mb-4 text-sm">
              NOVO PROJETO<br />EM BREVE
            </div>
            <p className="text-center mb-4 text-sm">
              Espaco reservado para futuros projetos. Fique ligado!
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
