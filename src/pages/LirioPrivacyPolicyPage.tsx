import { Mail } from 'lucide-react'
import type { ReactNode } from 'react'

const email = 'francamargoads@gmail.com'
const lastUpdatedPt = '7 de novembro de 2026'
const lastUpdatedEn = 'November 7, 2026'

type Section = { title: string; body: ReactNode }

const emailLink = (
  <a href={`mailto:${email}`} className="privacy-inline-link">
    {email}
  </a>
)

const sectionsPt: Section[] = [
  {
    title: '1. Sobre o Lírio',
    body: (
      <p className="about2-summary-text">
        O Lírio é um aplicativo de leitura de livros de domínio público, desenvolvido por{' '}
        <strong>Fran Camargo</strong> ("nós"). Esta política explica quais dados o app usa, por que
        e quais são os seus direitos, de acordo com a Lei Geral de Proteção de Dados (LGPD — Lei nº
        13.709/2018).
      </p>
    ),
  },
  {
    title: '2. Dados que coletamos',
    body: (
      <>
        <p className="about2-summary-text">
          Para criar a sua conta e guardar a sua estante na nuvem, coletamos:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Nome de usuário</strong> que você escolhe no cadastro;
          </li>
          <li>
            <strong>Senha</strong>, processada pelo Firebase Authentication (Google). Nós nunca
            vemos a sua senha: ela é guardada de forma criptografada pelo próprio serviço;
          </li>
          <li>
            <strong>Dados da sua estante e do seu uso no app:</strong> livros emprestados, progresso
            de leitura, arrumação da estante, decorações e madeiras desbloqueadas, saldo de pétalas
            e sequência de dias.
          </li>
        </ul>
        <p className="about2-summary-text">
          O Lírio <strong>não pede</strong> o seu e-mail, telefone, nome real, localização,
          contatos, fotos ou dados de pagamento.
        </p>
      </>
    ),
  },
  {
    title: '3. Dados que ficam só no seu celular',
    body: (
      <>
        <p className="about2-summary-text">Algumas informações nunca saem do seu aparelho:</p>
        <ul className="privacy-list">
          <li>
            <strong>PDFs que você importa</strong> e as páginas de livros baixadas para leitura sem
            internet;
          </li>
          <li>Preferências do app, como idioma, configurações de leitura e horário do lembrete;</li>
          <li>
            <strong>Desbloqueio com a digital, o rosto ou a senha do celular:</strong> essa
            verificação é feita pelo próprio sistema do aparelho. O Lírio não tem acesso à sua
            biometria;
          </li>
          <li>
            <strong>Lembretes de sequência:</strong> são notificações agendadas no próprio celular,
            sem servidor.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Para que usamos os dados',
    body: (
      <>
        <p className="about2-summary-text">Usamos os dados somente para:</p>
        <ul className="privacy-list">
          <li>criar e manter a sua conta e permitir que você entre nela;</li>
          <li>salvar a sua estante na nuvem e restaurá-la quando você trocar de aparelho;</li>
          <li>fazer o app funcionar: estante, leitura, pétalas e decorações.</li>
        </ul>
        <p className="about2-summary-text">
          <strong>Não</strong> usamos os seus dados para publicidade, <strong>não</strong> vendemos
          e <strong>não</strong> compartilhamos com terceiros para fins comerciais. O app não tem
          anúncios.
        </p>
      </>
    ),
  },
  {
    title: '5. Onde os dados são guardados',
    body: (
      <p className="about2-summary-text">
        Os dados da conta e da estante são guardados no <strong>Google Firebase</strong> (Firebase
        Authentication e Cloud Firestore), que atua como nosso provedor de serviço. Os servidores do
        Google podem ficar fora do Brasil. A transferência internacional ocorre conforme a LGPD e as
        garantias contratuais do Google. Toda comunicação entre o app e o servidor é criptografada
        (HTTPS).
      </p>
    ),
  },
  {
    title: '6. Serviços de terceiros',
    body: (
      <p className="about2-summary-text">
        Os livros vêm da <strong>Open Library</strong> e do <strong>Internet Archive</strong>. Ao
        buscar, abrir ou baixar um livro, o seu celular se conecta diretamente a esses serviços, que
        podem registrar dados técnicos da conexão (como o endereço IP), conforme as políticas de
        privacidade deles. Não enviamos a esses serviços nenhum dado da sua conta.
      </p>
    ),
  },
  {
    title: '7. Compras',
    body: (
      <p className="about2-summary-text">
        Atualmente o Lírio não vende nada. Se no futuro houver compras dentro do app (como pacotes
        de pétalas), elas serão processadas pela Google Play ou pela App Store. Nós{' '}
        <strong>não recebemos os dados do seu cartão</strong>.
      </p>
    ),
  },
  {
    title: '8. Por quanto tempo guardamos',
    body: (
      <p className="about2-summary-text">
        Guardamos os dados enquanto a sua conta existir. Quando você pede a exclusão, apagamos a
        conta e os dados da estante dos nossos servidores em até <strong>30 dias</strong>.
      </p>
    ),
  },
  {
    title: '9. Seus direitos e como excluir a sua conta',
    body: (
      <>
        <p className="about2-summary-text">Pela LGPD, você pode a qualquer momento pedir:</p>
        <ul className="privacy-list">
          <li>confirmação e acesso aos dados que temos sobre você;</li>
          <li>correção de dados;</li>
          <li>
            <strong>exclusão da sua conta e de todos os dados</strong>;
          </li>
          <li>informações sobre o uso e o compartilhamento dos seus dados.</li>
        </ul>
        <p className="about2-summary-text">
          <strong>Para excluir a sua conta</strong>, envie um e-mail para {emailLink} com o assunto
          "Excluir conta Lírio", informando o seu nome de usuário. Responderemos e concluiremos a
          exclusão em até 30 dias. Os PDFs e livros baixados ficam no seu celular e são apagados ao
          desinstalar o app.
        </p>
      </>
    ),
  },
  {
    title: '10. Crianças',
    body: (
      <p className="about2-summary-text">
        O Lírio não é direcionado a crianças menores de 13 anos e não coleta intencionalmente dados
        delas. Se você acredita que uma criança criou uma conta, fale conosco para que possamos
        excluí-la.
      </p>
    ),
  },
  {
    title: '11. Segurança',
    body: (
      <p className="about2-summary-text">
        Usamos os recursos de segurança do Google Firebase, além de regras que permitem que cada
        pessoa acesse apenas os próprios dados. Nenhum sistema é totalmente imune a falhas, mas
        trabalhamos para proteger as suas informações.
      </p>
    ),
  },
  {
    title: '12. Alterações nesta política',
    body: (
      <p className="about2-summary-text">
        Podemos atualizar esta política. A data no topo indica a versão mais recente. Mudanças
        importantes serão avisadas no app.
      </p>
    ),
  },
]

const sectionsEn: Section[] = [
  {
    title: '1. About Lírio',
    body: (
      <p className="about2-summary-text">
        Lírio is an app for reading public domain books, developed by <strong>Fran Camargo</strong>{' '}
        ("we"). This policy explains what data the app uses, why, and what your rights are,
        including under Brazil's General Data Protection Law (LGPD).
      </p>
    ),
  },
  {
    title: '2. Data we collect',
    body: (
      <>
        <p className="about2-summary-text">
          To create your account and save your bookshelf in the cloud, we collect:
        </p>
        <ul className="privacy-list">
          <li>
            The <strong>username</strong> you choose when signing up;
          </li>
          <li>
            Your <strong>password</strong>, processed by Firebase Authentication (Google). We never
            see your password: the service stores it in encrypted form;
          </li>
          <li>
            <strong>Your bookshelf and in-app activity:</strong> borrowed books, reading progress,
            shelf arrangement, unlocked decorations and woods, petal balance and day streak.
          </li>
        </ul>
        <p className="about2-summary-text">
          Lírio does <strong>not</strong> ask for your email, phone number, real name, location,
          contacts, photos or payment details.
        </p>
      </>
    ),
  },
  {
    title: '3. Data that stays on your phone',
    body: (
      <>
        <p className="about2-summary-text">Some information never leaves your device:</p>
        <ul className="privacy-list">
          <li>
            <strong>PDFs you import</strong> and book pages downloaded for offline reading;
          </li>
          <li>App preferences, such as language, reading settings and reminder time;</li>
          <li>
            <strong>Unlocking with your fingerprint, face or phone lock:</strong> your phone's own
            system does this check. Lírio has no access to your biometrics;
          </li>
          <li>
            <strong>Streak reminders:</strong> notifications scheduled on your phone itself, with no
            server involved.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '4. How we use your data',
    body: (
      <>
        <p className="about2-summary-text">We use your data only to:</p>
        <ul className="privacy-list">
          <li>create and maintain your account and let you sign in;</li>
          <li>save your bookshelf in the cloud and restore it when you switch phones;</li>
          <li>make the app work: bookshelf, reading, petals and decorations.</li>
        </ul>
        <p className="about2-summary-text">
          We do <strong>not</strong> use your data for advertising, and we do <strong>not</strong>{' '}
          sell it or share it with third parties for commercial purposes. The app has no ads.
        </p>
      </>
    ),
  },
  {
    title: '5. Where your data is stored',
    body: (
      <p className="about2-summary-text">
        Account and bookshelf data are stored in <strong>Google Firebase</strong> (Firebase
        Authentication and Cloud Firestore), which acts as our service provider. Google's servers
        may be located outside Brazil. International transfers follow the LGPD and Google's
        contractual safeguards. All communication between the app and the server is encrypted
        (HTTPS).
      </p>
    ),
  },
  {
    title: '6. Third-party services',
    body: (
      <p className="about2-summary-text">
        Books come from <strong>Open Library</strong> and the <strong>Internet Archive</strong>.
        When you search for, open or download a book, your phone connects directly to these
        services, which may log technical connection data (such as your IP address) under their own
        privacy policies. We do not send them any of your account data.
      </p>
    ),
  },
  {
    title: '7. Purchases',
    body: (
      <p className="about2-summary-text">
        Lírio currently sells nothing. If in-app purchases are added in the future (such as petal
        packs), Google Play or the App Store will process them. We{' '}
        <strong>never receive your card details</strong>.
      </p>
    ),
  },
  {
    title: '8. How long we keep data',
    body: (
      <p className="about2-summary-text">
        We keep your data for as long as your account exists. When you request deletion, we delete
        your account and bookshelf data from our servers within <strong>30 days</strong>.
      </p>
    ),
  },
  {
    title: '9. Your rights and how to delete your account',
    body: (
      <>
        <p className="about2-summary-text">You may at any time request:</p>
        <ul className="privacy-list">
          <li>confirmation of and access to the data we hold about you;</li>
          <li>correction of your data;</li>
          <li>
            <strong>deletion of your account and all your data</strong>;
          </li>
          <li>information about how your data is used and shared.</li>
        </ul>
        <p className="about2-summary-text">
          <strong>To delete your account</strong>, email {emailLink} with the subject "Delete Lírio
          account" and include your username. We will reply and complete the deletion within 30
          days. PDFs and downloaded books stay on your phone and are removed when you uninstall the
          app.
        </p>
      </>
    ),
  },
  {
    title: '10. Children',
    body: (
      <p className="about2-summary-text">
        Lírio is not directed at children under 13 and does not knowingly collect their data. If
        you believe a child has created an account, contact us so we can delete it.
      </p>
    ),
  },
  {
    title: '11. Security',
    body: (
      <p className="about2-summary-text">
        We use Google Firebase's security features, plus rules that let each person access only
        their own data. No system is completely immune to failures, but we work to protect your
        information.
      </p>
    ),
  },
  {
    title: '12. Changes to this policy',
    body: (
      <p className="about2-summary-text">
        We may update this policy. The date at the top shows the latest version. We will announce
        important changes in the app.
      </p>
    ),
  },
]

function ContactBlock({ title, text, controller }: { title: string; text: string; controller: string }) {
  return (
    <div className="privacy-card-block" aria-label={title}>
      <span className="about2-label">{title}</span>
      <p className="about2-summary-text">{text}</p>
      <a href={`mailto:${email}`} className="about2-link-chip" aria-label="Enviar email para o desenvolvedor">
        <Mail size={15} aria-hidden="true" />
        <span>{email}</span>
      </a>
      <p className="about2-summary-text">{controller}</p>
    </div>
  )
}

export function LirioPrivacyPolicyPage() {
  return (
    <main className="app-shell about2-shell">
      <section aria-label="Política de Privacidade do Lírio" className="privacy-intro">
        <p className="hero-kicker">Política de Privacidade</p>
        <h1 className="about2-name">Lírio</h1>
        <p className="about2-role-tag">Última atualização: {lastUpdatedPt}</p>
      </section>

      <div className="about2-sections">
        <div className="about2-card" lang="pt-BR">
          {sectionsPt.map((section) => (
            <div key={section.title} className="privacy-card-block">
              <span className="about2-label">{section.title}</span>
              {section.body}
            </div>
          ))}
          <ContactBlock
            title="13. Contato"
            text="Dúvidas ou pedidos sobre privacidade podem ser enviados para:"
            controller="Responsável: Fran Camargo"
          />
        </div>

        <section aria-label="Lírio Privacy Policy" className="privacy-intro" lang="en">
          <p className="hero-kicker">Privacy Policy</p>
          <h2 className="about2-name">Lírio</h2>
          <p className="about2-role-tag">Last updated: {lastUpdatedEn}</p>
        </section>

        <div className="about2-card" lang="en">
          {sectionsEn.map((section) => (
            <div key={section.title} className="privacy-card-block">
              <span className="about2-label">{section.title}</span>
              {section.body}
            </div>
          ))}
          <ContactBlock
            title="13. Contact"
            text="Privacy questions or requests can be sent to:"
            controller="Controller: Fran Camargo"
          />
        </div>
      </div>
    </main>
  )
}
