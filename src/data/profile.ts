export const profile = {
  name: 'Franciely Camargo',
  shortName: 'Fran Camargo',
  role: 'Front-End Developer',
  specialty: 'UI/UX Specialist',
  email: 'francamargoads@gmail.com',
  linkedin: 'https://www.linkedin.com/in/francamargodev',
  linkedinHandle: '@francamargodev',
  github: 'https://github.com/francamargo',
  whatsapp: 'https://wa.me/5547988283491',
}

export const coreStack = [
  'Angular',
  'React',
  'TypeScript',
  'React Native',
  'Tailwind CSS',
  'Figma',
  'Node.js',
  'GenAI',
]

export type Project = {
  name: string
  kind: 'Mobile' | 'Web'
  description: string
  stack: string[]
  url?: string
  linkLabel?: string
  statusLabel?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'Oliv Devocional',
    kind: 'Mobile',
    url: 'https://play.google.com/store/apps/details?id=com.francamargo.oliv',
    linkLabel: 'Ver na Google Play',
    stack: ['React Native', 'TypeScript', 'EAS'],
    featured: true,
    description:
      'Aplicativo devocional para mulheres cristãs que integra Bíblia, diário de oração e versículo do dia em uma experiência focada e livre de distrações. Desenvolvido de ponta a ponta, da concepção do produto ao deploy em produção na Google Play, com React Native e TypeScript e pipeline de build via EAS. Interface moderna com identidade visual autoral, recursos de acessibilidade e sistema de conquistas para engajamento.',
  },
  {
    name: 'Lírio App',
    kind: 'Mobile',
    statusLabel: 'Em breve na Google Play',
    stack: ['React Native', 'TypeScript', 'Firebase'],
    description:
      'Aplicativo de leitura de livros de domínio público com estante realista e personalizável, loja de decorações, conteúdo compartilhável e recursos de acessibilidade. Desenvolvido em React Native e TypeScript, com autenticação e sincronização em nuvem via Firebase e pipeline de build via EAS. Atualmente em fase de testes fechados na Google Play.',
  },
  {
    name: 'Chat.AI',
    kind: 'Web',
    url: 'https://fc-chatai.netlify.app/',
    stack: ['React', 'Redux', 'TypeScript'],
    featured: true,
    description:
      'SPA que simula uma plataforma de assistente de IA com autenticação, histórico de conversas persistido e análise de uso. Estudo prático de React com Redux. Acesse com qualquer senha; usuário "Admin" desbloqueia um dashboard de análise (inicie conversas para ver os dados, pois é mockado com persistência local).',
  },
  {
    name: 'BestElements',
    kind: 'Web',
    url: 'https://francamargo.github.io/bestElements/',
    stack: ['React', 'TypeScript', 'Vite'],
    description:
      'Galeria autoral de componentes visuais, loaders, padrões e micro-experiências front-end. Une portfólio técnico e laboratório de UI: cada item possui preview interativo para estudo, inspiração e referência. Atualmente com 20+ elementos e em expansão contínua.',
  },
  {
    name: 'OneRing Chat',
    kind: 'Web',
    url: 'https://chat2-ig7k.onrender.com/',
    stack: ['Angular', 'Node.js', 'Socket'],
    description:
      'Chat anônimo em Angular com backend Node.js e conexão entre sessões via Socket. Sem cadastro. Nome e cor únicos são gerados automaticamente. Conta com suporte a emoticons, mini jogos (Snake e Jogo da Velha) e termos de uso. Voltado para maiores de 18 anos.',
  },
  {
    name: 'Dicionário Angular',
    kind: 'Web',
    url: 'https://francamargo.github.io/dicionarioangular/',
    stack: ['Angular 21', 'Signals', 'TypeScript'],
    featured: true,
    description:
      'Glossário interativo com os principais termos, conceitos e depreciações do Angular, organizado por versão (v14 a v22). Traz uma lista geral pesquisável com filtros por categoria e paginação, além de uma aba dedicada às APIs descontinuadas, cada uma com a versão de depreciação e a alternativa recomendada. Projeto de estudo em Angular 21, com Signals e o novo control flow.',
  },
  {
    name: 'UneBR',
    kind: 'Mobile',
    statusLabel: 'Em breve na Google Play',
    stack: ['React Native', 'Android'],
    description:
      'Aplicativo mobile independente e não oficial que reúne, em um só lugar, links oficiais e dicas de acesso a serviços públicos brasileiros (INSS, Receita Federal, Detran, Caixa Econômica Federal, entre outros). Sem login, cadastro ou armazenamento de dados em servidor próprio. Desenvolvido em React Native / Android Studio. Ainda não publicado na PlayStore.',
  },
  {
    name: 'Cozyfy',
    kind: 'Mobile',
    statusLabel: 'Em desenvolvimento',
    stack: ['Expo', 'React Native', 'TypeScript'],
    description:
      'Aplicativo mobile em desenvolvimento com Expo (React Native) e TypeScript, pensado como um espaço acolhedor de bem-estar digital. Deve reunir chat online com login, mini games originais em estilo 8-bit, funcionalidades zen como meditação guiada e respiração guiada, além de calendário, horóscopo, combinações e muito mais.',
  },
]
