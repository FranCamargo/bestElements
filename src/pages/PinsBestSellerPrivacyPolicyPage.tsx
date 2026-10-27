import { Mail } from 'lucide-react'

const email = 'francamargoads@gmail.com'
const lastUpdated = '27 de outubro de 2026'

const sections = [
  {
    title: '1. Sobre o Pins Best Seller',
    body: (
      <p className="about2-summary-text">
        O Pins Best Seller é uma ferramenta de <strong>uso pessoal e privado</strong>, desenvolvida
        por Fran Camargo para criar, organizar e acompanhar pins no Pinterest. O aplicativo{' '}
        <strong>não é distribuído ao público</strong>: apenas a própria desenvolvedora tem acesso a
        ele e o utiliza com a sua própria conta do Pinterest.
      </p>
    ),
  },
  {
    title: '2. Integração com o Pinterest',
    body: (
      <>
        <p className="about2-summary-text">
          Para funcionar, o Pins Best Seller se conecta à API oficial do Pinterest mediante
          autorização explícita da titular da conta (login via OAuth do Pinterest). Com essa
          autorização, o app pode acessar:
        </p>
        <ul className="privacy-list">
          <li>Informações básicas do perfil da conta conectada;</li>
          <li>Pastas (boards) e pins da conta, para leitura, criação e edição;</li>
          <li>Métricas de desempenho dos pins (como impressões, salvamentos e cliques).</li>
        </ul>
        <p className="about2-summary-text">
          Esses dados são usados <strong>exclusivamente para operar a ferramenta</strong> e nunca
          para qualquer outra finalidade.
        </p>
      </>
    ),
  },
  {
    title: '3. Dados de terceiros',
    body: (
      <p className="about2-summary-text">
        O Pins Best Seller <strong>não coleta dados de outros usuários do Pinterest</strong> nem de
        visitantes. Não existe cadastro de terceiros, formulário público ou qualquer forma de outra
        pessoa usar o aplicativo.
      </p>
    ),
  },
  {
    title: '4. Armazenamento e segurança',
    body: (
      <p className="about2-summary-text">
        Os tokens de acesso fornecidos pelo Pinterest e os dados utilizados pela ferramenta ficam
        armazenados apenas em ambiente controlado pela desenvolvedora e são mantidos somente pelo
        tempo necessário para o funcionamento do app. Nenhuma informação é publicada, vendida ou
        exposta publicamente.
      </p>
    ),
  },
  {
    title: '5. Compartilhamento com terceiros',
    body: (
      <p className="about2-summary-text">
        O Pins Best Seller <strong>não compartilha, vende ou repassa</strong> nenhum dado a
        terceiros. A única entidade externa envolvida é o próprio Pinterest, que fornece os dados
        por meio da sua API, seguindo a{' '}
        <a
          href="https://policy.pinterest.com/pt-br/privacy-policy"
          className="privacy-inline-link"
          target="_blank"
          rel="noreferrer"
        >
          política de privacidade do Pinterest
        </a>
        .
      </p>
    ),
  },
  {
    title: '6. Publicidade e rastreamento',
    body: (
      <p className="about2-summary-text">
        O Pins Best Seller <strong>não exibe anúncios</strong> e <strong>não usa ferramentas de
        analytics, rastreamento ou identificação publicitária</strong>.
      </p>
    ),
  },
  {
    title: '7. Revogação de acesso',
    body: (
      <p className="about2-summary-text">
        O acesso do Pins Best Seller à conta do Pinterest pode ser revogado a qualquer momento nas
        configurações de aplicativos conectados do Pinterest. Após a revogação, o app deixa de ter
        acesso aos dados da conta e as informações armazenadas podem ser excluídas mediante
        solicitação pelo e-mail informado ao final desta página.
      </p>
    ),
  },
  {
    title: '8. Conformidade com a LGPD',
    body: (
      <p className="about2-summary-text">
        Esta política é mantida em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
        13.709/2018). Dúvidas sobre tratamento de dados podem ser enviadas pelo e-mail informado ao
        final desta página.
      </p>
    ),
  },
  {
    title: '9. Uso por crianças',
    body: (
      <p className="about2-summary-text">
        O Pins Best Seller não é direcionado a crianças menores de 13 anos e não coleta dados desse
        público.
      </p>
    ),
  },
  {
    title: '10. Alterações nesta política',
    body: (
      <p className="about2-summary-text">
        Esta política pode ser atualizada periodicamente para refletir mudanças no aplicativo ou em
        requisitos legais. A data da última atualização é sempre exibida no topo desta página.
      </p>
    ),
  },
]

export function PinsBestSellerPrivacyPolicyPage() {
  return (
    <main className="app-shell about2-shell">
      <section aria-label="Política de Privacidade do Pins Best Seller" className="privacy-intro">
        <p className="hero-kicker">Política de Privacidade</p>
        <h1 className="about2-name">Pins Best Seller</h1>
        <p className="about2-role-tag">Última atualização: {lastUpdated}</p>
      </section>

      <div className="about2-sections">
        <div className="about2-card">
          {sections.map((section) => (
            <div key={section.title} className="privacy-card-block">
              <span className="about2-label">{section.title}</span>
              {section.body}
            </div>
          ))}

          <div className="privacy-card-block" aria-label="Contato">
            <span className="about2-label">11. Contato</span>
            <p className="about2-summary-text">
              Dúvidas, solicitações relacionadas a dados pessoais ou sugestões sobre o Pins Best
              Seller podem ser enviadas para:
            </p>
            <a href={`mailto:${email}`} className="about2-link-chip" aria-label="Enviar email para a desenvolvedora">
              <Mail size={15} aria-hidden="true" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
