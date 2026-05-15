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
    title: 'Dashboard Graph',
    subtitle: 'Visão geral com filtros, gráficos e tabela.',
    category: 'Dashboard',
    gradientClass: 'thumb-curadoria-dashboard',
    route: '/elementos/dashboard-curadoria',
    description:
      'Painel principal de dashboard com período, ativo, modelo, visualizações de temas e lista de feedbacks com exportação.',
    highlights: [],
    kpi: {
      label: 'Cobertura da Curadoria',
      value: '96%',
      trend: '+8 p.p. nas últimas 2 semanas',
    },
  },
  {
    slug: 'curadoria-button',
    title: 'Button',
    subtitle: 'Botão único de ação com hover elegante e brilho afiado.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-button',
    route: '/elementos/curadoria-button',
    description:
      'Botão CTA único, com visual roxo e efeito de brilho direcional no hover para destacar a ação principal.',
    highlights: [
      'Visual roxo com contraste alto',
      'Brilho afiado e sofisticado no hover',
      'Foco total em uma ação principal de maior impacto',
    ],
    kpi: {
      label: 'Cliques em Ações Primárias',
      value: '1.2k',
      trend: '+12% em relação ao ciclo anterior',
    },
  },
  {
    slug: 'curadoria-neomorphic-button',
    title: 'Neomorphic Button',
    subtitle: 'Botão neomórfico com três estados de clique.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-neomorphic-button',
    route: '/elementos/curadoria-neomorphic-button',
    description:
      'Botão circular em estilo neomórfico claro, com variações de sombra para simular relevo externo, côncavo interno e anel externo de foco visual.',
    highlights: [
      'Estado parado com sombra externa suave',
      'Estado de clique com cavidade e profundidade interna',
      'Estado de clique duplo com anel externo e camada central',
    ],
    kpi: {
      label: 'Leitura de Estado do Botão',
      value: '92%',
      trend: '+14% em testes de percepção visual',
    },
  },
  {
    slug: 'curadoria-toggle',
    title: 'Celestial Toggle',
    subtitle: 'Alternador Sol/Lua com brilho cinematográfico e estética cósmica.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-toggle',
    route: '/elementos/curadoria-toggle',
    description:
      'Toggle temático Sol/Lua com animação refinada, pensado para troca de modos de interface com foco em identidade visual e presença premium.',
    highlights: [
      'Núcleo lunar elegante com transição suave',
      'Estado solar com corona e raios animados',
      'Interação compacta sem ruído visual no preview',
    ],
    kpi: {
      label: 'Adoção do Toggle Temático',
      value: '87%',
      trend: '+19% em preferência por alternadores visuais',
    },
  },
  {
    slug: 'curadoria-realistic-toggle',
    title: 'Concave RGB Toggle',
    subtitle: 'Toggle realista côncavo com linha RGB fina na borda.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-realistic-toggle',
    route: '/elementos/curadoria-realistic-toggle',
    description:
      'Alternador realista inspirado em hardware, com base côncava, sombras neutras e linha RGB discreta seguindo todo o contorno do botão.',
    highlights: [
      'Canal interno com leitura de profundidade côncava',
      'Linha RGB fina no contorno externo sem brilho exagerado',
      'Preview limpo sem superfície extra além do próprio botão',
    ],
    kpi: {
      label: 'Percepção de Realismo do Componente',
      value: '93%',
      trend: '+19% vs. versão sem contorno RGB',
    },
  },
  {
    slug: 'curadoria-line-graph',
    title: 'Line Graph',
    subtitle: 'Série temporal de thumbs up/down e média móvel.',
    category: 'Gráfico',
    gradientClass: 'thumb-curadoria-line',
    route: '/elementos/curadoria-line-graph',
    description:
      'Gráfico de linha para acompanhar tendência de feedbacks positivos e negativos com comparação de média móvel.',
    highlights: [
      'Leitura rápida de tendência por período',
      'Série comparativa entre positivo e negativo',
      'Base pronta para exportação CSV',
    ],
    kpi: {
      label: 'Precisão da Tendência Semanal',
      value: '93%',
      trend: '+5 p.p. após ajuste de janelas',
    },
  },
  {
    slug: 'curadoria-progress-bar',
    title: 'Progress Bar',
    subtitle: 'Indicador de proporção de feedback positivo no período.',
    category: 'Componente',
    gradientClass: 'thumb-curadoria-progress',
    route: '/elementos/curadoria-progress-bar',
    description:
      'Barra de progresso com valor absoluto e percentual para comunicar rapidamente a saúde da experiência analisada.',
    highlights: [
      'Comunicação imediata do percentual positivo',
      'Suporte a rótulo contextual dinâmico',
      'Uso em resumo executivo da tela',
    ],
    kpi: {
      label: 'Feedback Positivo Consolidado',
      value: '78%',
      trend: '+6 p.p. em relação ao mês anterior',
    },
  },
  {
    slug: 'curadoria-table-list',
    title: 'Table List',
    subtitle: 'Tabela paginada com filtros, ordenação e ações por linha.',
    category: 'Tabela',
    gradientClass: 'thumb-curadoria-table',
    route: '/elementos/curadoria-table-list',
    description:
      'Tabela para operação diária da curadoria, com campos essenciais para classificação, revisão e abertura de ação.',
    highlights: [
      'Paginação e ordenação para escala',
      'Colunas com contexto de decisão',
      'Ação de detalhe com fluxo orientado',
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
    subtitle: 'Tabela com ordenação, paginação e seleção de linhas.',
    category: 'Tabela',
    gradientClass: 'thumb-curadoria-datatable',
    route: '/elementos/curadoria-datatable-simples',
    description:
      'Datatable reutilizável para listas operacionais com ordenação por coluna, paginação, seleção em lote e ação por linha.',
    highlights: [
      'Ordenação ascendente e descendente por coluna',
      'Paginação com tamanho de página configurável',
      'Seleção de linhas com ações em lote',
    ],
    kpi: {
      label: 'Tempo Médio para Encontrar Registro',
      value: '2.1s',
      trend: '-34% com ordenação e filtros rápidos',
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
      'Modal de chatbot com cabeçalho arrastável, alternância de tamanho, histórico de mensagens e ações rápidas para acelerar interações.',
    highlights: [
      'Mensagens de usuário e assistente com indicador de envio',
      'Ações rápidas para prompts recorrentes',
      'Estado expansível com foco em usabilidade',
    ],
    kpi: {
      label: 'Tempo Médio para Primeira Resposta',
      value: '1.8s',
      trend: '-27% com quick actions e contexto inicial',
    },
  },
  {
    slug: 'curadoria-magic-cube',
    title: 'Magic Cube',
    subtitle: 'Loader colorido 3D inspirado em cubo mágico com animação fluida.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-magic-cube',
    route: '/elementos/curadoria-magic-cube',
    description:
      'Loader visual com cubo mágico animado em 3D, ideal para estados de espera em telas premium e experiências interativas.',
    highlights: [
      'Animação 3D contínua com rotação em múltiplos eixos',
      'Paletas coloridas alternáveis para temas diferentes',
      'Controle de pausa para demonstração e debug visual',
    ],
    kpi: {
      label: 'Percepção de Qualidade Visual',
      value: '97%',
      trend: '+11 p.p. em testes de usabilidade',
    },
  },
  {
    slug: 'curadoria-orbit-loader',
    title: 'Orbit Loader',
    subtitle: 'Núcleos e satélites orbitando em velocidades diferentes.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-orbit-loader',
    route: '/elementos/curadoria-orbit-loader',
    description:
      'Loader orbital com trilhas múltiplas para transmitir processamento inteligente e continuidade visual.',
    highlights: [
      'Camadas de órbita em ritmos distintos',
      'Centro pulsante com brilho suave',
      'Visual divertido para carregamentos de IA',
    ],
    kpi: {
      label: 'Engajamento Visual no Loading',
      value: '91%',
      trend: '+14% em relação ao spinner simples',
    },
  },
  {
    slug: 'curadoria-gooey-loader',
    title: 'Gooey Loader',
    subtitle: 'Bolhas elásticas com efeito gel e movimento fluido.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-gooey-loader',
    route: '/elementos/curadoria-gooey-loader',
    description:
      'Loader orgânico com bolhas que se esticam e se fundem, ideal para interfaces amigáveis e criativas.',
    highlights: [
      'Animação com sensação de líquido',
      'Ritmo contínuo sem travamentos visuais',
      'Leitura clara mesmo em tamanhos pequenos',
    ],
    kpi: {
      label: 'Percepção de Fluidez',
      value: '94%',
      trend: '+9 p.p. em testes de UX',
    },
  },
  {
    slug: 'curadoria-rocket-loader',
    title: 'Rocket Loader',
    subtitle: 'Foguete subindo com trilha de fumaça animada.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-rocket-loader',
    route: '/elementos/curadoria-rocket-loader',
    description:
      'Loader com narrativa visual de decolagem, trazendo energia para esperas de processamento pesado.',
    highlights: [
      'Movimento de subida e retorno em loop',
      'Partículas de fumaça com variação temporal',
      'Estética lúdica e memorável',
    ],
    kpi: {
      label: 'Memorização da Interface',
      value: '88%',
      trend: '+17% em recall visual',
    },
  },
  {
    slug: 'curadoria-candy-ring-loader',
    title: 'Candy Ring Loader',
    subtitle: 'Anel listrado com rotação e wobble playful.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-candy-ring-loader',
    route: '/elementos/curadoria-candy-ring-loader',
    description:
      'Loader em formato de anel doce com listras vibrantes, pensado para esperas curtas e interfaces descontraídas.',
    highlights: [
      'Conic gradient com alto contraste',
      'Rotação infinita com micro oscilação',
      'Boa legibilidade em fundo claro e escuro',
    ],
    kpi: {
      label: 'Tempo Percebido de Espera',
      value: '-22%',
      trend: 'redução percebida em testes moderados',
    },
  },
  {
    slug: 'curadoria-wave-bars-loader',
    title: 'Wave Bars Loader',
    subtitle: 'Barras em onda com cadência rítmica e colorida.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-wave-bars-loader',
    route: '/elementos/curadoria-wave-bars-loader',
    description:
      'Loader de barras sequenciais com comportamento de onda para indicar atividade contínua do sistema.',
    highlights: [
      'Sincronismo em cascata entre barras',
      'Palette viva com contraste equilibrado',
      'Escalável para cards e componentes amplos',
    ],
    kpi: {
      label: 'Clareza de Estado de Carregamento',
      value: '96%',
      trend: '+12 p.p. com animação cadenciada',
    },
  },
  {
    slug: 'curadoria-realistic-progress-loader',
    title: 'Realistic Progress Loader',
    subtitle: 'Barra de progresso realista com bolha de percentual e base profunda.',
    category: 'Loader',
    gradientClass: 'thumb-curadoria-realistic-progress-loader',
    route: '/elementos/curadoria-realistic-progress-loader',
    description:
      'Loader de progresso inspirado em interfaces realistas, com trilho cavo, preenchimento suave e etiqueta flutuante para o percentual atual.',
    highlights: [
      'Base com sombras internas para efeito de profundidade',
      'Preenchimento verde com volume e brilho controlado',
      'Bolha superior com ponteiro para leitura imediata',
    ],
    kpi: {
      label: 'Percepcao de Progresso Durante Espera',
      value: '95%',
      trend: '+18% em testes com barra realista',
    },
  },
  {
    slug: 'curadoria-starfield-pattern',
    title: 'Starfield Pattern',
    subtitle: 'Padrão de estrelas com deslocamento contínuo e brilho suave.',
    category: 'Padrão Visual',
    gradientClass: 'thumb-curadoria-starfield-pattern',
    route: '/elementos/curadoria-starfield-pattern',
    description:
      'Padrão animado de estrelas para fundos e seções hero, trazendo profundidade e movimento sem poluir a leitura.',
    highlights: [
      'Camadas de estrelas em velocidades diferentes',
      'Efeito de parallax leve com brilho pulsante',
      'Ideal para blocos de loading ou destaque visual',
    ],
    kpi: {
      label: 'Percepção de Imersão',
      value: '92%',
      trend: '+10 p.p. em testes de primeira impressão',
    },
  },
  {
    slug: 'curadoria-gradient-river-pattern',
    title: 'Gradient River Pattern',
    subtitle: 'Degradês líquidos em fluxo contínuo com mistura cromática.',
    category: 'Padrão Visual',
    gradientClass: 'thumb-curadoria-gradient-river-pattern',
    route: '/elementos/curadoria-gradient-river-pattern',
    description:
      'Padrão de degradês animados em camadas que gera um visual orgânico e moderno para áreas de destaque.',
    highlights: [
      'Blob gradients com motion suave',
      'Variação de tons sem transições bruscas',
      'Funciona como fundo vivo para cards e seções',
    ],
    kpi: {
      label: 'Tempo Médio de Permanência',
      value: '+13%',
      trend: 'aumento em blocos com visual atmosférico',
    },
  },
  {
    slug: 'curadoria-fluid-water',
    title: 'Fluid Water',
    subtitle: 'Ondas suaves que preenchem e esvaziam o espaço lentamente.',
    category: 'Padrão Visual',
    gradientClass: 'thumb-curadoria-fluid-water',
    route: '/elementos/curadoria-fluid-water',
    description:
      'Padrão fluido simulando água com movimento de ondas que sobem até preencher a área e depois descem, em um ciclo relaxante.',
    highlights: [
      'Movimento ondulatório lateral e vertical',
      'Efeito de preenchimento gradual e esvaziamento',
      'Ideal para indicadores de progresso ou fundos imersivos',
    ],
    kpi: {
      label: 'Engajamento Visual em Transição',
      value: '98%',
      trend: '+22% em retenção de usuário durante loading',
    },
  },
  {
    slug: 'confetti-pop-button',
    title: 'Confetti Pop',
    subtitle: 'Botão divertido que dispara confete colorido no toque.',
    category: 'Button',
    gradientClass: 'thumb-confetti-pop-button',
    route: '/elementos/confetti-pop-button',
    description:
      'Componente vibrante para gamificação e conquistas, com animação celebrativa e identidade alegre.',
    highlights: [
      'Explosão visual com confetes animados',
      'Ideal para estados de sucesso',
      'Tom lúdico sem perder clareza de ação',
    ],
    kpi: {
      label: 'Interações por Sessão',
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
      'Versão descontraída de checklist, com linguagem visual de caderno ilustrado para experiências criativas.',
    highlights: [
      'Traço informal com bordas desenhadas',
      'Animação leve de marcação',
      'Ideal para fluxos de onboarding lúdico',
    ],
    kpi: {
      label: 'Aderência ao Onboarding',
      value: '92%',
      trend: '+15% com linguagem visual amigável',
    },
  },
  {
    slug: 'aurora-weather-card',
    title: 'Aurora Weather Card',
    subtitle: 'Card meteo elegante com gradiente atmosférico e dados essenciais.',
    category: 'Weather Card',
    gradientClass: 'thumb-aurora-weather-card',
    route: '/elementos/aurora-weather-card',
    description:
      'Cartão de clima com visual premium para apps de viagem, mobilidade e planejamento diário.',
    highlights: [
      'Hierarquia forte de temperatura e condição',
      'Indicadores de vento e umidade',
      'Composição limpa com foco em leitura rápida',
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
    subtitle: 'Previsão retrô em estilo arcade com ícones 8-bit.',
    category: 'Weather Card',
    gradientClass: 'thumb-pixel-forecast-card',
    route: '/elementos/pixel-forecast-card',
    description:
      'Componente meteo nostálgico para projetos divertidos, com visual pixelado e paleta vibrante.',
    highlights: [
      'Estética 8-bit autoral',
      'Micro previsão por período',
      'Tipografia em bloco de alta personalidade',
    ],
    kpi: {
      label: 'Memorização de UI',
      value: '89%',
      trend: '+19% em testes de recall',
    },
  },
  {
    slug: 'lilac-weather-glass-card',
    title: 'Lilac Weather Glass Card',
    subtitle: 'Weather card translúcido com timeline horária e wallpaper lilás.',
    category: 'Weather Card',
    gradientClass: 'thumb-lilac-weather-glass-card',
    route: '/elementos/lilac-weather-glass-card',
    description:
      'Card de clima inspirado em interfaces elegantes, com leitura rápida de temperatura atual, abas de contexto e previsão por hora.',
    highlights: [
      'Wallpaper wpplilac preenchendo todo o fundo do card',
      'Composição glassmorphism com tipografia leve e premium',
      'Timeline horária com foco na variação de temperatura',
    ],
    kpi: {
      label: 'Tempo para Leitura de Previsao',
      value: '1.4s',
      trend: '-28% com hierarquia visual por blocos',
    },
  },
  {
    slug: 'comic-quick-modal',
    title: 'Comic Quick Modal',
    subtitle: 'Modal em estilo HQ para feedback rápido e bem-humorado.',
    category: 'Modal',
    gradientClass: 'thumb-comic-quick-modal',
    route: '/elementos/comic-quick-modal',
    description:
      'Diálogo expressivo com visual de quadrinhos, pensado para comunicações leves e chamativas.',
    highlights: [
      'Tipografia impactante em estilo comic',
      'Balões de fala para contexto',
      'Uso ideal em campanhas e notificações internas',
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
    subtitle: 'Quadro de post-its com colunas e foco em priorização visual.',
    category: 'Stick Notes',
    gradientClass: 'thumb-sticky-notes-kanban',
    route: '/elementos/sticky-notes-kanban',
    description:
      'Painel de notas para ideação e planejamento, com estilo analógico e organização em fluxo.',
    highlights: [
      'Notas com cores funcionais por tipo',
      'Disposição em colunas de progresso',
      'Visual colaborativo para squads',
    ],
    kpi: {
      label: 'Priorizações Semanais',
      value: '42',
      trend: '+28% de alinhamento de backlog',
    },
  },
  {
    slug: 'prism-pulse-loader',
    title: 'Prism Pulse Loader',
    subtitle: 'Loader de prisma com pulsos de cor em ciclos rítmicos.',
    category: 'Loader',
    gradientClass: 'thumb-prism-pulse-loader',
    route: '/elementos/prism-pulse-loader',
    description:
      'Animação refinada para estados de espera premium, com foco em elegância e fluidez.',
    highlights: [
      'Anel prismático com pulsação suave',
      'Ritmo constante para reduzir ansiedade',
      'Compatível com contextos corporativos',
    ],
    kpi: {
      label: 'Percepção de Fluidez',
      value: '93%',
      trend: '+8 p.p. contra spinner padrão',
    },
  },
  {
    slug: 'cloud-drizzle-loader',
    title: 'Cloud Drizzle Loader',
    subtitle: 'Nuvem animada com chuva leve para espera amigável.',
    category: 'Loader',
    gradientClass: 'thumb-cloud-drizzle-loader',
    route: '/elementos/cloud-drizzle-loader',
    description:
      'Loader temático para apps de clima e mobilidade, com linguagem suave e acolhedora.',
    highlights: [
      'Gotas em loop com cadência natural',
      'Nuvem com volume e profundidade',
      'Estética clean para microesperas',
    ],
    kpi: {
      label: 'Satisfação em Esperas Curtas',
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
      'Resumo financeiro para visão rápida do período com foco em governança e previsibilidade.',
    highlights: [
      'Saldo atual com contraste forte',
      'Barra de meta acumulada',
      'Tag de risco para tomada de decisão',
    ],
    kpi: {
      label: 'Tempo para Diagnóstico',
      value: '2.0s',
      trend: '-29% com resumo em card único',
    },
  },
  {
    slug: 'retro-music-player-card',
    title: 'Vinyl Music Player',
    subtitle: 'Player com disco de vinil girando, capa do álbum e atmosfera neon.',
    category: 'Music Player',
    gradientClass: 'thumb-retro-music-player-card',
    route: '/elementos/retro-music-player-card',
    description:
      'Card musical com estética minimalista azul bebê, simulando toca-discos com rotação contínua e capa central do álbum.',
    highlights: [
      'Disco de vinil com ranhuras e animação de rotação suave',
      'Capa do álbum no centro com identidade visual do artista',
      'Controles de play/pause e barra de progresso sincronizada',
    ],
    kpi: {
      label: 'Tempo Médio de Interação no Card',
      value: '42s',
      trend: '+24% em testes de engajamento visual',
    },
  },
  {
    slug: 'lilac-gradient-music-player-card',
    title: 'Lilac Vinyl Music Player',
    subtitle: 'Versão em degradês lilás, roxo e branco com visual soft premium.',
    category: 'Music Player',
    gradientClass: 'thumb-lilac-gradient-music-player-card',
    route: '/elementos/lilac-gradient-music-player-card',
    description:
      'Variação do player musical com identidade clara em tons de roxo e lilás, mantendo o disco em rotação e controles centrais.',
    highlights: [
      'Paleta suave com degradês lilás e branco',
      'Disco girando com capa do álbum em destaque',
      'Controles circulares e timeline com acabamento glass',
    ],
    kpi: {
      label: 'Preferência por Tema Claro',
      value: '73%',
      trend: '+18% em testes A/B com variação lilás',
    },
  },
  {
    slug: 'starlight-nocturne-music-player-card',
    title: 'Starlight Nocturne Player',
    subtitle: 'Versão escura com estrelas vagando em movimento contínuo.',
    category: 'Music Player',
    gradientClass: 'thumb-starlight-nocturne-music-player-card',
    route: '/elementos/starlight-nocturne-music-player-card',
    description:
      'Player musical com atmosfera noturna, céu profundo em degradê e estrelas que se movem aleatoriamente ao redor do card.',
    highlights: [
      'Tema dark com profundidade e brilho sutil',
      'Campo estelar com animações assíncronas de deriva',
      'Mesma base interativa de reprodução e timeline',
    ],
    kpi: {
      label: 'Engajamento em Tema Noturno',
      value: '81%',
      trend: '+22% em sessões noturnas de navegação',
    },
  },
  {
    slug: 'forest-leaf-music-player-card',
    title: 'Forest Leaf Music Player',
    subtitle: 'Versão botânica com padrão de folhas e degradê verde profundo.',
    category: 'Music Player',
    gradientClass: 'thumb-forest-leaf-music-player-card',
    route: '/elementos/forest-leaf-music-player-card',
    description:
      'Player com atmosfera natural, padrão de folhas em movimento suave e base cromática em degradê verde inspirado na cor #1C472D.',
    highlights: [
      'Padrão orgânico de folhas com animação sutil',
      'Degradê verde escuro elegante com profundidade',
      'Controles e timeline no mesmo padrão interativo das outras versões',
    ],
    kpi: {
      label: 'Aprovação do Tema Orgânico',
      value: '84%',
      trend: '+20% em comparativos com temas sólidos',
    },
  },
  {
    slug: 'music-player-top-icon-button',
    title: 'Midnight Top Icon Button',
    subtitle: 'Botão de topo em azul-noturno para menu e navegação no player.',
    category: 'Button',
    gradientClass: 'thumb-music-player-top-icon-button',
    route: '/elementos/music-player-top-icon-button',
    description:
      'Botão superior em linguagem dark com gradiente azul profundo, pensado para headers de players com estética noturna.',
    highlights: [
      'Gradiente midnight com relevo suave',
      'Formato circular compacto de navegação',
      'Leitura forte em fundos escuros',
    ],
    kpi: {
      label: 'Precisão de Clique no Header',
      value: '98%',
      trend: '+9 p.p. em telas touch',
    },
  },
  {
    slug: 'music-player-top-icon-button-forest',
    title: 'Forest Top Icon Button',
    subtitle: 'Versão verde escura com atmosfera orgânica e elegante.',
    category: 'Button',
    gradientClass: 'thumb-music-player-top-icon-button-forest',
    route: '/elementos/music-player-top-icon-button-forest',
    description:
      'Botão de topo em gradientes verdes profundos, alinhado ao estilo forest para navegação em players botânicos.',
    highlights: [
      'Identidade verde intensa e sofisticada',
      'Contraste otimizado para fundos naturais',
      'Coerência visual com temas orgânicos',
    ],
    kpi: {
      label: 'Consistência de Tema Forest',
      value: '93%',
      trend: '+10% em percepção de coesão visual',
    },
  },
  {
    slug: 'music-player-play-button',
    title: 'Midnight Play Button',
    subtitle: 'Botão principal em azul-noturno para play e pause.',
    category: 'Button',
    gradientClass: 'thumb-music-player-play-button',
    route: '/elementos/music-player-play-button',
    description:
      'Botão central de reprodução com estilo dark e brilho controlado para destacar a ação principal do player.',
    highlights: [
      'Hierarquia visual forte para ação primária',
      'Toggle play/pause imediato',
      'Acabamento midnight com presença premium',
    ],
    kpi: {
      label: 'Taxa de Acionamento Primário',
      value: '92%',
      trend: '+14% com hierarquia visual reforçada',
    },
  },
  {
    slug: 'music-player-play-button-forest',
    title: 'Forest Play Button',
    subtitle: 'Botão de reprodução em verde para temas naturais.',
    category: 'Button',
    gradientClass: 'thumb-music-player-play-button-forest',
    route: '/elementos/music-player-play-button-forest',
    description:
      'Play button em degradê verde com tom orgânico e contraste forte para interfaces inspiradas em natureza.',
    highlights: [
      'Cor de ação em verde vibrante',
      'Botão principal com presença marcante',
      'Compatível com paletas forest e eco',
    ],
    kpi: {
      label: 'Ação Primária em Tema Verde',
      value: '91%',
      trend: '+12% de acionamento em layouts botânicos',
    },
  },
  {
    slug: 'music-player-share-button',
    title: 'Midnight Share Button',
    subtitle: 'Botão de share em azul-noturno com feedback de estado.',
    category: 'Button',
    gradientClass: 'thumb-music-player-share-button',
    route: '/elementos/music-player-share-button',
    description:
      'Ação secundária de compartilhamento em estilo dark, com retorno visual ao usuário após clique.',
    highlights: [
      'Ícone share com leitura imediata',
      'Mudança visual de estado compartilhado',
      'Acabamento midnight elegante',
    ],
    kpi: {
      label: 'Taxa de Compartilhamento',
      value: '37%',
      trend: '+11% com feedback de confirmação',
    },
  },
  {
    slug: 'music-player-share-button-forest',
    title: 'Forest Share Button',
    subtitle: 'Botão de compartilhamento verde para temas naturais.',
    category: 'Button',
    gradientClass: 'thumb-music-player-share-button-forest',
    route: '/elementos/music-player-share-button-forest',
    description:
      'Botão de share em paleta verde, ideal para players orgânicos e experiências visuais inspiradas na natureza.',
    highlights: [
      'Gradientes verdes com leitura consistente',
      'Feedback visual de compartilhamento',
      'Coesão com temas forest e ecológicos',
    ],
    kpi: {
      label: 'Compartilhamento em Tema Forest',
      value: '41%',
      trend: '+12% em cenários naturais',
    },
  },
  {
    slug: 'soft-depth-search-bar',
    title: 'Soft Depth Search Bar',
    subtitle: 'Search bar neon com glow suave e profundidade em camadas.',
    category: 'Input',
    gradientClass: 'thumb-soft-depth-search-bar',
    route: '/elementos/soft-depth-search-bar',
    description:
      'Campo de busca inspirado em interfaces neon, com bordas macias, brilho em dois tons e botão de lupa em relevo.',
    highlights: [
      'Visual soft com profundidade e sombra difusa',
      'Glow equilibrado entre azul e magenta',
      'Feedback de foco para reforcar interacao',
    ],
    kpi: {
      label: 'Conversao em Busca Inicial',
      value: '68%',
      trend: '+16% em testes de descoberta de conteudo',
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
      'Perfil autoral em estilo drawing para portfólios, comunidades e experiências editoriais.',
    highlights: [
      'Bordas irregulares com efeito manual',
      'Avatar ilustrado com textura de lápis',
      'Tom humano e amigável',
    ],
    kpi: {
      label: 'Conexão com a Marca Pessoal',
      value: '91%',
      trend: '+12 p.p. em páginas de perfil',
    },
  },
  {
    slug: 'neon-glass-login-card',
    title: 'Lilac Glass Login',
    subtitle: 'Login em glassmorphism com wallpaper lilás e foco em estética premium.',
    category: 'Login',
    gradientClass: 'thumb-neon-glass-login-card',
    route: '/elementos/neon-glass-login-card',
    description:
      'Tela de login inspirada em estética lilás premium, combinando wallpaper artístico, superfície translúcida e hierarquia clara para autenticação.',
    highlights: [
      'Wallpaper lilás ocupando toda a área de preview',
      'Avatar superior com ícone de pessoa para reforçar contexto de acesso',
      'Botão de submit com gradiente lilás integrado ao fundo',
    ],
    kpi: {
      label: 'Taxa de Inicio de Sessao',
      value: '79%',
      trend: '+13% com hierarquia visual e contraste tematico',
    },
  },
  {
    slug: 'curadoria-grid-fade-pattern',
    title: 'Grid Fade Pattern',
    subtitle: 'Grade suave com fade radial para fundos de interface.',
    category: 'Padrao Visual',
    gradientClass: 'thumb-curadoria-grid-fade-pattern',
    route: '/elementos/curadoria-grid-fade-pattern',
    description:
      'Padrao visual com grade fina e mascara radial para criar profundidade discreta em backgrounds sem comprometer legibilidade.',
    highlights: [
      'Versao base para temas escuros com linhas sutis',
      'Variacao light com contraste calibrado para fundos claros',
      'Aplicacao simples com apenas uma div de overlay',
    ],
    kpi: {
      label: 'Leitura de Conteudo com Overlay',
      value: '95%',
      trend: '+11 p.p. em testes com fundo texturizado',
    },
  },
  {
    slug: 'curadoria-screen-lights-pattern',
    title: 'Olive lights pattern',
    subtitle: 'Focos de luz desfocados com flutuacao vertical suave.',
    category: 'Padrao Visual',
    gradientClass: 'thumb-curadoria-screen-lights-pattern',
    route: '/elementos/curadoria-screen-lights-pattern',
    description:
      'Padrao visual com blobs luminosos desfocados que sobem e descem lentamente, simulando luzes voltadas para a tela em um ambiente escuro.',
    highlights: [
      'Movimento vertical continuo com velocidade suave',
      'Blobs amplos com blur para criar atmosfera cinematografica',
      'Composicao pronta para hero sections e planos de fundo imersivos',
    ],
    kpi: {
      label: 'Percepcao de Atmosfera Visual',
      value: '94%',
      trend: '+12 p.p. em testes com fundo dinamico',
    },
  },
]
