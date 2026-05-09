export type GalleryItem = {
  slug: string
  title: string
  subtitle: string
  category: string
  gradientClass: string
  route: string
  description: string
  highlights: string[]
  kpi: {
    label: string
    value: string
    trend: string
  }
}

export const galleryItems: GalleryItem[] = [
  {
    slug: 'dashboard-curadoria',
    title: 'Dashboard de Curadoria',
    subtitle: 'Visao geral do fluxo de curadoria com filtros, graficos e tabela.',
    category: 'Dashboard',
    gradientClass: 'thumb-curadoria-dashboard',
    route: '/elementos/dashboard-curadoria',
    description:
      'Painel principal da curadoria com periodo, ativo, modelo, visualizacoes de temas e lista de feedbacks com exportacao.',
    highlights: [
      'Filtros por periodo, ativo e modelo',
      'Grafico de temas e heatmap tema x ativo',
      'Tabela com detalhe e acoes por feedback',
    ],
    kpi: {
      label: 'Cobertura da Curadoria',
      value: '96%',
      trend: '+8 p.p. nas ultimas 2 semanas',
    },
  },
  {
    slug: 'curadoria-button',
    title: 'Button',
    subtitle: 'Botao unico de acao com hover elegante e brilho afiado.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-button',
    route: '/elementos/curadoria-button',
    description:
      'Botao CTA unico, com visual roxo premium e efeito de brilho direcional no hover para destacar a acao principal.',
    highlights: [
      'Visual roxo com contraste alto',
      'Brilho afiado e sofisticado no hover',
      'Foco total em uma acao principal de maior impacto',
    ],
    kpi: {
      label: 'Cliques em Acoes Primarias',
      value: '1.2k',
      trend: '+12% em relacao ao ciclo anterior',
    },
  },
  {
    slug: 'curadoria-toggle',
    title: 'Toggle',
    subtitle: 'Controle para alternar entre dados mockados e dados reais.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-toggle',
    route: '/elementos/curadoria-toggle',
    description:
      'Toggle de ambiente para alternar origem de dados com feedback visual claro, ideal para demonstracao e validacao rapida.',
    highlights: [
      'Alternancia instantanea entre contextos',
      'Persistencia da preferencia em armazenamento local',
      'Controle acessivel com rotulo semantico',
    ],
    kpi: {
      label: 'Tempo Medio de Troca de Contexto',
      value: '1.3s',
      trend: '-40% com alternancia direta na tela',
    },
  },
  {
    slug: 'curadoria-line-graph',
    title: 'Line Graph',
    subtitle: 'Serie temporal de thumbs up/down e media movel.',
    category: 'Grafico',
    gradientClass: 'thumb-curadoria-line',
    route: '/elementos/curadoria-line-graph',
    description:
      'Grafico de linha para acompanhar tendencia de feedbacks positivos e negativos com comparacao de media movel.',
    highlights: [
      'Leitura rapida de tendencia por periodo',
      'Serie comparativa entre positivo e negativo',
      'Base pronta para exportacao CSV',
    ],
    kpi: {
      label: 'Precisao da Tendencia Semanal',
      value: '93%',
      trend: '+5 p.p. apos ajuste de janelas',
    },
  },
  {
    slug: 'curadoria-progress-bar',
    title: 'Progress Bar',
    subtitle: 'Indicador de proporcao de feedback positivo no periodo.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-progress',
    route: '/elementos/curadoria-progress-bar',
    description:
      'Barra de progresso com valor absoluto e percentual para comunicar rapidamente saude da experiencia analisada.',
    highlights: [
      'Comunicacao imediata do percentual positivo',
      'Suporte a rotulo contextual dinamico',
      'Uso em resumo executivo da tela',
    ],
    kpi: {
      label: 'Feedback Positivo Consolidado',
      value: '78%',
      trend: '+6 p.p. em relacao ao mes anterior',
    },
  },
  {
    slug: 'curadoria-table-list',
    title: 'Table List',
    subtitle: 'Tabela paginada com filtros, ordenacao e acoes por linha.',
    category: 'Tabela',
    gradientClass: 'thumb-curadoria-table',
    route: '/elementos/curadoria-table-list',
    description:
      'Tabela para operacao diaria da curadoria, com campos essenciais para classificacao, revisao e abertura de acao.',
    highlights: [
      'Paginacao e ordenacao para escala',
      'Colunas com contexto de decisao',
      'Acao de detalhe com fluxo orientado',
    ],
    kpi: {
      label: 'Registros Revisados no Dia',
      value: '248',
      trend: '+18% de produtividade operacional',
    },
  },
  {
    slug: 'curadoria-datatable-simples',
    title: 'Datatable Simples',
    subtitle: 'Tabela com ordenacao, paginacao e selecao de linhas.',
    category: 'Tabela',
    gradientClass: 'thumb-curadoria-datatable',
    route: '/elementos/curadoria-datatable-simples',
    description:
      'Datatable reutilizavel para listas operacionais com ordenacao por coluna, paginacao, selecao em lote e acao por linha.',
    highlights: [
      'Ordenacao ascendente e descendente por coluna',
      'Paginacao com tamanho de pagina configuravel',
      'Selecao de linhas com acoes em lote',
    ],
    kpi: {
      label: 'Tempo Medio para Encontrar Registro',
      value: '2.1s',
      trend: '-34% com ordenacao e filtros rapidos',
    },
  },
  {
    slug: 'curadoria-modal-chatbot',
    title: 'Modal Chatbot',
    subtitle: 'Modal de assistente com quick actions, chat e estado de envio.',
    category: 'Modal',
    gradientClass: 'thumb-curadoria-chatbot',
    route: '/elementos/curadoria-modal-chatbot',
    description:
      'Modal de chatbot com cabecalho arrastavel, alternancia de tamanho, historico de mensagens e acoes rapidas para acelerar interacoes.',
    highlights: [
      'Mensagens de usuario e assistente com indicador de envio',
      'Acoes rapidas para prompts recorrentes',
      'Estado expansivel com foco em usabilidade',
    ],
    kpi: {
      label: 'Tempo Medio para Primeira Resposta',
      value: '1.8s',
      trend: '-27% com quick actions e contexto inicial',
    },
  },
  {
    slug: 'curadoria-magic-cube',
    title: 'Magic Cube',
    subtitle: 'Loader colorido 3D inspirado em cubo magico com animacao fluida.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-magic-cube',
    route: '/elementos/curadoria-magic-cube',
    description:
      'Loader visual com cubo magico animado em 3D, ideal para estados de espera em telas premium e experiencias interativas.',
    highlights: [
      'Animacao 3D continua com rotacao em multiplos eixos',
      'Paletas coloridas alternaveis para temas diferentes',
      'Controle de pausa para demonstracao e debug visual',
    ],
    kpi: {
      label: 'Percepcao de Qualidade Visual',
      value: '97%',
      trend: '+11 p.p. em testes de usabilidade',
    },
  },
  {
    slug: 'curadoria-orbit-loader',
    title: 'Orbit Loader',
    subtitle: 'Nucleos e satelites orbitando em velocidades diferentes.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-orbit-loader',
    route: '/elementos/curadoria-orbit-loader',
    description:
      'Loader orbital com trilhas multiplas para transmitir processamento inteligente e continuidade visual.',
    highlights: [
      'Camadas de orbita em ritmos distintos',
      'Centro pulsante com brilho suave',
      'Visual divertido para carregamentos de IA',
    ],
    kpi: {
      label: 'Engajamento Visual no Loading',
      value: '91%',
      trend: '+14% em relacao ao spinner simples',
    },
  },
  {
    slug: 'curadoria-gooey-loader',
    title: 'Gooey Loader',
    subtitle: 'Bolhas elasticas com efeito gel e movimento fluido.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-gooey-loader',
    route: '/elementos/curadoria-gooey-loader',
    description:
      'Loader organico com bolhas que se esticam e se fundem, ideal para interfaces amigaveis e criativas.',
    highlights: [
      'Animacao com sensação de liquido',
      'Ritmo continuo sem travamentos visuais',
      'Leitura clara mesmo em tamanhos pequenos',
    ],
    kpi: {
      label: 'Percepcao de Fluidez',
      value: '94%',
      trend: '+9 p.p. em testes de UX',
    },
  },
  {
    slug: 'curadoria-rocket-loader',
    title: 'Rocket Loader',
    subtitle: 'Foguete subindo com trilha de fumaca animada.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-rocket-loader',
    route: '/elementos/curadoria-rocket-loader',
    description:
      'Loader com narrativa visual de decolagem, trazendo energia para esperas de processamento pesado.',
    highlights: [
      'Movimento de subida e retorno em loop',
      'Particulas de fumaca com variacao temporal',
      'Estetica ludica e memoravel',
    ],
    kpi: {
      label: 'Memorizacao da Interface',
      value: '88%',
      trend: '+17% em recall visual',
    },
  },
  {
    slug: 'curadoria-candy-ring-loader',
    title: 'Candy Ring Loader',
    subtitle: 'Anel listrado com rotacao e wobble playful.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-candy-ring-loader',
    route: '/elementos/curadoria-candy-ring-loader',
    description:
      'Loader em formato de anel doce com listras vibrantes, pensado para esperas curtas e interfaces descontraidas.',
    highlights: [
      'Conic gradient com alto contraste',
      'Rotacao infinita com micro oscilacao',
      'Boa legibilidade em fundo claro e escuro',
    ],
    kpi: {
      label: 'Tempo Percebido de Espera',
      value: '-22%',
      trend: 'reducao percebida em testes moderados',
    },
  },
  {
    slug: 'curadoria-wave-bars-loader',
    title: 'Wave Bars Loader',
    subtitle: 'Barras em onda com cadencia ritmica e colorida.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-wave-bars-loader',
    route: '/elementos/curadoria-wave-bars-loader',
    description:
      'Loader de barras sequenciais com comportamento de onda para indicar atividade continua do sistema.',
    highlights: [
      'Sincronismo em cascata entre barras',
      'Palette viva com contraste equilibrado',
      'Escalavel para cards e componentes amplos',
    ],
    kpi: {
      label: 'Clareza de Estado de Carregamento',
      value: '96%',
      trend: '+12 p.p. com animacao cadenciada',
    },
  },
  {
    slug: 'curadoria-starfield-pattern',
    title: 'Starfield Pattern',
    subtitle: 'Padrao de estrelas com deslocamento continuo e brilho suave.',
    category: 'Padrao Visual',
    gradientClass: 'thumb-curadoria-starfield-pattern',
    route: '/elementos/curadoria-starfield-pattern',
    description:
      'Padrao animado de estrelas para fundos e seções hero, trazendo profundidade e movimento sem poluir a leitura.',
    highlights: [
      'Camadas de estrelas em velocidades diferentes',
      'Efeito de parallax leve com brilho pulsante',
      'Ideal para blocos de loading ou destaque visual',
    ],
    kpi: {
      label: 'Percepcao de Imersao',
      value: '92%',
      trend: '+10 p.p. em testes de primeira impressao',
    },
  },
  {
    slug: 'curadoria-gradient-river-pattern',
    title: 'Gradient River Pattern',
    subtitle: 'Degrades liquidos em fluxo continuo com mistura cromatica.',
    category: 'Padrao Visual',
    gradientClass: 'thumb-curadoria-gradient-river-pattern',
    route: '/elementos/curadoria-gradient-river-pattern',
    description:
      'Padrao de degrades animados em camadas que gera um visual organico e moderno para areas de destaque.',
    highlights: [
      'Blob gradients com motion suave',
      'Variacao de tons sem transicoes bruscas',
      'Funciona como fundo vivo para cards e seesoes',
    ],
    kpi: {
      label: 'Tempo Medio de Permanencia',
      value: '+13%',
      trend: 'aumento em blocos com visual atmosferico',
    },
  },
  {
    slug: 'curadoria-fluid-water',
    title: 'Fluid Water',
    subtitle: 'Ondas suaves que preenchem e esvaziam o espaco lentamente.',
    category: 'Padrao Visual',
    gradientClass: 'thumb-curadoria-fluid-water',
    route: '/elementos/curadoria-fluid-water',
    description:
      'Padrao fluido simulando agua com movimento de ondas que sobem ate preencher a area e depois descem, em um ciclo relaxante.',
    highlights: [
      'Movimento ondulatório lateral e vertical',
      'Efeito de preenchimento gradual e esvaziamento',
      'Ideal para indicadores de progresso ou fundos imersivos',
    ],
    kpi: {
      label: 'Engajamento Visual em Transicao',
      value: '98%',
      trend: '+22% em retencao de usuario durante loading',
    },
  },
  {
    slug: 'confetti-pop-button',
    title: 'Confetti Pop',
    subtitle: 'Botao divertido que dispara confete colorido no toque.',
    category: 'Button',
    gradientClass: 'thumb-confetti-pop-button',
    route: '/elementos/confetti-pop-button',
    description:
      'Componente vibrante para gamificacao e conquistas, com animacao celebrativa e identidade alegre.',
    highlights: [
      'Explosao visual com confetes animados',
      'Ideal para estados de sucesso',
      'Tom ludico sem perder clareza de acao',
    ],
    kpi: {
      label: 'Interacoes por Sessao',
      value: '4.8',
      trend: '+21% em jornadas gamificadas',
    },
  },
  {
    slug: 'doodle-checklist-board',
    title: 'Doodle Checklist Board',
    subtitle: 'Checklist hand-drawn com rabiscos e personalidade.',
    category: 'Checkbox',
    gradientClass: 'thumb-doodle-checklist-board',
    route: '/elementos/doodle-checklist-board',
    description:
      'Versao descontraida de checklist, com linguagem visual de caderno ilustrado para experiencias criativas.',
    highlights: [
      'Traço informal com bordas desenhadas',
      'Animacao leve de marcacao',
      'Ideal para fluxos de onboarding ludico',
    ],
    kpi: {
      label: 'Aderencia ao Onboarding',
      value: '92%',
      trend: '+15% com linguagem visual amigavel',
    },
  },
  {
    slug: 'aurora-weather-card',
    title: 'Aurora Weather Card',
    subtitle: 'Card meteo elegante com gradiente atmosferico e dados essenciais.',
    category: 'Weather Card',
    gradientClass: 'thumb-aurora-weather-card',
    route: '/elementos/aurora-weather-card',
    description:
      'Cartao de clima com visual premium para apps de viagem, mobilidade e planejamento diario.',
    highlights: [
      'Hierarquia forte de temperatura e condicao',
      'Indicadores de vento e umidade',
      'Composicao limpa com foco em leitura rapida',
    ],
    kpi: {
      label: 'Tempo para Leitura',
      value: '1.2s',
      trend: '-33% com layout priorizado',
    },
  },
  {
    slug: 'pixel-forecast-card',
    title: 'Pixel Forecast',
    subtitle: 'Previsao retrô em estilo arcade com icones 8-bit.',
    category: 'Weather Card',
    gradientClass: 'thumb-pixel-forecast-card',
    route: '/elementos/pixel-forecast-card',
    description:
      'Componente meteo nostalgico para projetos divertidos, com visual pixelado e paleta vibrante.',
    highlights: [
      'Estetica 8-bit autoral',
      'Micro previsao por periodo',
      'Tipografia em bloco de alta personalidade',
    ],
    kpi: {
      label: 'Memorizacao de UI',
      value: '89%',
      trend: '+19% em testes de recall',
    },
  },
  {
    slug: 'comic-quick-modal',
    title: 'Comic Quick Modal',
    subtitle: 'Modal em estilo HQ para feedback rapido e bem humorado.',
    category: 'Modal',
    gradientClass: 'thumb-comic-quick-modal',
    route: '/elementos/comic-quick-modal',
    description:
      'Dialogo expressivo com visual de quadrinhos, pensado para comunicacoes leves e chamativas.',
    highlights: [
      'Tipografia impactante em estilo comic',
      'Baloes de fala para contexto',
      'Uso ideal em campanhas e notificacoes internas',
    ],
    kpi: {
      label: 'Taxa de Leitura Completa',
      value: '95%',
      trend: '+17% em comunicados curtos',
    },
  },
  {
    slug: 'sticky-notes-kanban',
    title: 'Sticky Notes Kanban',
    subtitle: 'Quadro de post-its com colunas e foco em priorizacao visual.',
    category: 'Stick Notes',
    gradientClass: 'thumb-sticky-notes-kanban',
    route: '/elementos/sticky-notes-kanban',
    description:
      'Painel de notas para ideacao e planejamento, com estilo analogico e organizacao em fluxo.',
    highlights: [
      'Notas com cores funcionais por tipo',
      'Disposicao em colunas de progresso',
      'Visual colaborativo para squads',
    ],
    kpi: {
      label: 'Priorizacoes Semanais',
      value: '42',
      trend: '+28% de alinhamento de backlog',
    },
  },
  {
    slug: 'prism-pulse-loader',
    title: 'Prism Pulse Loader',
    subtitle: 'Loader de prisma com pulsos de cor em ciclos ritmicos.',
    category: 'Loader',
    gradientClass: 'thumb-prism-pulse-loader',
    route: '/elementos/prism-pulse-loader',
    description:
      'Animacao refinada para estados de espera premium, com foco em elegancia e fluidez.',
    highlights: [
      'Anel prismático com pulsacao suave',
      'Ritmo constante para reduzir ansiedade',
      'Compativel com contextos corporativos',
    ],
    kpi: {
      label: 'Percepcao de Fluidez',
      value: '93%',
      trend: '+8 p.p. contra spinner padrao',
    },
  },
  {
    slug: 'cloud-drizzle-loader',
    title: 'Cloud Drizzle Loader',
    subtitle: 'Nuvem animada com chuva leve para espera amigavel.',
    category: 'Loader',
    gradientClass: 'thumb-cloud-drizzle-loader',
    route: '/elementos/cloud-drizzle-loader',
    description:
      'Loader tematico para apps de clima e mobilidade, com linguagem suave e acolhedora.',
    highlights: [
      'Gotas em loop com cadencia natural',
      'Nuvem com volume e profundidade',
      'Estetica clean para microesperas',
    ],
    kpi: {
      label: 'Satisfacao em Esperas Curtas',
      value: '94%',
      trend: '+10 p.p. em interfaces meteo',
    },
  },
  {
    slug: 'finance-snapshot-card',
    title: 'Finance Snapshot',
    subtitle: 'Card financeiro com saldo, meta mensal e status de risco.',
    category: 'Card',
    gradientClass: 'thumb-finance-snapshot-card',
    route: '/elementos/finance-snapshot-card',
    description:
      'Resumo financeiro para visao rapida do periodo com foco em governanca e previsibilidade.',
    highlights: [
      'Saldo atual com contraste forte',
      'Barra de meta acumulada',
      'Tag de risco para tomada de decisao',
    ],
    kpi: {
      label: 'Tempo para Diagnostico',
      value: '2.0s',
      trend: '-29% com resumo em card unico',
    },
  },
  {
    slug: 'sketch-profile-card',
    title: 'Sketch Profile Card',
    subtitle: 'Card ilustrado com linhas desenhadas e bloco de bio criativo.',
    category: 'Card',
    gradientClass: 'thumb-sketch-profile-card',
    route: '/elementos/sketch-profile-card',
    description:
      'Perfil autoral em estilo drawing para portfolios, comunidades e experiencias editoriais.',
    highlights: [
      'Bordas irregulares com efeito manual',
      'Avatar ilustrado com textura de lapis',
      'Tom humano e amigavel',
    ],
    kpi: {
      label: 'Conexao com a Marca Pessoal',
      value: '91%',
      trend: '+12 p.p. em paginas de perfil',
    },
  },
]
