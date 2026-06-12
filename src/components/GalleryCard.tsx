import { Heart, Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { GalleryItem } from '../data/galleryItems.ts'
import { InteractivePreview } from '../pages/CuradoriaElementPage.tsx'

type GalleryCardProps = {
  item: GalleryItem
  isLiked: boolean
  onToggleLike: (slug: string) => void
}

const NEO_SLUGS = new Set(['curadoria-neomorphic-button', 'curadoria-realistic-toggle'])
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

function isNeoSlug(slug: string) {
  return slug.startsWith('neo-') || NEO_SLUGS.has(slug)
}

function isGnSoftSlug(slug: string) {
  return GN_SOFT_SLUGS.has(slug)
}

function isGlassWaterSlug(slug: string) {
  return GLASS_WATER_SLUGS.has(slug)
}

function isGnSlug(slug: string) {
  return slug.startsWith('gn-')
}

export function GalleryCard({ item, isLiked, onToggleLike }: GalleryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const isScreenLightsCard = item.slug.startsWith('curadoria-screen-lights-pattern')
  const cardClasses = `gallery-card ${isScreenLightsCard ? 'gallery-card-screen-lights' : ''}`

  const thumbnailExtra = isNeoSlug(item.slug)
    ? ' card-thumbnail-neo'
    : isGnSoftSlug(item.slug)
      ? ' card-thumbnail-gn-soft'
      : isGlassWaterSlug(item.slug)
        ? ' card-thumbnail-glass-water'
        : isGnSlug(item.slug)
          ? ' card-thumbnail-gn'
          : ''

  const previewBgClass = isGnSoftSlug(item.slug)
    ? ' is-glass-soft'
    : isGlassWaterSlug(item.slug)
      ? ' is-glass-water'
      : ''

  useEffect(() => {
    if (!isExpanded) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsExpanded(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isExpanded])

  return (
    <>
      <article className={cardClasses}>
        <div className={`card-thumbnail card-thumbnail-clean${thumbnailExtra}`}>
          <div className="card-preview-live">
            <div className="preview-center-frame">
              <InteractivePreview slug={item.slug} />
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="card-pill-row">
            <span className="pill">{item.category}</span>
            <button
              type="button"
              className="card-expand-btn"
              onClick={() => setIsExpanded(true)}
              aria-label="Expandir visualização"
              title="Expandir visualização"
            >
              <Maximize2 size={14} strokeWidth={2.8} />
            </button>
          </div>
          <h2>{item.title}</h2>
          <p>{item.subtitle}</p>

          <div className="card-actions">
            <button
              type="button"
              className={`like-button ${isLiked ? 'is-liked' : ''}`}
              onClick={() => onToggleLike(item.slug)}
              aria-label={isLiked ? 'Remover dos favoritos' : 'Marcar como favorito'}
              title={isLiked ? 'favoritado' : 'favorito'}
            >
              <Heart size={17} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </article>

      {isExpanded && createPortal(
        <div
          className="card-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setIsExpanded(false) }}
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização: ${item.title}`}
        >
          <div className="card-modal">
            <div className="card-modal-header">
              <span className="card-modal-title">{item.title}</span>
              <button
                type="button"
                className="card-modal-close"
                onClick={() => setIsExpanded(false)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
            <div className={`component-live-preview card-modal-preview${previewBgClass}`}>
              <div className="preview-pattern-stage">
                <div className="preview-center-frame">
                  <InteractivePreview slug={item.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
