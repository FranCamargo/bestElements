import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { Copy, Check, Maximize2, Minimize2, X, Bot, UserRound } from 'lucide-react'
import { ItemPageShell } from './ItemPageShell.tsx'
import type { GalleryItem } from '../data/galleryItems.ts'

type CuradoriaElementPageProps = {
  item: GalleryItem
  isLiked: boolean
}

type SnippetBundle = {
  html: string
  css: string
  ts: string
}

type SnippetKey = 'html' | 'css' | 'ts'

type PeriodOption = '7' | '15' | '30'

type TableRow = {
  id: string
  date: string
  ativo: string
  thumb: 'up' | 'down'
}

type DatatableRow = {
  id: number
  nome: string
  categoria: string
  pontos: number
}

type ChatRole = 'assistant' | 'user'

type ChatMessage = {
  role: ChatRole
  content: string
}

type ChatQuickAction = {
  label: string
  prompt: string
}

const tableRows: TableRow[] = [
  { id: '1', date: '08/05', ativo: 'Todos', thumb: 'up' },
  { id: '2', date: '08/05', ativo: 'Produto A', thumb: 'down' },
  { id: '3', date: '07/05', ativo: 'Produto B', thumb: 'up' },
  { id: '4', date: '07/05', ativo: 'Produto C', thumb: 'up' },
  { id: '5', date: '06/05', ativo: 'Produto A', thumb: 'down' },
  { id: '6', date: '06/05', ativo: 'Produto B', thumb: 'up' },
]

const datatableRowsSeed: DatatableRow[] = [
  { id: 1, nome: 'Card Hero', categoria: 'Layout', pontos: 96 },
  { id: 2, nome: 'Tabela Financeira', categoria: 'Dados', pontos: 89 },
  { id: 3, nome: 'Filtro Avancado', categoria: 'Form', pontos: 82 },
  { id: 4, nome: 'Widget KPI', categoria: 'Dashboard', pontos: 91 },
  { id: 5, nome: 'Painel Heatmap', categoria: 'Grafico', pontos: 77 },
  { id: 6, nome: 'Lista de Alertas', categoria: 'Dados', pontos: 85 },
  { id: 7, nome: 'Chat Dock', categoria: 'UX', pontos: 88 },
  { id: 8, nome: 'Modal de Revisao', categoria: 'Fluxo', pontos: 80 },
]

const chatbotQuickActions: ChatQuickAction[] = [
  { label: 'Resumir feedbacks recentes', prompt: 'Resuma os feedbacks negativos da semana.' },
  { label: 'Sugerir proxima acao', prompt: 'Quais acoes priorizar para melhorar satisfacao?' },
  { label: 'Gerar status executivo', prompt: 'Monte um status executivo curto para lideranca.' },
]

const snippetAttributionMessage = 'Created by Franciely Camargo. Credit is required for use.'

const appendSnippetAttribution = (snippet: string, snippetType: 'html' | 'css') => {
  if (snippet.includes(snippetAttributionMessage)) {
    return snippet
  }

  const signature =
    snippetType === 'html'
      ? `<!-- ${snippetAttributionMessage} -->`
      : `/* ${snippetAttributionMessage} */`

  return `${snippet}\n\n${signature}`
}

export function InteractivePreview({ slug }: { slug: string }) {
  switch (slug) {
    case 'dashboard-curadoria':
      return <DashboardInteractive />
    case 'curadoria-button':
      return <ButtonInteractive />
    case 'curadoria-toggle':
      return <ToggleInteractive />
    case 'curadoria-line-graph':
      return <LineGraphInteractive />
    case 'curadoria-progress-bar':
      return <ProgressBarInteractive />
    case 'curadoria-table-list':
      return <TableInteractive />
    case 'curadoria-datatable-simples':
      return <DatatableSimpleInteractive />
    case 'curadoria-modal-chatbot':
      return <ChatbotModalInteractive />
    case 'curadoria-magic-cube':
      return <MagicCubeInteractive />
    case 'curadoria-orbit-loader':
      return <OrbitLoaderInteractive />
    case 'curadoria-gooey-loader':
      return <GooeyLoaderInteractive />
    case 'curadoria-rocket-loader':
      return <RocketLoaderInteractive />
    case 'curadoria-candy-ring-loader':
      return <CandyRingLoaderInteractive />
    case 'curadoria-wave-bars-loader':
      return <WaveBarsLoaderInteractive />
    case 'curadoria-starfield-pattern':
      return <StarfieldPatternInteractive />
    case 'curadoria-gradient-river-pattern':
      return <GradientRiverPatternInteractive />
    case 'curadoria-fluid-water':
      return <FluidWaterInteractive />
    case 'velvet-command-button':
      return <VelvetCommandButtonInteractive />
    case 'confetti-pop-button':
      return <ConfettiPopButtonInteractive />
    case 'ledger-confirm-checkbox':
      return <LedgerConfirmCheckboxInteractive />
    case 'doodle-checklist-board':
      return <DoodleChecklistBoardInteractive />
    case 'aurora-weather-card':
      return <AuroraWeatherCardInteractive />
    case 'pixel-forecast-card':
      return <PixelForecastCardInteractive />
    case 'glass-alert-modal':
      return <GlassAlertModalInteractive />
    case 'comic-quick-modal':
      return <ComicQuickModalInteractive />
    case 'sticky-notes-kanban':
      return <StickyNotesKanbanInteractive />
    case 'prism-pulse-loader':
      return <PrismPulseLoaderInteractive />
    case 'cloud-drizzle-loader':
      return <CloudDrizzleLoaderInteractive />
    case 'sunrise-kpi-card':
      return <SunriseKpiCardInteractive />
    case 'finance-snapshot-card':
      return <FinanceSnapshotCardInteractive />
    case 'team-status-card':
      return <TeamStatusCardInteractive />
    case 'retro-music-player-card':
      return <RetroMusicPlayerCardInteractive />
    case 'arcade-score-pill':
      return <ArcadeScorePillInteractive />
    case 'sketch-profile-card':
      return <SketchProfileCardInteractive />
    case 'morphing-action-fab':
      return <MorphingActionFabInteractive />
    default:
      return <div className="component-mock"><p>Preview indisponivel para este item.</p></div>
  }
}

function DashboardInteractive() {
  const [period, setPeriod] = useState<PeriodOption>('7')
  const [asset, setAsset] = useState('Todos')
  const [model, setModel] = useState('Todos')

  const barsByPeriod: Record<PeriodOption, number[]> = {
    '7': [35, 52, 47, 70, 59, 81],
    '15': [26, 34, 48, 55, 63, 72],
    '30': [18, 28, 35, 42, 50, 61],
  }
  const bars = barsByPeriod[period]
  const total = bars.reduce((sum, n) => sum + n, 0)
  const positive = Math.round(total / bars.length)

  return (
    <div className="component-mock mock-dashboard">
      <div className="preview-controls">
        <button type="button" className={`chip-button ${period === '7' ? 'is-active' : ''}`} onClick={() => setPeriod('7')}>7 dias</button>
        <button type="button" className={`chip-button ${period === '15' ? 'is-active' : ''}`} onClick={() => setPeriod('15')}>15 dias</button>
        <button type="button" className={`chip-button ${period === '30' ? 'is-active' : ''}`} onClick={() => setPeriod('30')}>30 dias</button>
      </div>
      <div className="preview-controls">
        <select className="select-field" value={asset} onChange={(e) => setAsset(e.target.value)}>
          <option>Todos</option>
          <option>Produto A</option>
          <option>Produto B</option>
        </select>
        <select className="select-field" value={model} onChange={(e) => setModel(e.target.value)}>
          <option>Todos</option>
          <option>Modelo 1</option>
          <option>Modelo 2</option>
        </select>
      </div>
      <div className="mock-dashboard-kpis">
        <div className="mock-kpi"><small>Positivos</small><strong>{positive}%</strong></div>
        <div className="mock-kpi"><small>Negativos</small><strong>{100 - positive}%</strong></div>
        <div className="mock-kpi"><small>Volume</small><strong>{total}</strong></div>
      </div>
      <div className="mock-bars" role="list">
        {bars.map((value, idx) => (
          <button
            key={`${value}-${idx}`}
            type="button"
            className="bar-button"
            title={`Ponto ${idx + 1}: ${value}`}
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
      <p className="interactive-note">Ativo atual: {asset} • Modelo: {model}</p>
    </div>
  )
}

function ButtonInteractive() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="component-mock mock-sharp-button-wrap">
      <button
        type="button"
        className={`mock-sharp-btn ${pressed ? 'is-engaged' : ''}`}
        onClick={() => setPressed((v) => !v)}
      >
        Button
      </button>
      <p className="interactive-note mock-sharp-button-note">
        {pressed ? 'Acao confirmada com destaque visual' : 'Passe o mouse para ver o brilho afiado'}
      </p>
    </div>
  )
}

function ToggleInteractive() {
  const [useMockData, setUseMockData] = useState(true)
  const [showOnlyCritical, setShowOnlyCritical] = useState(false)

  return (
    <div className="component-mock mock-toggle-wrap">
      <button type="button" className="mock-toggle-row" onClick={() => setUseMockData((v) => !v)}>
        <span>Dados mockados</span>
        <span className={`mock-toggle ${useMockData ? 'is-active' : ''}`} />
      </button>
      <button type="button" className="mock-toggle-row" onClick={() => setShowOnlyCritical((v) => !v)}>
        <span>Somente criticos</span>
        <span className={`mock-toggle ${showOnlyCritical ? 'is-active' : ''}`} />
      </button>
      <p className="interactive-note">
        Fonte: {useMockData ? 'Mockado' : 'Real'} • Filtro: {showOnlyCritical ? 'Criticos' : 'Todos'}
      </p>
    </div>
  )
}

function LineGraphInteractive() {
  const [period, setPeriod] = useState<PeriodOption>('7')
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const series = useMemo(() => {
    const byPeriod: Record<PeriodOption, { up: number[]; down: number[] }> = {
      '7': { up: [62, 58, 71, 66, 74, 79, 83], down: [38, 42, 29, 34, 26, 21, 17] },
      '15': { up: [55, 57, 60, 63, 59, 65, 67], down: [45, 43, 40, 37, 41, 35, 33] },
      '30': { up: [49, 51, 53, 55, 57, 58, 61], down: [51, 49, 47, 45, 43, 42, 39] },
    }
    return byPeriod[period]
  }, [period])

  const toPoints = (arr: number[]) =>
    arr.map((value, idx) => `${20 + idx * 52},${150 - value}`).join(' ')

  return (
    <div className="component-mock mock-linechart interactive-linechart">
      <div className="preview-controls">
        <button type="button" className={`chip-button ${period === '7' ? 'is-active' : ''}`} onClick={() => setPeriod('7')}>7 dias</button>
        <button type="button" className={`chip-button ${period === '15' ? 'is-active' : ''}`} onClick={() => setPeriod('15')}>15 dias</button>
        <button type="button" className={`chip-button ${period === '30' ? 'is-active' : ''}`} onClick={() => setPeriod('30')}>30 dias</button>
      </div>
      <svg viewBox="0 0 360 170" className="line-svg" role="img" aria-label="Grafico interativo de tendencia">
        <polyline points={toPoints(series.up)} className="line-up" />
        <polyline points={toPoints(series.down)} className="line-down" />
        {series.up.map((value, idx) => (
          <circle
            key={`up-${idx}`}
            cx={20 + idx * 52}
            cy={150 - value}
            r={hoverIndex === idx ? 5 : 3}
            className="line-point"
            onMouseEnter={() => setHoverIndex(idx)}
          />
        ))}
      </svg>
      <p className="interactive-note">
        {hoverIndex == null
          ? 'Passe o mouse nos pontos para ver variacao'
          : `Ponto ${hoverIndex + 1}: 👍 ${series.up[hoverIndex]} • 👎 ${series.down[hoverIndex]}`}
      </p>
    </div>
  )
}

function ProgressBarInteractive() {
  const [positive, setPositive] = useState(78)
  const negative = 100 - positive

  return (
    <div className="component-mock mock-progress-wrap interactive-progress">
      <label className="interactive-note" htmlFor="positive-range">Ajuste o percentual positivo: {positive}%</label>
      <input
        id="positive-range"
        type="range"
        min={0}
        max={100}
        value={positive}
        onChange={(e) => setPositive(Number(e.target.value))}
      />
      <div className="mock-progress-label">{positive}% positivos</div>
      <div className="mock-progress"><span style={{ width: `${positive}%` }} /></div>
      <div className="mock-progress-label">{negative}% negativos</div>
      <div className="mock-progress is-danger"><span style={{ width: `${negative}%` }} /></div>
    </div>
  )
}

function TableInteractive() {
  const [thumbFilter, setThumbFilter] = useState<'all' | 'up' | 'down'>('all')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filteredRows = useMemo(
    () => tableRows.filter((row) => (thumbFilter === 'all' ? true : row.thumb === thumbFilter)),
    [thumbFilter],
  )
  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const pageRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div className="component-mock mock-table-wrap interactive-table">
      <div className="preview-controls">
        <button type="button" className={`chip-button ${thumbFilter === 'all' ? 'is-active' : ''}`} onClick={() => { setThumbFilter('all'); setPage(1) }}>Todos</button>
        <button type="button" className={`chip-button ${thumbFilter === 'up' ? 'is-active' : ''}`} onClick={() => { setThumbFilter('up'); setPage(1) }}>👍</button>
        <button type="button" className={`chip-button ${thumbFilter === 'down' ? 'is-active' : ''}`} onClick={() => { setThumbFilter('down'); setPage(1) }}>👎</button>
      </div>
      <div className="mock-table-head">
        <span>Data</span><span>Ativo</span><span>Thumb</span><span>Acoes</span>
      </div>
      {pageRows.map((row) => (
        <div key={row.id} className={`mock-table-row ${selectedId === row.id ? 'is-selected' : ''}`}>
          <span>{row.date}</span><span>{row.ativo}</span><span>{row.thumb === 'up' ? '👍' : '👎'}</span>
          <button type="button" className="table-action" onClick={() => setSelectedId(row.id)}>Detalhe</button>
        </div>
      ))}
      <div className="preview-controls table-pagination">
        <button type="button" className="chip-button" onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</button>
        <span className="interactive-note">Pagina {safePage} de {totalPages}</span>
        <button type="button" className="chip-button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Proxima</button>
      </div>
    </div>
  )
}

