import { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { GalleryCard } from '../components/GalleryCard.tsx'
import type { GalleryItem } from '../data/galleryItems.ts'

type SortOrder = 'a-z' | 'z-a' | 'recentes' | 'antigos' | 'tipo' | 'colecao'

const NEO_SLUGS = new Set(['curadoria-neomorphic-button', 'curadoria-realistic-toggle'])
const GN_SOFT_SLUGS = new Set([
  'gn-segmented-control',
  'gn-toggle-switch',
  'gn-input-field',
  'gn-numpad',
  'gn-bottom-nav',
  'gn-text-nav',
])
const GLASS_SLUGS = new Set(['glass-profile-card', 'gn-reminders-card'])

function getCollection(slug: string): string {
  if (slug.startsWith('neo-') || NEO_SLUGS.has(slug)) return 'Neo'
  if (GLASS_SLUGS.has(slug)) return 'Glass'
  if (GN_SOFT_SLUGS.has(slug)) return 'GN Soft'
  if (slug.startsWith('gn-')) return 'GN'
  return ''
}

type HomePageProps = {
  items: GalleryItem[]
  likes: Record<string, boolean>
  onToggleLike: (slug: string) => void
}

export function HomePage({ items, likes, onToggleLike }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false)
  const [showOnlyLiked, setShowOnlyLiked] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder | ''>('')

  const normalizeValue = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  const itemIndexMap = useMemo(
    () => new Map(items.map((item, index) => [item.slug, index])),
    [items]
  )

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalizeValue(searchTerm)

    const result = items.filter((item) => {
      if (showOnlyLiked && !likes[item.slug]) return false
      if (!normalizedSearch) return true
      return (
        normalizeValue(item.title).includes(normalizedSearch) ||
        normalizeValue(item.category).includes(normalizedSearch)
      )
    })

    result.sort((a, b) => {
      switch (sortOrder) {
        case 'z-a':
          return b.title.localeCompare(a.title, 'pt-BR', { sensitivity: 'base' })
        case 'recentes':
          return (itemIndexMap.get(b.slug) ?? 0) - (itemIndexMap.get(a.slug) ?? 0)
        case 'antigos':
          return (itemIndexMap.get(a.slug) ?? 0) - (itemIndexMap.get(b.slug) ?? 0)
        case 'tipo':
          return (
            a.category.localeCompare(b.category, 'pt-BR', { sensitivity: 'base' }) ||
            a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
          )
        case 'colecao': {
          const ca = getCollection(a.slug)
          const cb = getCollection(b.slug)
          if (!ca && cb) return 1
          if (ca && !cb) return -1
          return (
            ca.localeCompare(cb, 'pt-BR', { sensitivity: 'base' }) ||
            a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
          )
        }
        default:
          return a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
      }
    })

    return result
  }, [items, likes, searchTerm, showOnlyLiked, sortOrder, itemIndexMap])

  return (
    <main className="app-shell">
      <header className="hero-section">
        <p className="hero-kicker">Fran Camargo</p>
        <h1>UI & Dashboard Gallery</h1>
        <p className="hero-signature">
          Curadoria de interfaces e componentes front-end desenvolvidos por mim como forma de estudo e referência.
          Clique no botão de expansão para ver o elemento por completo.
        </p>
      </header>

      <div className="gallery-toolbar" aria-label="Ferramentas da galeria">
        <label className="sr-only" htmlFor="gallery-sort">Ordenar por</label>
        <select
          id="gallery-sort"
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder | '')}
          aria-label="Ordenar itens da galeria"
        >
          <option value="" disabled>Ordenar</option>
          <option value="a-z">A → Z</option>
          <option value="z-a">Z → A</option>
          <option value="recentes">Mais Recentes</option>
          <option value="antigos">Mais Antigos</option>
          <option value="tipo">Tipo</option>
          <option value="colecao">Coleção</option>
        </select>

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