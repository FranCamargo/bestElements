import { Heart, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { GalleryItem } from '../data/galleryItems.ts'
import { InteractivePreview } from '../pages/CuradoriaElementPage.tsx'

type GalleryCardProps = {
  item: GalleryItem
  isLiked: boolean
  onToggleLike: (slug: string) => void
}

export function GalleryCard({ item, isLiked, onToggleLike }: GalleryCardProps) {
  return (
    <article className="gallery-card">
      <div className="card-thumbnail card-thumbnail-clean">
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
            View
            <MoveRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  )
}