function DatatableSimpleInteractive() {
  const [rows, setRows] = useState<DatatableRow[]>(datatableRowsSeed)
  const [sortColumn, setSortColumn] = useState<keyof DatatableRow>('pontos')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [lastAction, setLastAction] = useState('Selecione uma linha para ver o detalhe.')

  const pageSize = 5

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valueA = a[sortColumn]
      const valueB = b[sortColumn]
      const comparison =
        typeof valueA === 'number' && typeof valueB === 'number'
          ? valueA - valueB
          : String(valueA).localeCompare(String(valueB), 'pt-BR', { numeric: true })
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [rows, sortColumn, sortDirection])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const pagedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize
    const visibleRows = sortedRows.slice(start, start + pageSize)
    if (visibleRows.length < pageSize) {
      return [...visibleRows, ...Array(pageSize - visibleRows.length).fill(null)]
    }
    return visibleRows
  }, [safePage, sortedRows])

  const toggleSort = (column: keyof DatatableRow) => {
    if (sortColumn === column) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
    setPage(1)
  }

  const toggleSelection = (row: DatatableRow) => {
    setSelectedRows((current) => {
      const next = new Set(current)
      if (next.has(row.id)) {
        next.delete(row.id)
      } else {
        next.add(row.id)
      }
      return next
    })
  }

  const selectAllRows = () => {
    const allIds = rows.map((row) => row.id)
    const allSelected = allIds.length > 0 && allIds.every((id) => selectedRows.has(id))
    setSelectedRows(allSelected ? new Set() : new Set(allIds))
  }

  const deleteSelectedRows = () => {
    if (!selectedRows.size) {
      return
    }
    setRows((current) => current.filter((row) => !selectedRows.has(row.id)))
    setLastAction(`${selectedRows.size} linha(s) excluida(s).`)
    setSelectedRows(new Set())
    setPage(1)
  }

  return (
    <div className="component-mock mock-datatable-wrap">
      <div className="mock-datatable-head">
        <button type="button" className="chip-button" onClick={selectAllRows}>
          {rows.length > 0 && selectedRows.size === rows.length ? 'Desfazer selecao' : 'Selecionar todos'}
        </button>
        <button
          type="button"
          className="chip-button"
          onClick={deleteSelectedRows}
          disabled={!selectedRows.size}
        >
          Excluir selecionados
        </button>
      </div>

      <div className="mock-datatable-grid mock-datatable-grid-head">
        <span className="mock-datatable-check">Sel.</span>
        <button type="button" className="mock-sort-btn" onClick={() => toggleSort('nome')}>
          Nome {sortColumn === 'nome' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
        </button>
        <button type="button" className="mock-sort-btn" onClick={() => toggleSort('categoria')}>
          Categoria {sortColumn === 'categoria' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
        </button>
        <button type="button" className="mock-sort-btn" onClick={() => toggleSort('pontos')}>
          Pontos {sortColumn === 'pontos' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
        </button>
        <span>Acoes</span>
      </div>

      {pagedRows.map((row, index) => {
        if (!row) {
          return (
            <div key={`empty-${index}`} className="mock-datatable-grid mock-datatable-row is-empty" aria-hidden="true">
              <span className="mock-datatable-check" />
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span />
            </div>
          )
        }

        return (
          <div
            key={row.id}
            className={`mock-datatable-grid mock-datatable-row ${selectedRows.has(row.id) ? 'is-selected' : ''}`}
            onClick={() => setLastAction(`Detalhe da linha: ${row.nome}.`)}
            role="button"
            tabIndex={0}
          >
            <span className="mock-datatable-check">
              <input
                type="checkbox"
                checked={selectedRows.has(row.id)}
                onChange={() => toggleSelection(row)}
                onClick={(event) => event.stopPropagation()}
              />
            </span>
            <span>{row.nome}</span>
            <span>{row.categoria}</span>
            <span className="mock-points">{row.pontos}</span>
            <button
              type="button"
              className="table-action"
              onClick={(event) => {
                event.stopPropagation()
                setLastAction(`Acao executada para #${row.id}.`)
              }}
            >
              Acao
            </button>
          </div>
        )
      })}

      <div className="preview-controls table-pagination">
        <button type="button" className="chip-button" onClick={() => setPage((current) => Math.max(1, current - 1))}>
          Anterior
        </button>
        <span className="interactive-note">Pagina {safePage} de {totalPages}</span>
        <button type="button" className="chip-button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
          Proxima
        </button>
      </div>
      <p className="interactive-note">{lastAction}</p>
    </div>
  )
}

function ChatbotModalInteractive() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [closeBlocked, setCloseBlocked] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Ola! Sou seu assistente virtual. Como posso ajudar?' },
  ])

  const bodyRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  useEffect(() => {
    const bodyNode = bodyRef.current
    if (!bodyNode) {
      return
    }

    bodyNode.scrollTo({ top: bodyNode.scrollHeight, behavior: 'smooth' })
  }, [messages, isSending])

  const onDragStart = (event: ReactMouseEvent<HTMLElement>) => {
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    }

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dragState = dragStateRef.current
      if (!dragState) {
        return
      }

      setPosition({
        x: dragState.originX + (moveEvent.clientX - dragState.startX),
        y: dragState.originY + (moveEvent.clientY - dragState.startY),
      })
    }

    const onMouseUp = () => {
      dragStateRef.current = null
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const sendMessage = (text: string) => {
    const trimmedText = text.trim()
    if (!trimmedText || isSending) {
      return
    }

    setMessages((current) => [...current, { role: 'user', content: trimmedText }])
    setInputText('')
    setIsSending(true)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'Entendi. Posso organizar isso em um resumo e sugerir proximas acoes.',
        },
      ])
      setIsSending(false)
    }, 700)
  }

  const onCloseClick = () => {
    setCloseBlocked(true)
    window.setTimeout(() => setCloseBlocked(false), 450)
  }

  return (
    <div className="component-mock mock-chatbot-wrap">
      <div
        className={`mock-chatbot-modal ${isExpanded ? 'is-expanded' : ''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <header className="mock-chatbot-header" onMouseDown={onDragStart}>
          <div className="mock-chatbot-title-block">
            <strong>Chatbot</strong>
            <span className="mock-chatbot-subtitle">
              Assistente virtual
              <span className="mock-chatbot-online" aria-label="Assistente ativo">
                <i aria-hidden="true" />
              </span>
            </span>
          </div>
          <div className="mock-chatbot-header-actions">
            <button type="button" onClick={() => setIsExpanded((current) => !current)} aria-label={isExpanded ? 'Minimizar chat' : 'Expandir chat'}>
              {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
            <button
              type="button"
              onClick={onCloseClick}
              aria-label="Fechar chat indisponivel"
              title="Fechamento indisponivel neste preview"
              className={closeBlocked ? 'is-blocked' : ''}
            >
              <X size={15} />
            </button>
          </div>
        </header>

        <div className="mock-chatbot-body" ref={bodyRef}>
          {messages.length <= 1 ? (
            <div className="mock-chatbot-quick-actions">
              {chatbotQuickActions.map((action) => (
                <button key={action.label} type="button" onClick={() => sendMessage(action.prompt)}>
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}

          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`mock-chat-row ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}>
              {message.role === 'assistant' ? (
                <span className="mock-chat-avatar" aria-hidden="true">
                  <Bot size={13} />
                </span>
              ) : null}

              <div className={`mock-chatbot-message ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}>
                {message.content}
              </div>

              {message.role === 'user' ? (
                <span className="mock-chat-avatar is-user" aria-hidden="true">
                  <UserRound size={13} />
                </span>
              ) : null}
            </div>
          ))}

          {isSending ? (
            <div className="mock-chat-row is-assistant" aria-label="Assistente digitando">
              <span className="mock-chat-avatar" aria-hidden="true">
                <Bot size={13} />
              </span>
              <div className="mock-chatbot-typing">
                <i /><i /><i />
              </div>
            </div>
          ) : null}
        </div>

        <footer className="mock-chatbot-footer">
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage(inputText)
              }
            }}
            disabled={isSending}
          />
          <button
            type="button"
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isSending}
          >
            Enviar
          </button>
        </footer>
      </div>
    </div>
  )
}

type CubeFace = 'U' | 'D' | 'F' | 'B' | 'R' | 'L'
type CubeMove = 'U' | 'R' | 'F' | 'L' | 'D' | 'B'
type Axis = 'x' | 'y' | 'z'

type CubeState = {
  corners: { position: number[]; orientation: number[] }
  edges: { position: number[]; orientation: number[] }
}

type CornerSlot = { id: string; coords: [number, number, number]; faces: [CubeFace, CubeFace, CubeFace] }
type EdgeSlot = { id: string; coords: [number, number, number]; faces: [CubeFace, CubeFace] }
type ActiveTurn = { move: CubeMove; axis: Axis; layer: -1 | 0 | 1; direction: 1 | -1 }

const FACE_COLORS: Record<CubeFace, string> = {
  U: 'var(--cube-white)',
  D: 'var(--cube-yellow)',
  F: 'var(--cube-red)',
  B: 'var(--cube-orange)',
  R: 'var(--cube-blue)',
  L: 'var(--cube-green)',
}

const CORNER_SLOTS: CornerSlot[] = [
  { id: 'URF', coords: [1, 1, 1], faces: ['U', 'R', 'F'] },
  { id: 'UFL', coords: [-1, 1, 1], faces: ['U', 'F', 'L'] },
  { id: 'ULB', coords: [-1, 1, -1], faces: ['U', 'L', 'B'] },
  { id: 'UBR', coords: [1, 1, -1], faces: ['U', 'B', 'R'] },
  { id: 'DFR', coords: [1, -1, 1], faces: ['D', 'F', 'R'] },
  { id: 'DLF', coords: [-1, -1, 1], faces: ['D', 'L', 'F'] },
  { id: 'DBL', coords: [-1, -1, -1], faces: ['D', 'B', 'L'] },
  { id: 'DRB', coords: [1, -1, -1], faces: ['D', 'R', 'B'] },
]

const EDGE_SLOTS: EdgeSlot[] = [
  { id: 'UR', coords: [1, 1, 0], faces: ['U', 'R'] },
  { id: 'UF', coords: [0, 1, 1], faces: ['U', 'F'] },
  { id: 'UL', coords: [-1, 1, 0], faces: ['U', 'L'] },
  { id: 'UB', coords: [0, 1, -1], faces: ['U', 'B'] },
  { id: 'DR', coords: [1, -1, 0], faces: ['D', 'R'] },
  { id: 'DF', coords: [0, -1, 1], faces: ['D', 'F'] },
  { id: 'DL', coords: [-1, -1, 0], faces: ['D', 'L'] },
  { id: 'DB', coords: [0, -1, -1], faces: ['D', 'B'] },
  { id: 'FR', coords: [1, 0, 1], faces: ['F', 'R'] },
  { id: 'FL', coords: [-1, 0, 1], faces: ['F', 'L'] },
  { id: 'BL', coords: [-1, 0, -1], faces: ['B', 'L'] },
  { id: 'BR', coords: [1, 0, -1], faces: ['B', 'R'] },
]

const CORNER_PIECES = CORNER_SLOTS.map((slot) => slot.faces)
const EDGE_PIECES = EDGE_SLOTS.map((slot) => slot.faces)

const MOVE_ANIMATION: Record<CubeMove, Omit<ActiveTurn, 'move'>> = {
  U: { axis: 'y', layer: 1, direction: 1 },
  D: { axis: 'y', layer: -1, direction: -1 },
  R: { axis: 'x', layer: 1, direction: -1 },
  L: { axis: 'x', layer: -1, direction: 1 },
  F: { axis: 'z', layer: 1, direction: 1 },
  B: { axis: 'z', layer: -1, direction: -1 },
}

const MOVE_SEQUENCE: CubeMove[] = ['R', 'U', 'F', 'L', 'D', 'B', 'R', 'F']

const INITIAL_CUBE_STATE: CubeState = {
  corners: { position: [0, 1, 2, 3, 4, 5, 6, 7], orientation: [0, 0, 0, 0, 0, 0, 0, 0] },
  edges: { position: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
}

const TURN_DURATION_MS = 340

const rotateCycle = <T,>(source: T[], cycle: [number, number, number, number]) => {
  const next = [...source]
  next[cycle[0]] = source[cycle[3]]
  next[cycle[1]] = source[cycle[0]]
  next[cycle[2]] = source[cycle[1]]
  next[cycle[3]] = source[cycle[2]]
  return next
}

const applyMove = (state: CubeState, move: CubeMove): CubeState => {
  const cornersPos = [...state.corners.position]
  const cornersOri = [...state.corners.orientation]
  const edgesPos = [...state.edges.position]
  const edgesOri = [...state.edges.orientation]

  const twistCorners = (entries: Array<[number, number]>) => {
    entries.forEach(([index, delta]) => {
      cornersOri[index] = (cornersOri[index] + delta) % 3
    })
  }

  const flipEdges = (indices: number[]) => {
    indices.forEach((index) => {
      edgesOri[index] = edgesOri[index] ^ 1
    })
  }

  if (move === 'U') {
    const cycle: [number, number, number, number] = [0, 3, 2, 1]
    cornersPos.splice(0, cornersPos.length, ...rotateCycle(cornersPos, cycle))
    cornersOri.splice(0, cornersOri.length, ...rotateCycle(cornersOri, cycle))
    const edgeCycle: [number, number, number, number] = [0, 3, 2, 1]
    edgesPos.splice(0, edgesPos.length, ...rotateCycle(edgesPos, edgeCycle))
    edgesOri.splice(0, edgesOri.length, ...rotateCycle(edgesOri, edgeCycle))
  }

  if (move === 'D') {
    const cycle: [number, number, number, number] = [4, 5, 6, 7]
    cornersPos.splice(0, cornersPos.length, ...rotateCycle(cornersPos, cycle))
    cornersOri.splice(0, cornersOri.length, ...rotateCycle(cornersOri, cycle))
    const edgeCycle: [number, number, number, number] = [4, 5, 6, 7]
    edgesPos.splice(0, edgesPos.length, ...rotateCycle(edgesPos, edgeCycle))
    edgesOri.splice(0, edgesOri.length, ...rotateCycle(edgesOri, edgeCycle))
  }

  if (move === 'R') {
    const cycle: [number, number, number, number] = [0, 4, 7, 3]
    cornersPos.splice(0, cornersPos.length, ...rotateCycle(cornersPos, cycle))
    cornersOri.splice(0, cornersOri.length, ...rotateCycle(cornersOri, cycle))
    const edgeCycle: [number, number, number, number] = [0, 8, 4, 11]
    edgesPos.splice(0, edgesPos.length, ...rotateCycle(edgesPos, edgeCycle))
    edgesOri.splice(0, edgesOri.length, ...rotateCycle(edgesOri, edgeCycle))
    twistCorners([[0, 2], [4, 1], [7, 2], [3, 1]])
  }

  if (move === 'L') {
    const cycle: [number, number, number, number] = [1, 2, 6, 5]
    cornersPos.splice(0, cornersPos.length, ...rotateCycle(cornersPos, cycle))
    cornersOri.splice(0, cornersOri.length, ...rotateCycle(cornersOri, cycle))
    const edgeCycle: [number, number, number, number] = [2, 10, 6, 9]
    edgesPos.splice(0, edgesPos.length, ...rotateCycle(edgesPos, edgeCycle))
    edgesOri.splice(0, edgesOri.length, ...rotateCycle(edgesOri, edgeCycle))
    twistCorners([[1, 1], [2, 2], [6, 1], [5, 2]])
  }

  if (move === 'F') {
    const cycle: [number, number, number, number] = [0, 1, 5, 4]
    cornersPos.splice(0, cornersPos.length, ...rotateCycle(cornersPos, cycle))
    cornersOri.splice(0, cornersOri.length, ...rotateCycle(cornersOri, cycle))
    const edgeCycle: [number, number, number, number] = [1, 9, 5, 8]
    edgesPos.splice(0, edgesPos.length, ...rotateCycle(edgesPos, edgeCycle))
    edgesOri.splice(0, edgesOri.length, ...rotateCycle(edgesOri, edgeCycle))
    twistCorners([[0, 1], [1, 2], [5, 1], [4, 2]])
    flipEdges([1, 9, 5, 8])
  }

  if (move === 'B') {
    const cycle: [number, number, number, number] = [3, 7, 6, 2]
    cornersPos.splice(0, cornersPos.length, ...rotateCycle(cornersPos, cycle))
    cornersOri.splice(0, cornersOri.length, ...rotateCycle(cornersOri, cycle))
    const edgeCycle: [number, number, number, number] = [3, 11, 7, 10]
    edgesPos.splice(0, edgesPos.length, ...rotateCycle(edgesPos, edgeCycle))
    edgesOri.splice(0, edgesOri.length, ...rotateCycle(edgesOri, edgeCycle))
    twistCorners([[3, 2], [7, 1], [6, 2], [2, 1]])
    flipEdges([3, 11, 7, 10])
  }

  return {
    corners: { position: cornersPos, orientation: cornersOri },
    edges: { position: edgesPos, orientation: edgesOri },
  }
}

const mapCornerStickers = (
  slotFaces: [CubeFace, CubeFace, CubeFace],
  pieceFaces: [CubeFace, CubeFace, CubeFace],
  orientation: number,
) => {
  const mapping = new Map<CubeFace, string>()
  slotFaces.forEach((slotFace, index) => {
    const pieceFace = pieceFaces[(index - orientation + 3) % 3]
    mapping.set(slotFace, FACE_COLORS[pieceFace])
  })
  return mapping
}

const mapEdgeStickers = (
  slotFaces: [CubeFace, CubeFace],
  pieceFaces: [CubeFace, CubeFace],
  orientation: number,
) => {
  const mapping = new Map<CubeFace, string>()
  if (orientation % 2 === 0) {
    mapping.set(slotFaces[0], FACE_COLORS[pieceFaces[0]])
    mapping.set(slotFaces[1], FACE_COLORS[pieceFaces[1]])
  } else {
    mapping.set(slotFaces[0], FACE_COLORS[pieceFaces[1]])
    mapping.set(slotFaces[1], FACE_COLORS[pieceFaces[0]])
  }
  return mapping
}

const faceClassByFace: Record<CubeFace, string> = {
  F: 'face-front',
  B: 'face-back',
  R: 'face-right',
  L: 'face-left',
  U: 'face-top',
  D: 'face-bottom',
}

function MagicCubeInteractive() {
  const [cubeState, setCubeState] = useState<CubeState>(INITIAL_CUBE_STATE)
  const [activeTurn, setActiveTurn] = useState<ActiveTurn | null>(null)
  const turnIndexRef = useRef(0)

  useEffect(() => {
    if (activeTurn) {
      return
    }

    const timer = window.setTimeout(() => {
      const move = MOVE_SEQUENCE[turnIndexRef.current % MOVE_SEQUENCE.length]
      turnIndexRef.current += 1
      setActiveTurn({ move, ...MOVE_ANIMATION[move] })
    }, 180)

    return () => window.clearTimeout(timer)
  }, [activeTurn, cubeState])

  useEffect(() => {
    if (!activeTurn) {
      return
    }

    const timer = window.setTimeout(() => {
      setCubeState((current) => applyMove(current, activeTurn.move))
      setActiveTurn(null)
    }, TURN_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [activeTurn])

  const renderedCubies = useMemo(() => {
    const items: Array<{ key: string; coords: [number, number, number]; stickers: Array<{ face: CubeFace; color: string }> }> = []

    CORNER_SLOTS.forEach((slot, slotIndex) => {
      const pieceIndex = cubeState.corners.position[slotIndex]
      const pieceFaces = CORNER_PIECES[pieceIndex]
      const orientation = cubeState.corners.orientation[slotIndex]
      const stickerMap = mapCornerStickers(slot.faces, pieceFaces, orientation)
      items.push({
        key: `corner-${slot.id}`,
        coords: slot.coords,
        stickers: slot.faces.map((face) => ({ face, color: stickerMap.get(face) ?? FACE_COLORS[face] })),
      })
    })

    EDGE_SLOTS.forEach((slot, slotIndex) => {
      const pieceIndex = cubeState.edges.position[slotIndex]
      const pieceFaces = EDGE_PIECES[pieceIndex]
      const orientation = cubeState.edges.orientation[slotIndex]
      const stickerMap = mapEdgeStickers(slot.faces, pieceFaces, orientation)
      items.push({
        key: `edge-${slot.id}`,
        coords: slot.coords,
        stickers: slot.faces.map((face) => ({ face, color: stickerMap.get(face) ?? FACE_COLORS[face] })),
      })
    })

    const centerSlots: Array<{ key: string; coords: [number, number, number]; face: CubeFace }> = [
      { key: 'center-u', coords: [0, 1, 0], face: 'U' },
      { key: 'center-d', coords: [0, -1, 0], face: 'D' },
      { key: 'center-f', coords: [0, 0, 1], face: 'F' },
      { key: 'center-b', coords: [0, 0, -1], face: 'B' },
      { key: 'center-r', coords: [1, 0, 0], face: 'R' },
      { key: 'center-l', coords: [-1, 0, 0], face: 'L' },
    ]

    centerSlots.forEach((center) => {
      items.push({ key: center.key, coords: center.coords, stickers: [{ face: center.face, color: FACE_COLORS[center.face] }] })
    })

    return items
  }, [cubeState])

  return (
    <div className="component-mock mock-magic-cube-wrap">
      <div className="magic-cube-scene">
        <div className="magic-cube" aria-label="Loader magic cube com giros por camada">
          {renderedCubies.map((cubie) => {
            const [x, y, z] = cubie.coords
            const shouldRotateLayer =
              activeTurn &&
              ((activeTurn.axis === 'x' && x === activeTurn.layer) ||
                (activeTurn.axis === 'y' && y === activeTurn.layer) ||
                (activeTurn.axis === 'z' && z === activeTurn.layer))

            const angle = shouldRotateLayer ? 90 * activeTurn.direction : 0
            const rotate =
              activeTurn?.axis === 'x'
                ? ` rotateX(${angle}deg)`
                : activeTurn?.axis === 'y'
                  ? ` rotateY(${angle}deg)`
                  : ` rotateZ(${angle}deg)`

            return (
              <div
                key={cubie.key}
                className="magic-cubie-shell"
                style={{
                  '--x': x,
                  '--y': y,
                  '--z': z,
                  transform: `translate3d(calc(var(--x) * var(--step)), calc(var(--y) * var(--step)), calc(var(--z) * var(--step)))${shouldRotateLayer ? rotate : ''}`,
                  transition: shouldRotateLayer ? `transform ${TURN_DURATION_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)` : 'none',
                } as CSSProperties}
              >
                <div className="magic-cubie">
                  {cubie.stickers.map((sticker, index) => (
                    <i
                      key={`${cubie.key}-${sticker.face}-${index}`}
                      className={`sticker ${faceClassByFace[sticker.face]}`}
                      style={{ '--sticker-color': sticker.color } as CSSProperties}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OrbitLoaderInteractive() {
  return (
    <div className="component-mock mock-loader-orbit" aria-label="Loader orbital animado">
      <div className="orbit-core" />
      <div className="orbit-ring orbit-ring-a"><span /></div>
      <div className="orbit-ring orbit-ring-b"><span /></div>
      <div className="orbit-ring orbit-ring-c"><span /></div>
    </div>
  )
}

function GooeyLoaderInteractive() {
  return (
    <div className="component-mock mock-loader-gooey" aria-label="Loader gooey animado">
      <div className="gooey-track">
        <span className="gooey-dot" />
        <span className="gooey-dot" />
        <span className="gooey-dot" />
        <span className="gooey-dot" />
        <span className="gooey-dot" />
      </div>
    </div>
  )
}

function RocketLoaderInteractive() {
  return (
    <div className="component-mock mock-loader-rocket" aria-label="Loader foguete animado">
      <div className="rocket-smoke" />
      <div className="rocket-smoke" />
      <div className="rocket-smoke" />
      <div className="rocket">
        <i className="rocket-window" />
        <i className="rocket-fin rocket-fin-left" />
        <i className="rocket-fin rocket-fin-right" />
        <i className="rocket-fire" />
      </div>
    </div>
  )
}

function CandyRingLoaderInteractive() {
  return (
    <div className="component-mock mock-loader-candy" aria-label="Loader candy ring animado">
      <div className="candy-ring" />
    </div>
  )
}

function WaveBarsLoaderInteractive() {
  return (
    <div className="component-mock mock-loader-wave-bars" aria-label="Loader wave bars animado">
      {Array.from({ length: 10 }, (_, index) => (
        <span key={`wave-bar-${index}`} className="wave-bar" />
      ))}
    </div>
  )
}

function StarfieldPatternInteractive() {
  return (
    <div className="component-mock mock-pattern-starfield" aria-label="Padrao de estrelas em movimento">
      <div className="star-layer layer-back" />
      <div className="star-layer layer-mid" />
      <div className="star-layer layer-front" />
    </div>
  )
}

function GradientRiverPatternInteractive() {
  return (
    <div className="component-mock mock-pattern-gradient-river" aria-label="Padrao de degrades em fluxo">
      <span className="river-layer layer-a" />
      <span className="river-layer layer-b" />
      <span className="river-layer layer-c" />
    </div>
  )
}

function FluidWaterInteractive() {
  return (
    <div className="component-mock pattern-fluid-water" aria-label="Padrao de agua fluida">
      <div className="water-container">
        <div className="wave wave-back" />
        <div className="water-body" />
        <div className="wave" />
      </div>
    </div>
  )
}

function VelvetCommandButtonInteractive() {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-velvet-command">
      <button
        type="button"
        className={`velvet-command-btn ${isPressed ? 'is-pressed' : ''}`}
        onClick={() => setIsPressed((current) => !current)}
      >
        Deploy seguro
      </button>
      <p className="interactive-note">{isPressed ? 'Comando confirmado' : 'Clique para confirmar acao'}</p>
    </div>
  )
}

function ConfettiPopButtonInteractive() {
  const [bursts, setBursts] = useState(0)
  const [particles, setParticles] = useState<
    Array<{ id: string; x: number; y: number; rotate: number; hue: number; delay: number; duration: number; scale: number }>
  >([])

  const launchConfetti = () => {
    setBursts((current) => current + 1)
    setParticles(
      Array.from({ length: 20 }, (_, index) => ({
        id: `${Date.now()}-${index}`,
        x: (Math.random() - 0.5) * 200,
        y: -(48 + Math.random() * 84),
        rotate: -220 + Math.random() * 440,
        hue: Math.round(Math.random() * 360),
        delay: Math.round(Math.random() * 110),
        duration: 560 + Math.round(Math.random() * 380),
        scale: 0.7 + Math.random() * 0.85,
      })),
    )
  }

  return (
    <div className="component-mock mock-centered-demo mock-confetti-pop">
      <button type="button" className="confetti-pop-btn" onClick={launchConfetti}>
        Liberar confete
      </button>
      <div className="confetti-cloud" key={bursts} aria-hidden="true">
        {particles.map((particle) => (
          <i
            key={particle.id}
            style={{
              '--x': `${particle.x}px`,
              '--y': `${particle.y}px`,
              '--rot': `${particle.rotate}deg`,
              '--h': `${particle.hue}deg`,
              '--delay': `${particle.delay}ms`,
              '--dur': `${particle.duration}ms`,
              '--scale': `${particle.scale}`,
            } as CSSProperties}
          />
        ))}
      </div>
      <p className="interactive-note">Celebrou {bursts} conquista(s)</p>
    </div>
  )
}

function LedgerConfirmCheckboxInteractive() {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    contrato: true,
    risco: false,
    aprovacao: false,
  })

  const completed = Object.values(checks).filter(Boolean).length

  const toggleCheck = (key: string) => {
    setChecks((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  return (
    <div className="component-mock mock-centered-demo mock-ledger-checklist">
      <label>
        <input type="checkbox" checked={checks.contrato} onChange={() => toggleCheck('contrato')} />
        Contrato revisado
      </label>
      <label>
        <input type="checkbox" checked={checks.risco} onChange={() => toggleCheck('risco')} />
        Matriz de risco aprovada
      </label>
      <label>
        <input type="checkbox" checked={checks.aprovacao} onChange={() => toggleCheck('aprovacao')} />
        Aprovacao juridica registrada
      </label>
      <p className="interactive-note">{completed}/3 etapas concluidas</p>
    </div>
  )
}

function DoodleChecklistBoardInteractive() {
  const [tasks, setTasks] = useState([false, false, true])

  const toggleTask = (index: number) => {
    setTasks((current) => current.map((item, currentIndex) => (currentIndex === index ? !item : item)))
  }

  return (
    <div className="component-mock mock-centered-demo mock-doodle-board">
      {['Postar teaser', 'Ajustar cores', 'Validar mobile'].map((label, index) => (
        <button key={label} type="button" className="doodle-task" onClick={() => toggleTask(index)}>
          <span className={`doodle-check ${tasks[index] ? 'is-on' : ''}`}>{tasks[index] ? '✓' : ''}</span>
          {label}
        </button>
      ))}
      <p className="interactive-note">Checklist criativo para sprint visual</p>
    </div>
  )
}

function AuroraWeatherCardInteractive() {
  const scenarios = [
    {
      id: 'cold',
      label: 'Frio',
      city: 'Campos do Jordao',
      temp: '6°',
      feeling: 'Sensacao 3°',
      wind: 'Vento 7 km/h',
      humidity: 'Umidade 82%',
      sky: 'Nevoa suave',
      toneClass: 'is-cold',
      rainy: false,
    },
    {
      id: 'mild',
      label: 'Ameno',
      city: 'Sao Paulo',
      temp: '22°',
      feeling: 'Sensacao 23°',
      wind: 'Vento 11 km/h',
      humidity: 'Umidade 64%',
      sky: 'Ceu aberto',
      toneClass: 'is-mild',
      rainy: false,
    },
    {
      id: 'rain',
      label: 'Chuva',
      city: 'Curitiba',
      temp: '18°',
      feeling: 'Sensacao 16°',
      wind: 'Vento 18 km/h',
      humidity: 'Umidade 91%',
      sky: 'Chuva moderada',
      toneClass: 'is-rain',
      rainy: true,
    },
    {
      id: 'hot',
      label: 'Calor',
      city: 'Cuiaba',
      temp: '34°',
      feeling: 'Sensacao 38°',
      wind: 'Vento 9 km/h',
      humidity: 'Umidade 41%',
      sky: 'Sol intenso',
      toneClass: 'is-hot',
      rainy: false,
    },
  ] as const

  const [selectedIndex, setSelectedIndex] = useState(2)
  const selectedScenario = scenarios[selectedIndex]
  const rainFront = [
    { left: '6%', delay: '0.05s', duration: '0.92s' },
    { left: '14%', delay: '0.42s', duration: '1.03s' },
    { left: '23%', delay: '0.2s', duration: '0.95s' },
    { left: '32%', delay: '0.64s', duration: '1.06s' },
    { left: '41%', delay: '0.28s', duration: '0.97s' },
    { left: '50%', delay: '0.72s', duration: '1.08s' },
    { left: '59%', delay: '0.14s', duration: '0.94s' },
    { left: '68%', delay: '0.58s', duration: '1.04s' },
    { left: '77%', delay: '0.3s', duration: '0.99s' },
    { left: '86%', delay: '0.8s', duration: '1.07s' },
    { left: '94%', delay: '0.48s', duration: '1s' },
  ] as const
  const rainBack = [
    { left: '10%', delay: '0.22s', duration: '1.25s' },
    { left: '19%', delay: '0.7s', duration: '1.34s' },
    { left: '29%', delay: '0.35s', duration: '1.28s' },
    { left: '39%', delay: '0.86s', duration: '1.38s' },
    { left: '49%', delay: '0.54s', duration: '1.31s' },
    { left: '60%', delay: '0.18s', duration: '1.27s' },
    { left: '71%', delay: '0.78s', duration: '1.36s' },
    { left: '82%', delay: '0.4s', duration: '1.3s' },
    { left: '92%', delay: '0.62s', duration: '1.33s' },
  ] as const

  return (
    <div className={`component-mock mock-centered-demo mock-aurora-weather ${selectedScenario.toneClass} ${selectedScenario.rainy ? 'is-rainy' : ''}`}>
      <div className="aurora-weather-deco" aria-hidden="true">
        <i className="deco-orb orb-a" />
        <i className="deco-orb orb-b" />
      </div>
      <div className="aurora-rain" aria-hidden="true">
        {rainFront.map((drop, index) => (
          <i
            key={`front-${drop.left}-${index}`}
            className="aurora-rain-drop"
            style={{
              '--rain-left': drop.left,
              '--rain-delay': drop.delay,
              '--rain-duration': drop.duration,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="aurora-rain aurora-rain-back" aria-hidden="true">
        {rainBack.map((drop, index) => (
          <i
            key={`back-${drop.left}-${index}`}
            className="aurora-rain-drop"
            style={{
              '--rain-left': drop.left,
              '--rain-delay': drop.delay,
              '--rain-duration': drop.duration,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="aurora-weather-content">
        <div className="aurora-main">
          <div className="aurora-weather-head">
            <strong>{selectedScenario.city}</strong>
            <span>{selectedScenario.sky}</span>
          </div>
          <div className="aurora-temp">{selectedScenario.temp}</div>
          <p className="aurora-feeling">{selectedScenario.feeling}</p>
        </div>

        <div className="aurora-side">
          <div className="aurora-meta">
            <span>{selectedScenario.wind}</span>
            <span>{selectedScenario.humidity}</span>
          </div>
          <div className="aurora-temp-switch" role="tablist" aria-label="Selecionar clima">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.id}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                className={`aurora-chip ${selectedIndex === index ? 'is-active' : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PixelForecastCardInteractive() {
  const periods = ['08h', '12h', '18h']

  return (
    <div className="component-mock mock-centered-demo mock-pixel-forecast">
      <strong>PIXEL WEATHER</strong>
      <div className="pixel-row">
        {periods.map((period) => (
          <span key={period}>{period}</span>
        ))}
      </div>
      <div className="pixel-row is-values">
        <span>22°</span>
        <span>27°</span>
        <span>20°</span>
      </div>
      <p className="interactive-note">Cenario: ceu limpo com nuvens leves</p>
    </div>
  )
}

function GlassAlertModalInteractive() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="component-mock mock-centered-demo mock-glass-modal-wrap">
      {isOpen ? (
        <article className="glass-alert-modal">
          <h4>Confirmar exclusao de release?</h4>
          <p>Esta acao remove historico de QA e nao pode ser desfeita.</p>
          <div>
            <button type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
            <button type="button" className="is-danger" onClick={() => setIsOpen(false)}>Excluir</button>
          </div>
        </article>
      ) : (
        <button type="button" className="chip-button" onClick={() => setIsOpen(true)}>Abrir modal</button>
      )}
    </div>
  )
}

function ComicQuickModalInteractive() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="component-mock mock-centered-demo mock-comic-modal-wrap">
      {isOpen ? (
        <article className="comic-modal">
          <span className="comic-burst">POW!</span>
          <h4>Missao concluida!</h4>
          <p>Voce desbloqueou 3 novos itens de galeria.</p>
          <button type="button" onClick={() => setIsOpen(false)}>Show!</button>
        </article>
      ) : (
        <button type="button" className="chip-button" onClick={() => setIsOpen(true)}>Reabrir aviso</button>
      )}
    </div>
  )
}

function StickyNotesKanbanInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-sticky-kanban">
      <div>
        <h5>Ideias</h5>
        <p>Card comparativo</p>
      </div>
      <div>
        <h5>Em progresso</h5>
        <p>Modal aprovacao</p>
      </div>
      <div>
        <h5>Concluido</h5>
        <p>Loader orbital</p>
      </div>
    </div>
  )
}

function PrismPulseLoaderInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-prism-loader" aria-label="Loader prism pulse">
      <span />
    </div>
  )
}

function CloudDrizzleLoaderInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-cloud-loader" aria-label="Loader cloud drizzle">
      <div className="cloud-shape" />
      <div className="cloud-rain">
        <i /><i /><i />
      </div>
    </div>
  )
}

function SunriseKpiCardInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-sunrise-kpi">
      <small>Conversao diaria</small>
      <strong>68.4%</strong>
      <span>+5.2 p.p. versus ontem</span>
    </div>
  )
}

function FinanceSnapshotCardInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-finance-snapshot">
      <small>Saldo operacional</small>
      <strong>R$ 128.430</strong>
      <div className="snapshot-bar"><i style={{ width: '74%' }} /></div>
      <span>Meta mensal: 74%</span>
    </div>
  )
}

function TeamStatusCardInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-team-status">
      <h4>Team Pulse</h4>
      <div><span>Design</span><i style={{ width: '82%' }} /></div>
      <div><span>Front-end</span><i style={{ width: '74%' }} /></div>
      <div><span>QA</span><i style={{ width: '91%' }} /></div>
    </div>
  )
}

