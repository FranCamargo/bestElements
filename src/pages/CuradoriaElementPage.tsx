import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { Check, Maximize2, Minimize2, X, Bot, UserRound, Share2, Heart, Upload, Save, Trash2, ChevronDown, BarChart2, FolderOpen, Settings, Users, Home, ClipboardList, Layers, Search, Rocket, MessageCircle, Plus, Wifi, Bluetooth, Bell, Moon } from 'lucide-react'
import haimCover from '../assets/haim.webp'

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

    case 'lilac-weather-glass-card':
      return <LilacWeatherGlassCardInteractive />
    case 'glass-alert-modal':
      return <GlassAlertModalInteractive />


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

    case 'holographic-card':
      return <HolographicCardInteractive />
    case 'neo-toggle-switch':
      return <NeoToggleSwitchInteractive />
    case 'neo-music-player':
      return <NeoMusicPlayerInteractive />
    case 'neo-numpad':
      return <NeoNumpadInteractive />

    case 'neo-color-swatches':
      return <NeoColorSwatchesInteractive />

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

    case 'hologram-search-bar':
      return <HologramSearchBarInteractive />
    case 'hex-grid-pattern':
      return <HexGridPatternInteractive />
    case 'neon-volume-ring':
      return <NeonVolumeRingInteractive />
    case 'quantum-spin-loader':
      return <QuantumSpinLoaderInteractive />
    default:
      return <div className="component-mock"><p>Preview indisponivel para este item.</p></div>
  }
}

function HologramSearchBarInteractive() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleSearch = () => {
    if (!value.trim()) return
    setScanning(true)
    window.setTimeout(() => setScanning(false), 1400)
  }

  return (
    <div className="holo-search-stage">
      <div className={`holo-search-bar${focused ? ' is-focused' : ''}${scanning ? ' is-scanning' : ''}`}>
        <span className="holo-scan-line" aria-hidden="true" />
        <div className="holo-search-inner">
          <Search size={14} className="holo-search-ico" aria-hidden="true" />
          <input
            className="holo-search-inp"
            placeholder="Search neural network..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {value && (
            <button className="holo-search-clear" type="button" onClick={() => setValue('')} aria-label="Limpar">
              ×
            </button>
          )}
        </div>
        <div className="holo-glow-line" aria-hidden="true" />
        <span className="holo-corner holo-corner-tl" aria-hidden="true" />
        <span className="holo-corner holo-corner-tr" aria-hidden="true" />
        <span className="holo-corner holo-corner-bl" aria-hidden="true" />
        <span className="holo-corner holo-corner-br" aria-hidden="true" />
      </div>
      <p className="holo-search-hint">
        {scanning ? 'Scanning...' : focused ? 'Type & press Enter' : 'Click to activate'}
      </p>
    </div>
  )
}

function HexGridPatternInteractive() {
  const [pulses, setPulses] = useState<{ id: number; row: number; col: number }[]>([])
  const rows = 5
  const cols = 6

  const handleNodeClick = (row: number, col: number) => {
    const id = Date.now()
    setPulses((prev) => [...prev, { id, row, col }])
    window.setTimeout(() => setPulses((prev) => prev.filter((p) => p.id !== id)), 1000)
  }

  return (
    <div className="hex-grid-stage">
      <span className="hex-grid-scan" aria-hidden="true" />
      <div className="hex-grid-matrix" role="grid" aria-label="Neural grid">
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => {
            const isPulsing = pulses.some((p) => p.row === row && p.col === col)
            return (
              <button
                key={`${row}-${col}`}
                type="button"
                className={`hex-node${isPulsing ? ' is-pulsing' : ''}`}
                onClick={() => handleNodeClick(row, col)}
                aria-label={`Node ${row}-${col}`}
              />
            )
          })
        )}
      </div>
      <p className="hex-grid-label">NEURAL GRID — clique em um nó</p>
    </div>
  )
}

function NeonVolumeRingInteractive() {
  const [volume, setVolume] = useState(65)
  const [muted, setMuted] = useState(false)

  const cx = 65, cy = 65, r = 48
  const arcStartDeg = 140
  const arcSweep = 260
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180
  const makeArcD = (from: number, to: number) => {
    const x1 = cx + r * Math.cos(toRad(from))
    const y1 = cy + r * Math.sin(toRad(from))
    const x2 = cx + r * Math.cos(toRad(to))
    const y2 = cy + r * Math.sin(toRad(to))
    const large = to - from > 180 ? 1 : 0
    return `M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large},1 ${x2.toFixed(2)},${y2.toFixed(2)}`
  }

  const progressDeg = arcStartDeg + (volume / 100) * arcSweep
  const color = muted || volume === 0 ? '#444' : volume < 35 ? '#ff4060' : volume < 70 ? '#ffb500' : '#00e8ff'
  const thumbX = cx + r * Math.cos(toRad(muted ? arcStartDeg : progressDeg))
  const thumbY = cy + r * Math.sin(toRad(muted ? arcStartDeg : progressDeg))

  return (
    <div className="neon-vol-stage">
      <svg width="130" height="130" viewBox="0 0 130 130" className="neon-vol-svg" aria-label={`Volume: ${muted ? 'mudo' : volume + '%'}`}>
        <path d={makeArcD(arcStartDeg, arcStartDeg + arcSweep)} stroke="rgba(255,255,255,.07)" strokeWidth="8" fill="none" strokeLinecap="round" />
        {!muted && volume > 0 && (
          <path
            d={makeArcD(arcStartDeg, progressDeg)}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 5px ${color})` }}
          />
        )}
        <circle cx={thumbX} cy={thumbY} r="5" fill={color} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        <circle cx={cx} cy={cy} r="28" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
        <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="17" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
          {muted ? '—' : volume}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,.3)" fontSize="8" fontWeight="600" letterSpacing="2" fontFamily="Space Grotesk, sans-serif">
          VOL
        </text>
      </svg>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="neon-vol-slider"
        disabled={muted}
        aria-label="Controle de volume"
      />
      <button
        type="button"
        className={`neon-vol-mute-btn${muted ? ' is-muted' : ''}`}
        onClick={() => setMuted((v) => !v)}
      >
        {muted ? 'UNMUTE' : 'MUTE'}
      </button>
    </div>
  )
}

function QuantumSpinLoaderInteractive() {
  const [state, setState] = useState<'loading' | 'done'>('loading')

  const handleToggle = () => {
    if (state === 'loading') {
      setState('done')
      window.setTimeout(() => setState('loading'), 1200)
    }
  }

  return (
    <div className="quantum-stage">
      <div className={`quantum-loader${state === 'done' ? ' is-done' : ''}`} aria-busy={state === 'loading'} aria-label={state === 'loading' ? 'Carregando' : 'Concluído'}>
        <span className="q-ring q-ring-1" aria-hidden="true" />
        <span className="q-ring q-ring-2" aria-hidden="true" />
        <span className="q-ring q-ring-3" aria-hidden="true" />
        <span className="q-core" aria-hidden="true" />
        <span className="q-core-pulse" aria-hidden="true" />
      </div>
      <button type="button" className="quantum-toggle-btn" onClick={handleToggle}>
        {state === 'loading' ? 'Loading...' : 'Done ✓'}
      </button>
    </div>
  )
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
      city: 'Chile',
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
        <span
          className="dark-tab-indicator"
          style={{ transform: `translateX(${active * 100}%)` }}
          aria-hidden="true"
        />
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
