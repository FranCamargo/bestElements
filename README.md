# BestElements

BestElements e uma galeria autoral de componentes visuais, loaders, padroes e micro-experiencias Front End.

O projeto une portfolio tecnico e laboratorio de UI: cada item possui preview interativo e snippets de codigo (HTML, CSS e TypeScript) para estudo, referencia e reutilizacao com credito.

## Sumario

- [Visao geral](#visao-geral)
- [Objetivos](#objetivos)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Boas praticas adotadas](#boas-praticas-adotadas)
- [Como executar](#como-executar)
- [Reutilizacao e credito](#reutilizacao-e-credito)
- [Roadmap](#roadmap)
- [Sobre mim](#sobre-mim)

## Visao geral

O BestElements foi criado para centralizar elementos de interface prontos para:

1. Inspirar ideias visuais com foco em produto digital.
2. Servir como referencia tecnica para implementacao rapida.
3. Demonstrar arquitetura front-end organizada e escalavel.
4. Fortalecer uma identidade autoral de design e engenharia.

## Objetivos

1. Construir uma biblioteca viva de componentes e padroes de interface.
2. Demonstrar boas praticas com React + TypeScript em cenarios reais.
3. Disponibilizar exemplos reutilizaveis com preview e codigo.
4. Evoluir continuamente a base com novas categorias e interacoes.
5. Manter qualidade visual, acessibilidade e consistencia tecnica.

## Stack

| Camada      | Tecnologias                                                    |
| ----------- | -------------------------------------------------------------- |
| Front-end   | React 19, TypeScript 6, Vite 8, React Router DOM 7             |
| UI          | CSS com variaveis (tokens), design responsivo, dark/light mode |
| Iconografia | Lucide React                                                   |
| Qualidade   | ESLint, typescript-eslint, @vitejs/plugin-react                |

## Arquitetura

Estrutura principal:

```text
src/
  components/
    GalleryCard.tsx
    ThemeToggle.tsx
  data/
    galleryItems.ts
  pages/
    HomePage.tsx
    CuradoriaElementPage.tsx
    AboutMePage.tsx
    ItemPageShell.tsx
  App.tsx
  index.css
  main.tsx
```

### Responsabilidades por modulo

1. `main.tsx`: inicializa a aplicacao com `BrowserRouter`.
2. `App.tsx`: concentra rotas e estado global leve (tema, favoritos e navegacao no scroll).
3. `HomePage.tsx`: experiencia de descoberta com busca, filtro de favoritos e grid de cards.
4. `CuradoriaElementPage.tsx`: preview interativo e snippets por abas (HTML/CSS/TS).
5. `AboutMePage.tsx`: pagina institucional e profissional.
6. `galleryItems.ts`: metadados da galeria (fonte de verdade dos itens).

### Fluxo principal

1. O usuario navega pela Home e explora os componentes.
2. Ao abrir um item, acessa detalhes com preview e codigo.
3. Pode copiar snippets e salvar favoritos.
4. Tema e preferencias ficam persistidos no navegador.

## Funcionalidades

1. Galeria de elementos autorais com visual consistente.
2. Busca por titulo e categoria com normalizacao de acentos.
3. Favoritos por sessao com `sessionStorage`.
4. Tema claro/escuro com persistencia em `localStorage`.
5. Navegacao sticky com transicao visual ao scroll.
6. Pagina de detalhe com preview + tabs de codigo + copia.
7. Pagina Sobre mim com experiencia, formacao e contatos.

## Boas praticas adotadas

1. Separacao de responsabilidades entre paginas, componentes e dados.
2. Tipagem forte com TypeScript para reduzir regressao.
3. Estado global enxuto, priorizando simplicidade e previsibilidade.
4. Persistencia local restrita a preferencias de UX.
5. Reutilizacao de componentes para consistencia visual e funcional.
6. Tokens de design via CSS variables para manutencao de temas.
7. Semantica e atributos de acessibilidade em pontos-chave.
8. Linting ativo como parte do ciclo de qualidade.

## Como executar

### Pre-requisitos

- Node.js 20+ (recomendado)
- npm 10+

### Instalacao e ambiente local

```bash
npm install
npm run dev
```

Aplicacao local padrao: `http://localhost:5173`

### Scripts disponiveis

1. `npm run dev`: desenvolvimento local.
2. `npm run build`: build de producao.
3. `npm run preview`: preview da build.
4. `npm run lint`: analise estatica.

## Reutilizacao e credito

Os snippets de HTML e CSS exibidos no projeto incluem assinatura autoral.

Ao reutilizar qualquer elemento desta galeria:

1. Credite Franciely Camargo como autora.
2. Cite o projeto BestElements como origem.
3. Mantenha a atribuicao em adaptacoes e redistribuicoes.

## Roadmap

1. Externalizar snippets em arquivos dedicados por item/categoria.
2. Adicionar testes de componentes e fluxos criticos.
3. Expandir filtros por categoria, tag e complexidade.
4. Evoluir documentacao visual com Storybook.
5. Reforcar metricas de acessibilidade e performance.

## Sobre mim

Sou Franciely Camargo, Front-End Developer com foco em Angular/React e base forte em UI/UX.

Atuo na construcao de interfaces funcionais e escalaveis, com enfase em:

1. Componentizacao e reutilizacao.
2. Qualidade visual com foco em usabilidade.
3. Integracao com APIs e entregas orientadas a produto.

O BestElements representa minha forma de construir software front-end: design intencional, codigo limpo e evolucao continua.

Se o projeto te ajudou, considere deixar uma estrela no repositorio.

## Contato

- LinkedIn: https://www.linkedin.com/in/francamargodev
- E-mail: francamargoads@gmail.com