function RetroMusicPlayerCardInteractive() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-retro-player">
      <strong>Neon Night Drive</strong>
      <div className="retro-progress"><i style={{ width: isPlaying ? '62%' : '24%' }} /></div>
      <button type="button" className="retro-play" onClick={() => setIsPlaying((current) => !current)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

function ArcadeScorePillInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-pixel-sweeper-loader" aria-label="Loader 8bit com homenzinho varrendo">
      <div className="pixel-sweeper-worker" aria-hidden="true">
        <i className="pixel-head" />
        <i className="pixel-body" />
        <i className="pixel-arm" />
        <i className="pixel-leg pixel-leg-left" />
        <i className="pixel-leg pixel-leg-right" />
      </div>
      <div className="pixel-broom" aria-hidden="true">
        <i className="pixel-broom-handle" />
        <i className="pixel-broom-brush" />
      </div>
      <div className="pixel-dust" aria-hidden="true">
        <i /><i /><i />
      </div>
    </div>
  )
}

function SketchProfileCardInteractive() {
  return (
    <div className="component-mock mock-centered-demo mock-sketch-profile">
      <div className="sketch-avatar" />
      <strong>Your name</strong>
      <span>UI Illustrator</span>
      <p>"Transformo fluxos serios em experiencias leves."</p>
    </div>
  )
}

function MorphingActionFabInteractive() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-morphing-fab">
      <button type="button" className={`morphing-fab ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen((current) => !current)}>
        {isOpen ? 'x' : '+'}
      </button>
      <div className={`fab-actions ${isOpen ? 'is-open' : ''}`}>
        <button type="button">Share</button>
        <button type="button">Save</button>
        <button type="button">Edit</button>
      </div>
    </div>
  )
}

const getSnippetsBySlug = (slug: string): SnippetBundle => {
  const fallback: SnippetBundle = {
    html: `<section class="item-preview">\n  <div class="component-mock">Preview do elemento</div>\n</section>`,
    css: `.component-mock {\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  padding: 1rem;\n}`,
    ts: `export function Preview() {\n  return <div className="component-mock">Preview do elemento</div>\n}`,
  }

  const snippets: Record<string, SnippetBundle> = {
    'dashboard-curadoria': {
      html: `<section class="demo-dashboard">\n  <div class="demo-controls">\n    <button type="button" data-period="7">7 dias</button>\n    <button type="button" data-period="15">15 dias</button>\n    <button type="button" data-period="30">30 dias</button>\n  </div>\n  <div class="demo-kpis">\n    <article><small>Positivos</small><strong id="kpi-positive">0%</strong></article>\n    <article><small>Negativos</small><strong id="kpi-negative">0%</strong></article>\n    <article><small>Volume</small><strong id="kpi-volume">0</strong></article>\n  </div>\n  <div id="bars" class="demo-bars"></div>\n</section>`,
      css: `.demo-dashboard {
  display: grid;
  gap: 0.75rem;
  font-family: Arial, sans-serif;
}

.demo-controls {
  display: flex;
  gap: 0.4rem;
}

.demo-controls button {
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  background: #fff;
  cursor: pointer;
}

.demo-controls button.is-active {
  border-color: #0e8d9a;
  background: #e8f7f8;
}

.demo-kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
}

.demo-kpis article {
  border: 1px solid #d9e4ea;
  border-radius: 0.6rem;
  padding: 0.5rem;
}

.demo-kpis small {
  display: block;
  color: #5a6a77;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.demo-bars {
  min-height: 120px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.3rem;
  align-items: end;
}

