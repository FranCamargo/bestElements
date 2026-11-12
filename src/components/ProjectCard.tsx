import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/profile.ts'

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <article className="project-card">
      <header className="project-card-head">
        <span className="project-card-kind mono">
          {index !== undefined ? `${String(index + 1).padStart(2, '0')} · ` : ''}
          {project.kind}
        </span>
        {project.url ? (
          <span className="project-card-status is-live">Online</span>
        ) : (
          <span className="project-card-status">{project.statusLabel ?? 'Em breve'}</span>
        )}
      </header>

      <h3 className="project-card-title">{project.name}</h3>
      <p className="project-card-desc">{project.description}</p>

      <ul className="project-card-stack" aria-label="Tecnologias">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {project.url ? (
        <a
          href={project.url}
          className="project-card-link"
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.linkLabel ?? 'Visitar projeto'}: ${project.name}`}
        >
          {project.linkLabel ?? 'Visitar projeto'}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  )
}
