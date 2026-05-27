import { Mail } from 'lucide-react'
import profileImage from '../assets/perfil.jpeg'

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

const resumeSummary =
  'Desenvolvedora Front-End com foco em Angular e forte base em UI/UX. Experiência criando componentes reutilizáveis, design systems leves (Tailwind/Angular Material) e integrações com APIs para produtos com IA Generativa. Pós-graduação em Gestão de Tecnologia e MBA em Projetos. Histórico de colaboração com times internacionais, liderança e mentalidade orientada a desempenho, acessibilidade e métricas.'

const technicalSkills = [
  'Linguagens: TypeScript, JavaScript, Python, HTML5, CSS3, Sass, Tailwind CSS.',
  'Frameworks/Libs: Angular, React, Angular Material, Node.js, Flask, FastAPI.',
  'UI/UX & Prototipagem: Figma (wireframes, protótipos, handoff, componentes responsivos).',
  'Dev & Qualidade: Git (GitHub/GitLab/Bitbucket), Jira, CI/CD (Bamboo/GitLab), SonarQube.',
  'Boas práticas: Acessibilidade (ARIA/WAI), testes de usabilidade, performance web, Design Thinking, Lean UX, Scrum/Kanban.',
]

const experiences = [
  {
    role: 'Front-End Developer (Digital Solutions Analyst)',
    company: 'Capgemini Brasil',
    period: '2024 - Atual',
    highlights: [
      'Desenvolvimento front-end em Angular/React para soluções com IA Generativa, criando componentes reutilizáveis, formulários reativos e rotas protegidas.',
      'Implementação de design system leve com Tailwind/Angular Material, garantindo consistência visual e acessibilidade (ARIA, contraste, navegação por teclado).',
      'Integração com APIs e back-ends em Node.js e Python (Flask/FastAPI); foco em performance (lazy loading, code splitting) e DX.',
      'Colaboração com Product/UX para testes de usabilidade e métricas, priorizando hipóteses que aumentam conversão e reduzem tempo de tarefa.',
    ],
  },
  {
    role: 'HRSS Team Leader',
    company: 'Capgemini',
    period: '2022 - 2023',
    highlights: [
      'Liderança de times internacionais (EUA, Índia, Polônia, Guatemala) com comunicação em inglês e espanhol.',
      'Gestão de HCM/CRM (SAP, Workday, ADP, Salesforce), análise de KPIs e atuação como SME em transições.',
    ],
  },
  {
    role: 'Líder de Vendas',
    company: 'Epex Indústria',
    period: '2015 - 2021',
    highlights: [
      'Gestão comercial B2B e exportações; implantação de BI e força de vendas Web/Mobile integrados ao ERP.',
    ],
  },
]

const education = [
  'Pós-graduação em Gestão em Tecnologia - UNIASSELVI, 2024',
  'MBA em Gestão de Projetos - UNIASSELVI, 2022',
  'Graduação em Comércio Exterior - UniSociesc, 2021',
  'Tecnólogo em Análise e Desenvolvimento de Sistemas - UNIASSELVI, 2019',
]

const certifications = [
  'Microsoft Azure AI-900 - 2025',
  'Tailwind CSS v4 - Udemy, 2025',
  'Master Digital Product Design (UX Research & UI Design) - Udemy, 2025',
  'Agile Project Management - Google/Coursera',
  'Lean Six Sigma Foundations - Coursera',
  'Python p/ Análise de Dados e Data Science - Data Science Academy',
]

const languages = ['Português - Nativo', 'Inglês - Avançado (B2/C1)', 'Espanhol - Profissional']

export function AboutMePage() {
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

          <section aria-label="Experiencia profissional">
            <h2>Experiência profissional</h2>
            <div className="about-experience-list">
              {experiences.map((experience) => (
                <article key={`${experience.company}-${experience.role}`} className="about-experience-item">
                  <p className="about-experience-heading">
                    <strong>{experience.company}</strong> - {experience.role} | {experience.period}
                  </p>
                  <ul className="about-list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section aria-label="Formacao academica">
            <h2>Formação acadêmica</h2>
            <ul className="about-list">
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-label="Certificacoes e cursos">
            <h2>Certificações e cursos</h2>
            <ul className="about-list">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

        </div>
      </section>
    </main>
  )
}