.demo-bars span {
  border-radius: 8px 8px 2px 2px;
  background: #0e8d9a;
}`,
      ts: `type Period = '7' | '15' | '30'\n\nconst dataByPeriod: Record<Period, number[]> = {\n  '7': [35, 52, 47, 70, 59, 81],\n  '15': [26, 34, 48, 55, 63, 72],\n  '30': [18, 28, 35, 42, 50, 61],\n}\n\nconst buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-period]'))\nconst barsEl = document.getElementById('bars') as HTMLDivElement\nconst positiveEl = document.getElementById('kpi-positive') as HTMLElement\nconst negativeEl = document.getElementById('kpi-negative') as HTMLElement\nconst volumeEl = document.getElementById('kpi-volume') as HTMLElement\n\nfunction render(period: Period) {\n  buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.period === period))\n  const values = dataByPeriod[period]\n  barsEl.innerHTML = ''\n  values.forEach((value) => {\n    const bar = document.createElement('span')\n    bar.style.height = value + '%'\n    barsEl.appendChild(bar)\n  })\n  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length)\n  positiveEl.textContent = avg + '%'\n  negativeEl.textContent = 100 - avg + '%'\n  volumeEl.textContent = String(values.reduce((a, b) => a + b, 0))\n}\n\nbuttons.forEach((btn) => {\n  btn.addEventListener('click', () => render((btn.dataset.period as Period) || '7'))\n})\n\nrender('7')`,
    },
    'curadoria-button': {
      html: `<div class="demo-button">\n  <button id="cta-button" class="btn-sharp">Button</button>\n  <p id="button-feedback">Passe o mouse para ver o brilho afiado</p>\n</div>`,
      css: `.demo-button {
  display: grid;
  gap: 0.55rem;
  justify-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
}

.btn-sharp {
  position: relative;
  border: 1px solid #9d67ff;
  border-radius: 1.1rem;
  min-height: 2.65rem;
  width: 230px;
  padding: 0.58rem 1.45rem;
  background: linear-gradient(145deg, #4a1ea8 0%, #6c2ce6 50%, #944fff 100%);
  color: #f8f2ff;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.22s ease, filter 0.22s ease;
  box-shadow:
    0 2px 0 #3c197f,
    0 10px 18px -12px #4b219f,
    0 18px 26px -20px rgba(63, 25, 134, 0.75);
}

.btn-sharp::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(118deg, transparent 34%, rgba(255, 255, 255, 0.75) 48%, transparent 62%);
  transform: translateX(-130%);
  transition: transform 0.46s ease;
}

.btn-sharp:hover {
  transform: translateY(-2px);
  filter: saturate(1.08);
  box-shadow:
    0 3px 0 #3c197f,
    0 14px 24px -12px #5a2ac7,
    0 24px 34px -20px rgba(75, 29, 158, 0.82),
    0 0 0 1px rgba(198, 168, 255, 0.55);
}

.btn-sharp:hover::before {
  transform: translateX(130%);
}

#button-feedback {
  margin: 0;
  color: #5f4d7b;
  font-size: 0.82rem;
}`,
      ts: `const ctaBtn = document.getElementById('cta-button') as HTMLButtonElement
const feedback = document.getElementById('button-feedback') as HTMLElement

ctaBtn.addEventListener('click', () => {
  ctaBtn.classList.toggle('is-active')
  feedback.textContent = ctaBtn.classList.contains('is-active')
    ? 'Acao confirmada com destaque visual'
    : 'Passe o mouse para ver o brilho afiado'
})`,
    },
    'curadoria-toggle': {
      html: `<div class="demo-toggle">\n  <button id="toggle-source" class="toggle-row">\n    <span>Dados mockados</span><span class="switch is-active"></span>\n  </button>\n  <button id="toggle-critical" class="toggle-row">\n    <span>Somente críticos</span><span class="switch"></span>\n  </button>\n  <p id="toggle-feedback">Fonte: Mockado • Filtro: Todos</p>\n</div>`,
      css: `.demo-toggle {
  display: grid;
  gap: 0.55rem;
  font-family: Arial, sans-serif;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cddbe5;
  border-radius: 0.72rem;
  background: #fff;
  padding: 0.45rem 0.62rem;
  cursor: pointer;
}

.switch {
  width: 46px;
  height: 26px;
  border-radius: 999px;
  background: #a5bac7;
  position: relative;
}

.switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.16s ease;
}

.switch.is-active {
  background: #14a49a;
}

.switch.is-active::after {
  left: 23px;
}

#toggle-feedback {
  margin: 0;
  color: #556572;
  font-size: 0.82rem;
}`,
      ts: `const sourceBtn = document.getElementById('toggle-source') as HTMLButtonElement\nconst criticalBtn = document.getElementById('toggle-critical') as HTMLButtonElement\nconst sourceSwitch = sourceBtn.querySelector('.switch') as HTMLElement\nconst criticalSwitch = criticalBtn.querySelector('.switch') as HTMLElement\nconst feedback = document.getElementById('toggle-feedback') as HTMLElement\n\nlet useMockData = true\nlet onlyCritical = false\n\nfunction refresh() {\n  sourceSwitch.classList.toggle('is-active', useMockData)\n  criticalSwitch.classList.toggle('is-active', onlyCritical)\n  feedback.textContent = 'Fonte: ' + (useMockData ? 'Mockado' : 'Real') + ' • Filtro: ' + (onlyCritical ? 'Críticos' : 'Todos')\n}\n\nsourceBtn.addEventListener('click', () => {\n  useMockData = !useMockData\n  refresh()\n})\n\ncriticalBtn.addEventListener('click', () => {\n  onlyCritical = !onlyCritical\n  refresh()\n})\n\nrefresh()`,
    },
    'curadoria-line-graph': {
      html: `<section class="demo-line">\n  <div class="demo-controls">\n    <button type="button" data-period="7">7 dias</button>\n    <button type="button" data-period="15">15 dias</button>\n    <button type="button" data-period="30">30 dias</button>\n  </div>\n  <svg id="line-chart" viewBox="0 0 360 170" aria-label="Grafico de tendencia">\n    <polyline id="line-up" class="up" points="" />\n    <polyline id="line-down" class="down" points="" />\n  </svg>\n  <p id="line-feedback">Passe o mouse nos pontos para ver os valores.</p>\n</section>`,
      css: `.demo-line {
  display: grid;
  gap: 0.6rem;
  font-family: Arial, sans-serif;
}

.demo-controls {
  display: flex;
  gap: 0.4rem;
}

.demo-controls button {
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  background: #fff;
  cursor: pointer;
}

.demo-controls button.is-active {
  border-color: #0e8d9a;
  background: #e8f7f8;
}

#line-chart {
  width: 100%;
  height: 170px;
  border: 1px solid #d5e2ea;
  border-radius: 0.7rem;
  background: #fff;
}

#line-chart .up {
  fill: none;
  stroke: #19a86c;
  stroke-width: 3;
}

#line-chart .down {
  fill: none;
  stroke: #dd4f56;
  stroke-width: 3;
}

.line-point {
  fill: #19a86c;
  cursor: pointer;
}

#line-feedback {
  margin: 0;
  color: #556572;
  font-size: 0.82rem;
}`,
      ts: `type Period = '7' | '15' | '30'\n\nconst chart = document.getElementById('line-chart') as SVGSVGElement\nconst lineUp = document.getElementById('line-up') as SVGPolylineElement\nconst lineDown = document.getElementById('line-down') as SVGPolylineElement\nconst feedback = document.getElementById('line-feedback') as HTMLElement\nconst buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-period]'))\n\nconst seriesByPeriod: Record<Period, { up: number[]; down: number[] }> = {\n  '7': { up: [62, 58, 71, 66, 74, 79, 83], down: [38, 42, 29, 34, 26, 21, 17] },\n  '15': { up: [55, 57, 60, 63, 59, 65, 67], down: [45, 43, 40, 37, 41, 35, 33] },\n  '30': { up: [49, 51, 53, 55, 57, 58, 61], down: [51, 49, 47, 45, 43, 42, 39] },\n}\n\nfunction toPoints(arr: number[]) {\n  return arr.map((value, idx) => 20 + idx * 52 + ',' + (150 - value)).join(' ')\n}\n\nfunction addPoints(up: number[], down: number[]) {\n  chart.querySelectorAll('.line-point').forEach((point) => point.remove())\n  up.forEach((value, idx) => {\n    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')\n    circle.setAttribute('class', 'line-point')\n    circle.setAttribute('cx', String(20 + idx * 52))\n    circle.setAttribute('cy', String(150 - value))\n    circle.setAttribute('r', '3')\n    circle.addEventListener('mouseenter', () => {\n      feedback.textContent = 'Ponto ' + (idx + 1) + ': 👍 ' + up[idx] + ' • 👎 ' + down[idx]\n      circle.setAttribute('r', '5')\n    })\n    circle.addEventListener('mouseleave', () => {\n      feedback.textContent = 'Passe o mouse nos pontos para ver os valores.'\n      circle.setAttribute('r', '3')\n    })\n    chart.appendChild(circle)\n  })\n}\n\nfunction render(period: Period) {\n  buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.period === period))\n  const data = seriesByPeriod[period]\n  lineUp.setAttribute('points', toPoints(data.up))\n  lineDown.setAttribute('points', toPoints(data.down))\n  addPoints(data.up, data.down)\n}\n\nbuttons.forEach((btn) => btn.addEventListener('click', () => render((btn.dataset.period as Period) || '7')))\nrender('7')`,
    },
    'curadoria-progress-bar': {
      html: `<section class="demo-progress">\n  <label for="positive-range">Ajuste o percentual positivo: <strong id="positive-label">78%</strong></label>\n  <input id="positive-range" type="range" min="0" max="100" value="78" />\n  <p id="negative-label">22% negativos</p>\n  <div class="bar"><span id="positive-bar" style="width:78%"></span></div>\n  <div class="bar danger"><span id="negative-bar" style="width:22%"></span></div>\n</section>`,
      css: `.demo-progress {
  display: grid;
  gap: 0.45rem;
  font-family: Arial, sans-serif;
}

.demo-progress label,
.demo-progress p {
  margin: 0;
  color: #556572;
  font-size: 0.82rem;
}

.demo-progress input {
  width: 100%;
}

.bar {
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: #dce8ef;
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  background: #1b9b5b;
}

.bar.danger span {
  background: #d24248;
}`,
      ts: `const range = document.getElementById('positive-range') as HTMLInputElement\nconst positiveLabel = document.getElementById('positive-label') as HTMLElement\nconst negativeLabel = document.getElementById('negative-label') as HTMLElement\nconst positiveBar = document.getElementById('positive-bar') as HTMLElement\nconst negativeBar = document.getElementById('negative-bar') as HTMLElement\n\nfunction render(value: number) {\n  const negative = 100 - value\n  positiveLabel.textContent = value + '%'\n  negativeLabel.textContent = negative + '% negativos'\n  positiveBar.style.width = value + '%'\n  negativeBar.style.width = negative + '%'\n}\n\nrange.addEventListener('input', () => render(Number(range.value)))\nrender(Number(range.value))`,
    },
    'curadoria-table-list': {
      html: `<section class="demo-table">\n  <div class="demo-controls">\n    <button type="button" data-filter="all">Todos</button>\n    <button type="button" data-filter="up">👍</button>\n    <button type="button" data-filter="down">👎</button>\n  </div>\n  <div class="head"><span>Data</span><span>Ativo</span><span>Thumb</span><span>Ações</span></div>\n  <div id="table-body"></div>\n  <div class="demo-controls pagination">\n    <button id="prev" type="button">Anterior</button>\n    <span id="page-label">Página 1 de 1</span>\n    <button id="next" type="button">Próxima</button>\n  </div>\n</section>`,
      css: `.demo-table {
  display: grid;
  gap: 0.4rem;
  font-family: Arial, sans-serif;
}

.demo-controls {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.demo-controls button {
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  background: #fff;
  cursor: pointer;
}

.demo-controls button.is-active {
  border-color: #0e8d9a;
  background: #e8f7f8;
}

.head,
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr 0.9fr;
  gap: 0.4rem;
  align-items: center;
}

.head {
  font-size: 0.78rem;
  color: #556572;
  font-weight: 700;
  text-transform: uppercase;
}

.row {
  border: 1px solid #d6e1e9;
  border-radius: 0.55rem;
  background: #fff;
  padding: 0.36rem 0.42rem;
}

.row button {
  border: 1px solid #cbd5e1;
  border-radius: 0.45rem;
  background: #fff;
  cursor: pointer;
}

.row.is-selected {
  border-color: #0e8d9a;
}

.pagination {
  justify-content: space-between;
  font-size: 0.8rem;
  color: #556572;
}`,
      ts: `type Row = { id: string; date: string; ativo: string; thumb: 'up' | 'down' }\n\nconst rows: Row[] = [\n  { id: '1', date: '08/05', ativo: 'Todos', thumb: 'up' },\n  { id: '2', date: '08/05', ativo: 'Produto A', thumb: 'down' },\n  { id: '3', date: '07/05', ativo: 'Produto B', thumb: 'up' },\n  { id: '4', date: '07/05', ativo: 'Produto C', thumb: 'up' },\n  { id: '5', date: '06/05', ativo: 'Produto A', thumb: 'down' },\n  { id: '6', date: '06/05', ativo: 'Produto B', thumb: 'up' },\n]\n\nconst body = document.getElementById('table-body') as HTMLElement\nconst pageLabel = document.getElementById('page-label') as HTMLElement\nconst prevBtn = document.getElementById('prev') as HTMLButtonElement\nconst nextBtn = document.getElementById('next') as HTMLButtonElement\nconst filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'))\n\nlet filter: 'all' | 'up' | 'down' = 'all'\nlet page = 1\nconst pageSize = 3\nlet selectedId: string | null = null\n\nfunction getFiltered() {\n  return rows.filter((row) => (filter === 'all' ? true : row.thumb === filter))\n}\n\nfunction render() {\n  filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.filter === filter))\n  const filtered = getFiltered()\n  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))\n  page = Math.min(page, totalPages)\n  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)\n\n  body.innerHTML = ''\n  visible.forEach((row) => {\n    const el = document.createElement('div')\n    el.className = 'row' + (selectedId === row.id ? ' is-selected' : '')\n    el.innerHTML = '<span>' + row.date + '</span><span>' + row.ativo + '</span><span>' + (row.thumb === 'up' ? '👍' : '👎') + '</span><button type="button">Detalhe</button>'\n    const detailBtn = el.querySelector('button') as HTMLButtonElement\n    detailBtn.addEventListener('click', () => {\n      selectedId = row.id\n      render()\n    })\n    body.appendChild(el)\n  })\n\n  pageLabel.textContent = 'Página ' + page + ' de ' + totalPages\n  prevBtn.disabled = page === 1\n  nextBtn.disabled = page === totalPages\n}\n\nfilterButtons.forEach((btn) => {\n  btn.addEventListener('click', () => {\n    filter = (btn.dataset.filter as 'all' | 'up' | 'down') || 'all'\n    page = 1\n    render()\n  })\n})\nprevBtn.addEventListener('click', () => { page = Math.max(1, page - 1); render() })\nnextBtn.addEventListener('click', () => { page = page + 1; render() })\n\nrender()`,
    },
    'curadoria-datatable-simples': {
      html: `<section class="demo-datatable">\n  <div class="demo-actions">\n    <button id="toggle-all" type="button">Selecionar todos</button>\n    <button id="delete-selected" type="button" disabled>Excluir selecionados</button>\n  </div>\n\n  <div class="demo-row demo-head">\n    <span>Sel.</span>\n    <button type="button" data-sort="nome">Nome</button>\n    <button type="button" data-sort="categoria">Categoria</button>\n    <button type="button" data-sort="pontos">Pontos</button>\n    <span>Acoes</span>\n  </div>\n\n  <div id="datatable-body"></div>\n\n  <div class="demo-actions">\n    <button id="prev" type="button">Anterior</button>\n    <span id="page-label">Pagina 1 de 1</span>\n    <button id="next" type="button">Proxima</button>\n  </div>\n</section>`,
      css: `.demo-datatable {
  display: grid;
  gap: 0.42rem;
  font-family: Arial, sans-serif;
}

.demo-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
}

.demo-actions button,
.demo-head button {
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
  background: #fff;
  min-height: 30px;
  padding: 0 0.65rem;
  cursor: pointer;
}

.demo-row {
  display: grid;
  grid-template-columns: 0.6fr 1.4fr 1fr 0.9fr 0.9fr;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid #d6e1e9;
  border-radius: 0.58rem;
  background: #fff;
  padding: 0.38rem 0.45rem;
}

.demo-head {
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
  color: #4b6170;
}

.demo-cell-action {
  border: 1px solid #cbd5e1;
  border-radius: 0.45rem;
  background: #fff;
  min-height: 24px;
}

.demo-row.is-selected {
  border-color: #0e8d9a;
  background: #f0fbfc;
}

.demo-row.is-empty {
  color: #9bb0be;
}`,
      ts: `type Row = { id: number; nome: string; categoria: string; pontos: number }\n\nconst rowsSeed: Row[] = [\n  { id: 1, nome: 'Card Hero', categoria: 'Layout', pontos: 96 },\n  { id: 2, nome: 'Tabela Financeira', categoria: 'Dados', pontos: 89 },\n  { id: 3, nome: 'Filtro Avancado', categoria: 'Form', pontos: 82 },\n  { id: 4, nome: 'Widget KPI', categoria: 'Dashboard', pontos: 91 },\n  { id: 5, nome: 'Painel Heatmap', categoria: 'Grafico', pontos: 77 },\n  { id: 6, nome: 'Lista de Alertas', categoria: 'Dados', pontos: 85 },\n]\n\nconst body = document.getElementById('datatable-body') as HTMLElement\nconst toggleAllBtn = document.getElementById('toggle-all') as HTMLButtonElement\nconst deleteBtn = document.getElementById('delete-selected') as HTMLButtonElement\nconst pageLabel = document.getElementById('page-label') as HTMLElement\nconst prevBtn = document.getElementById('prev') as HTMLButtonElement\nconst nextBtn = document.getElementById('next') as HTMLButtonElement\nconst sortButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-sort]'))\n\nlet rows = [...rowsSeed]\nlet selected = new Set<number>()\nlet sortColumn: keyof Row = 'pontos'\nlet sortDirection: 'asc' | 'desc' = 'desc'\nlet page = 1\nconst pageSize = 5\n\nfunction sortedRows() {\n  return [...rows].sort((a, b) => {\n    const va = a[sortColumn]\n    const vb = b[sortColumn]\n    const cmp = typeof va === 'number' && typeof vb === 'number'\n      ? va - vb\n      : String(va).localeCompare(String(vb), 'pt-BR', { numeric: true })\n    return sortDirection === 'asc' ? cmp : -cmp\n  })\n}\n\nfunction render() {\n  const data = sortedRows()\n  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))\n  page = Math.min(page, totalPages)\n  const visible = data.slice((page - 1) * pageSize, page * pageSize)\n  while (visible.length < pageSize) visible.push(undefined as unknown as Row)\n\n  body.innerHTML = ''\n  visible.forEach((row) => {\n    const rowEl = document.createElement('div')\n    rowEl.className = 'demo-row' + (row && selected.has(row.id) ? ' is-selected' : '') + (!row ? ' is-empty' : '')\n    if (!row) {\n      rowEl.innerHTML = '<span>-</span><span>-</span><span>-</span><span>-</span><span></span>'\n      body.appendChild(rowEl)\n      return\n    }\n\n    const checkbox = document.createElement('input')\n    checkbox.type = 'checkbox'\n    checkbox.checked = selected.has(row.id)\n    checkbox.addEventListener('change', () => {\n      if (selected.has(row.id)) selected.delete(row.id)\n      else selected.add(row.id)\n      render()\n    })\n\n    const actionBtn = document.createElement('button')\n    actionBtn.className = 'demo-cell-action'\n    actionBtn.textContent = 'Acao'\n\n    rowEl.append(checkbox)\n    rowEl.append(Object.assign(document.createElement('span'), { textContent: row.nome }))\n    rowEl.append(Object.assign(document.createElement('span'), { textContent: row.categoria }))\n    rowEl.append(Object.assign(document.createElement('span'), { textContent: String(row.pontos) }))\n    rowEl.append(actionBtn)\n    body.appendChild(rowEl)\n  })\n\n  const allSelected = rows.length > 0 && rows.every((row) => selected.has(row.id))\n  toggleAllBtn.textContent = allSelected ? 'Desfazer selecao' : 'Selecionar todos'\n  deleteBtn.disabled = selected.size === 0\n  pageLabel.textContent = 'Pagina ' + page + ' de ' + totalPages\n  prevBtn.disabled = page === 1\n  nextBtn.disabled = page === totalPages\n}\n\nsortButtons.forEach((btn) => {\n  btn.addEventListener('click', () => {\n    const key = btn.dataset.sort as keyof Row\n    if (sortColumn === key) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'\n    else { sortColumn = key; sortDirection = 'asc' }\n    page = 1\n    render()\n  })\n})\n\ntoggleAllBtn.addEventListener('click', () => {\n  const allSelected = rows.length > 0 && rows.every((row) => selected.has(row.id))\n  selected = allSelected ? new Set() : new Set(rows.map((row) => row.id))\n  render()\n})\n\ndeleteBtn.addEventListener('click', () => {\n  rows = rows.filter((row) => !selected.has(row.id))\n  selected.clear()\n  page = 1\n  render()\n})\n\nprevBtn.addEventListener('click', () => { page = Math.max(1, page - 1); render() })\nnextBtn.addEventListener('click', () => { page = page + 1; render() })\n\nrender()`,
    },
    'curadoria-modal-chatbot': {
      html: `<section class="demo-chatbot">\n  <article id="chatbot" class="chatbot-modal">\n    <header class="chatbot-head">\n      <div class="chat-title">\n        <strong>Chatbot</strong>\n        <span>Assistente virtual <span class="online-dot" aria-label="Assistente ativo"></span></span>\n      </div>\n      <div class="head-actions">\n        <button id="toggle-size" type="button" aria-label="Expandir chat">⛶</button>\n      </div>\n    </header>\n\n    <div id="chat-body" class="chatbot-body"></div>\n\n    <footer class="chatbot-footer">\n      <input id="chat-input" type="text" placeholder="Digite sua pergunta..." />\n      <button id="send-chat" type="button">Enviar</button>\n    </footer>\n  </article>\n</section>`,
      css: `.demo-chatbot {
  display: grid;
  place-items: center;
  padding: 0.35rem;
  font-family: Arial, sans-serif;
}

.chatbot-modal {
  width: 100%;
  max-width: 420px;
  border: 1px solid #1f4e6b;
  border-radius: 0.78rem;
  background: #0f1f2d;
  color: #e8f6ff;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 300px;
}

.chatbot-modal.is-expanded {
  max-width: 520px;
  min-height: 360px;
}

.chatbot-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.58rem 0.62rem;
  border-bottom: 1px solid rgba(116, 185, 220, 0.25);
}

.chatbot-head strong {
  display: block;
  font-size: 0.86rem;
}

.chatbot-head span {
  color: #9fc5da;
  font-size: 0.73rem;
}

.head-actions {
  display: flex;
  gap: 0.3rem;
}

.head-actions button {
  border: 1px solid rgba(116, 185, 220, 0.35);
  border-radius: 0.45rem;
  background: #17384f;
  color: #d9f2ff;
  min-height: 26px;
  min-width: 30px;
  cursor: pointer;
}

.chatbot-body {
  display: grid;
  gap: 0.45rem;
  align-content: start;
  overflow: auto;
  max-height: 220px;
  padding: 0.6rem;
}

.chatbot-message {
  max-width: 86%;
  padding: 0.4rem 0.52rem;
  border-radius: 0.58rem;
  font-size: 0.78rem;
  line-height: 1.36;
}

.chatbot-message.is-assistant {
  background: #1a3a53;
  color: #d8ecf7;
}

.chatbot-message.is-user {
  margin-left: auto;
  background: #12abdb;
  color: #082032;
  font-weight: 600;
}

.chat-quick-actions {
  display: grid;
  gap: 0.3rem;
}

.chat-quick-actions button {
  text-align: left;
  border: 1px solid rgba(116, 185, 220, 0.3);
  border-radius: 0.48rem;
  background: #132d41;
  color: #d9f2ff;
  min-height: 30px;
  font-size: 0.74rem;
  cursor: pointer;
}

.chatbot-footer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.35rem;
  padding: 0.55rem;
  border-top: 1px solid rgba(116, 185, 220, 0.25);
}

.chatbot-footer input {
  min-height: 34px;
  border-radius: 0.48rem;
  border: 1px solid rgba(116, 185, 220, 0.4);
  background: #0b1721;
  color: #f2fbff;
  padding: 0 0.5rem;
}

.chatbot-footer button {
  min-width: 74px;
  border: 0;
  border-radius: 0.48rem;
  background: #12abdb;
  color: #082032;
  font-weight: 700;
  cursor: pointer;
}

.chat-launcher {
  border: 0;
  border-radius: 999px;
  min-height: 34px;
  padding: 0 0.95rem;
  background: #12abdb;
  color: #082032;
  font-weight: 700;
  cursor: pointer;
}`,
      ts: `type Role = 'assistant' | 'user'\ntype Msg = { role: Role; content: string }\n\nconst quickActions = [\n  { label: 'Resumir feedbacks recentes', prompt: 'Resuma os feedbacks negativos da semana.' },\n  { label: 'Sugerir proxima acao', prompt: 'Quais acoes priorizar para melhorar satisfacao?' },\n  { label: 'Gerar status executivo', prompt: 'Monte um status executivo curto para lideranca.' },\n]\n\nconst modal = document.getElementById('chatbot') as HTMLElement\nconst body = document.getElementById('chat-body') as HTMLElement\nconst input = document.getElementById('chat-input') as HTMLInputElement\nconst sendBtn = document.getElementById('send-chat') as HTMLButtonElement\nconst toggleBtn = document.getElementById('toggle-size') as HTMLButtonElement\n\nlet isExpanded = false\nlet isSending = false\nlet messages: Msg[] = [{ role: 'assistant', content: 'Ola! Sou seu assistente virtual. Como posso ajudar?' }]\n\nfunction drawQuickActions() {\n  if (messages.length > 1) return ''\n  return '<div class="chat-quick-actions">' + quickActions.map((a) => '<button type="button" data-prompt="' + a.prompt + '">' + a.label + '</button>').join('') + '</div>'\n}\n\nfunction drawMessages() {\n  return messages.map((m) => '<div class="chatbot-message is-' + m.role + '">' + m.content + '</div>').join('')\n}\n\nfunction render() {\n  modal.classList.toggle('is-expanded', isExpanded)\n  toggleBtn.textContent = isExpanded ? '🗕' : '⛶'\n  sendBtn.disabled = isSending || !input.value.trim()\n  body.innerHTML = drawQuickActions() + drawMessages() + (isSending ? '<div class="chatbot-message is-assistant">Digitando...</div>' : '')\n  body.querySelectorAll<HTMLButtonElement>('[data-prompt]').forEach((btn) => {\n    btn.addEventListener('click', () => sendMessage(btn.dataset.prompt || ''))\n  })\n  body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' })\n}\n\nfunction sendMessage(text: string) {\n  const msg = text.trim()\n  if (!msg || isSending) return\n  messages = [...messages, { role: 'user', content: msg }]\n  input.value = ''\n  isSending = true\n  render()\n  window.setTimeout(() => {\n    messages = [...messages, { role: 'assistant', content: 'Entendi. Posso resumir e sugerir as proximas acoes.' }]\n    isSending = false\n    render()\n  }, 700)\n}\n\nsendBtn.addEventListener('click', () => sendMessage(input.value))\ninput.addEventListener('input', () => render())\ninput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(input.value) })\ntoggleBtn.addEventListener('click', () => { isExpanded = !isExpanded; render() })\n\nrender()`,
    },
    'curadoria-magic-cube': {
      html: `<section class="demo-magic-cube">\n  <div class="scene">\n    <div class="cube" id="cube"></div>\n  </div>\n</section>`,
      css: `.cube {
  position: relative;
  width: 108px;
  height: 108px;
  transform-style: preserve-3d;
  transform: rotateX(-24deg) rotateY(28deg);
  --step: 36px;
  --cubie-size: 30px;
  --half: 15px;
}

.cubie-shell {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.cubie {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--cubie-size);
  height: var(--cubie-size);
  transform-style: preserve-3d;
  transform: translate(-50%, -50%);
}

.sticker {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: var(--sticker-color);
}

.face-front {
  transform: translateZ(var(--half));
}

.face-back {
  transform: rotateY(180deg) translateZ(var(--half));
}

.face-right {
  transform: rotateY(90deg) translateZ(var(--half));
}

.face-left {
  transform: rotateY(-90deg) translateZ(var(--half));
}

.face-top {
  transform: rotateX(90deg) translateZ(var(--half));
}

.face-bottom {
  transform: rotateX(-90deg) translateZ(var(--half));
}`,
      ts: `const cube = {\n  corners: {\n    position: [0,1,2,3,4,5,6,7],\n    orientation: [0,0,0,0,0,0,0,0],\n  },\n  edges: {\n    position: [0,1,2,3,4,5,6,7,8,9,10,11],\n    orientation: [0,0,0,0,0,0,0,0,0,0,0,0],\n  },\n}\n\n// Cada giro aplica: permutacao + orientacao.\n// Exemplo R: ciclo de 4 cantos + 4 arestas e atualizacao de orientacao nas pecas afetadas.`,
    },
    'curadoria-orbit-loader': {
      html: `<div class="demo-orbit-loader">\n  <div class="core"></div>\n  <div class="ring a"><span></span></div>\n  <div class="ring b"><span></span></div>\n  <div class="ring c"><span></span></div>\n</div>`,
      css: `.demo-orbit-loader {
  position: relative;
  width: 170px;
  height: 170px;
  display: grid;
  place-items: center;
}

.core {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffe66d;
  box-shadow: 0 0 24px #ffe66d;
}

.ring {
  position: absolute;
  inset: 14px;
  border: 1.5px dashed rgba(13, 63, 92, 0.42);
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(27, 104, 146, 0.22);
}

.ring span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translate(-50%, -50%) translateX(64px);
  box-shadow: 0 0 0 1px rgba(12, 50, 73, 0.34);
}

.ring.a {
  animation: orbit-a 1.8s linear infinite;
}

.ring.b {
  inset: 28px;
  animation: orbit-b 1.2s linear infinite reverse;
}

.ring.c {
  inset: 42px;
  animation: orbit-c 2.1s linear infinite;
}

.ring.a span {
  background: #4ecdc4;
}

.ring.b span {
  background: #ff6b6b;
}

.ring.c span {
  background: #7f5af0;
}

@keyframes orbit-a {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-b {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-c {
  to {
    transform: rotate(360deg);
  }
}`,
      ts: `// Loader automatico: animacao 100% em CSS com 3 orbitas.`,
    },
    'curadoria-gooey-loader': {
      html: `<div class="demo-gooey-loader">\n  <span></span><span></span><span></span><span></span><span></span>\n</div>`,
      css: `.demo-gooey-loader {
  display: flex;
  gap: 10px;
  filter: blur(0.5px);
}

.demo-gooey-loader span {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9f1c, #ff4d6d);
  animation: gooey 1s ease-in-out infinite;
}

.demo-gooey-loader span:nth-child(2) {
  animation-delay: 0.1s;
}

.demo-gooey-loader span:nth-child(3) {
  animation-delay: 0.2s;
}

.demo-gooey-loader span:nth-child(4) {
  animation-delay: 0.3s;
}

.demo-gooey-loader span:nth-child(5) {
  animation-delay: 0.4s;
}

@keyframes gooey {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-14px) scale(1.2);
  }
}`,
      ts: `// Loader automatico: bolhas em fase com delay sequencial.`,
    },
    'curadoria-rocket-loader': {
      html: `<div class="demo-rocket-loader">\n  <div class="smoke"></div><div class="smoke"></div><div class="smoke"></div>\n  <div class="rocket"><i class="window"></i><i class="fin left"></i><i class="fin right"></i><i class="fire"></i></div>\n</div>`,
      css: `.demo-rocket-loader {
  position: relative;
  width: 160px;
  height: 170px;
  display: grid;
  place-items: end center;
}

.rocket {
  position: relative;
  width: 44px;
  height: 78px;
  border-radius: 24px 24px 16px 16px;
  background: linear-gradient(180deg, #e6f0ff, #a8c7ff);
  animation: rocket-fly 1.5s ease-in-out infinite;
}

.rocket .window {
  position: absolute;
  top: 14px;
  left: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translateX(-50%);
  background: #1f2a44;
}

.rocket .fin {
  position: absolute;
  bottom: 10px;
  width: 12px;
  height: 20px;
  background: #ff6b6b;
}

.rocket .fin.left {
  left: -8px;
  border-radius: 12px 0 0 12px;
}

.rocket .fin.right {
  right: -8px;
  border-radius: 0 12px 12px 0;
}

.rocket .fire {
  position: absolute;
  left: 50%;
  bottom: -14px;
  width: 12px;
  height: 18px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #ffe66d, #ff7f11);
  border-radius: 0 0 10px 10px;
  animation: fire-flicker 0.26s linear infinite;
}

.smoke {
  position: absolute;
  bottom: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  animation: smoke 1.5s ease-out infinite;
}

.smoke:nth-child(1) {
  left: 56px;
}

.smoke:nth-child(2) {
  left: 74px;
  animation-delay: 0.2s;
}

.smoke:nth-child(3) {
  left: 92px;
  animation-delay: 0.4s;
}

@keyframes rocket-fly {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-28px);
  }
}

@keyframes smoke {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0.8;
  }

  100% {
    transform: translateY(-50px) scale(1.8);
    opacity: 0;
  }
}

@keyframes fire-flicker {
  0%,
  100% {
    height: 18px;
  }

  50% {
    height: 12px;
  }
}`,
      ts: `// Loader automatico: foguete com oscilacao e fumaca.`,
    },
    'curadoria-candy-ring-loader': {
      html: `<div class="demo-candy-loader">\n  <div class="ring"></div>\n</div>`,
      css: `.demo-candy-loader {
  display: grid;
  place-items: center;
}

.demo-candy-loader .ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #ff4d6d 0 20%,
    #ffd166 20% 40%,
    #06d6a0 40% 60%,
    #4cc9f0 60% 80%,
    #9b5de5 80% 100%
  );
  mask: radial-gradient(circle at center, transparent 44px, #000 46px);
  animation: candy-spin 1.2s linear infinite, candy-wobble 1.6s ease-in-out infinite;
}

@keyframes candy-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes candy-wobble {
  0%,
  100% {
    scale: 1;
  }

  50% {
    scale: 1.08;
  }
}`,
      ts: `// Loader automatico: anel colorido com rotacao continua.`,
    },
    'curadoria-wave-bars-loader': {
      html: `<div class="demo-wave-bars">\n  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n</div>`,
      css: `.demo-wave-bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 92px;
}

.demo-wave-bars span {
  width: 10px;
  height: 26px;
  border-radius: 999px;
  background: linear-gradient(180deg, #4cc9f0, #4361ee);
  animation: wave 1s ease-in-out infinite;
}

.demo-wave-bars span:nth-child(2) {
  animation-delay: 0.08s;
}

.demo-wave-bars span:nth-child(3) {
  animation-delay: 0.16s;
}

.demo-wave-bars span:nth-child(4) {
  animation-delay: 0.24s;
}

.demo-wave-bars span:nth-child(5) {
  animation-delay: 0.32s;
}

.demo-wave-bars span:nth-child(6) {
  animation-delay: 0.4s;
}

.demo-wave-bars span:nth-child(7) {
  animation-delay: 0.48s;
}

.demo-wave-bars span:nth-child(8) {
  animation-delay: 0.56s;
}

.demo-wave-bars span:nth-child(9) {
  animation-delay: 0.64s;
}

.demo-wave-bars span:nth-child(10) {
  animation-delay: 0.72s;
}

@keyframes wave {
  0%,
  100% {
    height: 22px;
  }

  50% {
    height: 82px;
  }
}`,
      ts: `// Loader automatico: barras em cascata formando onda.`,
    },
    'curadoria-starfield-pattern': {
      html: `<div class="demo-starfield">\n  <div class="layer back"></div>\n  <div class="layer mid"></div>\n  <div class="layer front"></div>\n</div>`,
      css: `.demo-starfield {
  position: relative;
  width: 220px;
  height: 160px;
  overflow: hidden;
  border-radius: 14px;
  background: #050816;
}

.demo-starfield .layer {
  position: absolute;
  inset: -32% -24%;
  background-repeat: repeat;
  animation: stars-fall linear infinite;
}

.demo-starfield .back {
  opacity: 0.35;
  animation-duration: 12s;
  background-image: radial-gradient(circle, #9fb3ff 1px, transparent 1.5px);
  background-size: 36px 36px;
}

.demo-starfield .mid {
  opacity: 0.55;
  animation-duration: 8s;
  background-image: radial-gradient(circle, #d7e3ff 1.3px, transparent 1.8px);
  background-size: 28px 28px;
}

.demo-starfield .front {
  opacity: 0.85;
  animation-duration: 5s;
  background-image: radial-gradient(circle, #ffffff 1.6px, transparent 2px);
  background-size: 22px 22px;
}

@keyframes stars-fall {
  from {
    transform: translateY(-24%);
  }

  to {
    transform: translateY(24%);
  }
}`,
      ts: `// Padrao automatico com tres camadas de estrelas em parallax.`,
    },
    'curadoria-gradient-river-pattern': {
      html: `<div class="demo-gradient-river">\n  <span class="river-layer a"></span>\n  <span class="river-layer b"></span>\n  <span class="river-layer c"></span>\n</div>`,
      css: `.demo-gradient-river {
  position: relative;
  width: 220px;
  height: 160px;
  overflow: hidden;
  border-radius: 14px;
  background: linear-gradient(140deg, #111a37, #25124d);
}

.river-layer {
  position: absolute;
  inset: -22% -16%;
  background-repeat: repeat;
  mix-blend-mode: screen;
  animation: river-flow 9s linear infinite;
}

.river-layer.a {
  opacity: 0.55;
  background-image: radial-gradient(circle at 20px 20px, #4cc9f0 0 14px, transparent 16px);
  background-size: 96px 96px;
}

.river-layer.b {
  opacity: 0.45;
  background-image: radial-gradient(circle at 42px 42px, #9b5de5 0 20px, transparent 22px);
  background-size: 120px 120px;
  animation-duration: 13s;
  animation-direction: reverse;
}

.river-layer.c {
  opacity: 0.42;
  background-image: radial-gradient(circle at 24px 24px, #ff5d8f 0 15px, transparent 17px),
    radial-gradient(circle at 72px 72px, #ffe66d 0 13px, transparent 15px);
  background-size: 110px 110px;
  animation-duration: 11s;
}

@keyframes river-flow {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-72px, -54px, 0);
  }
}`,
      ts: `// Padrao automatico com blobs de gradient em movimento continuo.`,
    },
    'curadoria-fluid-water': {
      html: `<div class="water-preview">\n  <div class="water-container">\n    <div class="wave back"></div>\n    <div class="water-body"></div>\n    <div class="wave"></div>\n  </div>\n</div>`,
      css: `.water-preview {
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  background: radial-gradient(circle at 50% 120%, rgba(2, 19, 41, 0.9), rgba(1, 8, 20, 1) 60%),
    linear-gradient(180deg, #153456 0%, #081425 100%);
}

.water-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  animation: water-fill 12s ease-in-out infinite;
}

.water-body {
  position: absolute;
  inset: auto 0 0 0;
  height: 100%;
  background: #00bcd4;
  opacity: 0.6;
}

.wave {
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 200%;
  height: 60px;
  background-repeat: repeat-x;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120' preserveAspectRatio='none'%3E%3Cpath d='M0,60 C150,110 250,10 400,60 C550,110 650,10 800,60 L800,120 L0,120 Z' fill='%2300bcd4' opacity='0.6'/%3E%3C/svg%3E");
  animation: wave-move 4s linear infinite;
}

.wave.back {
  bottom: 98%;
  opacity: 0.3;
  animation-duration: 6s;
  animation-direction: reverse;
}

@keyframes water-fill {
  0%,
  10% {
    transform: translateY(100%);
  }

  45%,
  55% {
    transform: translateY(0%);
  }

  90%,
  100% {
    transform: translateY(100%);
  }
}

@keyframes wave-move {
  to {
    transform: translateX(-50%);
  }
}`,
      ts: `// Padrao de agua com preenchimento gradual e ondas laterais.`,
    },
    'velvet-command-button': {
      html: `<button class="velvet-command-btn">Deploy seguro</button>`,
      css: `.velvet-command-btn {
  border: 1px solid #d6c5ff;
  border-radius: 14px;
  min-height: 44px;
  padding: 0 18px;
  background: linear-gradient(160deg, #3a2457, #6a45ad);
  color: #f7f3ff;
  font-weight: 700;
}`,
      ts: `const button = document.querySelector('.velvet-command-btn') as HTMLButtonElement
button.addEventListener('click', () => {
  button.classList.toggle('is-pressed')
})`,
    },
    'confetti-pop-button': {
      html: `<button class="confetti-pop-btn">Liberar confete</button>`,
      css: `.confetti-pop-btn {
  border: none;
  border-radius: 999px;
  min-height: 44px;
  padding: 0 20px;
  background: linear-gradient(140deg, #ff6b8f, #ffb86c);
  color: #2d1133;
  font-weight: 800;
}`,
      ts: `const button = document.querySelector('.confetti-pop-btn') as HTMLButtonElement
button.addEventListener('click', () => {
  // Dispare a animacao de confete aqui
})`,
    },
    'ledger-confirm-checkbox': {
      html: `<label><input type="checkbox" /> Contrato revisado</label>`,
      css: `label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Arial, sans-serif;
}`,
      ts: `const checks = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
checks.forEach((check) => {
  check.addEventListener('change', () => {
    // Atualize resumo de etapas concluidas
  })
})`,
    },
    'doodle-checklist-board': {
      html: `<button class="doodle-task"><span>✓</span> Postar teaser</button>`,
      css: `.doodle-task {
  border: 2px dashed #2a2a2a;
  border-radius: 12px;
  background: #fff7cd;
  padding: 10px 12px;
  font-family: 'Comic Sans MS', cursive;
}`,
      ts: `const tasks = document.querySelectorAll('.doodle-task')
tasks.forEach((task) => task.addEventListener('click', () => task.classList.toggle('is-done')))`,
    },
    'aurora-weather-card': {
      html: `<article id="aurora-card" class="aurora-weather-card is-rain is-rainy">
  <div class="aurora-rain" aria-hidden="true"></div>
  <div class="aurora-content">
    <div class="aurora-main">
      <header>
        <strong id="city">Curitiba</strong>
        <span id="sky">Chuva moderada</span>
      </header>
      <div id="temp" class="temp">18°</div>
      <p id="feeling">Sensacao 16°</p>
    </div>
    <div class="aurora-side">
      <footer>
        <span id="wind">Vento 18 km/h</span>
        <span id="humidity">Umidade 91%</span>
      </footer>
      <div class="temp-switch">
        <button type="button" data-scenario="cold">Frio</button>
        <button type="button" data-scenario="mild">Ameno</button>
        <button type="button" data-scenario="rain">Chuva</button>
        <button type="button" data-scenario="hot">Calor</button>
      </div>
    </div>
  </div>
</article>`,
      css: `.aurora-weather-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(160deg, #1f4f83, #38a8d6);
  color: #f1fbff;
  transition: background 280ms ease, box-shadow 280ms ease;
}

.aurora-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr minmax(200px, 0.9fr);
  gap: 12px;
  align-items: center;
}

.aurora-main {
  display: grid;
  gap: 4px;
}

.aurora-side {
  display: grid;
  gap: 8px;
  justify-items: center;
}

.aurora-weather-card header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  text-align: left;
}

.aurora-weather-card header strong {
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}

.aurora-weather-card header span {
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.aurora-weather-card .temp {
  margin-top: 2px;
  text-align: left;
  font-size: 2.8rem;
  line-height: 1;
}

.aurora-weather-card p {
  margin: 0;
  text-align: left;
  font-size: 0.9rem;
}

.aurora-weather-card footer {
  margin-top: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 0.83rem;
}

.aurora-rain {
  position: absolute;
  inset: -2% 0;
  pointer-events: none;
  opacity: 0;
  z-index: 3;
}

.aurora-rain-drop {
  position: absolute;
  left: var(--rain-left);
  top: -24%;
  width: 1.4px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(223, 244, 255, 0), rgba(223, 244, 255, 0.86));
  transform: rotate(12deg);
  animation: aurora-rain-drop-fall var(--rain-duration) linear infinite;
  animation-delay: var(--rain-delay);
  opacity: 0;
}

.aurora-weather-card.is-rainy .aurora-rain {
  opacity: 1;
}

.aurora-weather-card.is-rainy .aurora-rain-drop {
  opacity: 0.92;
}

.aurora-rain-back .aurora-rain-drop {
  width: 1px;
  height: 7px;
  opacity: 0.56;
  filter: blur(0.18px);
}

@keyframes aurora-rain-drop-fall {
  from {
    top: -24%;
    transform: translateX(0) rotate(12deg);
  }
  to {
    top: 124%;
    transform: translateX(-22px) rotate(12deg);
  }
}

.aurora-weather-card.is-cold {
  background: linear-gradient(160deg, #304f87, #5da2d8);
}

.aurora-weather-card.is-mild {
  background: linear-gradient(160deg, #1f4f83, #38a8d6);
}

.aurora-weather-card.is-rain {
  background: linear-gradient(160deg, #1a3d67, #2c6ea8);
}

.aurora-weather-card.is-hot {
  background: linear-gradient(160deg, #8a4b2a, #e38c52);
}

.temp-switch {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

@media (max-width: 640px) {
  .aurora-content {
    grid-template-columns: 1fr;
  }

  .aurora-weather-card header,
  .aurora-weather-card .temp,
  .aurora-weather-card p {
    text-align: center;
    align-items: center;
  }
}

.temp-switch button.is-active {
  background: rgba(255, 255, 255, 0.28);
}`,
          ts: `type Scenario = {
        tone: 'is-cold' | 'is-mild' | 'is-rain' | 'is-hot'
        rainy: boolean
  city: string
  sky: string
  temp: string
  feeling: string
  wind: string
  humidity: string
}

const scenarios: Record<string, Scenario> = {
  cold: { tone: 'is-cold', rainy: false, city: 'Campos do Jordao', sky: 'Nevoa suave', temp: '6°', feeling: 'Sensacao 3°', wind: 'Vento 7 km/h', humidity: 'Umidade 82%' },
  mild: { tone: 'is-mild', rainy: false, city: 'Sao Paulo', sky: 'Ceu aberto', temp: '22°', feeling: 'Sensacao 23°', wind: 'Vento 11 km/h', humidity: 'Umidade 64%' },
  rain: { tone: 'is-rain', rainy: true, city: 'Curitiba', sky: 'Chuva moderada', temp: '18°', feeling: 'Sensacao 16°', wind: 'Vento 18 km/h', humidity: 'Umidade 91%' },
  hot: { tone: 'is-hot', rainy: false, city: 'Cuiaba', sky: 'Sol intenso', temp: '34°', feeling: 'Sensacao 38°', wind: 'Vento 9 km/h', humidity: 'Umidade 41%' },
}

const card = document.getElementById('aurora-card') as HTMLElement
const city = document.getElementById('city') as HTMLElement
const sky = document.getElementById('sky') as HTMLElement
const temp = document.getElementById('temp') as HTMLElement
const feeling = document.getElementById('feeling') as HTMLElement
const wind = document.getElementById('wind') as HTMLElement
const humidity = document.getElementById('humidity') as HTMLElement
const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-scenario]'))

function applyScenario(name: string) {
  const scenario = scenarios[name] || scenarios.rain
  card.classList.remove('is-cold', 'is-mild', 'is-rain', 'is-hot', 'is-rainy')
  card.classList.add(scenario.tone)
  card.classList.toggle('is-rainy', scenario.rainy)
  city.textContent = scenario.city
  sky.textContent = scenario.sky
  temp.textContent = scenario.temp
  feeling.textContent = scenario.feeling
  wind.textContent = scenario.wind
  humidity.textContent = scenario.humidity
  buttons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.scenario === name))
}

buttons.forEach((btn) => btn.addEventListener('click', () => applyScenario(btn.dataset.scenario || 'rain')))
applyScenario('rain')`,
    },
    'pixel-forecast-card': {
      html: `<article class="pixel-forecast">PIXEL WEATHER</article>`,
      css: `.pixel-forecast {
  border: 3px solid #0f1029;
  background: #8de4ff;
  color: #101a36;
  font-family: 'Courier New', monospace;
}`,
      ts: `const forecast = ['22', '27', '20']
console.log('Forecast pixel:', forecast.join(' / '))`,
    },
    'glass-alert-modal': {
      html: `<article class="glass-alert-modal"><h4>Confirmar exclusao?</h4></article>`,
      css: `.glass-alert-modal {
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  background: rgba(20, 34, 58, 0.55);
}`,
      ts: `const openModal = () => {
  // Exiba modal de alerta critico
}`,
    },
    'comic-quick-modal': {
      html: `<article class="comic-modal"><span>POW!</span><h4>Missao concluida!</h4></article>`,
      css: `.comic-modal {
  border: 3px solid #23153d;
  border-radius: 12px;
  background: #ffe66d;
  box-shadow: 6px 6px 0 #23153d;
}`,
      ts: `const closeButton = document.getElementById('comic-close')
closeButton?.addEventListener('click', () => {
  // Feche modal estilo comic
})`,
    },
    'sticky-notes-kanban': {
      html: `<section class="sticky-kanban"><div class="note">Card comparativo</div></section>`,
      css: `.sticky-kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.note {
  background: #fff2a8;
  padding: 10px;
  border-radius: 10px;
}`,
      ts: `const notes = document.querySelectorAll('.note')
notes.forEach((note) => note.addEventListener('click', () => note.classList.toggle('is-highlighted')))`,
    },
    'prism-pulse-loader': {
      html: `<div class="prism-loader"><span></span></div>`,
      css: `.prism-loader span {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  border: 6px solid #9fd7ff;
  border-top-color: #3f6cff;
  animation: spin 1s linear infinite;
}`,
      ts: `// Loader 100% CSS sem logica adicional.`,
    },
    'cloud-drizzle-loader': {
      html: `<div class="cloud-loader"><div class="cloud"></div><div class="rain"></div></div>`,
      css: `.cloud {
  width: 90px;
  height: 34px;
  border-radius: 999px;
  background: #d9ecff;
}`,
      ts: `// Anime gotas com delays para ritmo natural.`,
    },
    'sunrise-kpi-card': {
      html: `<article class="sunrise-kpi"><strong>68.4%</strong></article>`,
      css: `.sunrise-kpi {
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(165deg, #ff9c56, #ffdca3);
  color: #4a2208;
}`,
      ts: `const trend = '+5.2 p.p.'
console.log('Tendencia:', trend)`,
    },
    'finance-snapshot-card': {
      html: `<article class="finance-snapshot"><strong>R$ 128.430</strong></article>`,
      css: `.finance-snapshot {
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(160deg, #122640, #1e4d72);
  color: #e9f6ff;
}`,
      ts: `const progress = 74
console.log('Meta mensal:', progress + '%')`,
    },
    'team-status-card': {
      html: `<article class="team-status-card"><h4>Team Pulse</h4></article>`,
      css: `.team-status-card {
  border-radius: 14px;
  padding: 14px;
  border: 1px solid #d7e3ef;
  background: #ffffff;
}`,
      ts: `const squads = [82, 74, 91]
console.log('Capacidade por squad:', squads)`,
    },
    'retro-music-player-card': {
      html: `<article class="retro-player"><strong>Neon Night Drive</strong></article>`,
      css: `.retro-player {
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(165deg, #2e1b59, #5f3cc8);
  color: #f5e8ff;
}`,
      ts: `const playButton = document.getElementById('retro-play')
playButton?.addEventListener('click', () => {
  // Alternar play/pause
})`,
    },
    'arcade-score-pill': {
      html: `<div class="pixel-sweeper-loader">
  <div class="pixel-worker"></div>
  <div class="pixel-broom"></div>
</div>`,
      css: `.pixel-sweeper-loader {
  width: 170px;
  height: 110px;
  position: relative;
  image-rendering: pixelated;
}

.pixel-worker {
  width: 28px;
  height: 42px;
  position: absolute;
  left: 50px;
  top: 26px;
  background: #4e89ff;
  animation: worker-bob 0.8s steps(2) infinite;
}

.pixel-broom {
  width: 58px;
  height: 8px;
  position: absolute;
  left: 72px;
  top: 66px;
  background: #c58c4f;
  transform-origin: left center;
  animation: broom-sweep 0.8s ease-in-out infinite;
}`,
      ts: `// Loader passivo: toda a animacao acontece via CSS.
// Ideal para estados de espera com identidade retro.`,
    },
    'sketch-profile-card': {
      html: `<article class="sketch-profile"><strong>Your name</strong></article>`,
      css: `.sketch-profile {
  border: 2px dashed #222;
  border-radius: 14px;
  background: #fffdf4;
  padding: 16px;
}`,
      ts: `const profile = { name: 'Your name', role: 'UI Illustrator' }
console.log(profile)`,
    },
    'morphing-action-fab': {
      html: `<button class="morphing-fab">+</button>`,
      css: `.morphing-fab {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(160deg, #1463ff, #47b3ff);
  color: #fff;
}`,
      ts: `const fab = document.querySelector('.morphing-fab') as HTMLButtonElement
fab.addEventListener('click', () => {
  fab.classList.toggle('is-open')
})`,
    },
  }

  const selectedSnippet = snippets[slug] ?? fallback

  return {
    ...selectedSnippet,
    html: appendSnippetAttribution(selectedSnippet.html, 'html'),
    css: appendSnippetAttribution(selectedSnippet.css, 'css'),
  }
}

