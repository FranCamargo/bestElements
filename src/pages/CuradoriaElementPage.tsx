import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { Copy, Check, Maximize2, Minimize2, X, Bot, UserRound, Share2, Heart, Upload, Save, Trash2, ChevronDown, BarChart2, FolderOpen, Settings, Users, Home, ClipboardList, Layers, Search, Rocket, MessageCircle, Plus, Wifi, Bluetooth, Bell, Moon } from 'lucide-react'
import { ItemPageShell } from './ItemPageShell.tsx'
import type { GalleryItem } from '../data/galleryItems.ts'
import haimCover from '../assets/haim.png'

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

type ChatRole = 'assistant' | 'user'

type ChatMessage = {
  role: ChatRole
  content: string
}

type ChatQuickAction = {
  label: string
  prompt: string
}

const chatbotQuickActions: ChatQuickAction[] = [
  { label: 'Resumir feedbacks recentes', prompt: 'Resuma os feedbacks negativos da semana.' },
  { label: 'Sugerir proxima acao', prompt: 'Quais acoes priorizar para melhorar satisfacao?' },
  { label: 'Gerar status executivo', prompt: 'Monte um status executivo curto para lideranca.' },
]

const starlightPlayerStars = [
  { top: '10%', left: '12%', size: 2.2, driftX: '11px', driftY: '-7px', duration: '8.5s', delay: '-1.2s', twinkle: '2.8s' },
  { top: '17%', left: '72%', size: 1.8, driftX: '-9px', driftY: '8px', duration: '7.1s', delay: '-3.4s', twinkle: '2.3s' },
  { top: '22%', left: '39%', size: 1.6, driftX: '13px', driftY: '-6px', duration: '9.3s', delay: '-2.1s', twinkle: '3.0s' },
  { top: '30%', left: '84%', size: 2.6, driftX: '-12px', driftY: '9px', duration: '10.2s', delay: '-4.7s', twinkle: '2.6s' },
  { top: '35%', left: '16%', size: 1.7, driftX: '10px', driftY: '7px', duration: '7.8s', delay: '-0.8s', twinkle: '2.1s' },
  { top: '44%', left: '56%', size: 2.1, driftX: '-10px', driftY: '-8px', duration: '8.9s', delay: '-5.2s', twinkle: '2.5s' },
  { top: '51%', left: '26%', size: 1.5, driftX: '8px', driftY: '-6px', duration: '9.8s', delay: '-1.7s', twinkle: '2.9s' },
  { top: '63%', left: '78%', size: 2.4, driftX: '-11px', driftY: '10px', duration: '8.1s', delay: '-3.8s', twinkle: '2.2s' },
  { top: '70%', left: '41%', size: 1.9, driftX: '12px', driftY: '7px', duration: '10.8s', delay: '-4.5s', twinkle: '2.7s' },
  { top: '78%', left: '9%', size: 2.3, driftX: '9px', driftY: '-9px', duration: '9.5s', delay: '-2.9s', twinkle: '2.4s' },
  { top: '83%', left: '66%', size: 1.6, driftX: '-8px', driftY: '6px', duration: '7.4s', delay: '-1.4s', twinkle: '3.1s' },
  { top: '8%', left: '48%', size: 1.4, driftX: '7px', driftY: '-8px', duration: '7.6s', delay: '-3.1s', twinkle: '2.4s' },
  { top: '12%', left: '90%', size: 1.2, driftX: '-6px', driftY: '7px', duration: '8.3s', delay: '-0.9s', twinkle: '2.2s' },
  { top: '15%', left: '26%', size: 1.9, driftX: '9px', driftY: '-4px', duration: '9.1s', delay: '-2.6s', twinkle: '3.0s' },
  { top: '24%', left: '62%', size: 1.3, driftX: '-7px', driftY: '5px', duration: '8.8s', delay: '-4.4s', twinkle: '2.5s' },
  { top: '28%', left: '7%', size: 2.0, driftX: '10px', driftY: '-6px', duration: '10.1s', delay: '-1.1s', twinkle: '2.9s' },
  { top: '33%', left: '70%', size: 1.1, driftX: '-5px', driftY: '6px', duration: '7.9s', delay: '-3.6s', twinkle: '2.0s' },
  { top: '39%', left: '31%', size: 2.5, driftX: '8px', driftY: '-7px', duration: '9.4s', delay: '-5.0s', twinkle: '2.8s' },
  { top: '47%', left: '88%', size: 1.4, driftX: '-9px', driftY: '8px', duration: '8.2s', delay: '-2.8s', twinkle: '2.3s' },
  { top: '54%', left: '12%', size: 2.0, driftX: '11px', driftY: '-5px', duration: '9.9s', delay: '-1.9s', twinkle: '2.6s' },
  { top: '58%', left: '52%', size: 1.2, driftX: '-7px', driftY: '7px', duration: '7.2s', delay: '-4.2s', twinkle: '2.1s' },
  { top: '66%', left: '68%', size: 1.7, driftX: '9px', driftY: '-8px', duration: '10.4s', delay: '-2.5s', twinkle: '3.2s' },
  { top: '72%', left: '22%', size: 1.3, driftX: '-8px', driftY: '6px', duration: '8.6s', delay: '-0.7s', twinkle: '2.4s' },
  { top: '76%', left: '54%', size: 2.1, driftX: '8px', driftY: '-6px', duration: '9.0s', delay: '-3.3s', twinkle: '2.7s' },
  { top: '82%', left: '36%', size: 1.4, driftX: '-9px', driftY: '8px', duration: '7.7s', delay: '-1.5s', twinkle: '2.2s' },
  { top: '86%', left: '81%', size: 2.2, driftX: '7px', driftY: '-7px', duration: '10.6s', delay: '-4.1s', twinkle: '3.0s' },
  { top: '90%', left: '18%', size: 1.1, driftX: '-6px', driftY: '5px', duration: '8.4s', delay: '-2.3s', twinkle: '2.1s' },
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
    case 'curadoria-ocean-pill-button':
      return <OceanPillButtonInteractive />
    case 'curadoria-rose-gold-pill-button':
      return <RoseGoldPillButtonInteractive />
    case 'curadoria-forest-pill-button':
      return <ForestPillButtonInteractive />
    case 'curadoria-wood-brown-pill-button':
      return <WoodBrownPillButtonInteractive />
    case 'curadoria-obsidian-plum-pill-button':
      return <ObsidianPlumPillButtonInteractive />
    case 'curadoria-neomorphic-button':
      return <NeomorphicButtonInteractive />
    case 'soft-depth-search-bar':
      return <SoftDepthSearchBarInteractive />
    case 'curadoria-toggle':
      return <ToggleInteractive />
    case 'curadoria-realistic-toggle':
      return <RealisticToggleInteractive />
    case 'curadoria-line-graph':
      return <LineGraphInteractive />
    case 'curadoria-progress-bar':
      return <ProgressBarInteractive />
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
    case 'curadoria-realistic-progress-loader':
      return <RealisticProgressLoaderInteractive />
    case 'curadoria-starfield-pattern':
      return <StarfieldPatternInteractive />
    case 'curadoria-gradient-river-pattern':
      return <GradientRiverPatternInteractive />
    case 'curadoria-fluid-water':
      return <FluidWaterInteractive />
    case 'curadoria-grid-fade-pattern':
      return <GridFadePatternInteractive />
    case 'curadoria-screen-lights-pattern':
      return <ScreenLightsPatternInteractive theme="olive" />
    case 'curadoria-screen-lights-pattern-amber':
      return <ScreenLightsPatternInteractive theme="amber" />
    case 'curadoria-screen-lights-pattern-aqua':
      return <ScreenLightsPatternInteractive theme="aqua" />
    case 'curadoria-screen-lights-pattern-rose':
      return <ScreenLightsPatternInteractive theme="rose" />
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
    case 'lilac-weather-glass-card':
      return <LilacWeatherGlassCardInteractive />
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
    case 'team-status-card':
      return <TeamStatusCardInteractive />
    case 'retro-music-player-card':
      return <RetroMusicPlayerCardInteractive />
    case 'lilac-gradient-music-player-card':
      return <LilacGradientMusicPlayerCardInteractive />
    case 'starlight-nocturne-music-player-card':
      return <StarlightNocturneMusicPlayerCardInteractive />
    case 'forest-leaf-music-player-card':
      return <ForestLeafMusicPlayerCardInteractive />
    case 'music-player-top-icon-button':
      return <MusicPlayerTopIconButtonInteractive />
    case 'music-player-top-icon-button-forest':
      return <MusicPlayerTopIconButtonForestInteractive />
    case 'music-player-play-button':
      return <MusicPlayerPlayButtonInteractive />
    case 'music-player-play-button-forest':
      return <MusicPlayerPlayButtonForestInteractive />
    case 'music-player-share-button':
      return <MusicPlayerShareButtonInteractive />
    case 'music-player-share-button-forest':
      return <MusicPlayerShareButtonForestInteractive />
    case 'arcade-score-pill':
      return <ArcadeScorePillInteractive />
    case 'sketch-profile-card':
      return <SketchProfileCardInteractive />
    case 'morphing-action-fab':
      return <MorphingActionFabInteractive />
    case 'neon-glass-login-card':
      return <NeonGlassLoginCardInteractive />
    case 'radial-heatmap-clock':
      return <RadialHeatmapClockInteractive />
    case 'liquid-level-gauge':
      return <LiquidLevelGaugeInteractive />
    case 'typewriter-terminal-card':
      return <TypewriterTerminalCardInteractive />
    case 'event-ticket-card':
      return <EventTicketCardInteractive />
    case 'notification-bell-badge':
      return <NotificationBellBadgeInteractive />
    case 'rotary-dial-knob':
      return <RotaryDialKnobInteractive />
    case 'aurora-chip-selector':
      return <AuroraChipSelectorInteractive />
    case 'timeline-stepper':
      return <TimelineStepperInteractive />
    case 'flip-counter-display':
      return <FlipCounterDisplayInteractive />
    case 'holographic-card':
      return <HolographicCardInteractive />
    case 'neo-toggle-switch':
      return <NeoToggleSwitchInteractive />
    case 'neo-music-player':
      return <NeoMusicPlayerInteractive />
    case 'neo-numpad':
      return <NeoNumpadInteractive />
    case 'neo-stat-display':
      return <NeoStatDisplayInteractive />
    case 'neo-color-swatches':
      return <NeoColorSwatchesInteractive />
    case 'neo-analog-clock':
      return <NeoAnalogClockInteractive />
    case 'neo-equalizer':
      return <NeoEqualizerInteractive />
    case 'neo-pin-lock':
      return <NeoPinLockInteractive />
    case 'neo-star-rating':
      return <NeoStarRatingInteractive />
    case 'neo-progress-arc':
      return <NeoProgressArcInteractive />
    case 'neo-switch-panel':
      return <NeoSwitchPanelInteractive />
    case 'neo-volume-dial':
      return <NeoVolumeDialInteractive />
    case 'neo-tag-cloud':
      return <NeoTagCloudInteractive />
    case 'glass-profile-card':
      return <GlassProfileCardInteractive />
    case 'brutalist-block-card':
      return <BrutalistBlockCardInteractive />
    case 'clay-morphism-buttons':
      return <ClayMorphismButtonsInteractive />
    case 'mesh-aurora-card':
      return <MeshAuroraCardInteractive />
    case 'retro-crt-terminal':
      return <RetroCrtTerminalInteractive />
    case 'sidebar-accordion':
      return <SidebarAccordionInteractive />
    case 'dark-search-field':
      return <DarkSearchFieldInteractive />
    case 'dark-select':
      return <DarkSelectInteractive />
    case 'dark-checkbox':
      return <DarkCheckboxInteractive />
    case 'dark-switch':
      return <DarkSwitchInteractive />
    case 'dark-tabs':
      return <DarkTabsInteractive />
    case 'dark-primary-button':
      return <DarkPrimaryButtonInteractive />
    case 'dark-secondary-button':
      return <DarkSecondaryButtonInteractive />
    case 'dark-icon-button':
      return <DarkIconButtonInteractive />
    case 'gn-segmented-control':
      return <GnSegmentedControlInteractive />
    case 'gn-toggle-switch':
      return <GnToggleSwitchInteractive />
    case 'gn-input-field':
      return <GnInputFieldInteractive />
    case 'gn-numpad':
      return <GnNumpadInteractive />
    case 'gn-bottom-nav':
      return <GnBottomNavInteractive />
    case 'gn-text-nav':
      return <GnTextNavInteractive />
    case 'gn-reminders-card':
      return <GnRemindersCardInteractive />
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
    <button
      type="button"
      className={`mock-sharp-btn ${pressed ? 'is-engaged' : ''}`}
      onClick={() => setPressed((v) => !v)}
    >
      Button
    </button>
  )
}

function PillButtonInteractive({
  variant,
}: {
  variant: 'ocean' | 'rose-gold' | 'forest' | 'wood-brown' | 'obsidian'
}) {
  return (
    <button type="button" className={`mock-pill-btn mock-${variant}-pill-btn`}>
      Button
    </button>
  )
}

function OceanPillButtonInteractive() {
  return <PillButtonInteractive variant="ocean" />
}

function RoseGoldPillButtonInteractive() {
  return <PillButtonInteractive variant="rose-gold" />
}

function ForestPillButtonInteractive() {
  return <PillButtonInteractive variant="forest" />
}

function WoodBrownPillButtonInteractive() {
  return <PillButtonInteractive variant="wood-brown" />
}

function ObsidianPlumPillButtonInteractive() {
  return <PillButtonInteractive variant="obsidian" />
}

function NeomorphicButtonInteractive() {
  const [state, setState] = useState<'drop' | 'inner' | 'outter'>('drop')
  const clickTimerRef = useRef<number | null>(null)

  const setSingleClickState = () => {
    if (clickTimerRef.current !== null) {
      window.clearTimeout(clickTimerRef.current)
    }

    clickTimerRef.current = window.setTimeout(() => {
      setState('inner')
      clickTimerRef.current = null
    }, 220)
  }

  const setDoubleClickState = () => {
    if (clickTimerRef.current !== null) {
      window.clearTimeout(clickTimerRef.current)
      clickTimerRef.current = null
    }

    setState('outter')
  }

  useEffect(() => {
    return () => {
      if (clickTimerRef.current !== null) {
        window.clearTimeout(clickTimerRef.current)
      }
    }
  }, [])

  const interactionLabel =
    state === 'drop'
      ? 'Parado'
      : state === 'inner'
        ? 'Clique'
        : 'Clique duplo'

  const stateLabel = state === 'drop' ? 'parado' : state === 'inner' ? 'clique' : 'clique duplo'

  return (
    <div className="component-mock mock-neomorphic-button-stage">
      <button
        type="button"
        className={`mock-neomorphic-button is-${state}`}
        aria-label={`Botao neomorfico em estado ${stateLabel}`}
        onClick={setSingleClickState}
        onDoubleClick={setDoubleClickState}
      >
        <span className="mock-neomorphic-core" aria-hidden="true" />
      </button>
      <p className="interactive-note mock-neomorphic-label">{interactionLabel}</p>
    </div>
  )
}

function ToggleInteractive() {
  const [isSunMode, setIsSunMode] = useState(true)

  return (
    <div className="component-mock mock-toggle-solo-wrap mock-toggle-clean-stage">
      <button
        type="button"
        className={`mock-celestial-toggle ${isSunMode ? 'is-sun' : ''}`}
        aria-pressed={isSunMode}
        aria-label={isSunMode ? 'Alternar para lua' : 'Alternar para sol'}
        onClick={() => setIsSunMode((current) => !current)}
      >
        <span className="mock-celestial-track" aria-hidden="true">
          <i className="mock-celestial-core" />
        </span>
      </button>
    </div>
  )
}

function RealisticToggleInteractive() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className="component-mock mock-realistic-toggle-wrap">
      <button
        type="button"
        className={`mock-realistic-toggle ${isOn ? 'is-on' : ''}`}
        aria-pressed={isOn}
        aria-label={isOn ? 'Desativar Concave RGB Toggle' : 'Ativar Concave RGB Toggle'}
        onClick={() => setIsOn((current) => !current)}
      >
        <span className="mock-realistic-toggle-knob" aria-hidden="true" />
      </button>
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

function RealisticProgressLoaderInteractive() {
  const [progress, setProgress] = useState(50)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => (current >= 88 ? 18 : current + 1))
    }, 120)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const safeProgress = Math.max(8, Math.min(92, progress))

  return (
    <div className="component-mock mock-loader-realistic-progress" aria-label="Loader realista com barra de progresso">
      <div className="realistic-progress-track">
        <div className="realistic-progress-fill" style={{ width: `${progress}%` }} />
        <div className="realistic-progress-badge" style={{ left: `${safeProgress}%` }}>
          {progress}%
        </div>
      </div>
      <h3>Loading</h3>
      <p>Please Wait...</p>
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

function GridFadePatternInteractive() {
  const [isLight, setIsLight] = useState(false)

  return (
    <div
      className={`component-mock mock-pattern-grid-fade ${isLight ? 'is-light' : ''}`}
      aria-label="Padrao de grade com fade radial"
    >
      <button
        type="button"
        className="grid-fade-toggle"
        onClick={() => setIsLight((current) => !current)}
        aria-pressed={isLight}
      >
        {isLight ? 'Light' : 'Default'}
      </button>

      <div className={`bg-pattern ${isLight ? 'light' : ''}`} />
    </div>
  )
}

function ScreenLightsPatternInteractive({ theme }: { theme?: 'olive' | 'amber' | 'aqua' | 'rose' }) {
  const variantClass = `screen-lights-theme-${theme ?? 'olive'}`

  return (
    <div
      className={`component-mock mock-pattern-screen-lights ${variantClass}`}
      aria-label="Padrao com dois focos de luz em movimento em L opostos"
    >
      <span className="screen-light-orb orb-left" />
      <span className="screen-light-orb orb-right" />
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
      <div className="confetti-wrap">
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

function LilacWeatherGlassCardInteractive() {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily' | 'details' | 'precipitation'>('hourly')
  const [selectedHour, setSelectedHour] = useState(4)

  const hourlyForecast = [
    { label: 'NOW', temp: 72 },
    { label: '11AM', temp: 73 },
    { label: '12PM', temp: 75 },
    { label: '1PM', temp: 77 },
    { label: '2PM', temp: 81 },
    { label: '3PM', temp: 79 },
  ]

  const selected = hourlyForecast[selectedHour]

  return (
    <div className="component-mock mock-centered-demo mock-lilac-weather-glass">
      <article className="lilac-weather-glass-card" aria-label="Weather card glass lilac">
        <header className="lilac-weather-header">
          <div className="lilac-weather-place">
            <strong>San Francisco</strong>
            <span>September 25, 2015</span>
          </div>

          <div className="lilac-weather-temperature">
            <p>{selected.temp}°</p>
            <small>81° / 57°</small>
          </div>
        </header>

        <section className="lilac-weather-condition">
          <div className="lilac-cloud-icon" aria-hidden="true">
            <span className="cloud-sun" />
            <span className="cloud-main" />
            <span className="cloud-side" />
          </div>
          <strong>Cloudy</strong>
        </section>

        <nav className="lilac-weather-tabs" aria-label="Weather sections">
          <button type="button" className={activeTab === 'hourly' ? 'is-active' : ''} onClick={() => setActiveTab('hourly')}>Hourly</button>
          <button type="button" className={activeTab === 'daily' ? 'is-active' : ''} onClick={() => setActiveTab('daily')}>Daily</button>
          <button type="button" className={activeTab === 'details' ? 'is-active' : ''} onClick={() => setActiveTab('details')}>Details</button>
          <button type="button" className={activeTab === 'precipitation' ? 'is-active' : ''} onClick={() => setActiveTab('precipitation')}>Precipitation</button>
        </nav>

        <div className="lilac-weather-hours" role="list" aria-label="Hourly forecast">
          {hourlyForecast.map((hour, index) => (
            <button
              key={hour.label}
              type="button"
              role="listitem"
              className={`lilac-hour-item ${selectedHour === index ? 'is-active' : ''}`}
              onClick={() => setSelectedHour(index)}
            >
              <span>{hour.label}</span>
              <i className="mini-cloud" aria-hidden="true" />
              <strong>{hour.temp}°</strong>
            </button>
          ))}
        </div>
      </article>
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
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(28)

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const intervalId = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.45))
    }, 120)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(safeSeconds / 60)
    const remainingSeconds = safeSeconds % 60
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const totalDuration = 247
  const currentTime = (progress / 100) * totalDuration

  return (
    <div className="component-mock mock-centered-demo mock-retro-player mock-retro-player-classic" aria-label="Music player com vinil em rotacao">
      <div className="retro-top-actions" aria-label="Acoes do player">
        <button type="button" className="retro-icon-btn" aria-label="Voltar">←</button>
        <button type="button" className="retro-icon-btn" aria-label="Abrir menu">≡</button>
      </div>

      <div className="retro-cover-stage">
        <div className={`retro-disc ${isPlaying ? 'is-playing' : ''}`}>
          <div className="retro-album-art" role="img" aria-label="Capa do album Days Are Gone da banda Haim">
            <img
              src={haimCover}
              alt="Capa do album Days Are Gone da banda Haim"
            />
          </div>
        </div>
      </div>

      <section className="retro-wave-panel" aria-label="Informacoes da musica">
        <div className="retro-track-info">
          <strong>Haim - The Wire</strong>
          <p>HAIM</p>
        </div>

        <div className="retro-progress-block" aria-label="Progresso da musica">
          <div className="retro-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          <div className="retro-progress">
            <i style={{ width: `${progress}%` }} />
            <span className="retro-progress-knob" style={{ left: `${progress}%` }} />
          </div>
        </div>

        <div className="retro-player-controls" aria-label="Controles de reproducao">
          <button type="button" className="retro-control" aria-label="Parar musica">■</button>
          <button
            type="button"
            className="retro-control retro-play"
            onClick={() => setIsPlaying((current) => !current)}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pausar musica' : 'Tocar musica'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button type="button" className="retro-control" aria-label="Pausar faixa">❙❙</button>
        </div>
      </section>
    </div>
  )
}

function LilacGradientMusicPlayerCardInteractive() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(36)

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const intervalId = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.4))
    }, 120)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(safeSeconds / 60)
    const remainingSeconds = safeSeconds % 60
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const totalDuration = 247
  const currentTime = (progress / 100) * totalDuration

  return (
    <div className="component-mock mock-centered-demo mock-retro-player mock-retro-player-lilac" aria-label="Music player lilas com gradiente">
      <div className="retro-top-actions" aria-label="Acoes do player">
        <button type="button" className="retro-icon-btn" aria-label="Voltar">←</button>
        <button type="button" className="retro-icon-btn" aria-label="Abrir menu">≡</button>
      </div>

      <div className="retro-cover-stage">
        <div className={`retro-disc ${isPlaying ? 'is-playing' : ''}`}>
          <div className="retro-album-art" role="img" aria-label="Capa do album Days Are Gone da banda Haim">
            <img
              src={haimCover}
              alt="Capa do album Days Are Gone da banda Haim"
            />
          </div>
        </div>
      </div>

      <section className="retro-wave-panel" aria-label="Informacoes da musica">
        <div className="retro-track-info">
          <strong>Haim - The Wire</strong>
          <p>Lavender Edition</p>
        </div>

        <div className="retro-progress-block" aria-label="Progresso da musica">
          <div className="retro-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          <div className="retro-progress">
            <i style={{ width: `${progress}%` }} />
            <span className="retro-progress-knob" style={{ left: `${progress}%` }} />
          </div>
        </div>

        <div className="retro-player-controls" aria-label="Controles de reproducao">
          <button type="button" className="retro-control" aria-label="Parar musica">■</button>
          <button
            type="button"
            className="retro-control retro-play"
            onClick={() => setIsPlaying((current) => !current)}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pausar musica' : 'Tocar musica'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button type="button" className="retro-control" aria-label="Pausar faixa">❙❙</button>
        </div>
      </section>
    </div>
  )
}

function StarlightNocturneMusicPlayerCardInteractive() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(42)

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const intervalId = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.34))
    }, 120)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(safeSeconds / 60)
    const remainingSeconds = safeSeconds % 60
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const totalDuration = 247
  const currentTime = (progress / 100) * totalDuration

  return (
    <div className="component-mock mock-centered-demo mock-retro-player mock-retro-player-starlight" aria-label="Music player escuro com estrelas vagando">
      <div className="retro-stars" aria-hidden="true">
        {starlightPlayerStars.map((star, index) => (
          <i
            key={`star-${index}`}
            className="retro-star"
            style={{
              top: star.top,
              left: star.left,
              '--star-size': `${star.size}px`,
              '--drift-x': star.driftX,
              '--drift-y': star.driftY,
              '--drift-duration': star.duration,
              '--drift-delay': star.delay,
              '--twinkle-duration': star.twinkle,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="retro-top-actions" aria-label="Acoes do player">
        <button type="button" className="retro-icon-btn" aria-label="Voltar">←</button>
        <button type="button" className="retro-icon-btn" aria-label="Abrir menu">≡</button>
      </div>

      <div className="retro-cover-stage">
        <div className={`retro-disc ${isPlaying ? 'is-playing' : ''}`}>
          <div className="retro-album-art" role="img" aria-label="Capa do album Days Are Gone da banda Haim">
            <img
              src={haimCover}
              alt="Capa do album Days Are Gone da banda Haim"
            />
          </div>
        </div>
      </div>

      <section className="retro-wave-panel" aria-label="Informacoes da musica">
        <button type="button" className="retro-share-btn" aria-label="Compartilhar faixa">
          <Share2 size={14} />
        </button>

        <div className="retro-track-info">
          <strong>Haim - The Wire</strong>
          <p>Starlight Nocturne</p>
        </div>

        <div className="retro-progress-block" aria-label="Progresso da musica">
          <div className="retro-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          <div className="retro-progress">
            <i style={{ width: `${progress}%` }} />
            <span className="retro-progress-knob" style={{ left: `${progress}%` }} />
          </div>
        </div>

        <div className="retro-player-controls" aria-label="Controles de reproducao">
          <button type="button" className="retro-control" aria-label="Parar musica">■</button>
          <button
            type="button"
            className="retro-control retro-play"
            onClick={() => setIsPlaying((current) => !current)}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pausar musica' : 'Tocar musica'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button type="button" className="retro-control" aria-label="Pausar faixa">❙❙</button>
        </div>
      </section>
    </div>
  )
}

function ForestLeafMusicPlayerCardInteractive() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(46)

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const intervalId = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.32))
    }, 120)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(safeSeconds / 60)
    const remainingSeconds = safeSeconds % 60
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const totalDuration = 247
  const currentTime = (progress / 100) * totalDuration

  return (
    <div className="component-mock mock-centered-demo mock-retro-player mock-retro-player-forest" aria-label="Music player com padrao de folhas em tema verde escuro">
      <div className="retro-top-actions" aria-label="Acoes do player">
        <button type="button" className="retro-icon-btn" aria-label="Voltar">←</button>
        <button type="button" className="retro-icon-btn" aria-label="Abrir menu">≡</button>
      </div>

      <div className="retro-cover-stage">
        <div className={`retro-disc ${isPlaying ? 'is-playing' : ''}`}>
          <div className="retro-album-art" role="img" aria-label="Capa do album Days Are Gone da banda Haim">
            <img
              src={haimCover}
              alt="Capa do album Days Are Gone da banda Haim"
            />
          </div>
        </div>
      </div>

      <section className="retro-wave-panel" aria-label="Informacoes da musica">
        <button type="button" className="retro-share-btn" aria-label="Compartilhar faixa">
          <Share2 size={14} />
        </button>

        <div className="retro-track-info">
          <strong>Haim - The Wire</strong>
          <p>Forest Canopy Mix</p>
        </div>

        <div className="retro-progress-block" aria-label="Progresso da musica">
          <div className="retro-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          <div className="retro-progress">
            <i style={{ width: `${progress}%` }} />
            <span className="retro-progress-knob" style={{ left: `${progress}%` }} />
          </div>
        </div>

        <div className="retro-player-controls" aria-label="Controles de reproducao">
          <button type="button" className="retro-control" aria-label="Parar musica">■</button>
          <button
            type="button"
            className="retro-control retro-play"
            onClick={() => setIsPlaying((current) => !current)}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pausar musica' : 'Tocar musica'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button type="button" className="retro-control" aria-label="Pausar faixa">❙❙</button>
        </div>
      </section>
    </div>
  )
}

