import { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { GalleryCard } from '../components/GalleryCard.tsx'
import type { GalleryItem } from '../data/galleryItems.ts'

type HomePageProps = {
  items: GalleryItem[]
  likes: Record<string, boolean>
  onToggleLike: (slug: string) => void
}

export function HomePage({ items, likes, onToggleLike }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false)
  const [showOnlyLiked, setShowOnlyLiked] = useState(false)

  const normalizeValue = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalizeValue(searchTerm)

    const sortByTitle = (left: GalleryItem, right: GalleryItem) =>
      left.title.localeCompare(right.title, 'pt-BR', { sensitivity: 'base' })

    return items
      .filter((item) => {
        if (showOnlyLiked && !likes[item.slug]) {
          return false
        }

        if (!normalizedSearch) {
          return true
        }

        const normalizedTitle = normalizeValue(item.title)
        const normalizedCategory = normalizeValue(item.category)
        return (
          normalizedTitle.includes(normalizedSearch) ||
          normalizedCategory.includes(normalizedSearch)
        )
      })
      .sort(sortByTitle)
  }, [items, likes, searchTerm, showOnlyLiked])

  return (
    <main className="app-shell">
      <header className="hero-section">
        <p className="hero-kicker">Fran Camargo</p>
        <h1>UI & Dashboard Gallery</h1>
        <p className="hero-signature">
          Curadoria de interfaces e componentes front-end desenvolvidos por mim para você se inspirar e utilizar.
          Clique nos cards para ver detalhes e o código-fonte.
        </p>
      </header>

      <div className="gallery-toolbar" aria-label="Ferramentas da galeria">
        <div className={`hover-search ${isSearchCollapsed ? 'is-collapsed' : ''}`}>
          <button
            type="button"
            className="hover-search-toggle"
            aria-label={isSearchCollapsed ? 'Abrir busca' : 'Fechar busca'}
            onClick={() => setIsSearchCollapsed((currentState) => !currentState)}
          >
            <span className="hover-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M10.5 3.5a7 7 0 1 0 4.45 12.4l4.33 4.33a1 1 0 0 0 1.42-1.42l-4.33-4.33A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z" />
            </svg>
            </span>
          </button>
          <span className="sr-only">Pesquisar por nome ou tipo</span>
          <input
            id="gallery-search"
            name="gallery-search"
            type="search"
            className="hover-search-input"
            placeholder="Pesquisar por nome ou tipo"
            aria-label="Pesquisar por nome ou tipo"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            disabled={isSearchCollapsed}
          />
        </div>

        <button
          type="button"
          className={`favorites-filter-button ${showOnlyLiked ? 'is-active' : ''}`}
          aria-label={
            showOnlyLiked
              ? 'Mostrar todos os itens da galeria'
              : 'Mostrar apenas itens favoritados'
          }
          aria-pressed={showOnlyLiked}
          title={showOnlyLiked ? 'Mostrando favoritados' : 'Filtrar por favoritados'}
          onClick={() => setShowOnlyLiked((currentState) => !currentState)}
        >
          <Heart size={18} fill={showOnlyLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <section className="gallery-grid" aria-label="Galeria de elementos">
        {filteredItems.map((item) => (
          <GalleryCard
            key={item.slug}
            item={item}
            isLiked={Boolean(likes[item.slug])}
            onToggleLike={onToggleLike}
          />
        ))}

        {filteredItems.length === 0 ? (
          <p className="gallery-empty-inline" aria-live="polite">
            {showOnlyLiked
              ? `Nenhum item favoritado encontrado${searchTerm ? ` para "${searchTerm}"` : ''}.`
              : `Nenhum item encontrado para "${searchTerm}".`}
          </p>
        ) : null}
      </section>
    </main>
  )
}