export function CuradoriaElementPage({ item, isLiked }: CuradoriaElementPageProps) {
  const [copiedKey, setCopiedKey] = useState<SnippetKey | null>(null)
  const [activeTab, setActiveTab] = useState<SnippetKey>('html')
  const snippets = getSnippetsBySlug(item.slug)

  const handleCopy = async (key: SnippetKey) => {
    const content = snippets[key]
    try {
      await navigator.clipboard.writeText(content)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey(null), 1300)
    } catch {
      setCopiedKey(null)
    }
  }

  return (
    <ItemPageShell
      title={item.title}
      description={item.description}
      isLiked={isLiked}
    >
      <div className="component-detail-layout">
        <div className="component-preview-col">
          <div className="component-live-preview">
            <h3>Visual do componente</h3>
            <div className="preview-pattern-stage">
              <div className="preview-center-frame">
                <InteractivePreview slug={item.slug} />
              </div>
            </div>
          </div>
        </div>

        <div className="component-code-col">
          <TabbedCodeBox
            activeTab={activeTab}
            onTabChange={setActiveTab}
            code={snippets[activeTab]}
            copied={copiedKey === activeTab}
            onCopy={() => handleCopy(activeTab)}
          />
        </div>
      </div>
    </ItemPageShell>
  )
}

type TabbedCodeBoxProps = {
  activeTab: SnippetKey
  onTabChange: (tab: SnippetKey) => void
  code: string
  copied: boolean
  onCopy: () => void
}

function TabbedCodeBox({ activeTab, onTabChange, code, copied, onCopy }: TabbedCodeBoxProps) {
  const tabs: SnippetKey[] = ['html', 'css', 'ts']

  return (
    <section className="code-box">
      <header className="code-box-head">
        <div className="code-tabs" role="tablist" aria-label="Tipos de codigo">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`code-tab ${activeTab === tab ? 'is-active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => onTabChange(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <button type="button" className="copy-btn" onClick={onCopy}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </header>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  )
}
