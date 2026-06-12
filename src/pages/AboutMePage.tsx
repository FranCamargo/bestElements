import { useState } from 'react'
import { Mail, Download, X, Eye, EyeOff, ExternalLink } from 'lucide-react'
import profileImage from '../assets/perfil.webp'

const curriculoUrl = 'https://drive.google.com/uc?export=download&id=1yo4igzHzYFN5av8gMPu9rgM2o-DDRAWz'

function LinkedInLogo() {
  return (
    <svg className="about2-li-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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

const skillTags = [
  'Angular', 'React','GenAI','UI/UX', 'TypeScript', 'JavaScript', 'Python', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS',
'Node.js', 'Flask', 'FastAPI',
  'Figma', 'Prototipagem', 'Design System', 'Bitbucket', 'Bamboo', 'Confluence', 'React-Native', 'Android Studio',
'Git', 'GitHub', 'GitLab', 'Jira', 'CI/CD', 'SonarQube', 'Java', 'SQL', 'NoSQL',
,
]

const languageData = [
  { name: 'Português', level: 'Nativo', score: 5 },
  { name: 'Inglês', level: 'Avançado C1', score: 4 },
  { name: 'Espanhol', level: 'Profissional', score: 3 },
]

const educationData = [
  { degree: 'Pós-graduação em Gestão em Tecnologia', school: 'UNIASSELVI', year: '2024' },
  { degree: 'MBA em Gestão de Projetos', school: 'UNIASSELVI', year: '2022' },
  { degree: 'Tecnólogo em Comércio Exterior', school: 'UNISOCIESC', year: '2021' },
  { degree: 'Bacharelado em Análise e Desenvolvimento de Sistemas', school: 'UNIASSELVI', year: '2019' },
]

const projectsData = [
  {
    name: 'Chat.AI',
    url: 'https://fc-chatai.netlify.app/',
    description:
      'SPA que simula uma plataforma de assistente de IA com autenticação, histórico de conversas persistido e análise de uso. Estudo prático de React com Redux. Acesse com qualquer senha; usuário "Admin" desbloqueia um dashboard de análise (inicie conversas para ver os dados, pois é mockado com persistência local).',
  },
  {
    name: 'BestElements',
    url: 'https://francamargo.github.io/bestElements/',
    description:
      'Galeria autoral de componentes visuais, loaders, padrões e micro-experiências front-end. Une portfólio técnico e laboratório de UI: cada item possui preview interativo e snippets de código (HTML, CSS e TypeScript) para estudo, referência e reutilização com crédito.',
  },
  {
    name: 'OneRing Chat',
    url: 'https://chat2-ig7k.onrender.com/',
    description:
      'Chat anônimo em Angular com backend Node.js e WebSocket. Sem cadastro — nome e cor únicos são gerados automaticamente. Conta com suporte a emoticons, mini jogos (Snake e Jogo da Velha) e termos de uso. Voltado para maiores de 18 anos.',
  },
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
    <main className="app-shell about2-shell">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="about2-hero" aria-label="Sobre Franciely Camargo">
        <div className="about2-hero-glow" aria-hidden="true" />

        <div className="about2-photo-ring">
          <img
            className="about2-photo"
            src={profileImage}
            alt="Foto de perfil de Franciely Camargo"
            loading="eager"
          />
        </div>

        <div className="about2-hero-body">
          <p className="hero-kicker">Sobre mim</p>
          <h1 className="about2-name">Franciely Camargo</h1>
          <p className="about2-role-tag">
            Front-End Developer&nbsp;&nbsp;•&nbsp;&nbsp;UI/UX Designer&nbsp;&nbsp;|&nbsp;&nbsp;AI-900
          </p>
          <div className="about2-hero-links">
            <a
              href={linkedinProfile}
              className="about2-link-chip"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Francamargodev"
            >
              <LinkedInLogo />
              <span>@francamargodev</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="about2-link-chip"
              aria-label="Enviar email para Franciely"
            >
              <Mail size={15} aria-hidden="true" />
              <span className="about2-chip-truncate">{email}</span>
            </a>
            <button
              className="about2-cta-btn"
              onClick={() => setModalOpen(true)}
              aria-label="Solicitar currículo completo"
              type="button"
            >
              <Download size={15} aria-hidden="true" />
              Solicitar currículo
            </button>
          </div>
        </div>

        <div className="about2-hero-skills" aria-label="Competências técnicas">
          <span className="about2-label">Competências técnicas</span>
          <div className="about2-tag-cloud">
            {skillTags.map((tag) => (
              <span key={tag} className="about2-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────── */}
      <div className="about2-sections">

        {/* Summary + Languages row */}
        <div className="about2-info-row">

        <section className="about2-section" aria-label="Resumo profissional">
          <span className="about2-label">Resumo profissional</span>
          <div className="about2-card">
            <p className="about2-summary-text">{resumeSummary}</p>
          </div>
        </section>

        {/* Languages */}
        <section className="about2-section" aria-label="Idiomas">
          <span className="about2-label">Idiomas</span>
          <div className="about2-card">
            <div className="about2-lang-list">
              {languageData.map((lang) => (
                <div key={lang.name} className="about2-lang-row">
                  <span className="about2-lang-name">{lang.name}</span>
                  <span className="about2-lang-level">{lang.level}</span>
                  <div className="about2-dots" aria-label={`${lang.score} de 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`about2-dot${i < lang.score ? ' about2-dot--on' : ''}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        </div>{/* end about2-info-row */}

        {/* Education */}
        <section className="about2-section" aria-label="Formação acadêmica">
          <span className="about2-label">Formação acadêmica</span>
          <div className="about2-edu-grid">
            {educationData.map((item, i) => (
              <div key={i} className="about2-card about2-edu-item">
                <span className="about2-edu-year-chip">{item.year}</span>
                <p className="about2-edu-degree">{item.degree}</p>
                <p className="about2-edu-school">{item.school}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="about2-section" aria-label="Projetos">
          <span className="about2-label">Projetos Pessoais em Destaque</span>
          <div className="about2-proj-grid">
            {projectsData.map((proj) => (
              <div key={proj.name} className="about2-card about2-proj-card">
                <h3 className="about2-proj-title">{proj.name}</h3>
                <p className="about2-proj-desc">{proj.description}</p>
                <a
                  href={proj.url}
                  className="about2-proj-visit"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar ${proj.name}`}
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  Visitar projeto
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Modal ────────────────────────────────────────── */}
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
