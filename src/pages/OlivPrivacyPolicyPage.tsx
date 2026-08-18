
import { Mail } from 'lucide-react'

const email = 'francamargoads@gmail.com'
const lastUpdated = '18 de agosto de 2026'

const sections = [
  {
    title: '1. Sobre o Oliv',
    body: (
      <p className="about2-summary-text">
        O Oliv é um aplicativo devocional que reúne leitura da Bíblia, áudio, calendário,
        bloquinhos de anotações e widgets para a tela inicial do seu celular. O Oliv{' '}
        <strong>não exige cadastro, login ou conta de usuário</strong> — tudo o que você usa no
        app funciona sem precisar informar nome, e-mail, telefone ou qualquer outro dado pessoal.
      </p>
    ),
  },
  {
    title: '2. Dados que o Oliv coleta',
    body: (
      <p className="about2-summary-text">
        O Oliv <strong>não coleta, não envia e não armazena em nenhum servidor</strong> dados
        pessoais dos usuários. Todo o conteúdo que você cria ou salva dentro do app — como notas,
        preferências, progresso de leitura e conteúdo dos widgets — fica guardado{' '}
        <strong>apenas localmente, no armazenamento do seu próprio aparelho</strong>. Se você
        desinstalar o app ou apagar seus dados, essas informações são perdidas permanentemente,
        pois não existe cópia em nenhum servidor nosso.
      </p>
    ),
  },
  {
    title: '3. Compartilhamento de conteúdo',
    body: (
      <p className="about2-summary-text">
        O Oliv permite gerar e compartilhar imagens (por exemplo, versículos ou frases) usando o
        menu de compartilhamento nativo do seu aparelho. Essa ação é iniciada apenas quando você
        toca no botão de compartilhar, e o Oliv não tem acesso ao que acontece depois que a imagem
        é entregue ao aplicativo de destino escolhido por você (WhatsApp, Instagram, etc.).
      </p>
    ),
  },
  {
    title: '4. Publicidade e rastreamento',
    body: (
      <p className="about2-summary-text">
        O Oliv <strong>não exibe anúncios</strong> e <strong>não usa nenhuma ferramenta de
        analytics, rastreamento ou identificação publicitária</strong> (como Google AdMob, Google
        Analytics, Facebook SDK ou similares). Não há coleta de identificador de publicidade
        (Advertising ID) nem qualquer tipo de perfil de uso construído sobre o usuário.
      </p>
    ),
  },
  {
    title: '5. Pagamento',
    body: (
      <p className="about2-summary-text">
        O Oliv é um aplicativo pago, adquirido uma única vez por meio da Google Play Store. Todo o
        processamento do pagamento — incluindo dados de cartão, cobrança e reembolso — é feito
        inteiramente pelo Google Play, seguindo a política de privacidade e os termos do próprio
        Google. O Oliv <strong>não tem acesso a nenhum dado financeiro ou de pagamento</strong> do
        usuário.
      </p>
    ),
  },
  {
    title: '6. Permissões do aparelho',
    body: (
      <>
        <p className="about2-summary-text">
          O Oliv pode solicitar permissões do sistema estritamente necessárias para funcionar,
          como:
        </p>
        <ul className="privacy-list">
          <li>Reprodução de áudio (para tocar hinos/áudios dentro do app);</li>
          <li>Compartilhamento de imagens (para o recurso de compartilhar versículos/frases);</li>
          <li>Exibição de widgets na tela inicial do Android.</li>
        </ul>
        <p className="about2-summary-text">
          Nenhuma dessas permissões é usada para coletar, enviar ou armazenar dados fora do seu
          próprio aparelho.
        </p>
      </>
    ),
  },
  {
    title: '7. Compartilhamento com terceiros',
    body: (
      <p className="about2-summary-text">
        Como o Oliv não coleta dados, não há nada para compartilhar, vender ou repassar a
        terceiros. A única entidade externa envolvida em qualquer momento do uso do app é a
        própria Google Play Store, exclusivamente para processar o pagamento único de compra do
        aplicativo.
      </p>
    ),
  },
  {
    title: '8. Conformidade com a LGPD',
    body: (
      <p className="about2-summary-text">
        Ainda que o Oliv não colete nem armazene dados pessoais em servidores próprios, esta
        política é mantida em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
        13.709/2018). Dúvidas sobre tratamento de dados podem ser enviadas pelo e-mail informado
        ao final desta página.
      </p>
    ),
  },
  {
    title: '9. Segurança',
    body: (
      <p className="about2-summary-text">
        Por não manter banco de dados de usuários nem enviar informações para servidores externos,
        o Oliv não armazena dados pessoais que possam ser expostos em caso de vazamento por parte
        do aplicativo.
      </p>
    ),
  },
  {
    title: '10. Uso por crianças',
    body: (
      <p className="about2-summary-text">
        O Oliv não é direcionado especificamente a crianças menores de 13 anos e não coleta
        intencionalmente dados desse público.
      </p>
    ),
  },
  {
    title: '11. Alterações nesta política',
    body: (
      <p className="about2-summary-text">
        Esta política pode ser atualizada periodicamente para refletir mudanças no aplicativo ou
        em requisitos legais. A data da última atualização é sempre exibida no topo desta página.
      </p>
    ),
  },
]

export function OlivPrivacyPolicyPage() {
  return (
    <main className="app-shell about2-shell">
      <section aria-label="Política de Privacidade do Oliv" className="privacy-intro">
        <p className="hero-kicker">Política de Privacidade</p>
        <h1 className="about2-name">Oliv</h1>
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
            <span className="about2-label">12. Contato</span>
            <p className="about2-summary-text">
              Dúvidas, solicitações relacionadas a dados pessoais ou sugestões sobre o Oliv podem
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
