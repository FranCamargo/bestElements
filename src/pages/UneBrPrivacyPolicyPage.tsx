import { Mail } from 'lucide-react'

const email = 'francamargoads@gmail.com'
const lastUpdated = '4 de agosto de 2026'

const sections = [
  {
    title: '1. Sobre o UneBR',
    body: (
      <>
        <p className="about2-summary-text">
          O UneBR é um aplicativo independente e não oficial, criado para reunir, em um só lugar,
          links oficiais e dicas de acesso a serviços públicos brasileiros (como INSS, Receita
          Federal, Detran, Caixa Econômica Federal, entre outros).
        </p>
        <p className="about2-summary-text">
          O UneBR <strong>não é afiliado, patrocinado ou mantido por nenhum órgão do governo</strong>{' '}
          brasileiro. O aplicativo não hospeda, armazena nem afirma ser conteúdo oficial: ele apenas
          organiza e direciona o usuário para os sites e canais oficiais correspondentes, que são de
          responsabilidade exclusiva de cada órgão público.
        </p>
      </>
    ),
  },
  {
    title: '2. Quais dados coletamos',
    body: (
      <>
        <p className="about2-summary-text">
          Para manter o aplicativo gratuito, exibimos anúncios através do Google AdMob. Para isso,
          podem ser coletados:
        </p>
        <ul className="privacy-list">
          <li>Identificador de publicidade (Advertising ID / GAID);</li>
          <li>Dados do dispositivo (modelo, sistema operacional, idioma, identificadores técnicos não pessoais);</li>
          <li>Dados de uso do aplicativo (telas acessadas, interações e cliques em links, para fins estatísticos e de melhoria do produto).</li>
        </ul>
        <p className="about2-summary-text">
          O UneBR <strong>não solicita nem coleta</strong> nome, CPF, e-mail, senhas ou qualquer outro
          dado sensível vinculado a serviços governamentais. Qualquer informação inserida pelo usuário
          nos sites oficiais para os quais o app direciona é de responsabilidade exclusiva do respectivo
          órgão público, e não passa pelo UneBR.
        </p>
      </>
    ),
  },
  {
    title: '3. Como usamos os dados',
    body: (
      <ul className="privacy-list">
        <li>Exibir anúncios personalizados ou não personalizados através do Google AdMob;</li>
        <li>Entender o uso do aplicativo para corrigir problemas e melhorar a experiência;</li>
        <li>Cumprir obrigações legais aplicáveis, quando necessário.</li>
      </ul>
    ),
  },
  {
    title: '4. Publicidade — Google AdMob',
    body: (
      <>
        <p className="about2-summary-text">
          Utilizamos o <strong>Google AdMob</strong>, serviço de terceiros, para exibir anúncios
          dentro do aplicativo. O AdMob pode coletar e processar o Advertising ID, dados do
          dispositivo e dados de uso para exibir anúncios personalizados com base em interesses, ou
          anúncios não personalizados quando o usuário optar por isso.
        </p>
        <p className="about2-summary-text">
          Saiba mais sobre como o Google trata esses dados na política de privacidade e tecnologias
          de anúncios do Google:{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noreferrer"
            className="privacy-inline-link"
          >
            policies.google.com/technologies/ads
          </a>
          .
        </p>
        <p className="about2-summary-text">
          <strong>Como desativar anúncios personalizados:</strong> no seu dispositivo Android, acesse{' '}
          <em>Configurações → Google → Anúncios (Ads)</em> e ative a opção{' '}
          <em>"Desativar personalização de anúncios"</em>. O caminho exato pode variar conforme o
          fabricante e a versão do Android.
        </p>
      </>
    ),
  },
  {
    title: '5. Compartilhamento com terceiros',
    body: (
      <p className="about2-summary-text">
        Apenas o Google AdMob recebe dados para fins de exibição de anúncios, conforme descrito
        acima. Não vendemos dados pessoais dos usuários a terceiros.
      </p>
    ),
  },
  {
    title: '6. Conformidade com a LGPD',
    body: (
      <p className="about2-summary-text">
        Os dados são tratados em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
        13.709/2018). O usuário pode solicitar informações sobre os dados eventualmente coletados,
        bem como sua correção ou exclusão, entrando em contato pelo e-mail informado ao final desta
        política.
      </p>
    ),
  },
  {
    title: '7. Segurança',
    body: (
      <p className="about2-summary-text">
        Adotamos medidas razoáveis para proteger os dados processados pelo aplicativo, embora nenhum
        sistema seja totalmente livre de riscos.
      </p>
    ),
  },
  {
    title: '8. Uso por crianças',
    body: (
      <p className="about2-summary-text">
        O UneBR não é direcionado a crianças menores de 13 anos e não coleta intencionalmente dados
        desse público.
      </p>
    ),
  },
  {
    title: '9. Alterações nesta política',
    body: (
      <p className="about2-summary-text">
        Esta política pode ser atualizada periodicamente para refletir mudanças no aplicativo ou em
        requisitos legais. A data da última atualização é sempre exibida no topo desta página.
      </p>
    ),
  },
]

export function UneBrPrivacyPolicyPage() {
  return (
    <main className="app-shell about2-shell">
      <section aria-label="Política de Privacidade do UneBR" className="privacy-intro">
        <p className="hero-kicker">Política de Privacidade</p>
        <h1 className="about2-name">UneBR</h1>
        <p className="about2-role-tag">Última atualização: {lastUpdated}</p>
      </section>

      <div className="about2-sections">
        {sections.map((section) => (
          <section key={section.title} className="about2-section">
            <span className="about2-label">{section.title}</span>
            <div className="about2-card">{section.body}</div>
          </section>
        ))}

        <section className="about2-section" aria-label="Contato">
          <span className="about2-label">10. Contato</span>
          <div className="about2-card">
            <p className="about2-summary-text">
              Dúvidas, solicitações relacionadas a dados pessoais ou sugestões sobre o UneBR podem
              ser enviadas para:
            </p>
            <a href={`mailto:${email}`} className="about2-link-chip" aria-label="Enviar email para o desenvolvedor">
              <Mail size={15} aria-hidden="true" />
              <span>{email}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
