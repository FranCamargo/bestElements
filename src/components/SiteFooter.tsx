import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile.ts'
import { GitHubLogo, LinkedInLogo } from './BrandIcons.tsx'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link to="/" className="brand" aria-label="Página inicial">
            <span className="brand-mark" aria-hidden="true">fc</span>
            <span className="brand-text">
              <strong>{profile.shortName}</strong>
              <small>{profile.role} · {profile.specialty}</small>
            </span>
          </Link>
          <p className="site-footer-note">
            Interfaces acessíveis, consistentes e bem construídas, do protótipo ao deploy.
          </p>
        </div>

        <nav className="site-footer-links" aria-label="Contatos">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInLogo /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GitHubLogo /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={15} aria-hidden="true" /> E-mail
          </a>
        </nav>
      </div>

      <div className="site-footer-bottom">
        <span>© {year} {profile.name}</span>
        <span className="mono">Feito com React + TypeScript</span>
      </div>
    </footer>
  )
}
