import { useState } from 'react'
import { Mail, Download, X, Eye, EyeOff } from 'lucide-react'
import profileImage from '../assets/perfil.webp'
const curriculoUrl = 'https://drive.google.com/uc?export=download&id=1yo4igzHzYFN5av8gMPu9rgM2o-DDRAWz'

function LinkedInLogo() {
  return (
    <svg
      className="about-linkedin-logo"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.06 3.76-2.06C20.13 8.64 21 11 21 14.06V21h-4v-5.95c0-1.42-.03-3.24-1.98-3.24-1.99 0-2.29 1.55-2.29 3.14V21H9z" />
    </svg>
  )
}

const linkedinProfile = 'https://www.linkedin.com/in/francamargodev'
const email = 'francamargoads@gmail.com'
const whatsappLink = 'https://wa.me/5547988283491'
const resumeMailtoLink = `mailto:${email}?subject=${encodeURIComponent('Solicitação de currículo')}&body=${encodeURIComponent('Olá, Franciely!\n\nEntrei pelo seu site e gostaria de receber seu currículo atualizado.\n\nObrigado(a)!')}`

const resumeSummary =
  'Desenvolvedora Front-End com foco em Angular e forte base em UI/UX. Experiência criando componentes reutilizáveis, design systems leves (Tailwind/Angular Material) e integrações com APIs para produtos com IA Generativa. Pós-graduação em Gestão de Tecnologia e MBA em Projetos. Histórico de colaboração com times internacionais, liderança e mentalidade orientada a desempenho, acessibilidade e métricas.'

const technicalSkills = [
  'Linguagens: TypeScript, JavaScript, Python, HTML5, CSS3, Sass, Tailwind CSS.',
  'Frameworks/Libs: Angular, React, Angular Material, Node.js, Flask, FastAPI.',
  'UI/UX & Prototipagem: Figma (wireframes, protótipos, handoff, componentes responsivos).',
  'Dev & Qualidade: Git (GitHub/GitLab/Bitbucket), Jira, CI/CD (Bamboo/GitLab), SonarQube.',
  'Boas práticas: Acessibilidade (ARIA/WAI), testes de usabilidade, performance web, Design Thinking, Lean UX, Scrum/Kanban.',
]

const education = [
  'Pós-graduação em Gestão em Tecnologia - UNIASSELVI, 2024',
  'MBA em Gestão de Projetos - UNIASSELVI, 2022',
  'Graduação em Comércio Exterior - UniSociesc, 2021',
  'Tecnólogo em Análise e Desenvolvimento de Sistemas - UNIASSELVI, 2019',
]

const languages = ['Português - Nativo', 'Inglês - Avançado (C1)', 'Espanhol - Profissional']

const RESUME_PASSWORD = 'UIDEV2026'

export function AboutMePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  function handleDownload() {
    if (password === RESUME_PASSWORD) {
      window.open(curriculoUrl, '_blank')
      setModalOpen(false)
      setPassword('')
      setError(false)
      setShowPassword(false)
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

  return (
    <main className="app-shell about-shell">
      <section className="about-card" aria-label="Sobre Franciely Camargo">
        <aside className="about-sidebar" aria-label="Perfil e contatos">
          <div className="about-image-wrap">
            <img
              className="about-photo"
              src={profileImage}
              alt="Foto de perfil de Franciely Camargo"
              loading="eager"
            />
          </div>

          <div className="about-sidebar-links">
            <a
              href={linkedinProfile}
              className="about-icon-link"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Francamargodev"
            >
              <LinkedInLogo />
              <span>@francamargodev</span>
            </a>
            <a href={`mailto:${email}`} className="about-icon-link" aria-label="Enviar email para Franciely Camargo">
              <Mail size={18} />
              <span>{email}</span>
            </a>
            <button
              className="resume-request-btn"
              onClick={() => setModalOpen(true)}
              aria-label="Solicitar currículo completo"
              type="button"
            >
              <Download size={16} />
              Solicitar currículo completo
            </button>
          </div>

          <section className="about-sidebar-languages" aria-label="Idiomas">
            <h2>Idiomas</h2>
            <ul className="about-list">
              {languages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>

        <div className="about-content">
          <p className="hero-kicker">Sobre mim</p>
          <h1>Franciely Camargo</h1>
          <div className="about-subtitle-row">
            <p className="about-role">Front-End Developer  • UI/UX Designer | AI-900</p>
          </div>

          <section aria-label="Resumo profissional">
            <h2>Resumo profissional</h2>
            <p>{resumeSummary}</p>
          </section>

          <section className="about-skills-section" aria-label="Competencias tecnicas">
            <h2>Competências técnicas</h2>
            <ul className="about-list">
              {technicalSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <section aria-label="Formacao academica">
            <h2>Formação acadêmica</h2>
            <ul className="about-list">
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      {modalOpen && (
        <div
          className="resume-modal-overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Solicitar currículo completo"
        >
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <button className="resume-modal-close" onClick={handleClose} aria-label="Fechar" type="button">
              <X size={18} />
            </button>

            <h3 className="resume-modal-title">Currículo completo</h3>

            <p className="resume-modal-info">
              Para receber a senha de acesso, solicite diretamente via:
            </p>

            <div className="resume-modal-contacts">
              <a href={linkedinProfile} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={resumeMailtoLink}>E-mail</a>
              <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>

            <div className="resume-modal-input-wrap">
              <input
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