function MusicPlayerTopIconButtonInteractive() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-mp-button-stage" aria-label="Top icon button do music player">
      <button
        type="button"
        className="mp-icon-button mp-theme-night"
        aria-pressed={isMenuOpen}
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? '×' : '≡'}
      </button>
      <p className="interactive-note">{isMenuOpen ? 'Midnight menu aberto' : 'Midnight menu fechado'}</p>
    </div>
  )
}

function MusicPlayerTopIconButtonForestInteractive() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-mp-button-stage" aria-label="Top icon button verde do music player">
      <button
        type="button"
        className="mp-icon-button mp-theme-forest"
        aria-pressed={isMenuOpen}
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? '×' : '≡'}
      </button>
      <p className="interactive-note">{isMenuOpen ? 'Forest menu aberto' : 'Forest menu fechado'}</p>
    </div>
  )
}

function MusicPlayerPlayButtonInteractive() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-mp-button-stage" aria-label="Play button do music player">
      <button
        type="button"
        className="mp-play-button mp-theme-night"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        onClick={() => setIsPlaying((current) => !current)}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <p className="interactive-note">{isPlaying ? 'Midnight em reprodução' : 'Midnight pronto para tocar'}</p>
    </div>
  )
}

function MusicPlayerPlayButtonForestInteractive() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-mp-button-stage" aria-label="Play button verde do music player">
      <button
        type="button"
        className="mp-play-button mp-theme-forest"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        onClick={() => setIsPlaying((current) => !current)}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <p className="interactive-note">{isPlaying ? 'Forest em reprodução' : 'Forest pronto para tocar'}</p>
    </div>
  )
}

function MusicPlayerShareButtonInteractive() {
  const [shared, setShared] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-mp-button-stage" aria-label="Share button do music player">
      <button
        type="button"
        className={`mp-share-button mp-theme-night ${shared ? 'is-shared' : ''}`}
        aria-pressed={shared}
        aria-label={shared ? 'Link compartilhado' : 'Compartilhar faixa'}
        onClick={() => setShared((current) => !current)}
      >
        <Share2 size={18} />
      </button>
      <p className="interactive-note">{shared ? 'Midnight compartilhado' : 'Clique para compartilhar'}</p>
    </div>
  )
}

function MusicPlayerShareButtonForestInteractive() {
  const [shared, setShared] = useState(false)

  return (
    <div className="component-mock mock-centered-demo mock-mp-button-stage" aria-label="Share button verde do music player">
      <button
        type="button"
        className={`mp-share-button mp-theme-forest ${shared ? 'is-shared' : ''}`}
        aria-pressed={shared}
        aria-label={shared ? 'Link compartilhado' : 'Compartilhar faixa'}
        onClick={() => setShared((current) => !current)}
      >
        <Share2 size={18} />
      </button>
      <p className="interactive-note">{shared ? 'Forest compartilhado' : 'Clique para compartilhar'}</p>
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

function SoftDepthSearchBarInteractive() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="component-mock mock-centered-demo">
      <div className={`mock-soft-search-bar ${isFocused ? 'is-focused' : ''}`}>
        <input
          type="search"
          value={query}
          placeholder="Search...."
          aria-label="Pesquisar"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button type="button" aria-label="Buscar" title="Buscar">
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <path d="M10.5 3.5a7 7 0 1 0 4.45 12.4l4.33 4.33a1 1 0 0 0 1.42-1.42l-4.33-4.33A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z" />
          </svg>
        </button>
      </div>
      <p className="interactive-note mock-soft-search-note">
        {query.trim() ? `Consulta pronta: ${query}` : 'Campo com glow suave e profundidade premium'}
      </p>
    </div>
  )
}

function NeonGlassLoginCardInteractive() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const canSubmit = email.trim() !== '' && password.trim() !== ''

  return (
    <div className="component-mock mock-login-scene">
      <div className="mock-login-lights" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <form
        className="mock-login-card"
        onSubmit={(event) => {
          event.preventDefault()
          setIsSubmitted(true)
        }}
      >
        <div className="mock-login-avatar" aria-hidden="true">
          <UserRound size={21} strokeWidth={2.2} />
        </div>

        <div className="mock-login-headline">
          <h4>Welcome</h4>
          <p>Log in to your account</p>
        </div>

        <div className="mock-login-meta">
          <span>Email</span>
          <button type="button" className="mock-login-link">Forgot password?</button>
        </div>

        <label className="mock-login-field">
          <span className="mock-login-icon" aria-hidden="true">@</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <div className="mock-login-meta is-password">
          <span>Password</span>
        </div>

        <label className="mock-login-field">
          <span className="mock-login-icon" aria-hidden="true">*</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit" className="mock-login-submit" disabled={!canSubmit}>
          Log In
        </button>

        <small className="mock-login-footer" aria-live="polite">
          {isSubmitted ? 'Login simulated with lilac theme.' : 'Not registered yet? Sign up >'}
        </small>
      </form>
    </div>
  )
}

function RadialHeatmapClockInteractive() {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
  const heatData = [0.08, 0.04, 0.02, 0.02, 0.06, 0.18, 0.35, 0.72, 0.92, 0.87, 0.74, 0.85, 0.9, 0.8, 0.72, 0.68, 0.76, 0.88, 0.82, 0.7, 0.52, 0.38, 0.24, 0.14]
  const now = new Date()

  const getHeatColor = (v: number) => {
    if (v < 0.2) return `hsl(220,55%,${28 + v * 60}%)`
    if (v < 0.45) return `hsl(${210 - (v - 0.2) * 360},65%,52%)`
    if (v < 0.7) return `hsl(${120 - (v - 0.45) * 320},72%,52%)`
    return `hsl(${40 - (v - 0.7) * 133},90%,58%)`
  }

  const size = 160
  const cx = size / 2
  const cy = size / 2
  const outerR = 68
  const innerR = 40

  const segments = heatData.map((heat, idx) => {
    const startA = (idx / 24) * 2 * Math.PI - Math.PI / 2
    const endA = ((idx + 1) / 24) * 2 * Math.PI - Math.PI / 2
    const g = 0.018
    const x1 = cx + outerR * Math.cos(startA + g)
    const y1 = cy + outerR * Math.sin(startA + g)
    const x2 = cx + outerR * Math.cos(endA - g)
    const y2 = cy + outerR * Math.sin(endA - g)
    const x3 = cx + innerR * Math.cos(endA - g)
    const y3 = cy + innerR * Math.sin(endA - g)
    const x4 = cx + innerR * Math.cos(startA + g)
    const y4 = cy + innerR * Math.sin(startA + g)
    return { idx, d: `M${x1},${y1} A${outerR},${outerR} 0 0,1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 0,0 ${x4},${y4} Z`, heat, color: getHeatColor(heat) }
  })

  const currentHour = now.getHours() + now.getMinutes() / 60
  const hourAngle = (currentHour / 24) * 2 * Math.PI - Math.PI / 2
  const handX = cx + 28 * Math.cos(hourAngle)
  const handY = cy + 28 * Math.sin(hourAngle)

  return (
    <div className="component-mock mock-heatmap-clock">
      <svg viewBox={`0 0 ${size} ${size}`} aria-label="Radial heatmap clock" className="heatmap-svg">
        {segments.map((seg) => (
          <path
            key={seg.idx}
            d={seg.d}
            fill={seg.color}
            style={{
              cursor: 'pointer',
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: hoveredSegment === seg.idx ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={() => setHoveredSegment(seg.idx)}
            onMouseLeave={() => setHoveredSegment(null)}
          />
        ))}
        <circle cx={cx} cy={cy} r={34} fill="var(--bg-secondary)" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={11} fill="#e5f5ff" fontFamily="Space Grotesk, sans-serif" fontWeight="700">
          {String(now.getHours()).padStart(2, '0')}
        </text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize={10} fill="#6b8898">
          {String(now.getMinutes()).padStart(2, '0')}
        </text>
        <line x1={cx} y1={cy} x2={handX} y2={handY} stroke="#ff6b35" strokeWidth={2} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={2.5} fill="#ff6b35" />
      </svg>
      <p className="interactive-note">
        {hoveredSegment !== null
          ? `Hora ${String(hoveredSegment).padStart(2, '0')}h — ${Math.round(heatData[hoveredSegment] * 100)}% de atividade`
          : 'Passe o mouse nos segmentos para ver atividade'}
      </p>
    </div>
  )
}

function LiquidLevelGaugeInteractive() {
  const [level, setLevel] = useState(62)

  const getColor = (lv: number) => {
    if (lv < 25) return '#ef4444'
    if (lv < 50) return '#f97316'
    if (lv < 75) return '#3b82f6'
    return '#22c55e'
  }
  const getLabel = (lv: number) => {
    if (lv < 25) return 'Crítico'
    if (lv < 50) return 'Baixo'
    if (lv < 75) return 'Normal'
    return 'Ótimo'
  }

  const r = 50
  const circ = 2 * Math.PI * r
  const fill = (circ * level) / 100
  const color = getColor(level)

  return (
    <div className="component-mock mock-liquid-gauge">
      <div className="liquid-gauge-ring">
        <svg viewBox="0 0 120 120" aria-label={`Gauge: ${level}%`}>
          <circle cx={60} cy={60} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={9} />
          <circle
            cx={60}
            cy={60}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={9}
            strokeDasharray={`${fill} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dasharray 0.45s ease, stroke 0.45s ease', filter: `drop-shadow(0 0 6px ${color})` }}
          />
          <text x={60} y={55} textAnchor="middle" fontSize={22} fontWeight="700" fill="white" fontFamily="Space Grotesk, sans-serif">{level}%</text>
          <text x={60} y={72} textAnchor="middle" fontSize={9} fill={color} fontWeight="600">{getLabel(level)}</text>
        </svg>
      </div>
      <label className="interactive-note" htmlFor="gauge-range">Nível atual: {level}%</label>
      <input id="gauge-range" type="range" min={0} max={100} value={level} onChange={(e) => setLevel(Number(e.target.value))} className="gauge-slider" />
    </div>
  )
}

function TypewriterTerminalCardInteractive() {
  const lines = [
    '> iniciando análise de componentes...',
    '> carregando design system...',
    '> 47 elementos detectados.',
    '> todos os checks passaram ✓',
    '> pronto para produção 🚀',
  ]
  const [done, setDone] = useState<string[]>([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const t = window.setTimeout(() => { setDone([]); setLineIdx(0); setCharIdx(0) }, 2800)
      return () => window.clearTimeout(t)
    }
    if (charIdx < lines[lineIdx].length) {
      const t = window.setTimeout(() => setCharIdx((c) => c + 1), 38)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => {
      setDone((prev) => [...prev, lines[lineIdx]])
      setLineIdx((l) => l + 1)
      setCharIdx(0)
    }, 320)
    return () => window.clearTimeout(t)
  }, [lineIdx, charIdx])

  const typing = lineIdx < lines.length ? lines[lineIdx].substring(0, charIdx) : ''

  return (
    <div className="component-mock mock-typewriter-card">
      <div className="typewriter-header">
        <span className="term-dot dot-red" />
        <span className="term-dot dot-yellow" />
        <span className="term-dot dot-green" />
        <span className="term-title">design-system — bash</span>
      </div>
      <div className="typewriter-body">
        {done.map((ln, i) => <div key={i} className="term-line is-done">{ln}</div>)}
        {lineIdx < lines.length && (
          <div className="term-line">{typing}<span className="term-cursor" aria-hidden="true">▊</span></div>
        )}
      </div>
    </div>
  )
}

function EventTicketCardInteractive() {
  const [isUsed, setIsUsed] = useState(false)

  return (
    <div className="component-mock mock-event-ticket-wrap">
      <article
        className={`event-ticket ${isUsed ? 'is-used' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => setIsUsed((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsUsed((v) => !v) }}
        aria-label={isUsed ? 'Ingresso validado — clique para desfazer' : 'Clique para validar ingresso'}
      >
        <div className="ticket-left">
          <div className="ticket-tag">UI SUMMIT</div>
          <h3 className="ticket-title">Design Systems<br />Conference</h3>
          <div className="ticket-meta">
            <span>15 AGO 2025</span>
            <span>19:00h</span>
          </div>
          <div className="ticket-seat">FILA A · LUGAR 12</div>
        </div>
        <div className="ticket-perforation" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => <span key={i} />)}
        </div>
        <div className="ticket-right">
          <div className="ticket-qr" aria-label="QR code mock">
            <svg viewBox="0 0 40 40" width={56} height={56}>
              {[0,10,20,30].map((x) => [0,10,20,30].map((y) => (
                Math.random() > 0.38 && <rect key={`${x}-${y}`} x={x} y={y} width={8} height={8} fill="white" rx={1} />
              )))}
              <rect x={0} y={0} width={16} height={16} fill="none" stroke="white" strokeWidth={2} />
              <rect x={24} y={0} width={16} height={16} fill="none" stroke="white" strokeWidth={2} />
              <rect x={0} y={24} width={16} height={16} fill="none" stroke="white" strokeWidth={2} />
              <rect x={3} y={3} width={10} height={10} fill="white" rx={1} />
              <rect x={27} y={3} width={10} height={10} fill="white" rx={1} />
              <rect x={3} y={27} width={10} height={10} fill="white" rx={1} />
            </svg>
          </div>
          <div className="ticket-serial">#UI-20250815-012</div>
          {isUsed && <div className="ticket-stamp" aria-label="Ingresso usado">USADO</div>}
        </div>
      </article>
      <p className="interactive-note">{isUsed ? 'Ingresso validado com sucesso' : 'Clique para validar o ingresso'}</p>
    </div>
  )
}

function NotificationBellBadgeInteractive() {
  const [count, setCount] = useState(7)
  const [ringing, setRinging] = useState(false)

  const addNotification = () => {
    setCount((c) => c + 1)
    setRinging(true)
    window.setTimeout(() => setRinging(false), 700)
  }

  return (
    <div className="component-mock mock-notif-bell-wrap">
      <button
        type="button"
        className={`notif-bell-btn ${ringing ? 'is-ringing' : ''}`}
        onClick={() => setCount(0)}
        aria-label={`${count} notificações — clique para limpar`}
      >
        <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {count > 0 && (
          <span className="notif-badge" aria-hidden="true">{count > 99 ? '99+' : count}</span>
        )}
      </button>
      <div className="preview-controls" style={{ marginTop: '1rem' }}>
        <button type="button" className="chip-button" onClick={addNotification}>+ Nova</button>
        <button type="button" className="chip-button" onClick={() => setCount(0)} disabled={count === 0}>Limpar</button>
      </div>
      <p className="interactive-note">{count === 0 ? 'Sem notificações' : `${count} notificação(ões) pendente(s)`}</p>
    </div>
  )
}

function RotaryDialKnobInteractive() {
  const [angle, setAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const knobRef = useRef<HTMLButtonElement>(null)

  const MIN_ANGLE = -135
  const MAX_ANGLE = 135
  const value = Math.round(((angle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE)) * 100)

  const handleMouseDown = (_e: React.MouseEvent) => {
    const rect = knobRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setIsDragging(true)

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - cx
      const dy = ev.clientY - cy
      let a = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      if (a > 180) a -= 360
      setAngle(Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, a)))
    }
    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const ticks = Array.from({ length: 11 }, (_, i) => {
    const a = ((-135 + i * 27) * Math.PI) / 180
    const r1 = 43
    const r2 = 49
    return {
      x1: 50 + r1 * Math.sin(a),
      y1: 50 - r1 * Math.cos(a),
      x2: 50 + r2 * Math.sin(a),
      y2: 50 - r2 * Math.cos(a),
      active: i * 10 <= value,
    }
  })

  return (
    <div className="component-mock mock-rotary-knob-wrap">
      <div className="rotary-knob-ring">
        <svg viewBox="0 0 100 100" width={150} height={150} aria-hidden="true">
          {ticks.map((tick, i) => (
            <line key={i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke={tick.active ? '#5ad0de' : 'rgba(255,255,255,0.15)'} strokeWidth={2.2} strokeLinecap="round" />
          ))}
        </svg>
        <button
          ref={knobRef}
          type="button"
          className={`rotary-knob ${isDragging ? 'is-dragging' : ''}`}
          style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          onMouseDown={handleMouseDown}
          aria-label={`Knob rotacional — valor: ${value}`}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="knob-indicator" aria-hidden="true" />
        </button>
      </div>
      <div className="rotary-value" aria-live="polite">{value}</div>
      <p className="interactive-note">Arraste o knob para ajustar o valor</p>
    </div>
  )
}

function AuroraChipSelectorInteractive() {
  const chips = [
    { id: 'design', label: 'Design', color: '#a855f7' },
    { id: 'dev', label: 'Dev', color: '#3b82f6' },
    { id: 'data', label: 'Data', color: '#22c55e' },
    { id: 'ai', label: 'AI', color: '#ec4899' },
    { id: 'motion', label: 'Motion', color: '#f97316' },
    { id: 'brand', label: 'Brand', color: '#eab308' },
  ]
  const [selected, setSelected] = useState<Set<string>>(new Set(['design', 'dev']))

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="component-mock mock-chip-selector">
      <div className="chip-selector-grid" role="group" aria-label="Seletor de áreas">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={`aurora-chip-item ${selected.has(chip.id) ? 'is-selected' : ''}`}
            style={{ '--chip-color': chip.color } as CSSProperties}
            onClick={() => toggle(chip.id)}
            aria-pressed={selected.has(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <p className="interactive-note">
        {selected.size === 0 ? 'Nenhuma área selecionada' : `Selecionado: ${[...selected].join(', ')}`}
      </p>
    </div>
  )
}

function TimelineStepperInteractive() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { label: 'Briefing', icon: <ClipboardList size={18} />, desc: 'Coleta de requisitos' },
    { label: 'Design',   icon: <Layers         size={18} />, desc: 'Prototipagem e UI' },
    { label: 'Review',   icon: <Search         size={18} />, desc: 'Feedback e ajustes' },
    { label: 'Deploy',   icon: <Rocket         size={18} />, desc: 'Publicação final' },
  ]

  return (
    <div className="component-mock mock-timeline-stepper">
      <div className="stepper-track" role="list">
        {steps.map((step, idx) => (
          <div key={step.label} className="stepper-item" role="listitem">
            <button
              type="button"
              className={`stepper-node ${idx < currentStep ? 'is-done' : ''} ${idx === currentStep ? 'is-active' : ''}`}
              onClick={() => setCurrentStep(idx)}
              aria-label={`Etapa ${idx + 1}: ${step.label}`}
            >
              {idx < currentStep ? <Check size={16} /> : step.icon}
            </button>
            {idx < steps.length - 1 && (
              <div className={`stepper-line ${idx < currentStep ? 'is-done' : ''}`} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <div className="stepper-info">
        <strong>{steps[currentStep]?.label}</strong>
        <span>{steps[currentStep]?.desc}</span>
      </div>
      <div className="preview-controls" style={{ marginTop: '0.75rem' }}>
        <button type="button" className="chip-button" onClick={() => setCurrentStep((s) => Math.max(0, s - 1))} disabled={currentStep === 0}>← Voltar</button>
        <button type="button" className="chip-button" onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))} disabled={currentStep === steps.length - 1}>Avançar →</button>
      </div>
    </div>
  )
}

function FlipCounterDisplayInteractive() {
  const [value, setValue] = useState(42)
  const [flipping, setFlipping] = useState(false)
  const [dir, setDir] = useState<'up' | 'down'>('up')

  const change = (delta: number) => {
    setDir(delta > 0 ? 'up' : 'down')
    setFlipping(true)
    window.setTimeout(() => {
      setValue((v) => Math.max(0, Math.min(99, v + delta)))
      setFlipping(false)
    }, 220)
  }

  const digits = String(value).padStart(2, '0').split('')

  return (
    <div className="component-mock mock-flip-counter">
      <div className="flip-display" aria-live="polite" aria-label={`Valor: ${value}`}>
        {digits.map((digit, idx) => (
          <div key={idx} className={`flip-card ${flipping ? `flip-${dir}` : ''}`}>
            <div className="flip-top">{digit}</div>
            <div className="flip-divider" aria-hidden="true" />
            <div className="flip-bottom">{digit}</div>
          </div>
        ))}
      </div>
      <div className="flip-controls">
        <button type="button" className="flip-btn flip-btn-down" onClick={() => change(-1)} disabled={value <= 0} aria-label="Decrementar">−</button>
        <button type="button" className="flip-btn flip-btn-up" onClick={() => change(1)} disabled={value >= 99} aria-label="Incrementar">+</button>
      </div>
      <p className="interactive-note">Display flip retro — valor: {value}</p>
    </div>
  )
}

function HolographicCardInteractive() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 22
    setTilt({ x, y })
    setShine({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setShine({ x: 50, y: 50 }) }

  return (
    <div className="component-mock mock-holo-card-wrap">
      <div
        ref={cardRef}
        className="holo-card"
        style={{
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          '--shine-x': `${shine.x}%`,
          '--shine-y': `${shine.y}%`,
        } as CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label="Card holográfico interativo"
      >
        <div className="holo-shine" aria-hidden="true" />
        <div className="holo-logo" aria-hidden="true">★ HOLO</div>
        <div className="holo-chip" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className="holo-number">•••• •••• •••• 7831</div>
        <div className="holo-footer">
          <span className="holo-name">DESIGN SYSTEM PRO</span>
          <span className="holo-expiry">12/28</span>
        </div>
      </div>
      <p className="interactive-note">Mova o mouse sobre o card para o efeito holográfico</p>
    </div>
  )
}

function NeoToggleSwitchInteractive() {
  const [on, setOn] = useState(false)
  return (
    <div className="component-mock mock-neo-toggle">
      <div
        className={`neo-toggle-track ${on ? 'is-on' : ''}`}
        onClick={() => setOn(v => !v)}
        role="switch"
        aria-checked={on}
        tabIndex={0}
        onKeyDown={e => e.key === ' ' && setOn(v => !v)}
      >
        <div className="neo-toggle-thumb" />
      </div>
      <p className="interactive-note">{on ? 'Ativado' : 'Desativado'}</p>
    </div>
  )
}

function NeoMusicPlayerInteractive() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(34)
  const [trackIdx, setTrackIdx] = useState(0)
  const tracks = [
    { title: 'Midnight Echo', artist: 'Lunar Drift' },
    { title: 'Soft Terrain', artist: 'Marble Field' },
    { title: 'Inner Tide', artist: 'Coastal Hymn' },
  ]
  const track = tracks[trackIdx]
  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setTrackIdx(i => (i + 1) % tracks.length); return 0 }
        return p + 0.4
      })
    }, 200)
    return () => window.clearInterval(id)
  }, [playing])
  const totalSecs = 210
  const elapsed = Math.round((progress / 100) * totalSecs)
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return (
    <div className="component-mock mock-neo-player">
      <div className="neo-player-card">
        <div className="neo-track-info">
          <span className="neo-track-title">{track.title}</span>
          <span className="neo-track-artist">{track.artist}</span>
        </div>
        <div className="neo-progress-track">
          <div className="neo-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="neo-player-time">
          <span>{fmt(elapsed)}</span>
          <span>{fmt(totalSecs)}</span>
        </div>
        <div className="neo-player-controls">
          <button className="neo-ctrl-btn" onClick={() => { setTrackIdx(i => (i - 1 + tracks.length) % tracks.length); setProgress(0) }}>⏮</button>
          <button className="neo-ctrl-btn neo-ctrl-main" onClick={() => setPlaying(p => !p)}>{playing ? '⏸' : '▶'}</button>
          <button className="neo-ctrl-btn" onClick={() => { setTrackIdx(i => (i + 1) % tracks.length); setProgress(0) }}>⏭</button>
        </div>
      </div>
    </div>
  )
}

function NeoNumpadInteractive() {
  const [input, setInput] = useState('')
  const keys = ['1','2','3','4','5','6','7','8','9','C','0','⌫']
  const press = (k: string) => {
    if (k === 'C') { setInput(''); return }
    if (k === '⌫') { setInput(p => p.slice(0, -1)); return }
    if (input.length < 8) setInput(p => p + k)
  }
  return (
    <div className="component-mock mock-neo-numpad">
      <div className="neo-numpad-display">{input || '0'}</div>
      <div className="neo-numpad-grid">
        {keys.map(k => (
          <button key={k} className={`neo-num-key${k === 'C' ? ' neo-key-clear' : ''}${k === '⌫' ? ' neo-key-back' : ''}`} onClick={() => press(k)}>{k}</button>
        ))}
      </div>
    </div>
  )
}

