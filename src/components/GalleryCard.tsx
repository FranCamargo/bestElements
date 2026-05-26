import { Heart, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { GalleryItem } from '../data/galleryItems.ts'
import { InteractivePreview } from '../pages/CuradoriaElementPage.tsx'

type GalleryCardProps = {
  item: GalleryItem
  isLiked: boolean
  onToggleLike: (slug: string) => void
}

const NEO_SLUGS = new Set(['curadoria-neomorphic-button', 'curadoria-realistic-toggle'])

function isNeoSlug(slug: string) {
  return slug.startsWith('neo-') || NEO_SLUGS.has(slug)
}

function isGnSlug(slug: string) {
  return slug.startsWith('gn-')
}

export function GalleryCard({ item, isLiked, onToggleLike }: GalleryCardProps) {
  const isScreenLightsCard = item.slug.startsWith('curadoria-screen-lights-pattern')
  const cardClasses = `gallery-card ${isScreenLightsCard ? 'gallery-card-screen-lights' : ''}`

  const thumbnailExtra = isNeoSlug(item.slug)
    ? ' card-thumbnail-neo'
    : isGnSlug(item.slug)
      ? ' card-thumbnail-gn'
      : ''

  return (
    <article className={cardClasses}>
      <div className={`card-thumbnail card-thumbnail-clean${thumbnailExtra}`}>
        <div className="card-preview-live" aria-hidden="true">
          <div className="preview-center-frame">
            <InteractivePreview slug={item.slug} />
          </div>
        </div>
      </div>

      <div className="card-content">
        <span className="pill">{item.category}</span>
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

          <Link to={item.route} className="details-link">
            Ver
            <MoveRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  )
}