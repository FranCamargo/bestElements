import { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import type { MobileScreen } from '../data/mobileItems.ts'
import haimCover from '../assets/haim.png'

// ─── Shared status bar ──────────────────────────────────────────────────────

function StatusBar({ light }: { light?: boolean }) {
  const c = light ? '#111' : 'rgba(255,255,255,0.9)'
  return (
    <div className="ms-status-bar" style={{ color: c }}>
      <span>9:41</span>
      <div className="ms-status-icons">
        <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
          <rect x="0" y="5" width="2.5" height="5" rx="0.6" opacity="0.4" />
          <rect x="3.2" y="3" width="2.5" height="7" rx="0.6" opacity="0.6" />
          <rect x="6.4" y="1.2" width="2.5" height="8.8" rx="0.6" opacity="0.8" />
          <rect x="9.6" y="0" width="2.5" height="10" rx="0.6" />
        </svg>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
          <rect x="0" y="1" width="14" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="14.5" y="3.2" width="2" height="3.6" rx="0.5" />
          <rect x="1.2" y="2.2" width="9" height="5.6" rx="0.6" />
        </svg>
      </div>
    </div>
  )
}

// ─── Individual screen designs ───────────────────────────────────────────────

function FitnessTrackerScreen() {
  return (
    <div className="ms-screen-fitness">
      <StatusBar />
      <div className="ms-fit-header">
        <div>
          <p className="ms-fit-greeting">Good morning ☀️</p>
          <p className="ms-fit-name">Fran</p>
        </div>
        <div className="ms-fit-avatar">F</div>
      </div>

      <div className="ms-fit-ring-wrap">
        <div className="ms-fit-ring">
          <div className="ms-fit-ring-inner">
            <span className="ms-fit-steps">7,485</span>
            <span className="ms-fit-steps-label">steps</span>
          </div>
        </div>
        <p className="ms-fit-goal">Goal: 10,000 steps</p>
      </div>

      <div className="ms-fit-kpis">
        <div className="ms-fit-kpi">
          <span className="ms-fit-kpi-icon">🔥</span>
          <span className="ms-fit-kpi-val">420</span>
          <span className="ms-fit-kpi-lbl">kcal</span>
        </div>
        <div className="ms-fit-kpi">
          <span className="ms-fit-kpi-icon">📍</span>
          <span className="ms-fit-kpi-val">5.2</span>
          <span className="ms-fit-kpi-lbl">km</span>
        </div>
        <div className="ms-fit-kpi">
          <span className="ms-fit-kpi-icon">💧</span>
          <span className="ms-fit-kpi-val">6/8</span>
          <span className="ms-fit-kpi-lbl">cups</span>
        </div>
      </div>

      <div className="ms-fit-week">
        <p className="ms-fit-week-label">This Week</p>
        <div className="ms-fit-bars">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} className="ms-fit-bar-col">
              <div className="ms-fit-bar-track">
                <div className="ms-fit-bar-fill" style={{ height: `${[55,80,65,90,74,40,20][i]}%` }} />
              </div>
              <span className="ms-fit-bar-day">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GroovePlayerScreen() {
  return (
    <div className="ms-screen-groove">
      <StatusBar />
      <p className="ms-groove-label">NOW PLAYING</p>

      <div className="ms-groove-art">
        <div className="ms-groove-disc">
          <div className="ms-groove-disc-inner" />
        </div>
      </div>

      <div className="ms-groove-info">
        <p className="ms-groove-title">Midnight Echo</p>
        <p className="ms-groove-artist">Lunar Drift</p>
      </div>

      <div className="ms-groove-progress">
        <div className="ms-groove-bar">
          <div className="ms-groove-fill" />
          <div className="ms-groove-dot" />
        </div>
        <div className="ms-groove-times">
          <span>1:24</span>
          <span>3:48</span>
        </div>
      </div>

      <div className="ms-groove-controls">
        <button className="ms-groove-btn ms-groove-btn-sm">⏮</button>
        <button className="ms-groove-btn ms-groove-btn-main">⏸</button>
        <button className="ms-groove-btn ms-groove-btn-sm">⏭</button>
      </div>

      <div className="ms-groove-footer">
        <span>♡</span>
        <div className="ms-groove-eq">
          {[4,7,5,9,6,8,5].map((h, i) => (
            <div key={i} className="ms-groove-eq-bar" style={{ height: `${h * 2}px` }} />
          ))}
        </div>
        <span>↑</span>
      </div>
    </div>
  )
}

function SkyWeatherScreen() {
  return (
    <div className="ms-screen-weather">
      <StatusBar />
      <div className="ms-weather-location">
        <p className="ms-weather-city">São Paulo</p>
        <p className="ms-weather-date">Tuesday, May 27</p>
      </div>

      <div className="ms-weather-main">
        <div className="ms-weather-icon">⛅</div>
        <p className="ms-weather-temp">24°</p>
        <p className="ms-weather-cond">Partly Cloudy</p>
      </div>

      <div className="ms-weather-details">
        <div className="ms-weather-detail">
          <span>🌡</span>
          <span>Feels 22°</span>
        </div>
        <div className="ms-weather-detail">
          <span>💧</span>
          <span>64%</span>
        </div>
        <div className="ms-weather-detail">
          <span>💨</span>
          <span>12 km/h</span>
        </div>
      </div>

      <div className="ms-weather-divider" />

      <div className="ms-weather-forecast">
        {[
          { d: 'Mon', i: '☀️', t: '27°', l: '18°' },
          { d: 'Tue', i: '⛅', t: '24°', l: '17°' },
          { d: 'Wed', i: '🌧', t: '19°', l: '14°' },
          { d: 'Thu', i: '⛅', t: '22°', l: '16°' },
          { d: 'Fri', i: '☀️', t: '26°', l: '19°' },
        ].map((day) => (
          <div key={day.d} className="ms-weather-day">
            <span className="ms-weather-day-name">{day.d}</span>
            <span className="ms-weather-day-icon">{day.i}</span>
            <span className="ms-weather-day-hi">{day.t}</span>
            <span className="ms-weather-day-lo">{day.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NovaWalletScreen() {
  return (
    <div className="ms-screen-wallet">
      <StatusBar />
      <div className="ms-wallet-header">
        <div>
          <p className="ms-wallet-greeting">Good morning</p>
          <p className="ms-wallet-name">Fran ✦</p>
        </div>
        <div className="ms-wallet-avatar">F</div>
      </div>

      <div className="ms-wallet-card">
        <div className="ms-wallet-card-top">
          <span className="ms-wallet-card-label">Total Balance</span>
          <span className="ms-wallet-chip">VISA</span>
        </div>
        <p className="ms-wallet-balance">R$ 8,492<span>.50</span></p>
        <p className="ms-wallet-card-num">•••• •••• •••• 4829</p>
      </div>

      <div className="ms-wallet-actions">
        {[
          { icon: '↑', label: 'Send' },
          { icon: '↓', label: 'Receive' },
          { icon: '⊙', label: 'Pay' },
          { icon: '⊞', label: 'More' },
        ].map((a) => (
          <div key={a.label} className="ms-wallet-action">
            <div className="ms-wallet-action-btn">{a.icon}</div>
            <span>{a.label}</span>
          </div>
        ))}
      </div>

      <div className="ms-wallet-txn-header">
        <span>Recent</span>
        <span className="ms-wallet-see-all">See all</span>
      </div>

      <div className="ms-wallet-txns">
        {[
          { icon: '🛒', name: 'Mercado Livre', cat: 'Shopping', amt: '−R$89', color: '#ef4444' },
          { icon: '🍔', name: 'iFood', cat: 'Food', amt: '−R$42', color: '#f97316' },
          { icon: '💼', name: 'Salary', cat: 'Income', amt: '+R$4.2k', color: '#22c55e' },
        ].map((t) => (
          <div key={t.name} className="ms-wallet-txn">
            <div className="ms-wallet-txn-icon">{t.icon}</div>
            <div className="ms-wallet-txn-info">
              <span className="ms-wallet-txn-name">{t.name}</span>
              <span className="ms-wallet-txn-cat">{t.cat}</span>
            </div>
            <span className="ms-wallet-txn-amt" style={{ color: t.color }}>{t.amt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PulseChatScreen() {
  return (
    <div className="ms-screen-chat">
      <StatusBar light />
      <div className="ms-chat-header">
        <button className="ms-chat-back">‹</button>
        <div className="ms-chat-contact">
          <div className="ms-chat-avatar">E</div>
          <div>
            <p className="ms-chat-name">Emma Wilson</p>
            <p className="ms-chat-status">Online</p>
          </div>
        </div>
        <button className="ms-chat-call">📞</button>
      </div>

      <div className="ms-chat-messages">
        <div className="ms-chat-bubble ms-chat-received">
          Hey! Are you free tonight? 🎉
        </div>
        <p className="ms-chat-time ms-chat-time-left">10:22 AM</p>

        <div className="ms-chat-bubble ms-chat-sent">
          Yes! Just wrapped up. What's the plan?
        </div>
        <p className="ms-chat-time ms-chat-time-right">10:24 AM</p>

        <div className="ms-chat-bubble ms-chat-received">
          Let's grab dinner at that new Italian place! 🍝
        </div>
        <p className="ms-chat-time ms-chat-time-left">10:25 AM</p>

        <div className="ms-chat-bubble ms-chat-sent">
          Perfect! See you at 7 😊
        </div>
        <p className="ms-chat-time ms-chat-time-right">10:27 AM</p>
      </div>

      <div className="ms-chat-input-bar">
        <button className="ms-chat-attach">+</button>
        <div className="ms-chat-input">Type a message...</div>
        <button className="ms-chat-send">➤</button>
      </div>
    </div>
  )
}

function BloomRecipesScreen() {
  return (
    <div className="ms-screen-recipes">
      <StatusBar light />
      <div className="ms-rec-header">
        <div>
          <p className="ms-rec-kicker">Discover</p>
          <p className="ms-rec-title">Recipes 🌿</p>
        </div>
        <div className="ms-rec-avatar">F</div>
      </div>

      <div className="ms-rec-search">
        <span className="ms-rec-search-icon">🔍</span>
        <span className="ms-rec-search-placeholder">Search recipes…</span>
      </div>

      <div className="ms-rec-cats">
        {['All', 'Pasta', 'Sushi', 'Pizza', 'Vegan'].map((c, i) => (
          <span key={c} className={`ms-rec-cat ${i === 1 ? 'is-active' : ''}`}>{c}</span>
        ))}
      </div>

      <div className="ms-rec-featured">
        <div className="ms-rec-featured-img">
          <span className="ms-rec-featured-emoji">🍝</span>
        </div>
        <div className="ms-rec-featured-info">
          <p className="ms-rec-featured-title">Spaghetti Carbonara</p>
          <div className="ms-rec-featured-meta">
            <span>⏱ 25min</span>
            <span>★ 4.8</span>
            <span>Easy</span>
          </div>
        </div>
      </div>

      <p className="ms-rec-section">Popular Now</p>
      {[
        { emoji: '🥗', name: 'Avocado Bowl', time: '15min', rating: '4.9' },
        { emoji: '🍜', name: 'Ramen Delight', time: '30min', rating: '4.7' },
      ].map((r) => (
        <div key={r.name} className="ms-rec-item">
          <div className="ms-rec-item-img">{r.emoji}</div>
          <div className="ms-rec-item-info">
            <p className="ms-rec-item-name">{r.name}</p>
            <p className="ms-rec-item-meta">⏱ {r.time} · ★ {r.rating}</p>
          </div>
          <button className="ms-rec-item-save">♡</button>
        </div>
      ))}
    </div>
  )
}

function ZenFocusScreen() {
  return (
    <div className="ms-screen-zen">
      <StatusBar />
      <div className="ms-zen-header">
        <div>
          <p className="ms-zen-greeting">Good morning</p>
          <p className="ms-zen-sub">Take a moment for yourself</p>
        </div>
        <div className="ms-zen-streak">🔥 14</div>
      </div>

      <div className="ms-zen-circle-wrap">
        <div className="ms-zen-ring ms-zen-ring-3" />
        <div className="ms-zen-ring ms-zen-ring-2" />
        <div className="ms-zen-ring ms-zen-ring-1">
          <p className="ms-zen-breathe">BREATHE</p>
        </div>
      </div>

      <p className="ms-zen-cue">Inhale slowly… 4 seconds</p>

      <div className="ms-zen-sessions">
        {['5 min', '10 min', '20 min'].map((s) => (
          <button key={s} className={`ms-zen-session ${s === '10 min' ? 'is-active' : ''}`}>{s}</button>
        ))}
      </div>

      <div className="ms-zen-tags">
        <span className="ms-zen-tag">🧘 Focus</span>
        <span className="ms-zen-tag">😴 Sleep</span>
        <span className="ms-zen-tag">💆 Stress</span>
      </div>

      <div className="ms-zen-nav-dots">
        {[0,1,2].map(i => <div key={i} className={`ms-zen-dot ${i===1?'is-active':''}`} />)}
      </div>
    </div>
  )
}

function TrekShopScreen() {
  return (
    <div className="ms-screen-shop">
      <StatusBar light />
      <div className="ms-shop-topbar">
        <button className="ms-shop-back">‹</button>
        <p className="ms-shop-topbar-title">Product</p>
        <button className="ms-shop-wish">♡</button>
      </div>

      <div className="ms-shop-product-img">
        <div className="ms-shop-img-bg" />
        <div className="ms-shop-img-badge">NEW</div>
      </div>

      <div className="ms-shop-details">
        <div className="ms-shop-name-row">
          <p className="ms-shop-name">Air Solo Runner</p>
          <div className="ms-shop-rating">★ 4.9 <span>(234)</span></div>
        </div>

        <div className="ms-shop-price-row">
          <p className="ms-shop-price">R$ 349<span>,00</span></p>
          <p className="ms-shop-old-price">R$ 450,00</p>
        </div>

        <p className="ms-shop-sect-label">Color</p>
        <div className="ms-shop-colors">
          {['#111','#e5e7eb','#2563eb','#ef4444','#22c55e'].map((c, i) => (
            <div key={c} className={`ms-shop-color ${i===0?'is-active':''}`} style={{ background: c }} />
          ))}
        </div>

        <p className="ms-shop-sect-label">Size</p>
        <div className="ms-shop-sizes">
          {['38','39','40','41','42'].map((s) => (
            <button key={s} className={`ms-shop-size ${s==='40'?'is-active':''}`}>{s}</button>
          ))}
        </div>

        <button className="ms-shop-cta">Add to Cart</button>
      </div>
    </div>
  )
}

// ─── Music player screens ────────────────────────────────────────────────────

function MobileVinylClassicScreen() {
  return (
    <div className="ms-screen-vinyl-classic">
      <StatusBar light />
      <div className="ms-vclassic-topbar">
        <button className="ms-vclassic-back">‹</button>
        <p className="ms-vclassic-np">NOW PLAYING</p>
        <button className="ms-vclassic-menu">⋯</button>
      </div>

      <div className="ms-vclassic-art">
        <div className="ms-vclassic-halo" />
        <div className="ms-vclassic-disc">
          <div className="ms-vclassic-disc-ring" />
          <div className="ms-vclassic-disc-mid" />
          <div className="ms-vclassic-disc-center" />
        </div>
      </div>

      <div className="ms-vclassic-info">
        <p className="ms-vclassic-title">Blue Reverie</p>
        <p className="ms-vclassic-artist">Coastal Waves</p>
      </div>

      <div className="ms-vclassic-progress">
        <div className="ms-vclassic-bar">
          <div className="ms-vclassic-fill" />
          <div className="ms-vclassic-thumb" />
        </div>
        <div className="ms-vclassic-times">
          <span>2:14</span>
          <span>4:32</span>
        </div>
      </div>

      <div className="ms-vclassic-controls">
        <button className="ms-vclassic-btn">⏮</button>
        <button className="ms-vclassic-play">⏸</button>
        <button className="ms-vclassic-btn">⏭</button>
      </div>

      <div className="ms-vclassic-footer">
        <button className="ms-vclassic-foot-btn">♡</button>
        <div className="ms-vclassic-vol">
          <span className="ms-vclassic-vol-icon">◁</span>
          <div className="ms-vclassic-vol-bar"><div className="ms-vclassic-vol-fill" /></div>
          <span className="ms-vclassic-vol-icon">▷</span>
        </div>
        <button className="ms-vclassic-foot-btn">↑</button>
      </div>
    </div>
  )
}

function MobileVinylLilacScreen() {
  return (
    <div className="ms-screen-vinyl-lilac">
      <StatusBar light />
      <div className="ms-vlilac-topbar">
        <button className="ms-vlilac-back">‹</button>
        <p className="ms-vlilac-np">NOW PLAYING</p>
        <button className="ms-vlilac-menu">⋯</button>
      </div>

      <div className="ms-vlilac-art">
        <div className="ms-vlilac-halo" />
        <div className="ms-vlilac-disc">
          <div className="ms-vlilac-disc-ring" />
          <div className="ms-vlilac-disc-center" />
        </div>
      </div>

      <div className="ms-vlilac-info">
        <p className="ms-vlilac-title">Violet Haze</p>
        <p className="ms-vlilac-artist">Dream Archive</p>
      </div>

      <div className="ms-vlilac-progress">
        <div className="ms-vlilac-bar">
          <div className="ms-vlilac-fill" />
          <div className="ms-vlilac-thumb" />
        </div>
        <div className="ms-vlilac-times">
          <span>1:44</span>
          <span>3:58</span>
        </div>
      </div>

      <div className="ms-vlilac-controls">
        <button className="ms-vlilac-btn">⏮</button>
        <button className="ms-vlilac-play">⏸</button>
        <button className="ms-vlilac-btn">⏭</button>
      </div>

      <div className="ms-vlilac-footer">
        <button className="ms-vlilac-foot-btn">♡</button>
        <div className="ms-vlilac-vol">
          <span className="ms-vlilac-vol-icon">◁</span>
          <div className="ms-vlilac-vol-bar"><div className="ms-vlilac-vol-fill" /></div>
          <span className="ms-vlilac-vol-icon">▷</span>
        </div>
        <button className="ms-vlilac-foot-btn">↑</button>
      </div>
    </div>
  )
}

function MobileVinylStarlightScreen() {
  return (
    <div className="ms-screen-vinyl-starlight">
      <StatusBar />
      <div className="ms-vstar-stars" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="ms-vstar-star"
            style={{
              left: `${(i * 37 + 11) % 90 + 5}%`,
              top: `${(i * 53 + 7) % 80 + 5}%`,
              animationDelay: `${(i * 0.28) % 2.2}s`,
              width: i % 4 === 0 ? '2px' : '1.5px',
              height: i % 4 === 0 ? '2px' : '1.5px',
              opacity: i % 3 === 0 ? 0.8 : 0.45,
            }}
          />
        ))}
      </div>

      <div className="ms-vstar-topbar">
        <button className="ms-vstar-back">‹</button>
        <p className="ms-vstar-np">NOW PLAYING</p>
        <button className="ms-vstar-menu">⋯</button>
      </div>

      <div className="ms-vstar-art">
        <div className="ms-vstar-glow" />
        <div className="ms-vstar-disc">
          <div className="ms-vstar-disc-ring" />
          <div className="ms-vstar-disc-center" />
        </div>
      </div>

      <div className="ms-vstar-info">
        <p className="ms-vstar-title">Starlight Serenade</p>
        <p className="ms-vstar-artist">Nocturne Collective</p>
      </div>

      <div className="ms-vstar-progress">
        <div className="ms-vstar-bar">
          <div className="ms-vstar-fill" />
          <div className="ms-vstar-thumb" />
        </div>
        <div className="ms-vstar-times">
          <span>2:38</span>
          <span>5:12</span>
        </div>
      </div>

      <div className="ms-vstar-controls">
        <button className="ms-vstar-btn">⏮</button>
        <button className="ms-vstar-play">⏸</button>
        <button className="ms-vstar-btn">⏭</button>
      </div>

      <div className="ms-vstar-footer">
        <button className="ms-vstar-foot-btn">♡</button>
        <div className="ms-vstar-vol">
          <span className="ms-vstar-vol-icon">◁</span>
          <div className="ms-vstar-vol-bar"><div className="ms-vstar-vol-fill" /></div>
          <span className="ms-vstar-vol-icon">▷</span>
        </div>
        <button className="ms-vstar-foot-btn">↑</button>
      </div>
    </div>
  )
}

function MobileVinylForestScreen() {
  return (
    <div className="ms-screen-vinyl-forest">
      <StatusBar />
      <div className="ms-vforest-topbar">
        <button className="ms-vforest-back">‹</button>
        <p className="ms-vforest-np">NOW PLAYING</p>
        <button className="ms-vforest-menu">⋯</button>
      </div>

      <div className="ms-vforest-art">
        <div className="ms-vforest-glow" />
        <div className="ms-vforest-disc">
          <div className="ms-vforest-disc-ring" />
          <div className="ms-vforest-disc-center" />
        </div>
      </div>

      <div className="ms-vforest-info">
        <p className="ms-vforest-title">Forest Rain</p>
        <p className="ms-vforest-artist">Earthen Sound</p>
      </div>

      <div className="ms-vforest-progress">
        <div className="ms-vforest-bar">
          <div className="ms-vforest-fill" />
          <div className="ms-vforest-thumb" />
        </div>
        <div className="ms-vforest-times">
          <span>3:02</span>
          <span>6:14</span>
        </div>
      </div>

      <div className="ms-vforest-controls">
        <button className="ms-vforest-btn">⏮</button>
        <button className="ms-vforest-play">⏸</button>
        <button className="ms-vforest-btn">⏭</button>
      </div>

      <div className="ms-vforest-footer">
        <button className="ms-vforest-foot-btn">♡</button>
        <div className="ms-vforest-vol">
          <span className="ms-vforest-vol-icon">◁</span>
          <div className="ms-vforest-vol-bar"><div className="ms-vforest-vol-fill" /></div>
          <span className="ms-vforest-vol-icon">▷</span>
        </div>
        <button className="ms-vforest-foot-btn">↑</button>
      </div>
    </div>
  )
}

// ─── Gallery replicas ────────────────────────────────────────────────────────

function VinylMusicPlayerScreen() {
  return (
    <div className="ms-screen-vmp">
      <div className="ms-vmp-topbar">
        <button className="ms-vmp-icon-btn">←</button>
        <span className="ms-vmp-np-label">NOW PLAYING</span>
        <button className="ms-vmp-icon-btn">⋯</button>
      </div>

      <div className="ms-vmp-disc-wrap">
        <div className="ms-vmp-disc">
          <div className="ms-vmp-album-art">
            <img src={haimCover} alt="Haim - The Wire" />
          </div>
        </div>
      </div>

      <div className="ms-vmp-info">
        <p className="ms-vmp-title">The Wire</p>
        <p className="ms-vmp-artist">HAIM</p>
      </div>

      <div className="ms-vmp-progress-area">
        <div className="ms-vmp-track">
          <div className="ms-vmp-fill" />
          <div className="ms-vmp-thumb" />
        </div>
        <div className="ms-vmp-times">
          <span>1:12</span>
          <span>4:03</span>
        </div>
      </div>

      <div className="ms-vmp-controls">
        <button className="ms-vmp-ctrl">⏮</button>
        <button className="ms-vmp-play">⏸</button>
        <button className="ms-vmp-ctrl">⏭</button>
      </div>

      <div className="ms-vmp-footer">
        <button className="ms-vmp-foot">♡</button>
        <button className="ms-vmp-foot">↑</button>
      </div>
    </div>
  )
}

function StarlightNocturneScreen() {
  return (
    <div className="ms-screen-snp">
      <div className="ms-snp-stars" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="ms-snp-star"
            style={{
              left: `${(i * 41 + 7) % 92 + 3}%`,
              top: `${(i * 61 + 11) % 88 + 3}%`,
              animationDelay: `${(i * 0.7) % 4}s`,
              width: i % 3 === 0 ? '2px' : '1.5px',
              height: i % 3 === 0 ? '2px' : '1.5px',
            }}
          />
        ))}
      </div>

      <div className="ms-snp-topbar">
        <button className="ms-snp-icon-btn">←</button>
        <span className="ms-snp-np-label">NOW PLAYING</span>
        <button className="ms-snp-icon-btn">⋯</button>
      </div>

      <div className="ms-snp-disc-wrap">
        <div className="ms-snp-disc">
          <div className="ms-snp-album-art">
            <img src={haimCover} alt="Haim - The Wire" />
          </div>
        </div>
      </div>

      <div className="ms-snp-info">
        <p className="ms-snp-title">The Wire</p>
        <p className="ms-snp-artist">Starlight Nocturne</p>
      </div>

      <div className="ms-snp-progress-area">
        <div className="ms-snp-track">
          <div className="ms-snp-fill" />
          <div className="ms-snp-thumb" />
        </div>
        <div className="ms-snp-times">
          <span>1:45</span>
          <span>4:03</span>
        </div>
      </div>

      <div className="ms-snp-controls">
        <button className="ms-snp-ctrl">⏮</button>
        <button className="ms-snp-play">⏸</button>
        <button className="ms-snp-ctrl">⏭</button>
      </div>

      <div className="ms-snp-footer">
        <button className="ms-snp-foot">♡</button>
        <button className="ms-snp-foot">↑</button>
      </div>
    </div>
  )
}

function ForestLeafScreen() {
  return (
    <div className="ms-screen-flp">
      <div className="ms-flp-leaves" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="ms-flp-leaf"
            style={{
              left: `${[5, 72, 18, 82, 40, 60][i]}%`,
              top: `${[8, 4, 55, 62, 30, 75][i]}%`,
              animationDelay: `${i * 1.2}s`,
              opacity: [0.18, 0.12, 0.22, 0.14, 0.16, 0.1][i],
            }}
          />
        ))}
      </div>

      <div className="ms-flp-topbar">
        <button className="ms-flp-icon-btn">←</button>
        <span className="ms-flp-np-label">NOW PLAYING</span>
        <button className="ms-flp-icon-btn">⋯</button>
      </div>

      <div className="ms-flp-disc-wrap">
        <div className="ms-flp-disc">
          <div className="ms-flp-album-art">
            <img src={haimCover} alt="Haim - The Wire" />
          </div>
        </div>
      </div>

      <div className="ms-flp-info">
        <p className="ms-flp-title">The Wire</p>
        <p className="ms-flp-artist">Forest Canopy Mix</p>
      </div>

      <div className="ms-flp-progress-area">
        <div className="ms-flp-track">
          <div className="ms-flp-fill" />
          <div className="ms-flp-thumb" />
        </div>
        <div className="ms-flp-times">
          <span>1:53</span>
          <span>4:03</span>
        </div>
      </div>

      <div className="ms-flp-controls">
        <button className="ms-flp-ctrl">⏮</button>
        <button className="ms-flp-play">⏸</button>
        <button className="ms-flp-ctrl">⏭</button>
      </div>

      <div className="ms-flp-footer">
        <button className="ms-flp-foot">♡</button>
        <button className="ms-flp-foot">↑</button>
      </div>
    </div>
  )
}

// ─── Screen router ───────────────────────────────────────────────────────────

function MobileScreenContent({ slug }: { slug: string }) {
  switch (slug) {
    case 'mobile-fitness-tracker': return <FitnessTrackerScreen />
    case 'mobile-groove-player': return <GroovePlayerScreen />
    case 'mobile-sky-weather': return <SkyWeatherScreen />
    case 'mobile-nova-wallet': return <NovaWalletScreen />
    case 'mobile-pulse-chat': return <PulseChatScreen />
    case 'mobile-bloom-recipes': return <BloomRecipesScreen />
    case 'mobile-zen-focus': return <ZenFocusScreen />
    case 'mobile-trek-shop': return <TrekShopScreen />
    case 'mobile-vinyl-classic': return <MobileVinylClassicScreen />
    case 'mobile-vinyl-lilac': return <MobileVinylLilacScreen />
    case 'mobile-vinyl-starlight': return <MobileVinylStarlightScreen />
    case 'mobile-vinyl-forest': return <MobileVinylForestScreen />
    case 'mobile-vinyl-music-player': return <VinylMusicPlayerScreen />
    case 'mobile-starlight-nocturne': return <StarlightNocturneScreen />
    case 'mobile-forest-leaf': return <ForestLeafScreen />
    default: return null
  }
}

// ─── Mobile screen card ──────────────────────────────────────────────────────

type MobileScreenCardProps = {
  screen: MobileScreen
  isLiked: boolean
  onToggleLike: (slug: string) => void
}

function MobileScreenCard({ screen, isLiked, onToggleLike }: MobileScreenCardProps) {
  return (
    <div className="mobile-screen-card">
      <div className="ms-phone-wrap">
        <div className="ms-phone-frame">
          <div className="ms-screen">
            <MobileScreenContent slug={screen.slug} />
          </div>
        </div>
      </div>

      <div className="mobile-screen-info">
        <div className="mobile-screen-card-header">
          <span className="pill">{screen.category}</span>
          <button
            type="button"
            className={`like-button ${isLiked ? 'is-liked' : ''}`}
            onClick={() => onToggleLike(screen.slug)}
            aria-label={isLiked ? 'Remover dos favoritos' : 'Favoritar'}
            title={isLiked ? 'favoritado' : 'favorito'}
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h3 className="mobile-screen-title">{screen.title}</h3>
        <p className="mobile-screen-subtitle">{screen.subtitle}</p>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

type MobileGalleryPageProps = {
  screens: MobileScreen[]
  likes: Record<string, boolean>
  onToggleLike: (slug: string) => void
}

export function MobileGalleryPage({ screens, likes, onToggleLike }: MobileGalleryPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showOnlyLiked, setShowOnlyLiked] = useState(false)

  const normalize = (v: string) =>
    v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

  const filtered = useMemo(() => {
    const q = normalize(searchTerm)
    return screens.filter((s) => {
      if (showOnlyLiked && !likes[s.slug]) return false
      if (!q) return true
      return normalize(s.title).includes(q) || normalize(s.category).includes(q)
    })
  }, [screens, likes, searchTerm, showOnlyLiked])

  return (
    <main className="app-shell">
      <header className="hero-section">
        <p className="hero-kicker">Fran Camargo</p>
        <h1>Mobile Design Gallery</h1>
        <p className="hero-signature">
          Coleção de telas de app mobile desenhadas com foco em tipografia, hierarquia e identidade visual.
          Cada tela é um UI completo e autônomo, inspirado em produtos reais.
        </p>
      </header>

      <div className="gallery-toolbar" aria-label="Ferramentas da galeria">
        <div className="hover-search">
          <span className="hover-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M10.5 3.5a7 7 0 1 0 4.45 12.4l4.33 4.33a1 1 0 0 0 1.42-1.42l-4.33-4.33A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z" />
            </svg>
          </span>
          <input
            type="search"
            className="hover-search-input"
            placeholder="Buscar por nome ou categoria"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          type="button"
          className={`favorites-filter-button ${showOnlyLiked ? 'is-active' : ''}`}
          aria-label={showOnlyLiked ? 'Mostrar todos' : 'Mostrar favoritos'}
          aria-pressed={showOnlyLiked}
          onClick={() => setShowOnlyLiked((v) => !v)}
        >
          <Heart size={18} fill={showOnlyLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <section className="mobile-gallery-grid" aria-label="Galeria de telas mobile">
        {filtered.map((screen) => (
          <MobileScreenCard
            key={screen.slug}
            screen={screen}
            isLiked={Boolean(likes[screen.slug])}
            onToggleLike={onToggleLike}
          />
        ))}
        {filtered.length === 0 && (
          <p className="gallery-empty-inline" aria-live="polite">
            {showOnlyLiked
              ? `Nenhum item favoritado${searchTerm ? ` para "${searchTerm}"` : ''}.`
              : `Nenhum item encontrado para "${searchTerm}".`}
          </p>
        )}
      </section>
    </main>
  )
}
