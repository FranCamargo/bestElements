
import { Mail } from 'lucide-react'

const email = 'francamargoads@gmail.com'
const lastUpdated = '4 de agosto de 2026'

const sections = [
  {
    title: '1. Sobre o UneBR',
    body: (
      <p className="about2-summary-text">
        O UneBR é um aplicativo independente e não oficial, criado para reunir, em um só lugar,
        links oficiais e dicas de acesso a serviços públicos brasileiros (como INSS, Receita
        Federal, Detran, Caixa Econômica Federal, entre outros). O UneBR{' '}
        <strong>não é afiliado, patrocinado ou mantido por nenhum órgão do governo</strong>{' '}
        brasileiro: ele apenas organiza e direciona o usuário para os sites e canais oficiais
        correspondentes, que são de responsabilidade exclusiva de cada órgão público.
      </p>
    ),
  },
  {
    title: '2. Por que esta política existe',
    body: (
      <p className="about2-summary-text">
        O UneBR <strong>não tem login, cadastro ou conta de usuário</strong>, e não armazena
        nenhum dado em servidores próprios. Não pedimos nome, CPF, e-mail ou senha, e nada do que
        você faz no app fica guardado por nós. Esta política existe por um único motivo: para
        manter o app gratuito, exibimos anúncios através do <strong>Google AdMob</strong>, um
        serviço de terceiros que pode coletar alguns dados técnicos do dispositivo para exibir
        esses anúncios.
      </p>
    ),
  },
  {
    title: '3. Dados coletados pelo AdMob',
    body: (
      <>
        <p className="about2-summary-text">
          Ao exibir anúncios, o AdMob pode coletar automaticamente:
        </p>
        <ul className="privacy-list">
          <li>Identificador de publicidade (Advertising ID / GAID);</li>
          <li>Dados do dispositivo (modelo, sistema operacional, idioma, identificadores técnicos não pessoais);</li>
          <li>Dados básicos de uso do app relacionados à exibição de anúncios.</li>
        </ul>
        <p className="about2-summary-text">
          Essa coleta é feita pelo Google, não pelo UneBR — o app não tem acesso, não armazena e
          não processa esses dados em nenhum servidor próprio.
        </p>
      </>
    ),
  },
  {
    title: '4. Publicidade — Google AdMob',
    body: (
      <>
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
        Como o UneBR não armazena dados, não há nada para compartilhar ou vender. Apenas o Google
        AdMob recebe dados técnicos do dispositivo, diretamente do sistema, para fins de exibição
        de anúncios, conforme descrito acima.
      </p>
    ),
  },
  {
    title: '6. Conformidade com a LGPD',
    body: (
      <p className="about2-summary-text">
        Ainda que o UneBR não armazene dados próprios, o tratamento realizado pelo AdMob segue a
        Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Dúvidas sobre esse tratamento
        podem ser enviadas pelo e-mail informado ao final desta política.
      </p>
    ),
  },
  {
    title: '7. Segurança',
    body: (
      <p className="about2-summary-text">
        Por não coletar nem armazenar dados pessoais, o UneBR não mantém banco de dados de
        usuários e, portanto, não há dados próprios em risco de vazamento por parte do app.
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
        <div className="about2-card">
          {sections.map((section) => (
            <div key={section.title} className="privacy-card-block">
              <span className="about2-label">{section.title}</span>
              {section.body}
            </div>
          ))}

          <div className="privacy-card-block" aria-label="Contato">
            <span className="about2-label">10. Contato</span>
            <p className="about2-summary-text">
              Dúvidas, solicitações relacionadas a dados pessoais ou sugestões sobre o UneBR podem
              ser enviadas para:
            </p>
            <a href={`mailto:${email}`} className="about2-link-chip" aria-label="Enviar email para o desenvolvedor">
              <Mail size={15} aria-hidden="true" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
