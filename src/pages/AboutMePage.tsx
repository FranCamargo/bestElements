import { useEffect, useState } from 'react'
import { Mail, Download, X, Eye, EyeOff } from 'lucide-react'
import profileImage from '../assets/perfil.webp'
import { LinkedInLogo } from '../components/BrandIcons.tsx'
import { ProjectCard } from '../components/ProjectCard.tsx'
import { profile, projects } from '../data/profile.ts'

const curriculoUrl = 'https://drive.google.com/uc?export=download&id=1yo4igzHzYFN5av8gMPu9rgM2o-DDRAWz'

const resumeMailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent('Solicitação de currículo')}&body=${encodeURIComponent('Olá, Franciely!\n\nEntrei pelo seu site e gostaria de receber seu currículo atualizado.\n\nObrigado(a)!')}`

const resumeSummary =
  'Desenvolvedora Front-End com foco em Angular e React e forte base em UI/UX. Experiência criando componentes reutilizáveis, design systems leves (Tailwind/Angular Material) e integrações com APIs para produtos com IA Generativa. Pós-graduação em Gestão de Tecnologia e MBA em Projetos. Histórico de colaboração com times internacionais, liderança e mentalidade orientada a desempenho, acessibilidade e métricas.'

const skillGroups = [
  {
    title: 'Front-End',
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'React Native'],
  },
  {
    title: 'UI/UX & Design',
    items: ['UI/UX', 'Figma', 'Prototipagem', 'Design System', 'Acessibilidade'],
  },
  {
    title: 'Back-End & IA',
    items: ['GenAI', 'Python', 'Node.js', 'Flask', 'FastAPI', 'Java'],
  },
  {
    title: 'Bancos de Dados & Cloud',
    items: ['SQL', 'NoSQL', 'PostgreSQL', 'MongoDB', 'DB2', 'Firebase'],
  },
  {
    title: 'Ferramentas & Processos',
    items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Bamboo', 'Azure DevOps', 'CI/CD', 'SonarQube', 'Jira', 'Confluence', 'Android Studio', 'Godot'],
  },
]

const languageData = [
  { name: 'Português', level: 'Nativo', score: 5 },
  { name: 'Inglês', level: 'Avançado · C1', score: 4 },
  { name: 'Espanhol', level: 'Profissional', score: 3 },
]

const educationData = [
  { degree: 'Pós-graduação em Gestão em Tecnologia', school: 'UNIASSELVI', year: '2024' },
  { degree: 'MBA em Gestão de Projetos', school: 'UNIASSELVI', year: '2022' },
  { degree: 'Tecnólogo em Comércio Exterior', school: 'UNISOCIESC', year: '2021' },
  { degree: 'Bacharelado em Análise e Desenvolvimento de Sistemas', school: 'UNIASSELVI', year: '2019' },
]

const RESUME_PASSWORD = 'UIDEV2026'

export function AboutMePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  function handleDownload() {
    if (password === RESUME_PASSWORD) {
      window.open(curriculoUrl, '_blank')
      handleClose()
    } else {
      setError(true)
    }
  }

  function handleClose() {
    setModalOpen(false)
    setPassword('')
    setError(false)
    setShowPassword(false)
  }

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  return (
    <main className="app-shell about-shell">

      {/* ── Intro ────────────────────────────────────────── */}
      <section className="about-intro" aria-labelledby="about-title">
        <div className="about-photo-frame">
          <img
            className="about-photo-img"
            src={profileImage}
            alt={`Foto de perfil de ${profile.name}`}
            loading="eager"
          />
          <span className="about-photo-badge mono">AI-900 · Microsoft</span>
        </div>

        <div className="about-intro-body">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Sobre mim
          </p>
          <h1 id="about-title" className="display display--md">{profile.name}</h1>
          <p className="about-role">
            {profile.role} <span aria-hidden="true">·</span> {profile.specialty}
          </p>
          <p className="lead">{resumeSummary}</p>

          <div className="about-actions">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)} type="button">
              <Download size={16} aria-hidden="true" />
              Solicitar currículo
            </button>
            <a href={profile.linkedin} className="btn btn-ghost" target="_blank" rel="noreferrer">
              <LinkedInLogo size={15} />
              {profile.linkedinHandle}
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              <Mail size={16} aria-hidden="true" />
              E-mail
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section className="section" aria-labelledby="skills-title">
        <header className="section-head">
          <div>
            <p className="section-index mono">01 / Competências</p>
            <h2 id="skills-title" className="section-title">O que eu uso no dia a dia</h2>
          </div>
        </header>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="pf-panel skill-group">
              <h3 className="pf-panel-title">{group.title}</h3>
              <ul className="tag-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education + languages ────────────────────────── */}
      <section className="section about-split" aria-label="Formação e idiomas">
        <div>
          <header className="section-head">
            <div>
              <p className="section-index mono">02 / Formação</p>
              <h2 className="section-title">Formação acadêmica</h2>
            </div>
          </header>
          <ol className="timeline">
            {educationData.map((item) => (
              <li key={item.degree} className="timeline-item">
                <span className="timeline-year mono">{item.year}</span>
                <div>
                  <p className="timeline-title">{item.degree}</p>
                  <p className="timeline-sub">{item.school}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <header className="section-head">
            <div>
              <p className="section-index mono">03 / Idiomas</p>
              <h2 className="section-title">Idiomas</h2>
            </div>
          </header>
          <div className="pf-panel">
            <ul className="lang-list">
              {languageData.map((lang) => (
                <li key={lang.name} className="lang-row">
                  <div>
                    <p className="lang-name">{lang.name}</p>
                    <p className="lang-level">{lang.level}</p>
                  </div>
                  <span className="lang-meter" role="img" aria-label={`Nível ${lang.score} de 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < lang.score ? 'is-on' : ''} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────── */}
      <section id="projetos" className="section" aria-labelledby="all-projects-title">
        <header className="section-head">
          <div>
            <p className="section-index mono">04 / Projetos</p>
            <h2 id="all-projects-title" className="section-title">Projetos pessoais</h2>
            <p className="section-desc">
              Apps e produtos web que desenvolvi de ponta a ponta, do conceito à publicação.
            </p>
          </div>
        </header>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="resume-modal-overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <button className="resume-modal-close" onClick={handleClose} aria-label="Fechar" type="button">
              <X size={18} />
            </button>

            <h3 id="resume-modal-title" className="resume-modal-title">Currículo completo</h3>

            <p className="resume-modal-info">
              Para receber a senha de acesso, solicite diretamente via:
            </p>

            <div className="resume-modal-contacts">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={resumeMailtoLink}>E-mail</a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>

            <div className="resume-modal-input-wrap">
              <label htmlFor="resume-password" className="sr-only">Senha</label>
              <input
                id="resume-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                placeholder="Digite a senha"
                className={`resume-modal-input${error ? ' resume-modal-input--error' : ''}`}
                onKeyDown={(e) => { if (e.key === 'Enter') handleDownload() }}
                autoFocus
              />
              <button
                className="resume-modal-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                type="button"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="resume-modal-error" role="alert">
                Senha incorreta. Solicite a senha via contatos acima.
              </p>
            )}

            <button className="resume-modal-download-btn" onClick={handleDownload} type="button">
              <Download size={16} />
              Baixar currículo
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