function NeoStatDisplayInteractive() {
  const [metric, setMetric] = useState(0)
  const stats = [
    { label: 'Receita Mensal', value: 'R$ 148k', sub: '+12.4%', color: '#22c55e', pct: 74 },
    { label: 'Usuários Ativos', value: '9.2k', sub: '+8.1%', color: '#3b82f6', pct: 61 },
    { label: 'Taxa de Conversão', value: '4.8%', sub: '+2.3 p.p.', color: '#a855f7', pct: 48 },
  ]
  const s = stats[metric]
  return (
    <div className="component-mock mock-neo-stat">
      <div className="neo-stat-card">
        <span className="neo-stat-label">{s.label}</span>
        <span className="neo-stat-value">{s.value}</span>
        <span className="neo-stat-sub" style={{ color: s.color }}>{s.sub}</span>
        <div className="neo-stat-bar-track">
          <div className="neo-stat-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
        </div>
      </div>
      <div className="neo-stat-switcher">
        {stats.map((_, i) => (
          <button key={i} className={`neo-dot ${metric === i ? 'is-active' : ''}`} onClick={() => setMetric(i)} aria-label={`Métrica ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}

function NeoColorSwatchesInteractive() {
  const [selected, setSelected] = useState(0)
  const swatches = [
    { color: '#ef4444', label: 'Vermelho' },
    { color: '#f97316', label: 'Laranja' },
    { color: '#eab308', label: 'Amarelo' },
    { color: '#22c55e', label: 'Verde' },
    { color: '#3b82f6', label: 'Azul' },
    { color: '#a855f7', label: 'Roxo' },
  ]
  return (
    <div className="component-mock mock-neo-swatches">
      <div className="neo-swatch-grid">
        {swatches.map((sw, i) => (
          <button
            key={sw.color}
            className={`neo-swatch ${selected === i ? 'is-selected' : ''}`}
            style={{ '--sw-color': sw.color } as CSSProperties}
            onClick={() => setSelected(i)}
            aria-label={sw.label}
          />
        ))}
      </div>
      <p className="interactive-note">{swatches[selected].label}</p>
    </div>
  )
}

function NeoAnalogClockInteractive() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const sec = time.getSeconds()
  const min = time.getMinutes() + sec / 60
  const hour = (time.getHours() % 12) + min / 60
  const deg = (v: number) => (v - 90) * (Math.PI / 180)
  const pt = (d: number, r: number) => ({ x: 80 + r * Math.cos(d), y: 80 + r * Math.sin(d) })
  const hPt = pt(deg(hour * 30), 44)
  const mPt = pt(deg(min * 6), 58)
  const sPt = pt(deg(sec * 6), 65)
  return (
    <div className="component-mock mock-neo-clock">
      <div className="neo-clock-face">
        <svg viewBox="0 0 160 160" width="150" height="150">
          {Array.from({ length: 12 }, (_, i) => {
            const a = deg(i * 30)
            const r1 = 70, r2 = i % 3 === 0 ? 60 : 65
            return <line key={i} x1={80 + r1 * Math.cos(a)} y1={80 + r1 * Math.sin(a)} x2={80 + r2 * Math.cos(a)} y2={80 + r2 * Math.sin(a)} stroke={i % 3 === 0 ? '#6c8ebf' : 'rgba(163,177,198,0.7)'} strokeWidth={i % 3 === 0 ? 2.5 : 1.5} strokeLinecap="round" />
          })}
          <line x1={80} y1={80} x2={hPt.x} y2={hPt.y} stroke="#3d4a5c" strokeWidth={4} strokeLinecap="round" />
          <line x1={80} y1={80} x2={mPt.x} y2={mPt.y} stroke="#3d4a5c" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={80} y1={80} x2={sPt.x} y2={sPt.y} stroke="#ef4444" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={80} cy={80} r={5} fill="#3d4a5c" />
          <circle cx={80} cy={80} r={2.5} fill="#ef4444" />
        </svg>
      </div>
    </div>
  )
}

function NeoEqualizerInteractive() {
  const [levels, setLevels] = useState([45, 68, 82, 91, 75, 58, 40])
  const labels = ['Sub', '80', '250', '1k', '4k', '8k', '16k']
  const cycle = (i: number) => setLevels(prev => prev.map((v, j) => j !== i ? v : v >= 90 ? 0 : v + 20))
  return (
    <div className="component-mock mock-neo-eq">
      <div className="neo-eq-bars">
        {levels.map((lv, i) => (
          <div key={i} className="neo-eq-column" onClick={() => cycle(i)}>
            <div className="neo-eq-track">
              <div className="neo-eq-fill" style={{ height: `${lv}%` }} />
            </div>
            <span className="neo-eq-label">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NeoPinLockInteractive() {
  const [pin, setPin] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const CORRECT = '1234'
  const press = (k: string) => {
    if (status !== 'idle') { setPin(''); setStatus('idle'); return }
    const next = pin + k
    if (next.length === 4) {
      const result = next === CORRECT ? 'ok' : 'err'
      setPin(next); setStatus(result)
      window.setTimeout(() => { setPin(''); setStatus('idle') }, 1200)
    } else { setPin(next) }
  }
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']
  return (
    <div className="component-mock mock-neo-pin">
      <div className={`neo-pin-slots ${status === 'ok' ? 'is-ok' : status === 'err' ? 'is-err' : ''}`}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`neo-pin-slot ${i < pin.length ? 'is-filled' : ''}`}>{i < pin.length ? '●' : ''}</div>
        ))}
      </div>
      <div className="neo-pin-keypad">
        {keys.map((k, i) => (
          <button key={i} className={`neo-pin-key${!k ? ' invisible' : ''}`} onClick={() => k === '⌫' ? setPin(p => p.slice(0,-1)) : k && press(k)} disabled={!k}>{k}</button>
        ))}
      </div>
      <p className="interactive-note">{status === 'ok' ? '✓ Correto' : status === 'err' ? '✗ PIN incorreto' : 'Digite o PIN: 1234'}</p>
    </div>
  )
}

function NeoStarRatingInteractive() {
  const [rating, setRating] = useState(3)
  const [hover, setHover] = useState<number | null>(null)
  const labels = ['', 'Ruim', 'Regular', 'Bom', 'Ótimo', 'Excelente']
  const active = hover ?? rating
  return (
    <div className="component-mock mock-neo-stars">
      <div className="neo-stars-row">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            className={`neo-star-btn ${n <= active ? 'is-filled' : ''}`}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
          >★</button>
        ))}
      </div>
      <p className="interactive-note">{labels[active]}</p>
    </div>
  )
}

function NeoProgressArcInteractive() {
  const [value, setValue] = useState(68)
  const cx = 90, cy = 90, r = 70
  const startDeg = 225, totalDeg = 270
  const toRad = (d: number) => d * Math.PI / 180
  const pt = (deg: number) => ({ x: cx + r * Math.cos(toRad(deg)), y: cy + r * Math.sin(toRad(deg)) })
  const bgEnd = pt(startDeg + totalDeg)
  const bgStart = pt(startDeg)
  const fgEndDeg = startDeg + (value / 100) * totalDeg
  const fgEnd = pt(fgEndDeg)
  const bgLarge = 1
  const fgLarge = (value / 100) * totalDeg > 180 ? 1 : 0
  const bgPath = `M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 ${bgLarge} 1 ${bgEnd.x} ${bgEnd.y}`
  const fgPath = value > 0 ? `M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 ${fgLarge} 1 ${fgEnd.x} ${fgEnd.y}` : ''
  return (
    <div className="component-mock mock-neo-arc">
      <div className="neo-arc-face">
        <svg viewBox="0 0 180 180" width="180" height="180">
          <path d={bgPath} fill="none" stroke="rgba(163,177,198,0.35)" strokeWidth="12" strokeLinecap="round" />
          {fgPath && <path d={fgPath} fill="none" stroke="#6c8ebf" strokeWidth="12" strokeLinecap="round" />}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="26" fontWeight="800" fill="#3d4a5c" fontFamily="Space Grotesk, sans-serif">{value}%</text>
          <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#8899aa" fontFamily="Space Grotesk, sans-serif">Progresso</text>
        </svg>
      </div>
      <input type="range" min={0} max={100} value={value} className="neo-arc-slider" onChange={e => setValue(Number(e.target.value))} />
    </div>
  )
}

function NeoSwitchPanelInteractive() {
  const [switches, setSwitches] = useState([true, false, true, false])
  const labels = ['Wi-Fi', 'Bluetooth', 'Notificações', 'Modo Escuro']
  const icons = [<Wifi size={18} />, <Bluetooth size={18} />, <Bell size={18} />, <Moon size={18} />]
  const toggle = (i: number) => setSwitches(prev => prev.map((v, j) => j === i ? !v : v))
  return (
    <div className="component-mock mock-neo-switch-panel">
      <div className="neo-panel-card">
        {switches.map((on, i) => (
          <div key={i} className="neo-panel-row">
            <span className="neo-panel-icon">{icons[i]}</span>
            <span className="neo-panel-label">{labels[i]}</span>
            <div className={`neo-panel-toggle ${on ? 'is-on' : ''}`} onClick={() => toggle(i)} role="switch" aria-checked={on} tabIndex={0}>
              <div className="neo-panel-thumb" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NeoVolumeDialInteractive() {
  const [volume, setVolume] = useState(60)
  const [dragging, setDragging] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const dialAngle = (volume / 100) * 270 - 135
  const handleMouseDown = (_e: ReactMouseEvent) => {
    setDragging(true)
    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      let a = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI + 90
      if (a > 180) a -= 360
      setVolume(Math.round((Math.max(-135, Math.min(135, a)) + 135) / 270 * 100))
    }
    const onUp = () => { setDragging(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp)
  }
  const cx = 80, cy = 80, r = 60
  const toRad = (d: number) => d * Math.PI / 180
  const sA = toRad(135 + 90), eA = sA + toRad((volume / 100) * 270)
  const bgEA = sA + toRad(270)
  const arc = (sa: number, ea: number, lg: number) => `M ${cx + r * Math.cos(sa)} ${cy + r * Math.sin(sa)} A ${r} ${r} 0 ${lg} 1 ${cx + r * Math.cos(ea)} ${cy + r * Math.sin(ea)}`
  return (
    <div className="component-mock mock-neo-volume">
      <div className="neo-vol-wrap" ref={wrapRef} style={{ position: 'relative', width: 160, height: 160 }}>
        <svg viewBox="0 0 160 160" width="160" height="160" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <path d={arc(sA, bgEA, 1)} fill="none" stroke="rgba(163,177,198,0.35)" strokeWidth="8" strokeLinecap="round" />
          {volume > 0 && <path d={arc(sA, eA, (volume / 100) * 270 > 180 ? 1 : 0)} fill="none" stroke="#6c8ebf" strokeWidth="8" strokeLinecap="round" />}
        </svg>
        <div className={`neo-vol-knob ${dragging ? 'is-dragging' : ''}`} style={{ transform: `translate(-50%,-50%) rotate(${dialAngle}deg)` }} onMouseDown={handleMouseDown}>
          <div className="neo-vol-indicator" />
        </div>
      </div>
      <span className="neo-vol-value">{volume}</span>
    </div>
  )
}

function NeoTagCloudInteractive() {
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 3]))
  const tags = [
    { label: 'React', size: 'lg' }, { label: 'TypeScript', size: 'lg' }, { label: 'CSS', size: 'md' },
    { label: 'Design', size: 'lg' }, { label: 'Motion', size: 'sm' }, { label: 'A11y', size: 'sm' },
    { label: 'UX', size: 'md' }, { label: 'Figma', size: 'md' }, { label: 'Node', size: 'sm' }, { label: 'API', size: 'sm' },
  ]
  const toggle = (i: number) => setSelected(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n })
  return (
    <div className="component-mock mock-neo-tags">
      <div className="neo-tag-cloud">
        {tags.map((t, i) => (
          <button key={i} className={`neo-tag-chip neo-tag-${t.size} ${selected.has(i) ? 'is-selected' : ''}`} onClick={() => toggle(i)}>{t.label}</button>
        ))}
      </div>
      <p className="interactive-note">{selected.size} tag{selected.size !== 1 ? 's' : ''} selecionada{selected.size !== 1 ? 's' : ''}</p>
    </div>
  )
}

function GlassProfileCardInteractive() {
  const [followed, setFollowed] = useState(false)
  return (
    <div className="component-mock mock-glass-profile">
      <div className="glass-bg" aria-hidden="true" />
      <div className="glass-card">
        <div className="glass-avatar-ring">
          <div className="glass-avatar"><UserRound size={32} color="rgba(74,127,165,0.8)" /></div>
        </div>
        <h3 className="glass-name">Fran Camargo</h3>
        <p className="glass-role">Senior UI Designer</p>
        <div className="glass-stats">
          <div className="glass-stat"><strong>248</strong><span>Posts</span></div>
          <div className="glass-stat"><strong>12.4k</strong><span>Seguidores</span></div>
          <div className="glass-stat"><strong>891</strong><span>Seguindo</span></div>
        </div>
        <button className={`glass-follow-btn ${followed ? 'is-following' : ''}`} onClick={() => setFollowed(f => !f)}>
          {followed ? 'Seguindo ✓' : 'Seguir'}
        </button>
      </div>
    </div>
  )
}

function BrutalistBlockCardInteractive() {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(247)
  const handleLike = () => { const next = !liked; setLiked(next); setLikes(n => next ? n + 1 : n - 1) }
  return (
    <div className="component-mock mock-brutalist">
      <div className="brutalist-card">
        <div className="brutalist-tag">DESIGN</div>
        <h2 className="brutalist-title">THE FUTURE OF UI IS HERE</h2>
        <p className="brutalist-body">Bold. Raw. Unfiltered. Design that refuses to be ignored by anyone.</p>
        <div className="brutalist-footer">
          <button className={`brutalist-like-btn ${liked ? 'is-liked' : ''}`} onClick={handleLike}><Heart size={14} />{likes}</button>
          <span className="brutalist-date">MAY 2025</span>
        </div>
      </div>
    </div>
  )
}

function ClayMorphismButtonsInteractive() {
  const [pressed, setPressed] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const buttons = [
    { label: 'Upload', icon: <Upload size={22} />, color: '#F5D5E0', shadow: '#c4a0b8' },
    { label: 'Save',   icon: <Save   size={22} />, color: '#9A9BCC', shadow: '#6667AB' },
    { label: 'Share',  icon: <Share2 size={22} />, color: '#B880BC', shadow: '#7B337E' },
    { label: 'Delete', icon: <Trash2 size={22} />, color: '#9060A8', shadow: '#420D4B' },
  ]
  return (
    <div className="component-mock mock-clay">
      <div className="clay-grid">
        {buttons.map((b, i) => (
          <button
            key={i}
            className={`clay-btn ${pressed === i ? 'is-pressed' : ''}`}
            style={{ '--clay-color': b.color, '--clay-shadow': b.shadow } as CSSProperties}
            onMouseDown={() => setPressed(i)}
            onMouseUp={() => { setPressed(null); setActive(i) }}
            onMouseLeave={() => setPressed(null)}
          >
            <span className="clay-icon">{b.icon}</span>
            <span className="clay-label">{b.label}</span>
          </button>
        ))}
      </div>
      <p className="interactive-note">{buttons[active].label} selecionado</p>
    </div>
  )
}

function MeshAuroraCardInteractive() {
  const [tab, setTab] = useState(0)
  const tabs = ['Overview', 'Analytics', 'Reports']
  const datasets = [
    [{ metric: '$48.3k', label: 'Receita', delta: '+18%' }, { metric: '9,847', label: 'Usuários', delta: '+12%' }, { metric: '2.3%', label: 'Churn', delta: '-0.4%' }],
    [{ metric: '1.24M', label: 'Sessões', delta: '+9%' }, { metric: '3m 42s', label: 'Duração', delta: '+7%' }, { metric: '38%', label: 'Bounce', delta: '-5%' }],
    [{ metric: '142', label: 'Relatórios', delta: '+21%' }, { metric: '98%', label: 'Entrega', delta: '+2%' }, { metric: '4.9', label: 'Rating', delta: '+0.3' }],
  ]
  return (
    <div className="component-mock mock-mesh-aurora">
      <div className="mesh-blob mesh-blob-1" aria-hidden="true" />
      <div className="mesh-blob mesh-blob-2" aria-hidden="true" />
      <div className="mesh-blob mesh-blob-3" aria-hidden="true" />
      <div className="mesh-card-content">
        <div className="mesh-tabs">
          {tabs.map((t, i) => (
            <button key={i} className={`mesh-tab ${tab === i ? 'is-active' : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
        <div className="mesh-metrics">
          {datasets[tab].map((d, i) => (
            <div key={i} className="mesh-metric">
              <span className="mesh-metric-value">{d.metric}</span>
              <span className="mesh-metric-label">{d.label}</span>
              <span className="mesh-metric-delta is-positive">{d.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RetroCrtTerminalInteractive() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(['> SYSTEM BOOT v2.1.0', '> LOADING MODULES... OK', '> READY.'])
  const commands: Record<string, string> = {
    help: '> CMDS: help, status, ping, clear',
    status: '> SYS: ONLINE | CPU: 12% | MEM: 2.1GB',
    ping: '> PONG! Latency: 4ms',
    clear: '__clear__',
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    const response = commands[cmd] ?? `> ERR: '${input.trim()}' not found`
    if (response === '__clear__') { setHistory(['> CLEARED.']) }
    else { setHistory(h => [...h.slice(-5), `$ ${input.trim()}`, response]) }
    setInput('')
  }
  return (
    <div className="component-mock mock-crt">
      <div className="crt-bezel">
        <div className="crt-screen">
          <div className="crt-scanlines" aria-hidden="true" />
          <div className="crt-content">
            {history.map((line, i) => <div key={i} className="crt-line">{line}</div>)}
            <form className="crt-input-row" onSubmit={handleSubmit}>
              <span className="crt-prompt">$</span>
              <input className="crt-input" value={input} onChange={e => setInput(e.target.value)} maxLength={24} aria-label="Terminal input" />
              <span className="crt-cursor" />
            </form>
          </div>
        </div>
        <div className="crt-label">TERM-80</div>
      </div>
    </div>
  )
}

function DarkSearchFieldInteractive() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  return (
    <div className="component-mock mock-dark-ui">
      <div className={`dark-search-field ${focused ? 'is-focused' : ''}`}>
        <div className="dark-search-row">
          <Search size={15} className="dark-search-ico" />
          <input
            className="dark-search-inp"
            placeholder="Search..."
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        <div className="dark-search-suggestions">
          <span className="dark-search-bar" style={{ width: '72%' }} />
          <span className="dark-search-bar" style={{ width: '48%' }} />
        </div>
        <div className="dark-search-glow" />
      </div>
    </div>
  )
}

function DarkSelectInteractive() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Option 1')
  const options = ['Option 1', 'Option 2', 'Option 3']
  return (
    <div className="component-mock mock-dark-ui" onClick={() => setOpen(false)}>
      <div className={`dark-select-field ${open ? 'is-open' : ''}`} onClick={e => { e.stopPropagation(); setOpen(v => !v) }}>
        <span className="dark-select-val">{selected}</span>
        <ChevronDown size={15} className={`dark-sel-chevron ${open ? 'is-open' : ''}`} />
      </div>
      {open && (
        <div className="dark-select-menu">
          {options.map(opt => (
            <button key={opt} className={`dark-sel-option ${opt === selected ? 'is-sel' : ''}`} onClick={e => { e.stopPropagation(); setSelected(opt); setOpen(false) }}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  )
}

function DarkCheckboxInteractive() {
  const [states, setStates] = useState([true, false, true, false])
  const variants = ['blue', 'blue', 'purple', 'purple']
  const toggle = (i: number) => setStates(prev => prev.map((v, idx) => idx === i ? !v : v))
  return (
    <div className="component-mock mock-dark-ui">
      <div className="dark-checkbox-grid">
        {states.map((checked, i) => (
          <button key={i} className={`dark-checkbox dark-cb-${variants[i]} ${checked ? 'is-checked' : ''}`} onClick={() => toggle(i)}>
            {checked && <Check size={14} />}
          </button>
        ))}
      </div>
      <p className="interactive-note dark-note">{states.filter(Boolean).length} selecionado(s)</p>
    </div>
  )
}

function DarkSwitchInteractive() {
  const [on, setOn] = useState(true)
  return (
    <div className="component-mock mock-dark-ui">
      <button className={`dark-switch ${on ? 'is-on' : ''}`} onClick={() => setOn(v => !v)} role="switch" aria-checked={on}>
        <span className="dark-switch-thumb" />
      </button>
      <p className="interactive-note dark-note">{on ? 'On' : 'Off'}</p>
    </div>
  )
}

function DarkTabsInteractive() {
  const [active, setActive] = useState(1)
  const tabs = ['Overview', 'Activity', 'Settings']
  return (
    <div className="component-mock mock-dark-ui">
      <div className="dark-tabs-container">
        {tabs.map((tab, i) => (
          <button key={tab} className={`dark-tab ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)}>{tab}</button>
        ))}
      </div>
      <p className="interactive-note dark-note">{tabs[active]}</p>
    </div>
  )
}

function DarkPrimaryButtonInteractive() {
  const [pulse, setPulse] = useState(false)
  const handleClick = () => { setPulse(true); setTimeout(() => setPulse(false), 600) }
  return (
    <div className="component-mock mock-dark-ui">
      <button className={`dark-primary-btn ${pulse ? 'is-pulse' : ''}`} onClick={handleClick}>
        Create workspace
      </button>
    </div>
  )
}

function DarkSecondaryButtonInteractive() {
  return (
    <div className="component-mock mock-dark-ui">
      <button className="dark-secondary-btn">Invite member</button>
    </div>
  )
}

function DarkIconButtonInteractive() {
  const [active, setActive] = useState(false)
  return (
    <div className="component-mock mock-dark-ui">
      <button className={`dark-icon-btn ${active ? 'is-active' : ''}`} onClick={() => { setActive(true); setTimeout(() => setActive(false), 500) }}>
        <Plus size={20} />
      </button>
      <p className="interactive-note dark-note">Clique para ativar</p>
    </div>
  )
}

function GnSegmentedControlInteractive() {
  const [active, setActive] = useState(0)
  const tabs = ['All', 'Unread', 'Favorites']
  return (
    <div className="component-mock mock-gn-seg">
      <div className="gn-seg-control">
        {tabs.map((tab, i) => (
          <button key={tab} className={`gn-seg-tab ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)}>{tab}</button>
        ))}
      </div>
      <p className="interactive-note gn-note">{tabs[active]} selecionado</p>
    </div>
  )
}

function GnToggleSwitchInteractive() {
  const [on, setOn] = useState(true)
  return (
    <div className="component-mock mock-gn-toggle">
      <button className={`gn-toggle ${on ? 'is-on' : ''}`} onClick={() => setOn(v => !v)} role="switch" aria-checked={on} aria-label="Toggle">
        <span className="gn-toggle-thumb" />
      </button>
      <p className="interactive-note gn-note">{on ? 'Ativado' : 'Desativado'}</p>
    </div>
  )
}

function GnInputFieldInteractive() {
  const [value, setValue] = useState('')
  return (
    <div className="component-mock mock-gn-input">
      <input className="gn-input" placeholder="New message" value={value} onChange={e => setValue(e.target.value)} maxLength={60} />
      <p className="interactive-note gn-note">{value.length > 0 ? `${value.length} caracteres` : 'Campo vazio'}</p>
    </div>
  )
}

function GnNumpadInteractive() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const press = (n: string) => { if (code.length < 4) setCode(c => c + n) }
  const del = () => setCode(c => c.slice(0, -1))
  const send = () => {
    if (code.length === 0) return
    setStatus('sent')
    window.setTimeout(() => { setStatus('idle'); setCode('') }, 1300)
  }
  return (
    <div className="component-mock mock-gn-numpad">
      <div className="gn-numpad-card">
        <p className="gn-numpad-title">Enter passcode</p>
        <div className="gn-numpad-dots">
          {[0,1,2,3].map(i => <span key={i} className={`gn-dot ${i < code.length ? 'is-filled' : ''}`} />)}
        </div>
        <div className="gn-numpad-grid">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} className="gn-num-btn" onClick={() => press(String(n))}>{n}</button>
          ))}
          <span className="gn-num-empty" />
          <button className="gn-num-btn" onClick={() => press('0')}>0</button>
          <button className="gn-num-btn gn-num-del" onClick={del}><X size={15} /></button>
        </div>
        <button className={`gn-send-btn ${status === 'sent' ? 'is-sent' : ''}`} onClick={send} disabled={code.length === 0}>
          {status === 'sent' ? <><Check size={15} /> Enviado</> : 'Send'}
        </button>
      </div>
    </div>
  )
}

function GnBottomNavInteractive() {
  const [active, setActive] = useState(0)
  const items = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <MessageCircle size={20} />, label: 'Chat' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ]
  return (
    <div className="component-mock mock-gn-bottom-nav">
      <nav className="gn-bottom-nav">
        {items.map((item, i) => (
          <button key={i} className={`gn-nav-item ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)} aria-label={item.label}>
            {item.icon}
          </button>
        ))}
      </nav>
      <p className="interactive-note gn-note">{items[active].label}</p>
    </div>
  )
}

function GnTextNavInteractive() {
  const [active, setActive] = useState(0)
  const links = ['Home', 'Search', 'Settings']
  return (
    <div className="component-mock mock-gn-text-nav">
      <nav className="gn-text-nav">
        {links.map((link, i) => (
          <button key={link} className={`gn-text-nav-item ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)}>{link}</button>
        ))}
      </nav>
      <p className="interactive-note gn-note">{links[active]}</p>
    </div>
  )
}

function GnRemindersCardInteractive() {
  const [items, setItems] = useState([
    { text: 'Design review', done: false },
    { text: 'Call John', done: false },
  ])
  const toggle = (i: number) => setItems(prev => prev.map((item, idx) => idx === i ? { ...item, done: !item.done } : item))
  return (
    <div className="component-mock mock-gn-reminders">
      <div className="gn-reminders-card">
        <p className="gn-reminders-title">Reminders</p>
        <ul className="gn-reminders-list">
          {items.map((item, i) => (
            <li key={i} className={`gn-reminder-item ${item.done ? 'is-done' : ''}`} onClick={() => toggle(i)}>
              <span className="gn-reminder-dot" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <p className="interactive-note gn-note">Clique para marcar</p>
    </div>
  )
}

function SidebarAccordionInteractive() {
  const [open, setOpen] = useState<number[]>([0])
  const [activeItem, setActiveItem] = useState('Overview')
  const sections = [
    { icon: <BarChart2 size={15} />, label: 'Analytics', items: ['Overview', 'Reports', 'Metrics'] },
    { icon: <FolderOpen size={15} />, label: 'Projects', items: ['Active', 'Archived', 'Templates'] },
    { icon: <Settings size={15} />, label: 'Settings', items: ['Profile', 'Security', 'Billing'] },
    { icon: <Users size={15} />, label: 'Team', items: ['Members', 'Roles', 'Invites'] },
  ]
  const toggle = (i: number) => setOpen(prev => prev.includes(i) ? prev.filter(n => n !== i) : [...prev, i])
  return (
    <div className="component-mock mock-sidebar-acc">
      <nav className="sidebar-acc-nav">
        <div className="sidebar-acc-brand">
          <Home size={16} />
          <span>Dashboard</span>
        </div>
        {sections.map((section, i) => (
          <div key={i} className="sidebar-acc-section">
            <button className={`sidebar-acc-header ${open.includes(i) ? 'is-open' : ''}`} onClick={() => toggle(i)}>
              <span className="sidebar-acc-header-left">{section.icon}{section.label}</span>
              <ChevronDown size={13} className="sidebar-acc-chevron" />
            </button>
            {open.includes(i) && (
              <div className="sidebar-acc-body">
                {section.items.map(item => (
                  <button key={item} className={`sidebar-acc-item ${activeItem === item ? 'is-active' : ''}`} onClick={() => setActiveItem(item)}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <p className="interactive-note">{activeItem} selecionado</p>
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

.btn-sharp::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1.1rem;
  border: 1px solid rgba(235, 219, 255, 0.55);
  pointer-events: none;
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
    'curadoria-ocean-pill-button': {
      html: `<div class="pill-demo">
  <button class="pill-button pill-ocean">Button</button>
</div>`,
      css: `.pill-demo {
  display: grid;
  place-items: center;
  min-height: 220px;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.pill-button {
  min-width: 400px;
  height: 80px;
  border: none;
  border-radius: 999px;
  color: #f6fbff;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0 2rem;
  cursor: pointer;
  background: linear-gradient(120deg, #30c1e4 0%, #1f75a8 48%, #0c2f52 100%);
  box-shadow: 0 20px 35px rgba(10, 30, 55, 0.22);
  transition: transform 0.24s ease, box-shadow 0.24s ease, filter 0.24s ease;
}

.pill-button:hover,
.pill-button:focus-visible {
  transform: translateY(-3px);
  filter: saturate(1.12);
  box-shadow: 0 28px 48px rgba(10, 30, 55, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.pill-button:active {
  transform: translateY(1px);
  box-shadow: 0 18px 30px rgba(10, 30, 55, 0.18);
}

.pill-ocean {
  background: linear-gradient(120deg, #30c1e4 0%, #1f75a8 48%, #0c2f52 100%);
}
`,
      ts: `const button = document.querySelector<HTMLButtonElement>('.pill-button')
button?.addEventListener('click', () => button.classList.toggle('is-active'))`,
    },
    'curadoria-rose-gold-pill-button': {
      html: `<div class="pill-demo">
  <button class="pill-button pill-rose-gold">Button</button>
</div>`,
      css: `.pill-demo {
  display: grid;
  place-items: center;
  min-height: 220px;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.pill-button {
  min-width: 400px;
  height: 80px;
  border: none;
  border-radius: 999px;
  color: #31151e;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0 2rem;
  cursor: pointer;
  box-shadow: 0 20px 35px rgba(65, 28, 46, 0.22);
  transition: transform 0.24s ease, box-shadow 0.24s ease, filter 0.24s ease;
}

.pill-button:hover,
.pill-button:focus-visible {
  transform: translateY(-3px);
  filter: saturate(1.12);
  box-shadow: 0 28px 48px rgba(65, 28, 46, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.pill-button:active {
  transform: translateY(1px);
  box-shadow: 0 18px 30px rgba(65, 28, 46, 0.18);
}

.pill-rose-gold {
  background: linear-gradient(120deg, #f8d3c5 0%, #d2786c 48%, #88526b 100%);
}
`,
      ts: `const button = document.querySelector<HTMLButtonElement>('.pill-button')
button?.addEventListener('click', () => button.classList.toggle('is-active'))`,
    },
    'curadoria-forest-pill-button': {
      html: `<div class="pill-demo">
  <button class="pill-button pill-forest">Button</button>
</div>`,
      css: `.pill-demo {
  display: grid;
  place-items: center;
  min-height: 220px;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.pill-button {
  min-width: 400px;
  height: 80px;
  border: none;
  border-radius: 999px;
  color: #f5fbf3;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0 2rem;
  cursor: pointer;
  box-shadow: 0 20px 35px rgba(10, 35, 18, 0.24);
  transition: transform 0.24s ease, box-shadow 0.24s ease, filter 0.24s ease;
}

.pill-button:hover,
.pill-button:focus-visible {
  transform: translateY(-3px);
  filter: saturate(1.12);
  box-shadow: 0 28px 48px rgba(10, 35, 18, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.pill-button:active {
  transform: translateY(1px);
  box-shadow: 0 18px 30px rgba(10, 35, 18, 0.18);
}

.pill-forest {
  background: linear-gradient(120deg, #3d8d56 0%, #256b39 48%, #102f19 100%);
}
`,
      ts: `const button = document.querySelector<HTMLButtonElement>('.pill-button')
button?.addEventListener('click', () => button.classList.toggle('is-active'))`,
    },
    'curadoria-wood-brown-pill-button': {
      html: `<div class="pill-demo">
  <button class="pill-button pill-wood-brown">Button</button>
</div>`,
      css: `.pill-demo {
  display: grid;
  place-items: center;
  min-height: 220px;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.pill-button {
  min-width: 400px;
  height: 80px;
  border: none;
  border-radius: 999px;
  color: #fff7ed;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0 2rem;
  cursor: pointer;
  box-shadow: 0 20px 35px rgba(55, 32, 14, 0.25);
  transition: transform 0.24s ease, box-shadow 0.24s ease, filter 0.24s ease;
}

.pill-button:hover,
.pill-button:focus-visible {
  transform: translateY(-3px);
  filter: saturate(1.12);
  box-shadow: 0 28px 48px rgba(55, 32, 14, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.pill-button:active {
  transform: translateY(1px);
  box-shadow: 0 18px 30px rgba(55, 32, 14, 0.18);
}

.pill-wood-brown {
  background: linear-gradient(120deg, #8a5a35 0%, #5d3720 48%, #2b160d 100%);
}
`,
      ts: `const button = document.querySelector<HTMLButtonElement>('.pill-button')
button?.addEventListener('click', () => button.classList.toggle('is-active'))`,
    },
    'curadoria-obsidian-plum-pill-button': {
      html: `<div class="pill-demo">
  <button class="pill-button pill-obsidian">Button</button>
</div>`,
      css: `.pill-demo {
  display: grid;
  place-items: center;
  min-height: 220px;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.pill-button {
  min-width: 400px;
  height: 80px;
  border: none;
  border-radius: 999px;
  color: #f6efff;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0 2rem;
  cursor: pointer;
  box-shadow: 0 20px 35px rgba(20, 10, 35, 0.3);
  transition: transform 0.24s ease, box-shadow 0.24s ease, filter 0.24s ease;
}

.pill-button:hover,
.pill-button:focus-visible {
  transform: translateY(-3px);
  filter: saturate(1.12);
  box-shadow: 0 28px 48px rgba(20, 10, 35, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.pill-button:active {
  transform: translateY(1px);
  box-shadow: 0 18px 30px rgba(20, 10, 35, 0.2);
}

.pill-obsidian {
  background: linear-gradient(120deg, #2a163a 0%, #582a64 48%, #120a16 100%);
}
`,
      ts: `const button = document.querySelector<HTMLButtonElement>('.pill-button')
button?.addEventListener('click', () => button.classList.toggle('is-active'))`,
    },
    'curadoria-neomorphic-button': {
      html: `<section class="demo-neomorphic-stage">\n  <button id="neomorphic-button" class="demo-neomorphic-button is-drop" type="button" aria-label="Botao neomorfico">\n    <span class="demo-neomorphic-core"></span>\n  </button>\n  <p id="neomorphic-label">Parado</p>\n</section>`,
      css: `.demo-neomorphic-stage {
  width: min(100%, 320px);
  min-height: 260px;
  display: grid;
  place-items: center;
  gap: 0.7rem;
  background: transparent;
  font-family: 'Plus Jakarta Sans', Arial, sans-serif;
}

.demo-neomorphic-button {
  position: relative;
  width: 122px;
  height: 122px;
  border-radius: 50%;
  border: 0;
  background: #dfe3e9;
  cursor: pointer;
  transition: box-shadow 0.25s ease, transform 0.2s ease;
}

.demo-neomorphic-core {
  position: absolute;
  inset: 0;
  border-radius: 50%;
}

.demo-neomorphic-button.is-drop {
  box-shadow:
    -18px -16px 24px rgba(255, 255, 255, 0.95),
    14px 16px 20px rgba(174, 183, 196, 0.45);
}

.demo-neomorphic-button.is-inner {
  box-shadow:
    inset -10px -10px 16px rgba(255, 255, 255, 0.82),
    inset 10px 10px 16px rgba(180, 188, 201, 0.52),
    -10px -10px 18px rgba(255, 255, 255, 0.82),
    10px 10px 16px rgba(175, 184, 196, 0.34);
}

.demo-neomorphic-button.is-outter {
  box-shadow:
    -18px -16px 24px rgba(255, 255, 255, 0.95),
    14px 16px 20px rgba(174, 183, 196, 0.45),
    inset 0 0 0 14px rgba(225, 230, 237, 0.95);
}

.demo-neomorphic-button.is-outter .demo-neomorphic-core {
  inset: 30px;
  background: #d1d8e2;
  box-shadow:
    inset -8px -8px 14px rgba(255, 255, 255, 0.74),
    inset 8px 8px 12px rgba(175, 184, 196, 0.42);
}

#neomorphic-label {
  margin: 0;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: #6b7788;
}`,
      ts: `const button = document.getElementById('neomorphic-button') as HTMLButtonElement
const label = document.getElementById('neomorphic-label') as HTMLParagraphElement

let clickTimer: number | null = null

function render() {
  const state = button.dataset.state ?? 'drop'
  button.classList.remove('is-drop', 'is-inner', 'is-outter')
  button.classList.add('is-' + state)
  if (state === 'drop') {
    label.textContent = 'Parado'
    return
  }

  if (state === 'inner') {
    label.textContent = 'Clique'
    return
  }

  label.textContent = 'Clique duplo'
}

button.addEventListener('click', () => {
  if (clickTimer !== null) {
    window.clearTimeout(clickTimer)
  }

  clickTimer = window.setTimeout(() => {
    button.dataset.state = 'inner'
    render()
    clickTimer = null
  }, 220)
})

button.addEventListener('dblclick', () => {
  if (clickTimer !== null) {
    window.clearTimeout(clickTimer)
    clickTimer = null
  }

  button.dataset.state = 'outter'
  render()
})

button.dataset.state = 'drop'
render()`,
    },
    'soft-depth-search-bar': {
      html: `<div class="soft-search-bar" id="soft-search-bar">\n  <input id="soft-search-input" type="search" placeholder="Search...." aria-label="Pesquisar" />\n  <button type="button" aria-label="Buscar">\n    <svg viewBox="0 0 24 24" role="presentation" focusable="false">\n      <path d="M10.5 3.5a7 7 0 1 0 4.45 12.4l4.33 4.33a1 1 0 0 0 1.42-1.42l-4.33-4.33A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z" />\n    </svg>\n  </button>\n</div>\n<p id="soft-search-feedback">Campo com glow suave e profundidade premium</p>`,
      css: `.soft-search-bar {
  width: min(100%, 560px);
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 64px;
  border-radius: 16px;
  border: 1px solid rgba(163, 179, 255, 0.35);
  padding: 0.4rem 0.4rem 0.4rem 1rem;
  background: linear-gradient(165deg, rgba(2, 8, 30, 0.95), rgba(2, 8, 26, 0.9));
  box-shadow:
    0 0 0 1px rgba(138, 161, 255, 0.2),
    0 18px 30px rgba(2, 6, 20, 0.7),
    0 0 26px rgba(76, 99, 255, 0.32),
    0 0 24px rgba(222, 77, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.soft-search-bar input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: #f2f6ff;
  font-family: 'Plus Jakarta Sans', 'Outfit', 'Segoe UI', sans-serif;
  font-size: 1.28rem;
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: 0.015em;
}

.soft-search-bar input::placeholder {
  color: rgba(224, 233, 255, 0.78);
}

.soft-search-bar button {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  border: 1px solid rgba(144, 170, 255, 0.62);
  background:
    radial-gradient(circle at 30% 24%, rgba(196, 218, 255, 0.28), transparent 55%),
    linear-gradient(168deg, #1f2b74 0%, #101a4f 62%, #0a1239 100%);
  color: #b9d6ff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow:
    0 12px 20px rgba(6, 11, 35, 0.7),
    0 0 14px rgba(105, 144, 255, 0.34),
    inset 0 1px 0 rgba(214, 228, 255, 0.42),
    inset 0 -6px 10px rgba(8, 14, 40, 0.45);
}

.soft-search-bar button:hover,
.soft-search-bar button:focus-visible {
  border-color: rgba(184, 206, 255, 0.8);
  transform: translateY(-1px);
  box-shadow:
    0 14px 24px rgba(6, 11, 35, 0.75),
    0 0 18px rgba(119, 163, 255, 0.46),
    inset 0 1px 0 rgba(226, 237, 255, 0.5),
    inset 0 -7px 11px rgba(8, 14, 40, 0.5);
}

.soft-search-bar button:active {
  transform: translateY(0);
}

.soft-search-bar button svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

#soft-search-feedback {
  margin: 0.55rem 0 0;
  color: rgba(220, 232, 255, 0.78);
  font-family: 'Plus Jakarta Sans', 'Outfit', 'Segoe UI', sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: 0.012em;
}

.soft-search-bar.is-focused {
  border-color: rgba(187, 201, 255, 0.68);
  box-shadow:
    0 0 0 1px rgba(194, 209, 255, 0.32),
    0 20px 36px rgba(2, 8, 24, 0.74),
    0 0 30px rgba(101, 130, 255, 0.42),
    0 0 30px rgba(222, 93, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
}`,
      ts: `const searchInput = document.getElementById('soft-search-input') as HTMLInputElement
const searchBar = document.getElementById('soft-search-bar') as HTMLDivElement
const feedback = document.getElementById('soft-search-feedback') as HTMLElement

searchInput.addEventListener('focus', () => {
  searchBar.classList.add('is-focused')
})

searchInput.addEventListener('blur', () => {
  searchBar.classList.remove('is-focused')
})

searchInput.addEventListener('input', () => {
  const normalized = searchInput.value.trim()
  feedback.textContent = normalized
    ? 'Consulta pronta: ' + normalized
    : 'Campo com glow suave e profundidade premium'
})`,
    },
    'neon-glass-login-card': {
      html: `<section class="login-scene">
  <form id="login-form" class="login-card" autocomplete="off">
    <div class="login-avatar" aria-hidden="true"><span class="login-avatar-icon"></span></div>
    <p class="login-caption">Sign in to your lilac account</p>

    <div class="login-meta">
      <span>Email</span>
      <button type="button" class="link-like">Forgot password?</button>
    </div>
    <label class="login-field">
      <span aria-hidden="true">@</span>
      <input id="login-email" type="email" placeholder="Enter your email" />
    </label>

    <div class="login-meta"><span>Password</span></div>
    <label class="login-field">
      <span aria-hidden="true">*</span>
      <input id="login-password" type="password" placeholder="Enter your password" />
    </label>

    <button id="login-submit" class="login-submit" type="submit" disabled>Log In</button>
    <small id="login-feedback">Not registered yet? Sign up ></small>
  </form>
</section>`,
      css: `.login-scene {
  min-height: 420px;
  display: grid;
  place-items: center;
  padding: 1rem;
  background:
    linear-gradient(150deg, rgba(18, 7, 38, 0.42), rgba(43, 14, 70, 0.34)),
    url('wpplilac.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.login-card {
  width: min(100%, 322px);
  border-radius: 34px;
  padding: 1.2rem 1.15rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(18px);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08));
  box-shadow: 0 24px 50px rgba(16, 4, 40, 0.45);
}

.login-avatar {
  width: 70px;
  aspect-ratio: 1;
  margin: 0 auto 0.75rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  display: grid;
  place-items: center;
}

.login-avatar-icon {
  font-size: 1.45rem;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(20, 5, 42, 0.35));
}

.login-caption {
  margin: 0 0 0.6rem;
  text-align: center;
  color: #f4ebff;
  font-weight: 600;
}

.login-meta {
  display: flex;
  justify-content: space-between;
  color: rgba(247, 234, 255, 0.95);
  font-size: 0.75rem;
  margin-bottom: 0.35rem;
}

.login-field {
  display: flex;
  align-items: center;
  gap: 0.48rem;
  min-height: 50px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(52, 10, 74, 0.45);
  padding: 0 0.9rem;
  margin-bottom: 0.7rem;
}

.login-field input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #fff;
}

.login-field input::placeholder {
  color: rgba(241, 223, 255, 0.7);
}

.login-submit {
  width: 100%;
  min-height: 52px;
  border: 0;
  border-radius: 999px;
  color: #fef5ff;
  font-weight: 800;
  background: linear-gradient(90deg, #8f63ff 0%, #d291ff 52%, #f1a8ff 100%);
}

.login-submit:disabled {
  opacity: 0.58;
}

#login-feedback {
  margin-top: 0.65rem;
  display: block;
  text-align: center;
  color: rgba(247, 228, 255, 0.88);
}`,
      ts: `const form = document.getElementById('login-form') as HTMLFormElement
const emailInput = document.getElementById('login-email') as HTMLInputElement
const passwordInput = document.getElementById('login-password') as HTMLInputElement
const submitButton = document.getElementById('login-submit') as HTMLButtonElement
const feedback = document.getElementById('login-feedback') as HTMLElement

const updateState = () => {
  const canSubmit = emailInput.value.trim() !== '' && passwordInput.value.trim() !== ''
  submitButton.disabled = !canSubmit
}

emailInput.addEventListener('input', updateState)
passwordInput.addEventListener('input', updateState)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  feedback.textContent = 'Login simulated with lilac theme.'
})

updateState()`,
    },
    'curadoria-toggle': {
      html: `<div class="demo-toggle-solo">\n  <button id="sun-moon-toggle" class="celestial-toggle is-sun" type="button" aria-pressed="true" aria-label="Alternar para lua">\n    <span class="celestial-track"><i class="celestial-core"></i></span>\n  </button>\n</div>`,
      css: `.demo-toggle-solo {
  display: grid;
  place-items: center;
  min-height: 140px;
  font-family: 'Trebuchet MS', sans-serif;
}

.celestial-toggle {
  --track-start: #0b1124;
  --track-end: #1d2b57;
  --core-a: #e6f0ff;
  --core-b: #9cb4d8;
  width: fit-content;
  border: 1px solid rgba(162, 190, 255, 0.58);
  border-radius: 999px;
  padding: 0.26rem;
  background: radial-gradient(circle at 12% 38%, rgba(184, 210, 255, 0.14), transparent 40%), linear-gradient(135deg, var(--track-start), var(--track-end));
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  box-shadow:
    0 0 0 1px rgba(164, 190, 255, 0.24),
    0 0 20px rgba(90, 129, 236, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

.celestial-track {
  width: 84px;
  height: 42px;
  border-radius: 999px;
  padding: 4px;
  display: flex;
  align-items: center;
  background: linear-gradient(120deg, rgba(14, 19, 42, 0.98), rgba(5, 9, 24, 0.9));
}

.celestial-core {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffff 0%, var(--core-a) 36%, var(--core-b) 100%);
  box-shadow:
    inset -6px -4px 0 rgba(120, 144, 182, 0.35),
    0 0 14px rgba(153, 185, 255, 0.58);
  transition: transform 0.26s ease;
}

.celestial-core::before {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.76);
  transition: opacity 0.26s ease, transform 0.26s ease;
}

.celestial-core::after {
  content: '';
  position: absolute;
  inset: -11px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.78);
  transition: opacity 0.26s ease, transform 0.26s ease;
}

.celestial-toggle.is-sun {
  --track-start: #291203;
  --track-end: #6e2c08;
  --core-a: #fff5b0;
  --core-b: #ff9d2f;
  border-color: rgba(255, 201, 117, 0.66);
  box-shadow:
    0 0 0 1px rgba(255, 209, 129, 0.36),
    0 0 24px rgba(255, 169, 72, 0.44),
    0 0 34px rgba(255, 128, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.celestial-toggle.is-sun .celestial-core {
  transform: translateX(40px);
  background: radial-gradient(circle at 34% 30%, #fffef2 0%, #ffe486 34%, #ffb33f 72%, #ff8d21 100%);
  box-shadow:
    0 0 0 4px rgba(255, 185, 74, 0.16),
    0 0 16px rgba(255, 186, 65, 0.92),
    0 0 34px rgba(255, 132, 18, 0.62);
}

.celestial-toggle.is-sun .celestial-core::before {
  opacity: 1;
  transform: scale(1);
  background: radial-gradient(circle, rgba(255, 214, 116, 0.46) 0%, rgba(255, 178, 68, 0.24) 48%, rgba(255, 136, 35, 0) 78%);
  animation: sun-corona-pulse 2.2s ease-in-out infinite;
}

.celestial-toggle.is-sun .celestial-core::after {
  opacity: 1;
  transform: scale(1);
  background: repeating-conic-gradient(
    from 0deg,
    rgba(255, 219, 120, 0.9) 0deg 8deg,
    transparent 8deg 24deg
  );
  -webkit-mask: radial-gradient(circle, transparent 0 62%, #000 65% 74%, transparent 77% 100%);
  mask: radial-gradient(circle, transparent 0 62%, #000 65% 74%, transparent 77% 100%);
  animation: sun-rays-spin 10s linear infinite;
}

.celestial-toggle:hover {
  transform: translateY(-2px) scale(1.01);
}

@keyframes sun-rays-spin {
  to {
    transform: scale(1) rotate(360deg);
  }
}

@keyframes sun-corona-pulse {
  0%,
  100% {
    opacity: 0.75;
  }
  50% {
    opacity: 1;
  }
}`,
      ts: `const toggleBtn = document.getElementById('sun-moon-toggle') as HTMLButtonElement
let isSunMode = true

function refresh() {
  toggleBtn.classList.toggle('is-sun', isSunMode)
  toggleBtn.setAttribute('aria-pressed', String(isSunMode))
  toggleBtn.setAttribute('aria-label', isSunMode ? 'Alternar para lua' : 'Alternar para sol')
}

toggleBtn.addEventListener('click', () => {
  isSunMode = !isSunMode
  refresh()
})

refresh()`,
    },
    'curadoria-realistic-toggle': {
      html: `<div class="demo-realistic-toggle-wrap">\n  <button id="concave-rgb-toggle" class="realistic-toggle" type="button" aria-pressed="false" aria-label="Ativar Concave RGB Toggle">\n    <span class="realistic-toggle-knob"></span>\n  </button>\n</div>`,
      css: `.demo-realistic-toggle-wrap {
  display: grid;
  place-items: center;
  min-height: 140px;
}

.realistic-toggle {
  width: 220px;
  height: 92px;
  border: 1px solid rgba(154, 161, 179, 0.55);
  border-radius: 999px;
  padding: 8px;
  position: relative;
  background: linear-gradient(160deg, #e5e7ed 0%, #cfd3dc 52%, #c4c8d3 100%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  box-shadow:
    inset 0 3px 5px rgba(255, 255, 255, 0.7),
    inset 0 -8px 12px rgba(93, 99, 118, 0.38),
    inset 10px 0 12px rgba(255, 255, 255, 0.22),
    inset -10px 0 12px rgba(102, 110, 130, 0.28),
    0 10px 22px rgba(77, 83, 101, 0.25);
  transition: box-shadow 0.3s ease;
}

.realistic-toggle::before {
  content: '';
  position: absolute;
  inset: 11px;
  border-radius: 999px;
  border: 2px solid transparent;
  background:
    linear-gradient(180deg, #bcc1cd 0%, #d6d9e2 45%, #b8beca 100%) padding-box,
    linear-gradient(
      120deg,
      rgb(255, 96, 145) 0%,
      rgb(255, 166, 74) 22%,
      rgb(250, 235, 101) 42%,
      rgb(84, 220, 142) 62%,
      rgb(88, 164, 255) 82%,
      rgb(196, 126, 255) 100%
    ) border-box;
  background-size: 100% 100%, 220% 220%;
  background-position: 0 0, 0% 50%;
  animation: rgb-border-flow 14s ease-in-out infinite;
  box-shadow:
    inset 0 8px 10px rgba(95, 102, 122, 0.42),
    inset 0 -4px 6px rgba(255, 255, 255, 0.45);
}

@keyframes rgb-border-flow {
  0% {
    background-position: 0 0, 0% 50%;
  }
  50% {
    background-position: 0 0, 100% 50%;
  }
  100% {
    background-position: 0 0, 0% 50%;
  }
}

.realistic-toggle-knob {
  position: relative;
  z-index: 1;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: radial-gradient(circle at 33% 28%, #ffffff 0%, #dee1e8 54%, #b5bac8 100%);
  box-shadow:
    inset 0 3px 6px rgba(255, 255, 255, 0.88),
    inset 0 -8px 10px rgba(130, 136, 156, 0.4),
    0 12px 14px rgba(86, 92, 113, 0.3),
    0 2px 2px rgba(255, 255, 255, 0.7);
  transition: transform 0.3s cubic-bezier(0.3, 0.9, 0.2, 1);
}

.realistic-toggle.is-on {
  box-shadow:
    inset 0 3px 5px rgba(255, 255, 255, 0.68),
    inset 0 -8px 12px rgba(93, 99, 118, 0.4),
    inset 10px 0 12px rgba(255, 255, 255, 0.2),
    inset -10px 0 12px rgba(102, 110, 130, 0.3),
    0 10px 22px rgba(77, 83, 101, 0.25);
}

.realistic-toggle.is-on .realistic-toggle-knob {
  transform: translateX(128px);
}`,
      ts: `const realisticToggle = document.getElementById('concave-rgb-toggle') as HTMLButtonElement
let isOn = false

function updateToggleState() {
  realisticToggle.classList.toggle('is-on', isOn)
  realisticToggle.setAttribute('aria-pressed', String(isOn))
  realisticToggle.setAttribute('aria-label', isOn ? 'Desativar Concave RGB Toggle' : 'Ativar Concave RGB Toggle')
}

realisticToggle.addEventListener('click', () => {
  isOn = !isOn
  updateToggleState()
})

updateToggleState()`,
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

.online-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #30d158;
  margin-left: 4px;
  vertical-align: middle;
  box-shadow: 0 0 0 0 rgba(48, 209, 88, 0.5);
  animation: online-breathe 1.8s ease-in-out infinite;
}

@keyframes online-breathe {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(48, 209, 88, 0.42);
    opacity: 0.75;
  }
  50% {
    box-shadow: 0 0 0 6px rgba(48, 209, 88, 0);
    opacity: 1;
  }
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
    'curadoria-realistic-progress-loader': {
      html: `<section class="demo-realistic-progress">\n  <div class="progress-track" id="progress-track">\n    <div class="progress-fill" id="progress-fill"></div>\n    <div class="progress-badge" id="progress-badge">50%</div>\n  </div>\n  <h3>Loading</h3>\n  <p>Please Wait...</p>\n</section>`,
      css: `.demo-realistic-progress {
  width: min(100%, 460px);
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  font-family: 'Plus Jakarta Sans', Arial, sans-serif;
}

.progress-track {
  width: 100%;
  height: 26px;
  position: relative;
  border-radius: 999px;
  background: linear-gradient(180deg, #e8e8e8, #d2d2d2);
  box-shadow:
    inset 0 5px 8px rgba(112, 112, 112, 0.36),
    inset 0 -3px 5px rgba(255, 255, 255, 0.88),
    0 10px 14px rgba(88, 88, 88, 0.24);
}

.progress-fill {
  height: 100%;
  width: 50%;
  border-radius: inherit;
  background: linear-gradient(180deg, #d8f0c7 0%, #b7dda0 52%, #a4d08f 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 4px rgba(120, 156, 100, 0.45),
    0 8px 12px rgba(93, 130, 74, 0.38);
}

.progress-badge {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 56px;
  text-align: center;
  border-radius: 7px;
  padding: 4px 8px;
  border: 1px solid #d8d8d8;
  background: linear-gradient(180deg, #fcfcfc, #ececec);
  box-shadow: 0 5px 10px rgba(72, 72, 72, 0.2);
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
}

.progress-badge::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 12px;
  height: 12px;
  background: linear-gradient(180deg, #f4f4f4, #e5e5e5);
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  transform: translateX(-50%) rotate(45deg);
}

.demo-realistic-progress h3 {
  margin: 0.4rem 0 0;
  font-size: 2.1rem;
  line-height: 1;
  color: #636363;
  font-weight: 700;
}

.demo-realistic-progress p {
  margin: 0;
  color: #7a7a7a;
  font-size: 1.15rem;
  font-weight: 500;
}`,
      ts: `const fill = document.getElementById('progress-fill') as HTMLDivElement
const badge = document.getElementById('progress-badge') as HTMLDivElement

let progress = 50

window.setInterval(() => {
  progress = progress >= 88 ? 18 : progress + 1
  fill.style.width = progress + '%'
  badge.style.left = Math.max(8, Math.min(92, progress)) + '%'
  badge.textContent = progress + '%'
}, 120)`,
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
    'curadoria-grid-fade-pattern': {
      html: `<div class="bg-pattern"></div>\n<!-- ou -->\n<div class="bg-pattern light"></div>`,
      css: `.bg-pattern {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(140, 204, 232, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(140, 204, 232, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.72), transparent 75%);
  z-index: -1;
}

.bg-pattern.light {
  background-image:
    linear-gradient(rgba(40, 94, 128, 0.11) 1px, transparent 1px),
    linear-gradient(90deg, rgba(40, 94, 128, 0.11) 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.55), transparent 78%);
}`,
      ts: `// Padrao passivo: sem JavaScript necessario para renderizar o efeito.`,
    },
    'curadoria-screen-lights-pattern': {
      html: `<div class="screen-lights-pattern">\n  <span class="screen-light-orb orb-left"></span>\n  <span class="screen-light-orb orb-right"></span>\n</div>`,
      css: `.screen-lights-pattern {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--screen-lights-bg, #1f2024);
}

.screen-light-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(52px);
  background: radial-gradient(circle at center, rgba(var(--screen-light-rgb, 193,227,122), 0.92) 0%, rgba(var(--screen-light-rgb, 193,227,122), 0.18) 64%, transparent 100%);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.orb-left {
  width: clamp(220px, 36vw, 420px);
  height: clamp(220px, 36vw, 420px);
  animation-name: screen-light-l-path-left;
  animation-duration: 5.4s;
}

.orb-right {
  width: clamp(240px, 38vw, 460px);
  height: clamp(240px, 38vw, 460px);
  animation-name: screen-light-l-path-right;
  animation-duration: 5.4s;
}

@keyframes screen-light-l-path-left {
  0% {
    left: -8%;
    top: 62%;
    transform: scale(1);
  }

  50% {
    left: -8%;
    top: -10%;
    transform: scale(1.05);
  }

  100% {
    left: 58%;
    top: -10%;
    transform: scale(1);
  }
}

@keyframes screen-light-l-path-right {
  0% {
    left: 58%;
    top: -10%;
    transform: scale(1);
  }

  50% {
    left: 58%;
    top: 62%;
    transform: scale(1.05);
  }

  100% {
    left: -8%;
    top: 62%;
    transform: scale(1);
  }
}`,
      ts: `const pattern = document.querySelector('.screen-lights-pattern') as HTMLElement
    pattern?.setAttribute('aria-hidden', 'true')`,
    },
    'curadoria-screen-lights-pattern-amber': {
      html: `<div class="screen-lights-pattern">\n  <span class="screen-light-orb orb-left"></span>\n  <span class="screen-light-orb orb-right"></span>\n</div>`,
      css: `.screen-lights-pattern {
  position: relative;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  background: #241a12;
}
.screen-light-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(52px);
  background: radial-gradient(circle at center, rgba(255,188,99,0.92) 0%, rgba(255,188,99,0.18) 64%, transparent 100%);
  will-change: transform, left, top;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.orb-left {
  width: clamp(220px, 36vw, 420px);
  height: clamp(220px, 36vw, 420px);
  animation-name: screen-light-l-path-left;
  animation-duration: 5.4s;
}
.orb-right {
  width: clamp(240px, 38vw, 460px);
  height: clamp(240px, 38vw, 460px);
  animation-name: screen-light-l-path-right;
  animation-duration: 5.4s;
}
@keyframes screen-light-l-path-left {
  0% { left: -8%; top: 62%; transform: scale(1); }
  50% { left: -8%; top: -10%; transform: scale(1.05); }
  100% { left: 58%; top: -10%; transform: scale(1); }
}
@keyframes screen-light-l-path-right {
  0% { left: 58%; top: -10%; transform: scale(1); }
  50% { left: 58%; top: 62%; transform: scale(1.05); }
  100% { left: -8%; top: 62%; transform: scale(1); }
}`,
      ts: `const pattern = document.querySelector('.screen-lights-pattern') as HTMLElement
    pattern?.setAttribute('aria-hidden', 'true')`,
    },
    'curadoria-screen-lights-pattern-aqua': {
      html: `<div class="screen-lights-pattern">\n  <span class="screen-light-orb orb-left"></span>\n  <span class="screen-light-orb orb-right"></span>\n</div>`,
      css: `.screen-lights-pattern {
  position: relative;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  background: #101f25;
}
.screen-light-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(52px);
  background: radial-gradient(circle at center, rgba(117,229,255,0.92) 0%, rgba(117,229,255,0.18) 64%, transparent 100%);
  will-change: transform, left, top;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.orb-left {
  width: clamp(220px, 36vw, 420px);
  height: clamp(220px, 36vw, 420px);
  animation-name: screen-light-l-path-left;
  animation-duration: 5.4s;
}
.orb-right {
  width: clamp(240px, 38vw, 460px);
  height: clamp(240px, 38vw, 460px);
  animation-name: screen-light-l-path-right;
  animation-duration: 5.4s;
}
@keyframes screen-light-l-path-left {
  0% { left: -8%; top: 62%; transform: scale(1); }
  50% { left: -8%; top: -10%; transform: scale(1.05); }
  100% { left: 58%; top: -10%; transform: scale(1); }
}
@keyframes screen-light-l-path-right {
  0% { left: 58%; top: -10%; transform: scale(1); }
  50% { left: 58%; top: 62%; transform: scale(1.05); }
  100% { left: -8%; top: 62%; transform: scale(1); }
}`,
      ts: `const pattern = document.querySelector('.screen-lights-pattern') as HTMLElement
    pattern?.setAttribute('aria-hidden', 'true')`,
    },
    'curadoria-screen-lights-pattern-rose': {
      html: `<div class="screen-lights-pattern">\n  <span class="screen-light-orb orb-left"></span>\n  <span class="screen-light-orb orb-right"></span>\n</div>`,
      css: `.screen-lights-pattern {
  position: relative;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  background: #24131d;
}
.screen-light-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(52px);
  background: radial-gradient(circle at center, rgba(255,139,176,0.92) 0%, rgba(255,139,176,0.18) 64%, transparent 100%);
  will-change: transform, left, top;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.orb-left {
  width: clamp(220px, 36vw, 420px);
  height: clamp(220px, 36vw, 420px);
  animation-name: screen-light-l-path-left;
  animation-duration: 5.4s;
}
.orb-right {
  width: clamp(240px, 38vw, 460px);
  height: clamp(240px, 38vw, 460px);
  animation-name: screen-light-l-path-right;
  animation-duration: 5.4s;
}
@keyframes screen-light-l-path-left {
  0% { left: -8%; top: 62%; transform: scale(1); }
  50% { left: -8%; top: -10%; transform: scale(1.05); }
  100% { left: 58%; top: -10%; transform: scale(1); }
}
@keyframes screen-light-l-path-right {
  0% { left: 58%; top: -10%; transform: scale(1); }
  50% { left: 58%; top: 62%; transform: scale(1.05); }
  100% { left: -8%; top: 62%; transform: scale(1); }
}`,
      ts: `const pattern = document.querySelector('.screen-lights-pattern') as HTMLElement
    pattern?.setAttribute('aria-hidden', 'true')`,
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
    'lilac-weather-glass-card': {
      html: `<section class="lilac-weather-preview">
  <article class="lilac-weather-card">
    <header>
      <div>
        <strong>San Francisco</strong>
        <span>September 25, 2015</span>
      </div>
      <div class="temperature">
        <p id="current-temp">72°</p>
        <small>81° / 57°</small>
      </div>
    </header>

    <section class="condition">
      <div class="cloud-icon"><i class="sun"></i><i class="cloud"></i></div>
      <strong>Cloudy</strong>
    </section>

    <nav class="tabs">
      <button class="is-active" data-tab="hourly">Hourly</button>
      <button data-tab="daily">Daily</button>
      <button data-tab="details">Details</button>
      <button data-tab="precipitation">Precipitation</button>
    </nav>

    <div class="hours" id="hours"></div>
  </article>
</section>`,
      css: `.lilac-weather-preview {
  min-height: 420px;
  display: grid;
  place-items: center;
  padding: 1rem;
  background:
    linear-gradient(150deg, rgba(16, 12, 51, 0.34), rgba(34, 23, 76, 0.3)),
    url('wpplilac.png');
  background-size: cover;
  background-position: center;
  border-radius: 16px;
}

.lilac-weather-card {
  width: min(100%, 760px);
  min-height: 290px;
  border-radius: 16px;
  padding: 1.1rem 1.2rem 1rem;
  color: rgba(245, 246, 255, 0.96);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.09));
  border: 1px solid rgba(238, 230, 255, 0.34);
  backdrop-filter: blur(12px);
}

.lilac-weather-card header {
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
}

.lilac-weather-card header strong {
  font-size: 1.75rem;
  line-height: 1.05;
}

.lilac-weather-card .temperature {
  text-align: right;
}

.lilac-weather-card .temperature p {
  margin: 0;
  font-size: 3.5rem;
  line-height: 0.9;
  font-weight: 300;
}

.condition {
  margin-top: 0.45rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.tabs {
  margin-top: 0.62rem;
  display: flex;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(240, 234, 255, 0.28);
  padding-bottom: 0.44rem;
}

.tabs button {
  border: 0;
  background: transparent;
  color: rgba(243, 238, 255, 0.7);
}

.tabs button.is-active {
  color: rgba(255, 255, 255, 0.98);
}

.hours {
  margin-top: 0.72rem;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.45rem;
}

.hours button {
  border: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(251, 249, 255, 0.92);
  min-height: 78px;
  padding: 0.5rem 0.3rem;
}`,
      ts: `const temperatures = [72, 73, 75, 77, 81, 79]
const labels = ['NOW', '11AM', '12PM', '1PM', '2PM', '3PM']

const tempEl = document.getElementById('current-temp') as HTMLElement
const hoursEl = document.getElementById('hours') as HTMLDivElement
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-tab]'))

let selectedIndex = 4

const render = () => {
  tempEl.textContent = temperatures[selectedIndex] + '°'
  hoursEl.innerHTML = ''

  labels.forEach((label, index) => {
    const button = document.createElement('button')
    button.textContent = label + ' ' + temperatures[index] + '°'
    if (selectedIndex === index) {
      button.style.background = 'rgba(240, 232, 255, 0.28)'
    }
    button.addEventListener('click', () => {
      selectedIndex = index
      render()
    })
    hoursEl.appendChild(button)
  })
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('is-active'))
    tab.classList.add('is-active')
  })
})

render()`,
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
      html: `<section class="sticky-kanban"><div class="note">Card comparativo</div><div class="note note-green">Em progresso</div><div class="note note-blue">Concluido</div></section>`,
      css: `.sticky-kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
  gap: 0.58rem;
  padding: 0.2rem;
}

.note {
  position: relative;
  border-radius: 6px;
  padding: 0.62rem 0.56rem 0.5rem;
  min-height: 112px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.05)),
    repeating-linear-gradient(
      -8deg,
      rgba(0,0,0,0.04) 0,
      rgba(0,0,0,0.04) 1px,
      transparent 1px,
      transparent 7px
    ),
    #fff4b3;
  border: 1px solid rgba(77,54,18,0.3);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.45) inset,
    0 12px 20px -13px rgba(70,54,13,0.6),
    3px 3px 0 rgba(43,31,16,0.26);
  color: #2f2514;
  transform: rotate(-1.6deg);
  font-size: 0.8rem;
  font-family: Arial, sans-serif;
}

.note-green {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.05)),
    repeating-linear-gradient(
      -8deg,
      rgba(0,0,0,0.04) 0,
      rgba(0,0,0,0.04) 1px,
      transparent 1px,
      transparent 7px
    ),
    #b8f5c0;
  border-color: rgba(18,77,30,0.3);
  color: #12311a;
  transform: rotate(1.2deg);
}

.note-blue {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.05)),
    repeating-linear-gradient(
      -8deg,
      rgba(0,0,0,0.04) 0,
      rgba(0,0,0,0.04) 1px,
      transparent 1px,
      transparent 7px
    ),
    #b8dcf5;
  border-color: rgba(18,54,77,0.3);
  color: #122a3a;
  transform: rotate(-0.8deg);
}

.note::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 34px;
  height: 12px;
  border-radius: 2px;
  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(80,60,30,0.2);
}`,
      ts: `const notes = document.querySelectorAll('.note')
notes.forEach((note) => note.addEventListener('click', () => note.classList.toggle('is-highlighted')))`,
    },
    'prism-pulse-loader': {
      html: `<div class="prism-loader"><span></span></div>`,
      css: `.prism-loader {
  display: grid;
  place-items: center;
}

.prism-loader span {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 6px solid #a3d8ff;
  border-top-color: #4867ff;
  border-left-color: #5d4df5;
  animation: spin 1.1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
      html: `<article class="soft-player">
  <div class="top-actions">
    <button type="button" aria-label="Voltar">←</button>
    <button type="button" aria-label="Menu">≡</button>
  </div>

  <div id="disc" class="disc is-playing">
    <div class="album-art">
      <img src="./assets/haim.png" alt="Capa Days Are Gone - HAIM" />
    </div>
  </div>

  <section class="wave-panel">
    <strong>Haim - The Wire</strong>
    <p>HAIM</p>
    <div class="progress"><i id="progress-fill" style="width: 28%"></i></div>
    <button id="retro-play" type="button">❚❚</button>
  </section>
</article>`,
      css: `.soft-player {
  width: min(100%, 320px);
  border-radius: 30px;
  padding: 1rem;
  background: linear-gradient(180deg, #e6edf6 0%, #ccd9e9 52%, #f3f8ff 100%);
  box-shadow: 12px 12px 22px #b7c5d6, -12px -12px 22px #f8fbff;
}

.top-actions {
  display: flex;
  justify-content: space-between;
}

.top-actions button {
  width: 42px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #4f7fb0;
  background: linear-gradient(145deg, #f5f9ff, #cad8e8);
  box-shadow: 8px 8px 14px #b0bfd0, -8px -8px 14px #f9fcff;
}

.disc {
  width: 170px;
  aspect-ratio: 1;
  margin: 1.3rem auto 1.5rem;
  border-radius: 50%;
  padding: 12px;
  background: linear-gradient(145deg, #f4f9ff, #c5d4e5);
}

.disc.is-playing {
  animation: disc-spin 3.8s linear infinite;
}

.album-art {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background:
    radial-gradient(circle at 28% 26%, rgba(232, 248, 255, 0.9) 0 18%, transparent 20%),
    radial-gradient(circle at 68% 38%, rgba(160, 203, 236, 0.9) 0 21%, transparent 23%),
    linear-gradient(140deg, #e6f2ff 0%, #a7cdf0 55%, #8ab7e2 100%);
}

.album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wave-panel {
  position: relative;
  margin: 0 -1rem -0.9rem;
  border-radius: 28px;
  padding: 3.2rem 1.2rem 1.25rem;
  background: linear-gradient(180deg, #bfd7ed 0%, #d5e6f5 58%, #eef6ff 100%);
  text-align: center;
}

.wave-panel::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -26px;
  height: 44px;
  background:
    radial-gradient(20px 16px at 14px 22px, #bfd7ed 98%, transparent 100%),
    radial-gradient(34px 26px at 60px 22px, #bfd7ed 98%, transparent 100%),
    radial-gradient(20px 16px at 120px 22px, #bfd7ed 98%, transparent 100%),
    radial-gradient(34px 26px at calc(100% - 62px) 22px, #bfd7ed 98%, transparent 100%),
    radial-gradient(20px 16px at calc(100% - 16px) 22px, #bfd7ed 98%, transparent 100%);
}

.progress {
  margin: 0.9rem auto 1rem;
  width: 92%;
  height: 8px;
  border-radius: 999px;
  background: #dde8f3;
  overflow: hidden;
}

.progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #3f7fb6 0%, #62a6dc 100%);
}

@keyframes disc-spin {
  to { transform: rotate(360deg); }
}`,
      ts: `const playButton = document.getElementById('retro-play') as HTMLButtonElement
const disc = document.getElementById('disc') as HTMLDivElement
const progress = document.getElementById('progress-fill') as HTMLSpanElement

let isPlaying = true
let current = 28

const interval = window.setInterval(() => {
  if (!isPlaying) return
  current = current >= 100 ? 0 : current + 0.4
  progress.style.width = current + '%'
}, 120)

playButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  disc.classList.toggle('is-playing', isPlaying)
  playButton.textContent = isPlaying ? '❚❚' : '▶'
})

window.addEventListener('beforeunload', () => window.clearInterval(interval))`,
    },
    'lilac-gradient-music-player-card': {
      html: `<article class="lilac-player">
  <div class="top-actions">
    <button type="button" aria-label="Voltar">←</button>
    <button type="button" aria-label="Menu">≡</button>
  </div>

  <div id="disc" class="disc is-playing">
    <div class="album-art">
      <img src="./assets/haim.png" alt="Capa Days Are Gone - HAIM" />
    </div>
  </div>

  <section class="wave-panel">
    <strong>Haim - The Wire</strong>
    <p>Lavender Edition</p>
    <div class="progress"><i id="progress-fill" style="width: 36%"></i></div>
    <button id="retro-play" type="button">❚❚</button>
  </section>
</article>`,
      css: `.lilac-player {
  width: min(100%, 320px);
  border-radius: 32px;
  padding: 1rem;
  background: linear-gradient(180deg, #f6eeff 0%, #dcc8ff 52%, #fbf7ff 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.disc {
  width: 170px;
  aspect-ratio: 1;
  margin: 1.3rem auto 1.5rem;
  border-radius: 50%;
  padding: 12px;
  background: linear-gradient(145deg, #fff8ff, #d9bdff);
}

.disc.is-playing {
  animation: disc-spin 3.8s linear infinite;
}

.wave-panel {
  position: relative;
  border-radius: 28px;
  padding: 3.2rem 1.2rem 1.25rem;
  background: linear-gradient(180deg, #d8bcff 0%, #e7d2ff 58%, #fdf9ff 100%);
  text-align: center;
}

.wave-panel::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -26px;
  height: 46px;
  background:
    radial-gradient(18px 14px at 14px 22px, #d8bcff 98%, transparent 100%),
    radial-gradient(32px 24px at 58px 22px, #d8bcff 98%, transparent 100%),
    radial-gradient(18px 14px at 112px 22px, #d8bcff 98%, transparent 100%),
    radial-gradient(32px 24px at calc(100% - 60px) 22px, #d8bcff 98%, transparent 100%),
    radial-gradient(18px 14px at calc(100% - 14px) 22px, #d8bcff 98%, transparent 100%);
}

@keyframes disc-spin {
  to {
    transform: rotate(360deg);
  }
}`,
      ts: `const playButton = document.getElementById('retro-play') as HTMLButtonElement
const disc = document.getElementById('disc') as HTMLDivElement
const progress = document.getElementById('progress-fill') as HTMLSpanElement

let isPlaying = true
let current = 36

const interval = window.setInterval(() => {
  if (!isPlaying) return
  current = current >= 100 ? 0 : current + 0.4
  progress.style.width = current + '%'
}, 120)

playButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  disc.classList.toggle('is-playing', isPlaying)
  playButton.textContent = isPlaying ? '❚❚' : '▶'
})

window.addEventListener('beforeunload', () => window.clearInterval(interval))`,
    },
    'starlight-nocturne-music-player-card': {
      html: `<article class="starlight-player">
  <div class="stars"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="top-actions">
    <button type="button" aria-label="Voltar">←</button>
    <button type="button" aria-label="Menu">≡</button>
  </div>

  <div id="disc" class="disc is-playing">
    <div class="album-art">
      <img src="./assets/haim.png" alt="Capa Days Are Gone - HAIM" />
    </div>
  </div>

  <section class="wave-panel dark">
    <button type="button" class="share-btn" aria-label="Compartilhar faixa">↗</button>
    <strong>Haim - The Wire</strong>
    <p>Starlight Nocturne</p>
    <div class="progress"><i id="progress-fill" style="width: 42%"></i></div>
    <button id="retro-play" type="button">❚❚</button>
  </section>
</article>`,
      css: `.starlight-player {
  position: relative;
  width: min(100%, 320px);
  border-radius: 32px;
  padding: 1rem;
  overflow: hidden;
  background: linear-gradient(160deg, #070914 0%, #111830 52%, #1f2450 100%);
}

.stars i {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #ffffff;
  animation: drift 8s ease-in-out infinite alternate;
}

.wave-panel.dark {
  position: relative;
  background: linear-gradient(180deg, rgba(26, 32, 67, 0.96) 0%, rgba(16, 18, 39, 0.98) 100%);
  color: #e9edff;
}

@keyframes drift {
  0% { transform: translate(0, 0) scale(0.9); }
  100% { transform: translate(var(--drift-x, 4px), var(--drift-y, -6px)) scale(1.2); }
}`,
      ts: `const playButton = document.getElementById('retro-play') as HTMLButtonElement
const disc = document.getElementById('disc') as HTMLDivElement
const progress = document.getElementById('progress-fill') as HTMLSpanElement

let isPlaying = true
let current = 42

const interval = window.setInterval(() => {
  if (!isPlaying) return
  current = current >= 100 ? 0 : current + 0.34
  progress.style.width = current + '%'
}, 120)

playButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  disc.classList.toggle('is-playing', isPlaying)
  playButton.textContent = isPlaying ? '❚❚' : '▶'
})

window.addEventListener('beforeunload', () => window.clearInterval(interval))`,
    },
    'forest-leaf-music-player-card': {
      html: `<article class="forest-player">
  <div class="leaves"><span></span><span></span><span></span><span></span></div>
  <div class="top-actions">
    <button type="button" aria-label="Voltar">←</button>
    <button type="button" aria-label="Menu">≡</button>
  </div>

  <div id="disc" class="disc is-playing">
    <div class="album-art">
      <img src="./assets/haim.png" alt="Capa Days Are Gone - HAIM" />
    </div>
  </div>

  <section class="wave-panel forest">
    <button type="button" class="share-btn" aria-label="Compartilhar faixa">↗</button>
    <strong>Haim - The Wire</strong>
    <p>Forest Canopy Mix</p>
    <div class="progress"><i id="progress-fill" style="width: 46%"></i></div>
    <button id="retro-play" type="button">❚❚</button>
  </section>
</article>`,
      css: `.forest-player {
  position: relative;
  width: min(100%, 320px);
  border-radius: 32px;
  padding: 1rem;
  overflow: hidden;
  background: linear-gradient(165deg, #10291d 0%, #1C472D 52%, #2e6b45 100%);
}

.leaves span {
  position: absolute;
  width: 18px;
  height: 30px;
  border-radius: 100% 0;
  background: rgba(166, 214, 150, 0.16);
  animation: sway 7s ease-in-out infinite alternate;
}

.wave-panel.forest {
  position: relative;
  background: linear-gradient(180deg, rgba(24, 61, 40, 0.96) 0%, rgba(13, 33, 22, 0.98) 100%);
  color: #eaf9ec;
}

@keyframes sway {
  0% { transform: rotate(-15deg) scale(1); }
  100% { transform: rotate(12deg) scale(1.08); }
}`,
      ts: `const playButton = document.getElementById('retro-play') as HTMLButtonElement
const disc = document.getElementById('disc') as HTMLDivElement
const progress = document.getElementById('progress-fill') as HTMLSpanElement

let isPlaying = true
let current = 46

const interval = window.setInterval(() => {
  if (!isPlaying) return
  current = current >= 100 ? 0 : current + 0.32
  progress.style.width = current + '%'
}, 120)

playButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  disc.classList.toggle('is-playing', isPlaying)
  playButton.textContent = isPlaying ? '❚❚' : '▶'
})

window.addEventListener('beforeunload', () => window.clearInterval(interval))`,
    },
    'music-player-top-icon-button': {
      html: `<button id="mp-top-btn" class="mp-top-icon-button mp-theme-night" type="button" aria-pressed="false" aria-label="Abrir menu">≡</button>`,
      css: `.mp-top-icon-button {
  width: 46px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #d9e4ff;
  font-size: 1.25rem;
  background: linear-gradient(145deg, #253264, #151d39);
  box-shadow: 8px 8px 14px rgba(8, 12, 26, 0.62), -6px -6px 12px rgba(75, 95, 164, 0.24);
}`,
      ts: `const topButton = document.getElementById('mp-top-btn') as HTMLButtonElement

topButton.addEventListener('click', () => {
  const isOpen = topButton.getAttribute('aria-pressed') === 'true'
  topButton.setAttribute('aria-pressed', String(!isOpen))
  topButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu')
  topButton.textContent = isOpen ? '≡' : '×'
})`,
    },
    'music-player-top-icon-button-forest': {
      html: `<button id="mp-top-btn" class="mp-top-icon-button mp-theme-forest" type="button" aria-pressed="false" aria-label="Abrir menu">≡</button>`,
      css: `.mp-top-icon-button {
  width: 46px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #d2efd6;
  font-size: 1.25rem;
  background: linear-gradient(145deg, #2d6c42, #173b26);
  box-shadow: 8px 8px 14px rgba(6, 16, 10, 0.48), -6px -6px 12px rgba(92, 150, 98, 0.2);
}`,
      ts: `const topButton = document.getElementById('mp-top-btn') as HTMLButtonElement

topButton.addEventListener('click', () => {
  const isOpen = topButton.getAttribute('aria-pressed') === 'true'
  topButton.setAttribute('aria-pressed', String(!isOpen))
  topButton.textContent = isOpen ? '≡' : '×'
})`,
    },
    'music-player-play-button': {
      html: `<button id="mp-play-btn" class="mp-play-button mp-theme-night" type="button" aria-pressed="false" aria-label="Tocar">▶</button>`,
      css: `.mp-play-button {
  width: 68px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.35rem;
  background: linear-gradient(145deg, #8b8bff, #6876ff);
  box-shadow: 10px 10px 18px rgba(16, 21, 46, 0.62), -8px -8px 16px rgba(128, 142, 247, 0.32);
}`,
      ts: `const playButton = document.getElementById('mp-play-btn') as HTMLButtonElement

playButton.addEventListener('click', () => {
  const isPlaying = playButton.getAttribute('aria-pressed') === 'true'
  playButton.setAttribute('aria-pressed', String(!isPlaying))
  playButton.setAttribute('aria-label', isPlaying ? 'Tocar' : 'Pausar')
  playButton.textContent = isPlaying ? '▶' : '❚❚'
})`,
    },
    'music-player-play-button-forest': {
      html: `<button id="mp-play-btn" class="mp-play-button mp-theme-forest" type="button" aria-pressed="false" aria-label="Tocar">▶</button>`,
      css: `.mp-play-button {
  width: 68px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.35rem;
  background: linear-gradient(145deg, #7dbd74, #5c9a55);
  box-shadow: 10px 10px 18px rgba(10, 23, 14, 0.6), -8px -8px 16px rgba(131, 189, 122, 0.3);
}`,
      ts: `const playButton = document.getElementById('mp-play-btn') as HTMLButtonElement

playButton.addEventListener('click', () => {
  const isPlaying = playButton.getAttribute('aria-pressed') === 'true'
  playButton.setAttribute('aria-pressed', String(!isPlaying))
  playButton.textContent = isPlaying ? '▶' : '❚❚'
})`,
    },
    'music-player-share-button': {
      html: `<button id="mp-share-btn" class="mp-share-button mp-theme-night" type="button" aria-pressed="false" aria-label="Compartilhar faixa">↗</button>`,
      css: `.mp-share-button {
  width: 42px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #d8e2ff;
  font-size: 1rem;
  background: linear-gradient(145deg, #253264, #151d39);
  box-shadow: 7px 7px 12px rgba(7, 10, 23, 0.6), -5px -5px 10px rgba(78, 98, 165, 0.24);
}

.mp-share-button.is-shared {
  color: #ffffff;
  background: linear-gradient(145deg, #5c9a55, #7dbd74);
}`,
      ts: `const shareButton = document.getElementById('mp-share-btn') as HTMLButtonElement

shareButton.addEventListener('click', () => {
  const isShared = shareButton.getAttribute('aria-pressed') === 'true'
  shareButton.setAttribute('aria-pressed', String(!isShared))
  shareButton.classList.toggle('is-shared', !isShared)
})`,
    },
    'music-player-share-button-forest': {
      html: `<button id="mp-share-btn" class="mp-share-button mp-theme-forest" type="button" aria-pressed="false" aria-label="Compartilhar faixa">↗</button>`,
      css: `.mp-share-button {
  width: 42px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #daf3de;
  font-size: 1rem;
  background: linear-gradient(145deg, #2d6c42, #173b26);
  box-shadow: 6px 6px 12px rgba(5, 15, 9, 0.55), -4px -4px 10px rgba(76, 133, 84, 0.2);
}

.mp-share-button.is-shared {
  color: #ffffff;
  background: linear-gradient(145deg, #7dbd74, #5c9a55);
}`,
      ts: `const shareButton = document.getElementById('mp-share-btn') as HTMLButtonElement

shareButton.addEventListener('click', () => {
  const isShared = shareButton.getAttribute('aria-pressed') === 'true'
  shareButton.setAttribute('aria-pressed', String(!isShared))
  shareButton.classList.toggle('is-shared', !isShared)
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
}

@keyframes worker-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes broom-sweep {
  0%, 100% { transform: rotate(11deg); }
  50% { transform: rotate(-9deg); }
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
    'radial-heatmap-clock': {
      html: `<div class="heatmap-clock-wrap">
  <svg id="heatmap-svg" viewBox="0 0 160 160" aria-label="Radial heatmap clock"></svg>
</div>`,
      css: `.heatmap-clock-wrap {
  width: 180px;
  display: flex;
  justify-content: center;
}
#heatmap-svg path {
  cursor: pointer;
  transition: opacity 0.15s;
}
#heatmap-svg path:hover {
  opacity: 1;
  stroke: rgba(255,255,255,0.6);
  stroke-width: 0.8px;
}`,
      ts: `const heatData = [0.08,0.04,0.02,0.02,0.06,0.18,0.35,0.72,0.92,0.87,0.74,0.85,0.9,0.8,0.72,0.68,0.76,0.88,0.82,0.7,0.52,0.38,0.24,0.14]
const svg = document.getElementById('heatmap-svg')!
const cx = 80, cy = 80, outerR = 68, innerR = 40

const getColor = (v: number) => {
  if (v < 0.2) return \`hsl(220,55%,\${28 + v * 60}%)\`
  if (v < 0.45) return \`hsl(\${210 - (v - 0.2) * 360},65%,52%)\`
  if (v < 0.7) return \`hsl(\${120 - (v - 0.45) * 320},72%,52%)\`
  return \`hsl(\${40 - (v - 0.7) * 133},90%,58%)\`
}

heatData.forEach((heat, idx) => {
  const startA = (idx / 24) * 2 * Math.PI - Math.PI / 2
  const endA = ((idx + 1) / 24) * 2 * Math.PI - Math.PI / 2
  const g = 0.018
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', \`M\${cx + outerR * Math.cos(startA + g)},\${cy + outerR * Math.sin(startA + g)} A\${outerR},\${outerR} 0 0,1 \${cx + outerR * Math.cos(endA - g)},\${cy + outerR * Math.sin(endA - g)} L\${cx + innerR * Math.cos(endA - g)},\${cy + innerR * Math.sin(endA - g)} A\${innerR},\${innerR} 0 0,0 \${cx + innerR * Math.cos(startA + g)},\${cy + innerR * Math.sin(startA + g)} Z\`)
  path.setAttribute('fill', getColor(heat))
  path.setAttribute('opacity', '0.8')
  svg.appendChild(path)
})`,
    },
    'liquid-level-gauge': {
      html: `<div class="gauge-wrap">
  <svg viewBox="0 0 120 120" id="gauge-svg" aria-label="Gauge circular">
    <circle id="gauge-bg" cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="9"/>
    <circle id="gauge-arc" cx="60" cy="60" r="50" fill="none" stroke="#22c55e" stroke-width="9" stroke-linecap="round" transform="rotate(-90 60 60)"/>
    <text id="gauge-val" x="60" y="55" text-anchor="middle" font-size="22" font-weight="700" fill="white">62%</text>
    <text id="gauge-lbl" x="60" y="72" text-anchor="middle" font-size="9" fill="#22c55e" font-weight="600">Ótimo</text>
  </svg>
  <input type="range" id="gauge-slider" min="0" max="100" value="62"/>
</div>`,
      css: `.gauge-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
#gauge-svg { width: 150px; height: 150px; }
#gauge-slider { width: 140px; accent-color: #5ad0de; }`,
      ts: `const arc = document.getElementById('gauge-arc') as SVGCircleElement
const val = document.getElementById('gauge-val')!
const lbl = document.getElementById('gauge-lbl')!
const slider = document.getElementById('gauge-slider') as HTMLInputElement
const r = 50, circ = 2 * Math.PI * r

const getColor = (v: number) => v < 25 ? '#ef4444' : v < 50 ? '#f97316' : v < 75 ? '#3b82f6' : '#22c55e'
const getLabel = (v: number) => v < 25 ? 'Crítico' : v < 50 ? 'Baixo' : v < 75 ? 'Normal' : 'Ótimo'

const update = (level: number) => {
  const color = getColor(level)
  arc.style.strokeDasharray = \`\${circ * level / 100} \${circ}\`
  arc.style.stroke = color
  val.textContent = level + '%'
  lbl.textContent = getLabel(level)
  lbl.style.fill = color
}

slider.addEventListener('input', () => update(Number(slider.value)))
update(62)`,
    },
    'typewriter-terminal-card': {
      html: `<div class="typewriter-card">
  <div class="typewriter-header">
    <span class="term-dot dot-red"></span>
    <span class="term-dot dot-yellow"></span>
    <span class="term-dot dot-green"></span>
    <span class="term-title">design-system — bash</span>
  </div>
  <div id="typewriter-body" class="typewriter-body"></div>
</div>`,
      css: `.typewriter-card {
  background: #0d1117;
  border-radius: 12px;
  overflow: hidden;
  font-family: ui-monospace, monospace;
  min-width: 280px;
}
.typewriter-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #161b22;
}
.term-dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }
.term-title { color: #8b949e; font-size: 12px; margin-left: 6px; }
.typewriter-body { padding: 12px 16px; min-height: 120px; }
.term-line { color: #00ff88; font-size: 0.8rem; line-height: 1.7; }
.term-cursor { animation: blink 0.7s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`,
      ts: `const lines = [
  '> iniciando análise de componentes...',
  '> carregando design system...',
  '> 47 elementos detectados.',
  '> todos os checks passaram ✓',
  '> pronto para produção 🚀',
]
let lineIdx = 0, charIdx = 0, done: string[] = []
const body = document.getElementById('typewriter-body')!

const tick = () => {
  if (lineIdx >= lines.length) {
    setTimeout(() => { done = []; lineIdx = 0; charIdx = 0; body.innerHTML = ''; tick() }, 2800)
    return
  }
  if (charIdx < lines[lineIdx].length) {
    charIdx++
  } else {
    done.push(lines[lineIdx]); lineIdx++; charIdx = 0
  }
  render()
  setTimeout(tick, charIdx > 0 ? 38 : 320)
}

const render = () => {
  body.innerHTML = done.map(l => \`<div class="term-line">\${l}</div>\`).join('')
    + (lineIdx < lines.length ? \`<div class="term-line">\${lines[lineIdx].substring(0, charIdx)}<span class="term-cursor">▊</span></div>\` : '')
}

tick()`,
    },
    'event-ticket-card': {
      html: `<article id="ticket" class="event-ticket" role="button" tabindex="0" aria-label="Clique para validar">
  <div class="ticket-left">
    <div class="ticket-tag">UI SUMMIT</div>
    <h3 class="ticket-title">Design Systems<br>Conference</h3>
    <div class="ticket-meta"><span>15 AGO 2025</span><span>19:00h</span></div>
    <div class="ticket-seat">FILA A · LUGAR 12</div>
  </div>
  <div class="ticket-perforation"></div>
  <div class="ticket-right">
    <div class="ticket-qr" aria-label="QR code"></div>
    <div class="ticket-serial">#UI-20250815-012</div>
  </div>
</article>`,
      css: `.event-ticket {
  display: flex;
  background: linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0d2b5c 100%);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  transition: filter 0.3s, opacity 0.3s;
}
.event-ticket.is-used { filter: grayscale(0.7); opacity: 0.7; }
.ticket-left { padding: 18px; flex: 1; color: white; }
.ticket-tag { font-size: 0.65rem; letter-spacing: 0.12em; color: #c084fc; font-weight: 700; }
.ticket-title { margin: 6px 0; font-size: 1rem; line-height: 1.3; }
.ticket-perforation { width: 2px; border-left: 2px dashed rgba(255,255,255,0.25); margin: 12px 0; }
.ticket-right { padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.ticket-serial { font-size: 0.6rem; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; }`,
      ts: `const ticket = document.getElementById('ticket')!
ticket.addEventListener('click', () => ticket.classList.toggle('is-used'))`,
    },
    'notification-bell-badge': {
      html: `<div class="notif-wrap">
  <button id="notif-bell" class="notif-bell-btn" aria-label="7 notificações">
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
    <span id="notif-count" class="notif-badge">7</span>
  </button>
</div>`,
      css: `.notif-bell-btn {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(145deg, #1a2a4a, #0f1d35);
  color: #a8d4f5;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}
.notif-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: badge-pulse 2s ease-in-out infinite;
}
@keyframes badge-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
  50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
}
.notif-bell-btn.is-ringing { animation: bell-ring 0.6s ease; }
@keyframes bell-ring {
  0%,100% { transform: rotate(0); }
  20% { transform: rotate(-18deg); }
  40% { transform: rotate(18deg); }
  60% { transform: rotate(-12deg); }
  80% { transform: rotate(12deg); }
}`,
      ts: `let count = 7
const bell = document.getElementById('notif-bell')!
const badge = document.getElementById('notif-count')!

bell.addEventListener('click', () => {
  count = 0
  badge.style.display = 'none'
  bell.setAttribute('aria-label', 'Sem notificações')
})`,
    },
    'rotary-dial-knob': {
      html: `<div class="rotary-wrap">
  <div class="rotary-ticks" id="rotary-ticks"></div>
  <button id="rotary-knob" class="rotary-knob" aria-label="Knob: 50" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <span class="knob-indicator"></span>
  </button>
  <div id="rotary-val" class="rotary-value">50</div>
</div>`,
      css: `.rotary-wrap { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.rotary-knob {
  position: absolute;
  top: 50%; left: 50%;
  width: 64px; height: 64px;
  border-radius: 50%; border: none;
  background: radial-gradient(circle at 38% 32%, #4a5568, #1a202c);
  box-shadow: 0 6px 18px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
  cursor: grab;
  transform: translate(-50%, -50%);
}
.rotary-knob.is-dragging { cursor: grabbing; }
.knob-indicator {
  position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
  width: 3px; height: 10px; background: #5ad0de; border-radius: 2px;
}
.rotary-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.4rem; font-weight: 700; color: #5ad0de; }`,
      ts: `const knob = document.getElementById('rotary-knob') as HTMLButtonElement
const valEl = document.getElementById('rotary-val')!
let angle = 0

knob.addEventListener('mousedown', (e) => {
  const rect = knob.getBoundingClientRect()
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2
  const move = (ev: MouseEvent) => {
    let a = Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180 / Math.PI + 90
    if (a > 180) a -= 360
    angle = Math.max(-135, Math.min(135, a))
    knob.style.transform = \`translate(-50%,-50%) rotate(\${angle}deg)\`
    const val = Math.round((angle + 135) / 270 * 100)
    valEl.textContent = String(val)
    knob.setAttribute('aria-valuenow', String(val))
  }
  const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  window.addEventListener('mousemove', move); window.addEventListener('mouseup', up)
})`,
    },
    'aurora-chip-selector': {
      html: `<div class="chip-selector-grid" role="group" aria-label="Seleção de áreas">
  <button class="aurora-chip-item" style="--chip-color:#a855f7" aria-pressed="true">Design</button>
  <button class="aurora-chip-item is-selected" style="--chip-color:#3b82f6" aria-pressed="true">Dev</button>
  <button class="aurora-chip-item" style="--chip-color:#22c55e" aria-pressed="false">Data</button>
  <button class="aurora-chip-item" style="--chip-color:#ec4899" aria-pressed="false">AI</button>
  <button class="aurora-chip-item" style="--chip-color:#f97316" aria-pressed="false">Motion</button>
  <button class="aurora-chip-item" style="--chip-color:#eab308" aria-pressed="false">Brand</button>
</div>`,
      css: `.chip-selector-grid {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
}
.aurora-chip-item {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1.5px solid color-mix(in srgb, var(--chip-color) 40%, transparent);
  background: color-mix(in srgb, var(--chip-color) 10%, transparent);
  color: var(--chip-color);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.aurora-chip-item.is-selected {
  background: color-mix(in srgb, var(--chip-color) 22%, transparent);
  border-color: var(--chip-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--chip-color) 40%, transparent);
}`,
      ts: `document.querySelectorAll<HTMLButtonElement>('.aurora-chip-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const isSelected = btn.getAttribute('aria-pressed') === 'true'
    btn.setAttribute('aria-pressed', String(!isSelected))
    btn.classList.toggle('is-selected', !isSelected)
  })
})`,
    },
    'timeline-stepper': {
      html: `<div class="stepper-track">
  <div class="stepper-item">
    <button class="stepper-node is-done" aria-label="Etapa 1: Briefing">
      <!-- Check icon (Lucide) -->
    </button>
    <div class="stepper-line is-done"></div>
  </div>
  <div class="stepper-item">
    <button class="stepper-node is-active" aria-label="Etapa 2: Design">
      <!-- Layers icon (Lucide) -->
    </button>
    <div class="stepper-line"></div>
  </div>
  <div class="stepper-item">
    <button class="stepper-node" aria-label="Etapa 3: Review">
      <!-- Search icon (Lucide) -->
    </button>
    <div class="stepper-line"></div>
  </div>
  <div class="stepper-item">
    <button class="stepper-node" aria-label="Etapa 4: Deploy">
      <!-- Rocket icon (Lucide) -->
    </button>
  </div>
</div>
<div id="stepper-info" class="stepper-info">
  <strong>Design</strong><span>Prototipagem e UI</span>
</div>`,
      css: `.stepper-track { display: flex; align-items: center; gap: 0; }
.stepper-item { display: flex; align-items: center; }
.stepper-node {
  width: 42px; height: 42px;
  border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.05); color: #6b8898;
  font-size: 1.1rem; cursor: pointer; flex-shrink: 0;
  transition: all 0.25s ease;
}
.stepper-node.is-done { background: #0e8d9a; border-color: #0e8d9a; color: white; }
.stepper-node.is-active { background: rgba(90,208,222,0.15); border-color: #5ad0de; color: #5ad0de; box-shadow: 0 0 16px rgba(90,208,222,0.3); }
.stepper-line { height: 3px; width: 48px; background: rgba(255,255,255,0.1); transition: background 0.3s; }
.stepper-line.is-done { background: #0e8d9a; }
.stepper-info { margin-top: 12px; display: flex; flex-direction: column; gap: 2px; }
.stepper-info strong { font-size: 0.95rem; color: #e5f5ff; }
.stepper-info span { font-size: 0.78rem; color: #6b8898; }`,
      ts: `const nodes = document.querySelectorAll<HTMLButtonElement>('.stepper-node')
const lines = document.querySelectorAll<HTMLDivElement>('.stepper-line')
const info = document.getElementById('stepper-info')!
const steps = [
  { label: 'Briefing', desc: 'Coleta de requisitos' },
  { label: 'Design', desc: 'Prototipagem e UI' },
  { label: 'Review', desc: 'Feedback e ajustes' },
  { label: 'Deploy', desc: 'Publicação final' },
]

nodes.forEach((node, idx) => {
  node.addEventListener('click', () => {
    nodes.forEach((n, i) => {
      n.className = 'stepper-node' + (i < idx ? ' is-done' : i === idx ? ' is-active' : '')
    })
    lines.forEach((l, i) => l.classList.toggle('is-done', i < idx))
    info.innerHTML = \`<strong>\${steps[idx].label}</strong><span>\${steps[idx].desc}</span>\`
  })
})`,
    },
    'flip-counter-display': {
      html: `<div class="flip-counter-wrap">
  <div class="flip-display">
    <div class="flip-card" id="flip-d1">
      <div class="flip-top">4</div>
      <div class="flip-divider"></div>
      <div class="flip-bottom">4</div>
    </div>
    <div class="flip-card" id="flip-d2">
      <div class="flip-top">2</div>
      <div class="flip-divider"></div>
      <div class="flip-bottom">2</div>
    </div>
  </div>
  <div class="flip-controls">
    <button id="flip-down" class="flip-btn flip-btn-down">−</button>
    <button id="flip-up" class="flip-btn flip-btn-up">+</button>
  </div>
</div>`,
      css: `.flip-display { display: flex; gap: 6px; }
.flip-card {
  width: 58px; height: 80px;
  background: #1a1a2e; border-radius: 8px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  font-family: 'Space Grotesk', sans-serif; font-size: 2.4rem; font-weight: 700; color: #e5f5ff;
}
.flip-divider {
  position: absolute; top: 50%; left: 0; right: 0;
  height: 1px; background: rgba(0,0,0,0.5);
}
.flip-btn {
  width: 42px; height: 42px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05);
  color: #e5f5ff; font-size: 1.3rem; cursor: pointer;
  transition: background 0.2s;
}
.flip-btn:hover:not(:disabled) { background: rgba(90,208,222,0.15); border-color: #5ad0de; }
.flip-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.flip-controls { display: flex; gap: 10px; margin-top: 12px; justify-content: center; }
.flip-card.flip-up { animation: flip-up 0.22s ease; }
.flip-card.flip-down { animation: flip-down 0.22s ease; }
@keyframes flip-up { 0%{transform:rotateX(0)} 50%{transform:rotateX(-90deg)} 100%{transform:rotateX(0)} }
@keyframes flip-down { 0%{transform:rotateX(0)} 50%{transform:rotateX(90deg)} 100%{transform:rotateX(0)} }`,
      ts: `let value = 42
const d1 = document.getElementById('flip-d1')!
const d2 = document.getElementById('flip-d2')!
const btnUp = document.getElementById('flip-up') as HTMLButtonElement
const btnDown = document.getElementById('flip-down') as HTMLButtonElement

const updateDisplay = () => {
  const s = String(value).padStart(2, '0')
  const cards = [d1, d2]
  cards.forEach((card, i) => {
    card.classList.add('flip-up')
    setTimeout(() => {
      card.querySelectorAll('.flip-top, .flip-bottom').forEach(el => el.textContent = s[i])
      card.classList.remove('flip-up')
    }, 110)
  })
  btnDown.disabled = value <= 0
  btnUp.disabled = value >= 99
}

btnUp.addEventListener('click', () => { if (value < 99) { value++; updateDisplay() } })
btnDown.addEventListener('click', () => { if (value > 0) { value--; updateDisplay() } })`,
    },
    'holographic-card': {
      html: `<div id="holo-card" class="holo-card" role="img" aria-label="Card holográfico">
  <div class="holo-shine"></div>
  <div class="holo-logo">★ HOLO</div>
  <div class="holo-chip"><span></span><span></span><span></span><span></span></div>
  <div class="holo-number">•••• •••• •••• 7831</div>
  <div class="holo-footer">
    <span class="holo-name">DESIGN SYSTEM PRO</span>
    <span class="holo-expiry">12/28</span>
  </div>
</div>`,
      css: `.holo-card {
  width: 280px; height: 170px;
  border-radius: 18px; padding: 20px;
  background: linear-gradient(135deg, #1a1a3e 0%, #2d1b6e 40%, #1a3a2e 100%);
  position: relative; overflow: hidden;
  transform-style: preserve-3d; transition: transform 0.1s ease;
  color: white; cursor: crosshair;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.holo-shine {
  position: absolute; inset: 0; border-radius: 18px;
  background: radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.18) 0%, transparent 60%);
  mix-blend-mode: overlay; pointer-events: none;
  background-image: linear-gradient(105deg, transparent 20%, rgba(255,100,200,0.12) 40%, rgba(100,200,255,0.12) 60%, transparent 80%);
}
.holo-logo { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; opacity: 0.7; }
.holo-chip {
  margin-top: 12px; width: 38px; height: 28px; border-radius: 5px;
  background: linear-gradient(135deg, #c9a227, #f0d060);
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 1px;
}
.holo-chip span { background: rgba(0,0,0,0.15); border-radius: 2px; }
.holo-number { margin-top: 10px; font-size: 0.9rem; letter-spacing: 0.15em; font-family: monospace; }
.holo-footer { display: flex; justify-content: space-between; margin-top: 12px; font-size: 0.7rem; opacity: 0.8; }`,
      ts: `const card = document.getElementById('holo-card') as HTMLDivElement
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22
  const y = -((e.clientY - rect.top) / rect.height - 0.5) * 22
  card.style.transform = \`perspective(900px) rotateX(\${y}deg) rotateY(\${x}deg)\`
  card.style.setProperty('--shine-x', \`\${(e.clientX - rect.left) / rect.width * 100}%\`)
  card.style.setProperty('--shine-y', \`\${(e.clientY - rect.top) / rect.height * 100}%\`)
})
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'
})`,
    },
    'neo-toggle-switch': {
      html: `<div class="neo-wrap">
  <div class="neo-toggle-track" id="toggle" role="switch" aria-checked="false" tabindex="0">
    <div class="neo-toggle-thumb"></div>
  </div>
  <p id="toggle-label">Desativado</p>
</div>`,
      css: `.neo-wrap { background:#e4e9f2; border-radius:1.5rem; padding:2rem; display:flex; flex-direction:column; align-items:center; gap:1rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); }
.neo-toggle-track { width:80px; height:42px; border-radius:999px; background:#e4e9f2; box-shadow:inset 6px 6px 12px rgba(163,177,198,.6),inset -6px -6px 12px rgba(255,255,255,.9); cursor:pointer; position:relative; transition:background .3s; }
.neo-toggle-track.is-on { background:#d0dcf0; }
.neo-toggle-thumb { position:absolute; top:5px; left:5px; width:32px; height:32px; border-radius:50%; background:#e4e9f2; box-shadow:4px 4px 8px rgba(163,177,198,.6),-4px -4px 8px rgba(255,255,255,.9); transition:transform .3s ease,background .3s,box-shadow .3s; }
.neo-toggle-track.is-on .neo-toggle-thumb { transform:translateX(38px); background:#6c8ebf; box-shadow:4px 4px 8px rgba(80,120,160,.4),0 0 12px rgba(108,142,191,.4); }`,
      ts: `const track = document.getElementById('toggle')!
const label = document.getElementById('toggle-label')!
track.addEventListener('click', () => {
  const on = track.getAttribute('aria-checked') === 'true'
  track.setAttribute('aria-checked', String(!on))
  track.classList.toggle('is-on', !on)
  label.textContent = !on ? 'Ativado' : 'Desativado'
})`,
    },
    'neo-music-player': {
      html: `<div class="neo-player-card">
  <div class="neo-track-info">
    <span class="neo-track-title">Midnight Echo</span>
    <span class="neo-track-artist">Lunar Drift</span>
  </div>
  <div class="neo-progress-track"><div id="neo-fill" class="neo-progress-fill" style="width:34%"></div></div>
  <div class="neo-player-controls">
    <button class="neo-ctrl-btn" id="neo-prev">⏮</button>
    <button class="neo-ctrl-btn neo-ctrl-main" id="neo-play">▶</button>
    <button class="neo-ctrl-btn" id="neo-next">⏭</button>
  </div>
</div>`,
      css: `.neo-player-card { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; width:240px; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; gap:1rem; }
.neo-track-info { display:flex; flex-direction:column; gap:2px; }
.neo-track-title { font-weight:700; font-size:.95rem; color:#3d4a5c; }
.neo-track-artist { font-size:.78rem; color:#8899aa; }
.neo-progress-track { height:8px; border-radius:999px; background:#e4e9f2; box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); overflow:hidden; }
.neo-progress-fill { height:100%; background:#6c8ebf; border-radius:999px; transition:width .2s; }
.neo-player-controls { display:flex; justify-content:center; gap:12px; }
.neo-ctrl-btn { width:48px; height:48px; border-radius:50%; border:none; background:#e4e9f2; box-shadow:5px 5px 10px rgba(163,177,198,.6),-5px -5px 10px rgba(255,255,255,.9); cursor:pointer; font-size:1.1rem; color:#3d4a5c; transition:box-shadow .15s; }
.neo-ctrl-btn:active { box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); }
.neo-ctrl-main { width:58px; height:58px; font-size:1.3rem; }`,
      ts: `const play = document.getElementById('neo-play')!
const fill = document.getElementById('neo-fill') as HTMLDivElement
let playing = false, pct = 34
play.addEventListener('click', () => { playing = !playing; play.textContent = playing ? '⏸' : '▶' })
setInterval(() => { if (playing) { pct = pct >= 100 ? 0 : pct + .3; fill.style.width = pct + '%' } }, 200)`,
    },
    'neo-numpad': {
      html: `<div class="neo-numpad-wrap">
  <div id="neo-display" class="neo-numpad-display">0</div>
  <div class="neo-numpad-grid">
    <button class="neo-num-key">1</button><button class="neo-num-key">2</button><button class="neo-num-key">3</button>
    <button class="neo-num-key">4</button><button class="neo-num-key">5</button><button class="neo-num-key">6</button>
    <button class="neo-num-key">7</button><button class="neo-num-key">8</button><button class="neo-num-key">9</button>
    <button class="neo-num-key neo-key-clear">C</button><button class="neo-num-key">0</button><button class="neo-num-key neo-key-back">⌫</button>
  </div>
</div>`,
      css: `.neo-numpad-wrap { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; gap:1rem; width:220px; }
.neo-numpad-display { background:#e4e9f2; border-radius:.75rem; padding:.75rem 1rem; text-align:right; font-size:1.6rem; font-weight:700; color:#3d4a5c; box-shadow:inset 5px 5px 10px rgba(163,177,198,.6),inset -5px -5px 10px rgba(255,255,255,.9); min-height:3.2rem; }
.neo-numpad-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.neo-num-key { aspect-ratio:1; border:none; border-radius:.75rem; background:#e4e9f2; box-shadow:4px 4px 8px rgba(163,177,198,.6),-4px -4px 8px rgba(255,255,255,.9); font-size:1.1rem; font-weight:600; color:#3d4a5c; cursor:pointer; transition:box-shadow .12s; }
.neo-num-key:active { box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); }
.neo-key-clear { color:#ef4444; } .neo-key-back { font-size:.9rem; }`,
      ts: `const display = document.getElementById('neo-display')!
let val = ''
document.querySelectorAll<HTMLButtonElement>('.neo-num-key').forEach(btn => {
  btn.addEventListener('click', () => {
    const k = btn.textContent!.trim()
    if (k === 'C') val = ''
    else if (k === '⌫') val = val.slice(0,-1)
    else if (val.length < 8) val += k
    display.textContent = val || '0'
  })
})`,
    },
    'neo-stat-display': {
      html: `<div class="neo-stat-card">
  <span class="neo-stat-label">Receita Mensal</span>
  <span class="neo-stat-value">R$ 148k</span>
  <span class="neo-stat-sub" style="color:#22c55e">+12.4%</span>
  <div class="neo-stat-bar-track"><div class="neo-stat-bar-fill" style="width:74%;background:#22c55e"></div></div>
</div>`,
      css: `.neo-stat-card { background:#e4e9f2; border-radius:1.5rem; padding:1.75rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; gap:.5rem; min-width:200px; }
.neo-stat-label { font-size:.75rem; color:#8899aa; text-transform:uppercase; letter-spacing:.07em; font-weight:600; }
.neo-stat-value { font-size:2rem; font-weight:800; color:#3d4a5c; line-height:1; }
.neo-stat-sub { font-size:.85rem; font-weight:700; }
.neo-stat-bar-track { margin-top:.5rem; height:8px; border-radius:999px; background:#e4e9f2; box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); overflow:hidden; }
.neo-stat-bar-fill { height:100%; border-radius:999px; transition:width .4s ease; }`,
      ts: `// Swap data dynamically
const card = document.querySelector('.neo-stat-card')!
const data = [
  { label:'Receita Mensal', value:'R$ 148k', sub:'+12.4%', color:'#22c55e', pct:74 },
  { label:'Usuários Ativos', value:'9.2k', sub:'+8.1%', color:'#3b82f6', pct:61 },
]
let i = 0
setInterval(() => {
  i = (i+1) % data.length
  const d = data[i]
  card.querySelector('.neo-stat-label')!.textContent = d.label
  card.querySelector('.neo-stat-value')!.textContent = d.value
  const sub = card.querySelector<HTMLElement>('.neo-stat-sub')!
  sub.textContent = d.sub; sub.style.color = d.color
  const fill = card.querySelector<HTMLElement>('.neo-stat-bar-fill')!
  fill.style.width = d.pct + '%'; fill.style.background = d.color
}, 2000)`,
    },
    'neo-color-swatches': {
      html: `<div class="neo-swatch-wrap">
  <div class="neo-swatch-grid">
    <button class="neo-swatch" style="--sw-color:#ef4444" aria-label="Vermelho"></button>
    <button class="neo-swatch" style="--sw-color:#f97316" aria-label="Laranja"></button>
    <button class="neo-swatch is-selected" style="--sw-color:#eab308" aria-label="Amarelo"></button>
    <button class="neo-swatch" style="--sw-color:#22c55e" aria-label="Verde"></button>
    <button class="neo-swatch" style="--sw-color:#3b82f6" aria-label="Azul"></button>
    <button class="neo-swatch" style="--sw-color:#a855f7" aria-label="Roxo"></button>
  </div>
</div>`,
      css: `.neo-swatch-wrap { background:#e4e9f2; border-radius:1.5rem; padding:2rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); }
.neo-swatch-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.neo-swatch { width:52px; height:52px; border-radius:50%; border:none; background:var(--sw-color); cursor:pointer; box-shadow:5px 5px 10px rgba(163,177,198,.6),-5px -5px 10px rgba(255,255,255,.9); transition:box-shadow .18s,transform .18s; }
.neo-swatch:hover { transform:scale(1.06); }
.neo-swatch.is-selected { box-shadow:inset 4px 4px 8px rgba(0,0,0,.25),inset -2px -2px 6px rgba(255,255,255,.2),0 0 0 3px var(--sw-color),0 0 0 5px #e4e9f2; transform:scale(.96); }`,
      ts: `document.querySelectorAll<HTMLButtonElement>('.neo-swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.neo-swatch').forEach(b => b.classList.remove('is-selected'))
    btn.classList.add('is-selected')
  })
})`,
    },
    'neo-analog-clock': {
      html: `<div class="neo-clock-face">
  <svg id="clock-svg" viewBox="0 0 160 160" width="150" height="150"></svg>
</div>`,
      css: `.neo-clock-face { background:#e4e9f2; border-radius:50%; width:180px; height:180px; display:grid; place-items:center; box-shadow:10px 10px 20px rgba(163,177,198,.6),-10px -10px 20px rgba(255,255,255,.9); }`,
      ts: `const svg = document.getElementById('clock-svg') as unknown as SVGSVGElement
const ns = 'http://www.w3.org/2000/svg'
const line = (x2:number,y2:number,stroke:string,w:number) => {
  const el = document.createElementNS(ns,'line')
  Object.entries({x1:'80',y1:'80',x2:String(x2),y2:String(y2),stroke,strokeWidth:String(w),strokeLinecap:'round'}).forEach(([k,v])=>el.setAttribute(k,v))
  return el
}
function draw() {
  svg.innerHTML = ''
  const now = new Date()
  const s = now.getSeconds(), m = now.getMinutes()+s/60, h = (now.getHours()%12)+m/60
  const pt = (deg:number,r:number) => ({ x:80+r*Math.cos((deg-90)*Math.PI/180), y:80+r*Math.sin((deg-90)*Math.PI/180) })
  const hp=pt(h*30,44),mp=pt(m*6,58),sp=pt(s*6,65)
  for(let i=0;i<12;i++){const a=(i*30-90)*Math.PI/180;const r1=70,r2=i%3===0?60:65;const l=document.createElementNS(ns,'line');Object.entries({x1:String(80+r1*Math.cos(a)),y1:String(80+r1*Math.sin(a)),x2:String(80+r2*Math.cos(a)),y2:String(80+r2*Math.sin(a)),stroke:i%3===0?'#6c8ebf':'rgba(163,177,198,.7)',strokeWidth:i%3===0?'2.5':'1.5',strokeLinecap:'round'}).forEach(([k,v])=>l.setAttribute(k,v));svg.appendChild(l)}
  svg.appendChild(line(hp.x,hp.y,'#3d4a5c',4))
  svg.appendChild(line(mp.x,mp.y,'#3d4a5c',2.5))
  svg.appendChild(line(sp.x,sp.y,'#ef4444',1.5))
  const c=document.createElementNS(ns,'circle');c.setAttribute('cx','80');c.setAttribute('cy','80');c.setAttribute('r','5');c.setAttribute('fill','#3d4a5c');svg.appendChild(c)
}
draw(); setInterval(draw,1000)`,
    },
    'neo-equalizer': {
      html: `<div class="neo-eq-wrap">
  <div class="neo-eq-bars" id="neo-eq">
    <div class="neo-eq-column" data-level="45"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">Sub</span></div>
    <div class="neo-eq-column" data-level="68"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">80</span></div>
    <div class="neo-eq-column" data-level="82"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">250</span></div>
    <div class="neo-eq-column" data-level="91"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">1k</span></div>
    <div class="neo-eq-column" data-level="75"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">4k</span></div>
    <div class="neo-eq-column" data-level="58"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">8k</span></div>
    <div class="neo-eq-column" data-level="40"><div class="neo-eq-track"><div class="neo-eq-fill"></div></div><span class="neo-eq-label">16k</span></div>
  </div>
</div>`,
      css: `.neo-eq-wrap { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); }
.neo-eq-bars { display:flex; gap:10px; align-items:flex-end; height:140px; }
.neo-eq-column { display:flex; flex-direction:column; align-items:center; gap:6px; height:100%; cursor:pointer; }
.neo-eq-track { flex:1; width:22px; border-radius:999px; background:#e4e9f2; box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); position:relative; overflow:hidden; }
.neo-eq-fill { position:absolute; bottom:0; width:100%; background:linear-gradient(to top,#6c8ebf,#a8c8e8); border-radius:999px; transition:height .3s ease; }
.neo-eq-label { font-size:.6rem; color:#8899aa; font-weight:600; }`,
      ts: `document.querySelectorAll<HTMLElement>('.neo-eq-column').forEach(col => {
  const fill = col.querySelector<HTMLElement>('.neo-eq-fill')!
  let lv = Number(col.dataset.level) || 60
  fill.style.height = lv + '%'
  col.addEventListener('click', () => { lv = lv >= 90 ? 0 : lv + 20; fill.style.height = lv + '%' })
})`,
    },
    'neo-pin-lock': {
      html: `<div class="neo-pin-wrap">
  <div class="neo-pin-slots" id="pin-slots">
    <div class="neo-pin-slot"></div><div class="neo-pin-slot"></div>
    <div class="neo-pin-slot"></div><div class="neo-pin-slot"></div>
  </div>
  <div class="neo-pin-keypad">
    <button class="neo-pin-key">1</button><button class="neo-pin-key">2</button><button class="neo-pin-key">3</button>
    <button class="neo-pin-key">4</button><button class="neo-pin-key">5</button><button class="neo-pin-key">6</button>
    <button class="neo-pin-key">7</button><button class="neo-pin-key">8</button><button class="neo-pin-key">9</button>
    <div></div><button class="neo-pin-key">0</button><button class="neo-pin-key">⌫</button>
  </div>
</div>`,
      css: `.neo-pin-wrap { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; gap:1.2rem; width:220px; }
.neo-pin-slots { display:flex; gap:12px; justify-content:center; }
.neo-pin-slot { width:48px; height:48px; border-radius:.75rem; background:#e4e9f2; box-shadow:inset 5px 5px 10px rgba(163,177,198,.6),inset -5px -5px 10px rgba(255,255,255,.9); display:grid; place-items:center; font-size:1.4rem; color:#3d4a5c; transition:box-shadow .2s; }
.neo-pin-slot.is-filled { box-shadow:inset 3px 3px 6px rgba(163,177,198,.5),inset -3px -3px 6px rgba(255,255,255,.8); color:#6c8ebf; }
.neo-pin-keypad { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.neo-pin-key { aspect-ratio:1; border:none; border-radius:.75rem; background:#e4e9f2; box-shadow:4px 4px 8px rgba(163,177,198,.6),-4px -4px 8px rgba(255,255,255,.9); font-size:1.1rem; font-weight:600; color:#3d4a5c; cursor:pointer; transition:box-shadow .12s; }
.neo-pin-key:active { box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); }`,
      ts: `const CORRECT='1234'; let pin=''
const slots = document.querySelectorAll<HTMLElement>('.neo-pin-slot')
const update = () => slots.forEach((s,i) => { s.textContent = i<pin.length?'●':''; s.classList.toggle('is-filled',i<pin.length) })
document.querySelectorAll<HTMLButtonElement>('.neo-pin-key').forEach(btn => {
  btn.addEventListener('click', () => {
    const k = btn.textContent!.trim()
    if(k==='⌫'){pin=pin.slice(0,-1)}else if(pin.length<4){pin+=k}
    update()
    if(pin.length===4){setTimeout(()=>{pin='';update()},800)}
  })
})`,
    },
    'neo-star-rating': {
      html: `<div class="neo-stars-wrap">
  <div class="neo-stars-row" id="stars-row">
    <button class="neo-star-btn is-filled">★</button>
    <button class="neo-star-btn is-filled">★</button>
    <button class="neo-star-btn is-filled">★</button>
    <button class="neo-star-btn">★</button>
    <button class="neo-star-btn">★</button>
  </div>
  <p id="star-label">Bom</p>
</div>`,
      css: `.neo-stars-wrap { background:#e4e9f2; border-radius:1.5rem; padding:2rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; align-items:center; gap:1rem; }
.neo-stars-row { display:flex; gap:10px; }
.neo-star-btn { width:52px; height:52px; border-radius:50%; border:none; background:#e4e9f2; font-size:1.5rem; color:#c8d0dc; cursor:pointer; box-shadow:4px 4px 8px rgba(163,177,198,.6),-4px -4px 8px rgba(255,255,255,.9); transition:box-shadow .15s,color .15s; display:grid; place-items:center; }
.neo-star-btn.is-filled { color:#f59e0b; box-shadow:inset 3px 3px 6px rgba(163,177,198,.5),inset -3px -3px 6px rgba(255,255,255,.8); }`,
      ts: `const btns = Array.from(document.querySelectorAll<HTMLButtonElement>('.neo-star-btn'))
const label = document.getElementById('star-label')!
const labels = ['','Ruim','Regular','Bom','Ótimo','Excelente']
let rating = 3
const paint = (n:number) => btns.forEach((b,i) => b.classList.toggle('is-filled',i<n))
btns.forEach((btn,i) => {
  btn.addEventListener('mouseenter', () => { paint(i+1); label.textContent = labels[i+1] })
  btn.addEventListener('mouseleave', () => { paint(rating); label.textContent = labels[rating] })
  btn.addEventListener('click', () => { rating = i+1 })
})`,
    },
    'neo-progress-arc': {
      html: `<div class="neo-arc-wrap">
  <div class="neo-arc-face">
    <svg id="arc-svg" viewBox="0 0 180 180" width="180" height="180"></svg>
  </div>
  <input type="range" min="0" max="100" value="68" class="neo-arc-slider" id="arc-range">
</div>`,
      css: `.neo-arc-wrap { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; align-items:center; gap:1rem; }
.neo-arc-face { border-radius:50%; background:#e4e9f2; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); }
.neo-arc-slider { width:150px; accent-color:#6c8ebf; cursor:pointer; }`,
      ts: `const svg = document.getElementById('arc-svg') as unknown as SVGSVGElement
const range = document.getElementById('arc-range') as HTMLInputElement
const ns='http://www.w3.org/2000/svg'
const cx=90,cy=90,r=70
const pt=(deg:number)=>({x:cx+r*Math.cos((deg)*Math.PI/180),y:cy+r*Math.sin((deg)*Math.PI/180)})
function drawArc(val:number){
  svg.innerHTML=''
  const sd=225,td=270,fgDeg=sd+val/100*td
  const bs=pt(sd),be=pt(sd+td),fe=pt(fgDeg)
  const mkPath=(d:string,stroke:string,w:number)=>{const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke',stroke);p.setAttribute('stroke-width',String(w));p.setAttribute('stroke-linecap','round');svg.appendChild(p)}
  mkPath(\`M\${bs.x} \${bs.y} A\${r} \${r} 0 1 1 \${be.x} \${be.y}\`,'rgba(163,177,198,.35)',12)
  if(val>0)mkPath(\`M\${bs.x} \${bs.y} A\${r} \${r} 0 \${val/100*td>180?1:0} 1 \${fe.x} \${fe.y}\`,'#6c8ebf',12)
  const t=document.createElementNS(ns,'text');t.setAttribute('x','90');t.setAttribute('y','86');t.setAttribute('text-anchor','middle');t.setAttribute('font-size','26');t.setAttribute('font-weight','800');t.setAttribute('fill','#3d4a5c');t.textContent=val+'%';svg.appendChild(t)
}
drawArc(68); range.addEventListener('input',()=>drawArc(Number(range.value)))`,
    },
    'neo-switch-panel': {
      html: `<div class="neo-panel-card">
  <div class="neo-panel-row"><span class="neo-panel-icon"><!-- Wifi icon --></span><span class="neo-panel-label">Wi-Fi</span><div class="neo-panel-toggle is-on" role="switch" aria-checked="true" tabindex="0"><div class="neo-panel-thumb"></div></div></div>
  <div class="neo-panel-row"><span class="neo-panel-icon"><!-- Bluetooth icon --></span><span class="neo-panel-label">Bluetooth</span><div class="neo-panel-toggle" role="switch" aria-checked="false" tabindex="0"><div class="neo-panel-thumb"></div></div></div>
  <div class="neo-panel-row"><span class="neo-panel-icon"><!-- Bell icon --></span><span class="neo-panel-label">Notificações</span><div class="neo-panel-toggle is-on" role="switch" aria-checked="true" tabindex="0"><div class="neo-panel-thumb"></div></div></div>
  <div class="neo-panel-row"><span class="neo-panel-icon"><!-- Moon icon --></span><span class="neo-panel-label">Modo Escuro</span><div class="neo-panel-toggle" role="switch" aria-checked="false" tabindex="0"><div class="neo-panel-thumb"></div></div></div>
</div>`,
      css: `.neo-panel-card { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; gap:1rem; min-width:240px; }
.neo-panel-row { display:flex; align-items:center; gap:.75rem; }
.neo-panel-icon { width:18px; height:18px; display:flex; align-items:center; justify-content:center; color:#6c8ebf; flex-shrink:0; }
.neo-panel-label { flex:1; font-size:.88rem; font-weight:600; color:#3d4a5c; }
.neo-panel-toggle { width:58px; height:30px; border-radius:999px; background:#e4e9f2; box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); cursor:pointer; position:relative; flex-shrink:0; transition:background .3s; }
.neo-panel-toggle.is-on { background:#d0dcf0; }
.neo-panel-thumb { position:absolute; top:3px; left:3px; width:24px; height:24px; border-radius:50%; background:#e4e9f2; box-shadow:3px 3px 6px rgba(163,177,198,.6),-3px -3px 6px rgba(255,255,255,.9); transition:transform .3s,background .3s; }
.neo-panel-toggle.is-on .neo-panel-thumb { transform:translateX(28px); background:#6c8ebf; }`,
      ts: `document.querySelectorAll<HTMLElement>('.neo-panel-toggle').forEach(t => {
  t.addEventListener('click', () => {
    const on = t.getAttribute('aria-checked')==='true'
    t.setAttribute('aria-checked', String(!on))
    t.classList.toggle('is-on', !on)
  })
})`,
    },
    'neo-volume-dial': {
      html: `<div class="neo-vol-outer">
  <div class="neo-vol-wrap" id="vol-wrap" style="position:relative;width:160px;height:160px;">
    <svg id="vol-svg" viewBox="0 0 160 160" width="160" height="160" style="position:absolute;top:0;left:0;pointer-events:none;"></svg>
    <div class="neo-vol-knob" id="vol-knob" style="transform:translate(-50%,-50%) rotate(27deg)">
      <div class="neo-vol-indicator"></div>
    </div>
  </div>
  <span class="neo-vol-value" id="vol-val">60</span>
</div>`,
      css: `.neo-vol-outer { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); display:flex; flex-direction:column; align-items:center; gap:.75rem; }
.neo-vol-wrap { user-select:none; }
.neo-vol-knob { position:absolute; top:50%; left:50%; width:80px; height:80px; border-radius:50%; background:#e4e9f2; box-shadow:6px 6px 12px rgba(163,177,198,.6),-6px -6px 12px rgba(255,255,255,.9); cursor:grab; }
.neo-vol-knob.is-dragging { cursor:grabbing; }
.neo-vol-indicator { position:absolute; top:8px; left:50%; transform:translateX(-50%); width:3px; height:12px; background:#6c8ebf; border-radius:2px; box-shadow:0 0 6px #6c8ebf; }
.neo-vol-value { font-size:1.6rem; font-weight:800; color:#3d4a5c; min-width:3ch; text-align:center; }`,
      ts: `const wrap=document.getElementById('vol-wrap')!,knob=document.getElementById('vol-knob') as HTMLElement,valEl=document.getElementById('vol-val')!,svg=document.getElementById('vol-svg') as unknown as SVGSVGElement
const ns='http://www.w3.org/2000/svg';let vol=60
function drawArc(v:number){svg.innerHTML='';const cx=80,cy=80,r=60,sA=(135+90)*Math.PI/180,arc=(sa:number,ea:number,lg:number,stroke:string)=>{const p=document.createElementNS(ns,'path');const x1=cx+r*Math.cos(sa),y1=cy+r*Math.sin(sa),x2=cx+r*Math.cos(ea),y2=cy+r*Math.sin(ea);p.setAttribute('d',\`M\${x1} \${y1} A\${r} \${r} 0 \${lg} 1 \${x2} \${y2}\`);p.setAttribute('fill','none');p.setAttribute('stroke',stroke);p.setAttribute('stroke-width','8');p.setAttribute('stroke-linecap','round');svg.appendChild(p)};arc(sA,sA+270*Math.PI/180,1,'rgba(163,177,198,.35)');if(v>0)arc(sA,sA+v/100*270*Math.PI/180,v/100*270>180?1:0,'#6c8ebf')}
drawArc(vol)
knob.addEventListener('mousedown',e=>{e.preventDefault();knob.classList.add('is-dragging');const move=(ev:MouseEvent)=>{const rect=wrap.getBoundingClientRect();let a=Math.atan2(ev.clientY-(rect.top+rect.height/2),ev.clientX-(rect.left+rect.width/2))*180/Math.PI+90;if(a>180)a-=360;const cl=Math.max(-135,Math.min(135,a));vol=Math.round((cl+135)/270*100);knob.style.transform=\`translate(-50%,-50%) rotate(\${cl}deg)\`;valEl.textContent=String(vol);drawArc(vol)};const up=()=>{knob.classList.remove('is-dragging');window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up)};window.addEventListener('mousemove',move);window.addEventListener('mouseup',up)})`,
    },
    'neo-tag-cloud': {
      html: `<div class="neo-tags-wrap">
  <div class="neo-tag-cloud">
    <button class="neo-tag-chip neo-tag-lg is-selected">React</button>
    <button class="neo-tag-chip neo-tag-lg">TypeScript</button>
    <button class="neo-tag-chip neo-tag-md">CSS</button>
    <button class="neo-tag-chip neo-tag-lg is-selected">Design</button>
    <button class="neo-tag-chip neo-tag-sm">Motion</button>
    <button class="neo-tag-chip neo-tag-sm">A11y</button>
    <button class="neo-tag-chip neo-tag-md">UX</button>
    <button class="neo-tag-chip neo-tag-md">Figma</button>
    <button class="neo-tag-chip neo-tag-sm">Node</button>
    <button class="neo-tag-chip neo-tag-sm">API</button>
  </div>
</div>`,
      css: `.neo-tags-wrap { background:#e4e9f2; border-radius:1.5rem; padding:1.5rem; box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px rgba(255,255,255,.9); }
.neo-tag-cloud { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; max-width:280px; }
.neo-tag-chip { border:none; border-radius:999px; background:#e4e9f2; color:#5a6a7a; font-weight:600; cursor:pointer; box-shadow:4px 4px 8px rgba(163,177,198,.6),-4px -4px 8px rgba(255,255,255,.9); transition:box-shadow .18s,color .18s; }
.neo-tag-lg { padding:10px 20px; font-size:.88rem; }
.neo-tag-md { padding:8px 16px; font-size:.8rem; }
.neo-tag-sm { padding:6px 13px; font-size:.74rem; }
.neo-tag-chip.is-selected { box-shadow:inset 4px 4px 8px rgba(163,177,198,.6),inset -4px -4px 8px rgba(255,255,255,.9); color:#6c8ebf; }`,
      ts: `document.querySelectorAll<HTMLButtonElement>('.neo-tag-chip').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('is-selected'))
})`,
    },
    'glass-profile-card': {
      html: `<div class="glass-wrap">
  <div class="glass-bg"></div>
  <div class="glass-card">
    <div class="glass-avatar-ring"><div class="glass-avatar"></div></div>
    <h3 class="glass-name">Fran Camargo</h3>
    <p class="glass-role">Senior UI Designer</p>
    <div class="glass-stats">
      <div class="glass-stat"><strong>248</strong><span>Posts</span></div>
      <div class="glass-stat"><strong>12.4k</strong><span>Seguidores</span></div>
      <div class="glass-stat"><strong>891</strong><span>Seguindo</span></div>
    </div>
    <button id="glass-follow" class="glass-follow-btn">Seguir</button>
  </div>
</div>`,
      css: `.glass-wrap { position:relative; width:280px; height:300px; display:grid; place-items:center; }
.glass-bg { position:absolute; inset:0; background:linear-gradient(135deg,#667eea 0%,#764ba2 33%,#f093fb 66%,#f5576c 100%); border-radius:1.5rem; }
.glass-card { position:relative; z-index:1; background:rgba(255,255,255,.18); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,.35); border-radius:1.25rem; padding:1.5rem; width:230px; display:flex; flex-direction:column; align-items:center; gap:.5rem; box-shadow:0 8px 32px rgba(0,0,0,.2); }
.glass-avatar-ring { width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg,#fff,rgba(255,255,255,.4)); padding:3px; box-shadow:0 4px 16px rgba(0,0,0,.25); }
.glass-avatar { width:100%; height:100%; border-radius:50%; background:rgba(255,255,255,.3); display:grid; place-items:center; font-size:2rem; }
.glass-name { margin:.25rem 0 0; font-size:1rem; font-weight:700; color:#fff; }
.glass-role { margin:0; font-size:.72rem; color:rgba(255,255,255,.75); font-weight:500; }
.glass-stats { display:flex; gap:1rem; margin:.5rem 0; }
.glass-stat { display:flex; flex-direction:column; align-items:center; gap:2px; }
.glass-stat strong { font-size:.9rem; font-weight:700; color:#fff; }
.glass-stat span { font-size:.62rem; color:rgba(255,255,255,.65); }
.glass-follow-btn { padding:.5rem 1.5rem; border-radius:999px; border:1.5px solid rgba(255,255,255,.6); background:rgba(255,255,255,.22); color:#fff; font-size:.82rem; font-weight:600; cursor:pointer; transition:background .2s; }
.glass-follow-btn:hover { background:rgba(255,255,255,.35); }
.glass-follow-btn.is-following { background:rgba(255,255,255,.85); color:#764ba2; border-color:transparent; }`,
      ts: `const btn = document.getElementById('glass-follow')!
btn.addEventListener('click', () => {
  const following = btn.classList.toggle('is-following')
  btn.textContent = following ? 'Seguindo ✓' : 'Seguir'
})`,
    },
    'brutalist-block-card': {
      html: `<div class="brutalist-card">
  <div class="brutalist-tag">DESIGN</div>
  <h2 class="brutalist-title">THE FUTURE OF UI IS HERE</h2>
  <p class="brutalist-body">Bold. Raw. Unfiltered. Design that refuses to be ignored by anyone.</p>
  <div class="brutalist-footer">
    <button id="brut-like" class="brutalist-like-btn">♥ 247</button>
    <span class="brutalist-date">MAY 2025</span>
  </div>
</div>`,
      css: `.brutalist-card { background:#fff700; border:3px solid #000; box-shadow:6px 6px 0 #000; padding:1.25rem; max-width:280px; transition:transform .1s,box-shadow .1s; }
.brutalist-card:hover { transform:translate(-2px,-2px); box-shadow:8px 8px 0 #000; }
.brutalist-tag { display:inline-block; background:#000; color:#fff700; font-size:.65rem; font-weight:900; letter-spacing:.12em; padding:3px 8px; margin-bottom:.75rem; }
.brutalist-title { font-size:1.2rem; font-weight:900; line-height:1.1; color:#000; text-transform:uppercase; margin:0 0 .5rem; letter-spacing:-.01em; }
.brutalist-body { font-size:.8rem; color:#000; margin:0 0 1rem; line-height:1.5; font-weight:500; }
.brutalist-footer { display:flex; justify-content:space-between; align-items:center; border-top:2px solid #000; padding-top:.75rem; }
.brutalist-like-btn { border:2px solid #000; background:#fff; font-size:.82rem; font-weight:700; padding:4px 12px; cursor:pointer; box-shadow:3px 3px 0 #000; transition:transform .1s,box-shadow .1s; }
.brutalist-like-btn:active { transform:translate(2px,2px); box-shadow:1px 1px 0 #000; }
.brutalist-like-btn.is-liked { background:#ff3333; color:#fff; }
.brutalist-date { font-size:.68rem; font-weight:900; letter-spacing:.08em; }`,
      ts: `const btn = document.getElementById('brut-like')!
let liked = false, count = 247
btn.addEventListener('click', () => {
  liked = !liked
  count += liked ? 1 : -1
  btn.textContent = '♥ ' + count
  btn.classList.toggle('is-liked', liked)
})`,
    },
    'clay-morphism-buttons': {
      html: `<div class="clay-grid">
  <button class="clay-btn" style="--clay-color:#ff7eb3;--clay-shadow:#c8467a"><span class="clay-icon">☁️</span><span class="clay-label">Upload</span></button>
  <button class="clay-btn" style="--clay-color:#7eb8ff;--clay-shadow:#3a6fd9"><span class="clay-icon"></span><span class="clay-label">Save</span></button>
  <button class="clay-btn" style="--clay-color:#7effb2;--clay-shadow:#2ab860"><span class="clay-icon"></span><span class="clay-label">Share</span></button>
  <button class="clay-btn" style="--clay-color:#ffb07e;--clay-shadow:#d97040"><span class="clay-icon"></span><span class="clay-label">Delete</span></button>
</div>`,
      css: `.clay-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:1rem; }
.clay-btn { display:flex; flex-direction:column; align-items:center; gap:6px; padding:1rem; border-radius:1.25rem; border:none; background:var(--clay-color); cursor:pointer; box-shadow:0 8px 0 var(--clay-shadow),0 12px 20px rgba(0,0,0,.15),inset 0 -3px 6px rgba(0,0,0,.12),inset 0 3px 6px rgba(255,255,255,.6); transition:transform .12s,box-shadow .12s; min-width:90px; }
.clay-btn:hover { transform:translateY(-3px); box-shadow:0 11px 0 var(--clay-shadow),0 18px 26px rgba(0,0,0,.18),inset 0 -3px 6px rgba(0,0,0,.12),inset 0 3px 6px rgba(255,255,255,.6); }
.clay-btn:active { transform:translateY(6px); box-shadow:0 2px 0 var(--clay-shadow),0 4px 8px rgba(0,0,0,.12),inset 0 3px 8px rgba(0,0,0,.15); }
.clay-icon { font-size:1.6rem; }
.clay-label { font-size:.75rem; font-weight:700; color:rgba(0,0,0,.55); }`,
      ts: `document.querySelectorAll<HTMLButtonElement>('.clay-btn').forEach(btn => {
  btn.addEventListener('mousedown', () => btn.style.transform = 'translateY(6px)')
  btn.addEventListener('mouseup', () => btn.style.transform = '')
  btn.addEventListener('mouseleave', () => btn.style.transform = '')
})`,
    },
    'mesh-aurora-card': {
      html: `<div class="mesh-aurora-wrap">
  <div class="mesh-blob mesh-blob-1"></div>
  <div class="mesh-blob mesh-blob-2"></div>
  <div class="mesh-blob mesh-blob-3"></div>
  <div class="mesh-card-content">
    <div class="mesh-tabs">
      <button class="mesh-tab is-active">Overview</button>
      <button class="mesh-tab">Analytics</button>
      <button class="mesh-tab">Reports</button>
    </div>
    <div class="mesh-metrics">
      <div class="mesh-metric"><span class="mesh-metric-value">$48.3k</span><span class="mesh-metric-label">Receita</span><span class="mesh-metric-delta is-positive">+18%</span></div>
      <div class="mesh-metric"><span class="mesh-metric-value">9,847</span><span class="mesh-metric-label">Usuários</span><span class="mesh-metric-delta is-positive">+12%</span></div>
      <div class="mesh-metric"><span class="mesh-metric-value">2.3%</span><span class="mesh-metric-label">Churn</span><span class="mesh-metric-delta is-positive">-0.4%</span></div>
    </div>
  </div>
</div>`,
      css: `.mesh-aurora-wrap { position:relative; width:300px; height:200px; border-radius:1.5rem; overflow:hidden; background:#0a0a14; }
.mesh-blob { position:absolute; border-radius:50%; filter:blur(40px); animation:mesh-drift 8s ease-in-out infinite; }
.mesh-blob-1 { width:160px; height:160px; background:rgba(120,40,220,.55); top:-40px; left:-40px; animation-delay:0s; }
.mesh-blob-2 { width:140px; height:140px; background:rgba(20,140,255,.5); bottom:-30px; right:-20px; animation-delay:-3s; }
.mesh-blob-3 { width:120px; height:120px; background:rgba(0,220,170,.4); top:40%; left:50%; animation-delay:-5s; }
@keyframes mesh-drift { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(20px,-15px) scale(1.1); } 66% { transform:translate(-15px,10px) scale(.95); } }
.mesh-card-content { position:relative; z-index:1; padding:1.25rem; height:100%; display:flex; flex-direction:column; gap:.75rem; }
.mesh-tabs { display:flex; gap:6px; }
.mesh-tab { padding:5px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.2); background:rgba(255,255,255,.08); color:rgba(255,255,255,.6); font-size:.72rem; font-weight:600; cursor:pointer; transition:all .2s; }
.mesh-tab.is-active { background:rgba(255,255,255,.22); border-color:rgba(255,255,255,.45); color:#fff; }
.mesh-metrics { display:flex; gap:.75rem; }
.mesh-metric { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); border-radius:.75rem; padding:.6rem .8rem; display:flex; flex-direction:column; gap:2px; flex:1; }
.mesh-metric-value { font-size:1rem; font-weight:800; color:#fff; line-height:1; }
.mesh-metric-label { font-size:.58rem; color:rgba(255,255,255,.5); font-weight:500; }
.mesh-metric-delta { font-size:.65rem; font-weight:700; color:rgba(255,255,255,.4); }
.mesh-metric-delta.is-positive { color:#4ade80; }`,
      ts: `document.querySelectorAll<HTMLButtonElement>('.mesh-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mesh-tab').forEach(b => b.classList.remove('is-active'))
    btn.classList.add('is-active')
  })
})`,
    },
    'retro-crt-terminal': {
      html: `<div class="crt-bezel">
  <div class="crt-screen">
    <div class="crt-scanlines"></div>
    <div class="crt-content" id="crt-content">
      <div class="crt-line">> SYSTEM BOOT v2.1.0</div>
      <div class="crt-line">> LOADING MODULES... OK</div>
      <div class="crt-line">> READY.</div>
      <div class="crt-input-row">
        <span class="crt-prompt">$</span>
        <input id="crt-input" class="crt-input" maxlength="24" autofocus>
        <span class="crt-cursor"></span>
      </div>
    </div>
  </div>
  <div class="crt-label">TERM-80</div>
</div>`,
      css: `.crt-bezel { background:linear-gradient(145deg,#2a2a2a,#1a1a1a); border-radius:1rem; padding:1rem 1rem .75rem; box-shadow:0 0 0 2px #3a3a3a,0 8px 24px rgba(0,0,0,.7),inset 0 2px 4px rgba(255,255,255,.06); display:flex; flex-direction:column; gap:.5rem; width:280px; }
.crt-screen { background:#0a1a0a; border-radius:.5rem; padding:.75rem; position:relative; overflow:hidden; box-shadow:inset 0 0 30px rgba(0,255,80,.06),inset 0 0 60px rgba(0,0,0,.5); min-height:160px; }
.crt-scanlines { position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px); pointer-events:none; z-index:2; }
.crt-content { position:relative; z-index:1; font-family:'Courier New',monospace; font-size:.7rem; color:#00ff50; text-shadow:0 0 8px rgba(0,255,80,.6); display:flex; flex-direction:column; gap:2px; }
.crt-line { white-space:nowrap; line-height:1.5; }
.crt-input-row { display:flex; align-items:center; gap:4px; margin-top:4px; }
.crt-prompt { color:#00ff50; font-family:'Courier New',monospace; font-size:.7rem; }
.crt-input { flex:1; background:transparent; border:none; outline:none; color:#00ff50; font-family:'Courier New',monospace; font-size:.7rem; text-shadow:0 0 6px rgba(0,255,80,.6); caret-color:transparent; }
.crt-cursor { width:7px; height:12px; background:#00ff50; display:inline-block; animation:term-blink .7s step-end infinite; box-shadow:0 0 6px #00ff50; }
.crt-label { text-align:center; font-size:.58rem; font-weight:700; color:#555; letter-spacing:.12em; }
@keyframes term-blink { 0%, 100% { opacity:1; } 50% { opacity:0; } }`,
      ts: `const input = document.getElementById('crt-input') as HTMLInputElement
const content = document.getElementById('crt-content')!
const CMDS: Record<string,string> = { help:'> CMDS: help, status, ping, clear', status:'> SYS: ONLINE | CPU: 12%', ping:'> PONG! Latency: 4ms', clear:'__clear__' }
input.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return
  const cmd = input.value.trim().toLowerCase()
  const res = CMDS[cmd] ?? \`> ERR: '\${input.value.trim()}' not found\`
  if (res === '__clear__') { content.querySelectorAll('.crt-line').forEach(l => l.remove()) }
  else {
    const addLine = (t:string) => { const d = document.createElement('div'); d.className='crt-line'; d.textContent=t; content.insertBefore(d, content.querySelector('.crt-input-row')!) }
    addLine('$ '+input.value.trim()); addLine(res)
  }
  input.value = ''
})`,
    },
    'dark-search-field': {
      html: `<div class="dark-search-field">
  <div class="dark-search-row">
    <!-- Search icon (Lucide) -->
    <input class="dark-search-inp" placeholder="Search..." />
  </div>
  <div class="dark-search-suggestions">
    <span class="dark-search-bar" style="width:72%"></span>
    <span class="dark-search-bar" style="width:48%"></span>
  </div>
  <div class="dark-search-glow"></div>
</div>`,
      css: `.dark-search-field { width:260px; background:rgba(20,25,55,.85); backdrop-filter:blur(16px); border-radius:.75rem; border:1px solid rgba(64,144,255,.28); box-shadow:0 0 20px rgba(40,100,255,.12),inset 0 1px 0 rgba(255,255,255,.06); padding:.85rem 1rem; display:flex; flex-direction:column; gap:.55rem; position:relative; overflow:hidden; transition:border-color .2s; }
.dark-search-field.is-focused { border-color:rgba(64,144,255,.55); box-shadow:0 0 28px rgba(40,100,255,.22); }
.dark-search-row { display:flex; align-items:center; gap:8px; }
.dark-search-ico { color:rgba(255,255,255,.4); flex-shrink:0; }
.dark-search-inp { flex:1; background:transparent; border:none; outline:none; color:rgba(255,255,255,.85); font-size:.85rem; caret-color:#4090ff; }
.dark-search-inp::placeholder { color:rgba(255,255,255,.25); }
.dark-search-suggestions { display:flex; flex-direction:column; gap:5px; padding-left:23px; }
.dark-search-bar { height:3px; background:rgba(255,255,255,.06); border-radius:999px; display:block; }
.dark-search-glow { height:2px; background:linear-gradient(90deg,transparent,#4090ff 30%,#8b6eff 70%,transparent); filter:blur(1.5px); opacity:.65; margin:0 -1rem; }`,
      ts: `const [value, setValue] = useState('')
const [focused, setFocused] = useState(false)
// <div className={\`dark-search-field \${focused?'is-focused':''}\`}>
//   <input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />`,
    },
    'dark-select': {
      html: `<div class="dark-select-field">
  <span class="dark-select-val">Option 1</span>
  <!-- ChevronDown icon (Lucide) -->
</div>
<div class="dark-select-menu">
  <button class="dark-sel-option is-sel">Option 1</button>
  <button class="dark-sel-option">Option 2</button>
  <button class="dark-sel-option">Option 3</button>
</div>`,
      css: `.dark-select-field { width:200px; background:rgba(20,25,55,.85); backdrop-filter:blur(16px); border-radius:.6rem; border:1px solid rgba(64,144,255,.3); box-shadow:0 0 16px rgba(40,100,255,.1); padding:.7rem 1rem; display:flex; align-items:center; justify-content:space-between; cursor:pointer; transition:border-color .2s; }
.dark-select-field:hover,.dark-select-field.is-open { border-color:rgba(64,144,255,.55); }
.dark-select-val { font-size:.82rem; color:rgba(255,255,255,.7); }
.dark-sel-chevron { color:rgba(64,144,255,.9); transition:transform .2s; }
.dark-sel-chevron.is-open { transform:rotate(180deg); }
.dark-select-menu { width:200px; background:rgba(12,15,40,.97); backdrop-filter:blur(16px); border-radius:.6rem; border:1px solid rgba(64,144,255,.2); box-shadow:0 8px 24px rgba(0,0,0,.5); overflow:hidden; }
.dark-sel-option { width:100%; padding:.6rem 1rem; text-align:left; border:none; background:transparent; color:rgba(255,255,255,.55); font-size:.82rem; cursor:pointer; }
.dark-sel-option:hover { background:rgba(64,144,255,.1); color:rgba(255,255,255,.9); }
.dark-sel-option.is-sel { color:#4090ff; }`,
      ts: `const [open, setOpen] = useState(false)
const [selected, setSelected] = useState('Option 1')
// Toggle open on click, close on option select or outside click`,
    },
    'dark-checkbox': {
      html: `<div class="dark-checkbox-grid">
  <button class="dark-checkbox dark-cb-blue is-checked"><!-- Check icon --></button>
  <button class="dark-checkbox dark-cb-blue"></button>
  <button class="dark-checkbox dark-cb-purple is-checked"><!-- Check icon --></button>
  <button class="dark-checkbox dark-cb-purple"></button>
</div>`,
      css: `.dark-checkbox-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.dark-checkbox { width:36px; height:36px; border-radius:.5rem; border:1.5px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .15s; color:#fff; }
.dark-checkbox.is-checked.dark-cb-blue { background:#4090ff; border-color:#4090ff; box-shadow:0 0 12px rgba(64,144,255,.55),0 0 24px rgba(64,144,255,.2); }
.dark-checkbox.is-checked.dark-cb-purple { background:#8b6eff; border-color:#8b6eff; box-shadow:0 0 12px rgba(139,110,255,.55),0 0 24px rgba(139,110,255,.2); }`,
      ts: `const [states, setStates] = useState([true, false, true, false])
const toggle = (i:number) => setStates(prev => prev.map((v,idx)=>idx===i?!v:v))`,
    },
    'dark-switch': {
      html: `<button class="dark-switch is-on" role="switch" aria-checked="true">
  <span class="dark-switch-thumb"></span>
</button>`,
      css: `.dark-switch { width:56px; height:30px; border-radius:999px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.06); position:relative; cursor:pointer; transition:all .3s; box-shadow:inset 0 1px 3px rgba(0,0,0,.3); }
.dark-switch.is-on { background:rgba(40,100,255,.4); border-color:rgba(64,144,255,.6); box-shadow:0 0 18px rgba(64,144,255,.42),inset 0 1px 3px rgba(0,0,0,.2); }
.dark-switch-thumb { position:absolute; width:22px; height:22px; border-radius:50%; background:#fff; top:3px; left:3px; box-shadow:0 1px 4px rgba(0,0,0,.3); transition:transform .3s cubic-bezier(.4,0,.2,1); }
.dark-switch.is-on .dark-switch-thumb { transform:translateX(26px); box-shadow:0 0 8px rgba(64,144,255,.4),0 1px 4px rgba(0,0,0,.3); }`,
      ts: `const [on, setOn] = useState(true)
<button className={\`dark-switch \${on?'is-on':''}\`} onClick={()=>setOn(v=>!v)}>`,
    },
    'dark-tabs': {
      html: `<div class="dark-tabs-container">
  <button class="dark-tab">Overview</button>
  <button class="dark-tab is-active">Activity</button>
  <button class="dark-tab">Settings</button>
</div>`,
      css: `.dark-tabs-container { background:rgba(20,25,55,.85); backdrop-filter:blur(16px); border-radius:.75rem; border:1px solid rgba(100,140,255,.14); box-shadow:0 0 20px rgba(40,100,255,.1); display:flex; overflow:hidden; }
.dark-tab { flex:1; padding:.75rem 0; border:none; background:transparent; color:rgba(255,255,255,.3); font-size:.8rem; font-weight:500; cursor:pointer; position:relative; transition:color .2s; }
.dark-tab.is-active { color:rgba(255,255,255,.9); }
.dark-tab.is-active::after { content:''; position:absolute; bottom:0; left:20%; width:60%; height:2px; background:linear-gradient(90deg,transparent,#00d4ff,#4090ff,transparent); box-shadow:0 0 8px rgba(0,212,255,.8),0 0 18px rgba(64,144,255,.4); border-radius:999px; }`,
      ts: `const [active, setActive] = useState(1)
const tabs = ['Overview','Activity','Settings']`,
    },
    'dark-primary-button': {
      html: `<button class="dark-primary-btn">Create workspace</button>`,
      css: `.dark-primary-btn { padding:.9rem 2.5rem; border-radius:999px; border:1px solid rgba(80,160,255,.55); background:linear-gradient(145deg,rgba(15,50,160,.9),rgba(35,90,220,.75)); color:rgba(255,255,255,.95); font-size:.9rem; font-weight:600; cursor:pointer; box-shadow:0 0 28px rgba(40,110,255,.45),0 0 60px rgba(40,110,255,.18),inset 0 1px 0 rgba(255,255,255,.18); position:relative; overflow:hidden; transition:all .2s; letter-spacing:.01em; }
.dark-primary-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent); animation:dark-shimmer 3s ease-in-out infinite; }
@keyframes dark-shimmer { 0%{left:-100%} 100%{left:200%} }
.dark-primary-btn:hover { box-shadow:0 0 38px rgba(40,110,255,.6),0 0 70px rgba(40,110,255,.25),inset 0 1px 0 rgba(255,255,255,.2); }
.dark-primary-btn.is-pulse { box-shadow:0 0 50px rgba(40,110,255,.8),0 0 90px rgba(40,110,255,.35),inset 0 1px 0 rgba(255,255,255,.22); }`,
      ts: `<button className="dark-primary-btn">Create workspace</button>`,
    },
    'dark-secondary-button': {
      html: `<button class="dark-secondary-btn">Invite member</button>`,
      css: `.dark-secondary-btn { padding:.9rem 2rem; border-radius:999px; border:1px solid rgba(139,110,255,.45); background:rgba(139,110,255,.07); color:rgba(160,140,255,.85); font-size:.9rem; font-weight:500; cursor:pointer; box-shadow:0 0 16px rgba(139,110,255,.18),inset 0 1px 0 rgba(255,255,255,.06); transition:all .2s; }
.dark-secondary-btn:hover { border-color:rgba(139,110,255,.65); box-shadow:0 0 26px rgba(139,110,255,.3); background:rgba(139,110,255,.12); }`,
      ts: `<button className="dark-secondary-btn">Invite member</button>`,
    },
    'dark-icon-button': {
      html: `<button class="dark-icon-btn" aria-label="Add">
  <!-- Plus icon (Lucide) -->
</button>`,
      css: `.dark-icon-btn { width:52px; height:52px; border-radius:50%; border:1px solid rgba(80,144,255,.3); background:rgba(20,30,70,.6); backdrop-filter:blur(12px); color:rgba(100,180,255,.9); display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 0 16px rgba(64,144,255,.2),inset 0 1px 0 rgba(255,255,255,.08); transition:all .2s; }
.dark-icon-btn:hover { border-color:rgba(80,144,255,.55); box-shadow:0 0 26px rgba(64,144,255,.38); }
.dark-icon-btn.is-active { background:rgba(40,90,220,.45); box-shadow:0 0 36px rgba(64,144,255,.6),inset 0 1px 0 rgba(255,255,255,.12); }`,
      ts: `<button className={\`dark-icon-btn \${active?'is-active':''}\`} onClick={()=>{ setActive(true); setTimeout(()=>setActive(false),500) }}>
  <Plus size={20} />
</button>`,
    },
    'gn-segmented-control': {
      html: `<div class="gn-seg-control">
  <button class="gn-seg-tab is-active">All</button>
  <button class="gn-seg-tab">Unread</button>
  <button class="gn-seg-tab">Favorites</button>
</div>`,
      css: `.gn-seg-control { display:flex; background:rgba(255,255,255,.45); border-radius:999px; padding:4px; gap:2px; box-shadow:4px 4px 10px rgba(160,140,120,.2),-3px -3px 8px rgba(255,255,255,.85); border:1px solid rgba(255,255,255,.8); }
.gn-seg-tab { padding:.45rem 1.1rem; border-radius:999px; border:none; background:transparent; color:#a09888; font-size:.82rem; font-weight:500; cursor:pointer; transition:all .2s; }
.gn-seg-tab.is-active { background:rgba(255,255,255,.9); color:#4a4540; font-weight:600; box-shadow:2px 2px 6px rgba(160,140,120,.15),-1px -1px 4px rgba(255,255,255,.9); }`,
      ts: `const [active, setActive] = useState(0)
const tabs = ['All', 'Unread', 'Favorites']
// <button className={\`gn-seg-tab \${active===i?'is-active':''}\`} onClick={()=>setActive(i)}>`,
    },
    'gn-toggle-switch': {
      html: `<button class="gn-toggle is-on" role="switch" aria-checked="true">
  <span class="gn-toggle-thumb"></span>
</button>`,
      css: `.gn-toggle { width:72px; height:36px; border-radius:999px; border:1.5px solid rgba(255,255,255,.7); background:rgba(255,255,255,.4); position:relative; cursor:pointer; box-shadow:4px 4px 10px rgba(160,140,120,.2),-3px -3px 8px rgba(255,255,255,.85),inset 2px 2px 6px rgba(160,140,120,.15),inset -1px -1px 4px rgba(255,255,255,.7); transition:background .3s; }
.gn-toggle-thumb { position:absolute; width:28px; height:28px; border-radius:50%; background:#fff; top:3px; left:3px; box-shadow:2px 2px 6px rgba(160,140,120,.3),-1px -1px 4px rgba(255,255,255,.9); transition:transform .3s cubic-bezier(.4,0,.2,1); }
.gn-toggle.is-on .gn-toggle-thumb { transform:translateX(36px); }`,
      ts: `const [on, setOn] = useState(true)
<button className={\`gn-toggle \${on?'is-on':''}\`} onClick={()=>setOn(v=>!v)}>
  <span className="gn-toggle-thumb" />
</button>`,
    },
    'gn-input-field': {
      html: `<input class="gn-input" placeholder="New message" />`,
      css: `.gn-input { width:240px; padding:.75rem 1rem; border-radius:.75rem; border:1.5px solid rgba(255,255,255,.7); background:rgba(255,255,255,.35); color:#4a4540; font-size:.85rem; outline:none; box-shadow:inset 3px 3px 8px rgba(160,140,120,.18),inset -2px -2px 6px rgba(255,255,255,.8); transition:box-shadow .2s,border-color .2s; }
.gn-input::placeholder { color:#b8afa8; }
.gn-input:focus { border-color:rgba(255,255,255,.9); box-shadow:inset 3px 3px 10px rgba(160,140,120,.22),inset -2px -2px 6px rgba(255,255,255,.85),0 0 0 2px rgba(212,112,94,.15); }`,
      ts: `const [value, setValue] = useState('')
<input className="gn-input" placeholder="New message" value={value} onChange={e=>setValue(e.target.value)} />`,
    },
    'gn-numpad': {
      html: `<div class="gn-numpad-card">
  <p class="gn-numpad-title">Enter passcode</p>
  <div class="gn-numpad-dots">
    <span class="gn-dot is-filled"></span><span class="gn-dot is-filled"></span>
    <span class="gn-dot"></span><span class="gn-dot"></span>
  </div>
  <div class="gn-numpad-grid">
    <button class="gn-num-btn">1</button><!-- ... 2-9 -->
    <span class="gn-num-empty"></span>
    <button class="gn-num-btn">0</button>
    <button class="gn-num-btn gn-num-del">✕</button>
  </div>
  <button class="gn-send-btn">Send</button>
</div>`,
      css: `.gn-numpad-card { background:rgba(255,255,255,.45); border-radius:1.25rem; padding:1.5rem 1.25rem; border:1px solid rgba(255,255,255,.8); box-shadow:6px 6px 14px rgba(160,140,120,.2),-4px -4px 10px rgba(255,255,255,.9); display:flex; flex-direction:column; align-items:center; gap:1rem; width:220px; }
.gn-numpad-title { margin:0; font-size:.9rem; font-weight:600; color:#4a4540; }
.gn-numpad-dots { display:flex; gap:10px; }
.gn-dot { width:10px; height:10px; border-radius:50%; background:rgba(160,140,120,.25); transition:background .2s; }
.gn-dot.is-filled { background:#d4705e; }
.gn-numpad-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; width:100%; }
.gn-num-btn { aspect-ratio:1; border-radius:.75rem; border:1px solid rgba(255,255,255,.75); background:rgba(255,255,255,.5); color:#4a4540; font-size:1.1rem; font-weight:500; cursor:pointer; box-shadow:3px 3px 8px rgba(160,140,120,.18),-2px -2px 6px rgba(255,255,255,.9); transition:all .1s; }
.gn-num-btn:active { box-shadow:inset 2px 2px 6px rgba(160,140,120,.2),inset -1px -1px 4px rgba(255,255,255,.7); transform:scale(.97); }
.gn-send-btn { width:100%; padding:.7rem; border-radius:.75rem; border:none; background:#d4705e; color:#fff; font-size:.9rem; font-weight:600; cursor:pointer; box-shadow:3px 4px 10px rgba(212,112,94,.35); }
.gn-send-btn:disabled { opacity:.5; cursor:not-allowed; }`,
      ts: `const [code, setCode] = useState('')
const press = (n: string) => { if (code.length < 4) setCode(c => c + n) }
const send = () => { /* submit logic */ setCode('') }`,
    },
    'gn-bottom-nav': {
      html: `<nav class="gn-bottom-nav">
  <button class="gn-nav-item is-active" aria-label="Home"><!-- Home icon --></button>
  <button class="gn-nav-item" aria-label="Chat"><!-- MessageCircle icon --></button>
  <button class="gn-nav-item" aria-label="Settings"><!-- Settings icon --></button>
</nav>`,
      css: `.gn-bottom-nav { display:flex; align-items:center; gap:8px; background:rgba(255,255,255,.45); border-radius:999px; padding:8px 16px; border:1px solid rgba(255,255,255,.8); box-shadow:4px 4px 10px rgba(160,140,120,.2),-3px -3px 8px rgba(255,255,255,.85); }
.gn-nav-item { width:44px; height:44px; border-radius:50%; border:none; background:transparent; color:#b8afa8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.gn-nav-item.is-active { background:rgba(255,255,255,.82); color:#4a4540; box-shadow:2px 2px 6px rgba(160,140,120,.2),-1px -1px 4px rgba(255,255,255,.9); }`,
      ts: `const [active, setActive] = useState(0)
const items = [{ icon: <Home size={20}/>, label:'Home' }, { icon:<MessageCircle size={20}/>, label:'Chat' }, { icon:<Settings size={20}/>, label:'Settings' }]
// <button className={\`gn-nav-item \${active===i?'is-active':''}\`} onClick={()=>setActive(i)}>`,
    },
    'gn-text-nav': {
      html: `<nav class="gn-text-nav">
  <button class="gn-text-nav-item is-active">Home</button>
  <button class="gn-text-nav-item">Search</button>
  <button class="gn-text-nav-item">Settings</button>
</nav>`,
      css: `.gn-text-nav { display:flex; align-items:center; background:rgba(255,255,255,.45); border-radius:999px; padding:.5rem .75rem; border:1px solid rgba(255,255,255,.8); box-shadow:4px 4px 10px rgba(160,140,120,.2),-3px -3px 8px rgba(255,255,255,.85); }
.gn-text-nav-item { padding:.4rem 1.25rem; border-radius:999px; border:none; background:transparent; color:#a09888; font-size:.85rem; font-weight:500; cursor:pointer; transition:all .2s; }
.gn-text-nav-item.is-active { background:rgba(255,255,255,.78); color:#4a4540; font-weight:600; box-shadow:2px 2px 5px rgba(160,140,120,.15),-1px -1px 4px rgba(255,255,255,.9); }`,
      ts: `const [active, setActive] = useState(0)
const links = ['Home', 'Search', 'Settings']
// <button className={\`gn-text-nav-item \${active===i?'is-active':''}\`} onClick={()=>setActive(i)}>`,
    },
    'gn-reminders-card': {
      html: `<div class="gn-reminders-card">
  <p class="gn-reminders-title">Reminders</p>
  <ul class="gn-reminders-list">
    <li class="gn-reminder-item"><span class="gn-reminder-dot"></span>Design review</li>
    <li class="gn-reminder-item is-done"><span class="gn-reminder-dot"></span>Call John</li>
  </ul>
</div>`,
      css: `.gn-reminders-card { background:rgba(255,255,255,.5); border-radius:1rem; padding:1rem 1.25rem; border:1px solid rgba(255,255,255,.82); box-shadow:4px 4px 10px rgba(160,140,120,.18),-3px -3px 8px rgba(255,255,255,.9); min-width:180px; }
.gn-reminders-title { margin:0 0 .65rem; font-size:.88rem; font-weight:700; color:#4a4540; }
.gn-reminders-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:.4rem; }
.gn-reminder-item { display:flex; align-items:center; gap:8px; font-size:.78rem; color:#6b6058; cursor:pointer; transition:all .2s; }
.gn-reminder-item.is-done { color:#b8afa8; text-decoration:line-through; }
.gn-reminder-dot { width:6px; height:6px; border-radius:50%; background:#d4705e; flex-shrink:0; }
.gn-reminder-item.is-done .gn-reminder-dot { background:#c4bab0; }`,
      ts: `const [items, setItems] = useState([{ text:'Design review', done:false },{ text:'Call John', done:false }])
const toggle = (i:number) => setItems(prev => prev.map((item,idx) => idx===i ? {...item,done:!item.done} : item))`,
    },
    'sidebar-accordion': {
      html: `<nav class="sidebar-acc-nav">
  <div class="sidebar-acc-brand">Dashboard</div>
  <div class="sidebar-acc-section">
    <button class="sidebar-acc-header is-open" data-index="0">
      <span class="sidebar-acc-header-left">Analytics</span>
      <svg class="sidebar-acc-chevron" .../>
    </button>
    <div class="sidebar-acc-body">
      <button class="sidebar-acc-item is-active">Overview</button>
      <button class="sidebar-acc-item">Reports</button>
      <button class="sidebar-acc-item">Metrics</button>
    </div>
  </div>
  <div class="sidebar-acc-section">
    <button class="sidebar-acc-header" data-index="1">
      <span class="sidebar-acc-header-left">Projects</span>
      <svg class="sidebar-acc-chevron" .../>
    </button>
  </div>
</nav>`,
      css: `.sidebar-acc-nav { background:#1A334A; border-radius:1rem; width:220px; border:1px solid rgba(39,230,236,.12); box-shadow:0 8px 32px rgba(0,0,0,.4); overflow:hidden; }
.sidebar-acc-brand { display:flex; align-items:center; gap:8px; padding:.9rem 1.1rem; border-bottom:1px solid rgba(39,230,236,.12); color:#27E6EC; font-size:.85rem; font-weight:700; letter-spacing:.04em; }
.sidebar-acc-section { border-bottom:1px solid rgba(30,83,110,.5); }
.sidebar-acc-section:last-child { border-bottom:none; }
.sidebar-acc-header { width:100%; display:flex; align-items:center; justify-content:space-between; padding:.65rem 1.1rem; background:transparent; border:none; color:#5AA5CD; font-size:.78rem; font-weight:600; cursor:pointer; transition:background .15s,color .15s; }
.sidebar-acc-header:hover { background:rgba(39,230,236,.06); color:#27E6EC; }
.sidebar-acc-header.is-open { color:#18A3B7; background:rgba(24,163,183,.08); }
.sidebar-acc-header-left { display:flex; align-items:center; gap:8px; }
.sidebar-acc-chevron { transition:transform .2s; }
.sidebar-acc-header.is-open .sidebar-acc-chevron { transform:rotate(180deg); }
.sidebar-acc-body { padding:2px 0 6px; background:rgba(0,0,0,.15); animation:sidebar-body-in .18s ease; }
@keyframes sidebar-body-in { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
.sidebar-acc-item { display:block; width:100%; text-align:left; padding:.45rem 1.1rem .45rem 2.2rem; background:transparent; border:none; border-left:2px solid transparent; color:rgba(90,165,205,.7); font-size:.75rem; font-weight:500; cursor:pointer; transition:background .15s,color .15s,border-color .15s; }
.sidebar-acc-item:hover { background:rgba(39,230,236,.06); color:#5AA5CD; }
.sidebar-acc-item.is-active { color:#27E6EC; border-left-color:#27E6EC; background:rgba(39,230,236,.08); font-weight:600; }`,
      ts: `const [openSections, setOpenSections] = useState<number[]>([0])
const [activeItem, setActiveItem] = useState('Overview')

const toggle = (i: number) =>
  setOpenSections(prev => prev.includes(i) ? prev.filter(n => n !== i) : [...prev, i])

// Render section header:
<button
  className={\`sidebar-acc-header \${openSections.includes(i) ? 'is-open' : ''}\`}
  onClick={() => toggle(i)}
>
  <span className="sidebar-acc-header-left">{section.icon}{section.label}</span>
  <ChevronDown size={13} className="sidebar-acc-chevron" />
</button>

// Render items (conditionally):
{openSections.includes(i) && (
  <div className="sidebar-acc-body">
    {section.items.map(item => (
      <button
        key={item}
        className={\`sidebar-acc-item \${activeItem === item ? 'is-active' : ''}\`}
        onClick={() => setActiveItem(item)}
      >{item}</button>
    ))}
  </div>
)}`,
    },
  }

  const selectedSnippet = snippets[slug] ?? fallback

  return {
    ...selectedSnippet,
    html: appendSnippetAttribution(selectedSnippet.html, 'html'),
    css: appendSnippetAttribution(selectedSnippet.css, 'css'),
  }
}

const GN_SOFT_SLUGS = new Set([
  'gn-segmented-control',
  'gn-toggle-switch',
  'gn-input-field',
  'gn-numpad',
  'gn-bottom-nav',
  'gn-text-nav',
])
const GLASS_WATER_SLUGS = new Set([
  'glass-profile-card',
  'gn-reminders-card',
])

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

  const previewBgClass = GN_SOFT_SLUGS.has(item.slug)
    ? ' is-glass-soft'
    : GLASS_WATER_SLUGS.has(item.slug)
      ? ' is-glass-water'
      : ''

  return (
    <ItemPageShell
      title={item.title}
      description={item.description}
      isLiked={isLiked}
    >
      <div className="component-detail-layout">
        <div className="component-preview-col">
          <div className={`component-live-preview${previewBgClass}`}>
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

