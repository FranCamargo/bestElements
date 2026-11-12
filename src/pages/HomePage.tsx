import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkedInLogo } from '../components/BrandIcons.tsx'
import { ProjectCard } from '../components/ProjectCard.tsx'
import { coreStack, profile, projects } from '../data/profile.ts'

export function HomePage() {
  return (
    <main className="app-shell home-shell">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {profile.role} · {profile.specialty}
          </p>
          <h1 id="home-hero-title" className="display">
            Interfaces que unem <em>design</em> e <em>engenharia</em>.
          </h1>
          <p className="lead">
            Sou {profile.name}, desenvolvedora Front-End especializada em Angular e React, com
            base sólida em UI/UX. Crio componentes reutilizáveis, design systems e produtos com IA
            generativa, sempre com foco em acessibilidade, performance e detalhe.
          </p>
          <div className="home-hero-actions">
            <a className="btn btn-primary" href="#projetos">
              Ver projetos
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <Link className="btn btn-ghost" to="/sobre-mim">
              Sobre mim
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <span className="home-hero-social">
              <a
                className="icon-btn"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInLogo size={16} />
              </a>
              <a
                className="icon-btn"
                href={`mailto:${profile.email}`}
                aria-label="Enviar e-mail"
                title="E-mail"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>

        <figure className="code-window" aria-label="Resumo do perfil em formato de código">
          <div className="code-window-bar" aria-hidden="true">
            <span /><span /><span />
            <em>profile.ts</em>
          </div>
          <pre className="code-window-body">
            <code>
              <span className="tk-key">const</span> <span className="tk-var">fran</span> = {'{'}{'\n'}
              {'  '}role: <span className="tk-str">'Front-End Developer'</span>,{'\n'}
              {'  '}focus: [<span className="tk-str">'UI/UX'</span>, <span className="tk-str">'Design Systems'</span>, <span className="tk-str">'GenAI'</span>],{'\n'}
              {'  '}stack: [<span className="tk-str">'Angular'</span>, <span className="tk-str">'React'</span>, <span className="tk-str">'TypeScript'</span>],{'\n'}
              {'  '}certified: <span className="tk-str">'Microsoft AI-900'</span>,{'\n'}
              {'  '}languages: <span className="tk-num">3</span>,{'\n'}
              {'  '}openToTalk: <span className="tk-key">true</span>,{'\n'}
              {'}'} <span className="tk-key">satisfies</span> <span className="tk-type">Developer</span>
            </code>
          </pre>
        </figure>
      </section>

      {/* ── Stack ──────────────────────────────── */}
      <section className="home-metrics" aria-label="Stack principal">
        <div className="stack-row">
          <span className="stack-row-label mono">Stack principal</span>
          <ul>
            {coreStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────── */}
      <section id="projetos" className="section" aria-labelledby="projetos-title">
        <header className="section-head">
          <div>
            <p className="section-index mono">01 / Projetos</p>
            <h2 id="projetos-title" className="section-title">Projetos pessoais</h2>
            <p className="section-desc">
              Apps e produtos web que desenvolvi de ponta a ponta, da concepção ao deploy.
            </p>
          </div>
        </header>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-band" aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">Vamos construir algo juntos?</h2>
          <p>Aberta a conversas sobre oportunidades, projetos e colaborações em front-end e UI/UX.</p>
        </div>
        <div className="cta-band-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" />
            Enviar e-mail
          </a>
          <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInLogo size={15} />
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}
