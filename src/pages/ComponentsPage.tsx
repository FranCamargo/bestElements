import { useMemo, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { GalleryCard } from '../components/GalleryCard.tsx'
import { SelectMenu } from '../components/SelectMenu.tsx'
import type { GalleryItem } from '../data/galleryItems.ts'

type SortOrder = 'a-z' | 'z-a' | 'recentes' | 'antigos' | 'tipo' | 'colecao'

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'a-z', label: 'A → Z' },
  { value: 'z-a', label: 'Z → A' },
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'antigos', label: 'Mais antigos' },
  { value: 'tipo', label: 'Tipo' },
  { value: 'colecao', label: 'Coleção' },
]

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

type PageSize = '12' | '24' | '48' | 'todos'

const pageSizeOptions: { value: PageSize; label: string }[] = [
  { value: '12', label: '12 / página' },
  { value: '24', label: '24 / página' },
  { value: '48', label: '48 / página' },
  { value: 'todos', label: 'Todos' },
]

/** Números de página com reticências: 1 … 4 5 6 … 12 */
function getPageList(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p))
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: (number | 'gap')[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('gap')
    result.push(p)
  })
  return result
}

function getCollection(slug: string): string {
  if (slug.startsWith('neo-') || NEO_SLUGS.has(slug)) return 'Neo'
  if (GLASS_SLUGS.has(slug)) return 'Glass'
  if (GN_SOFT_SLUGS.has(slug)) return 'GN Soft'
  if (slug.startsWith('gn-')) return 'GN'
  return ''
}

type ComponentsPageProps = {
  items: GalleryItem[]
  likes: Record<string, boolean>
  onToggleLike: (slug: string) => void
  /** Ação no topo da página, à direita (ex.: botão de tema) */
  headerAction?: ReactNode
}

export function ComponentsPage({ items, likes, onToggleLike, headerAction }: ComponentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false)
  const [showOnlyLiked, setShowOnlyLiked] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder | ''>('')
  const [pageSize, setPageSize] = useState<PageSize>('12')
  const [page, setPage] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)

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

  const perPage = pageSize === 'todos' ? Math.max(filteredItems.length, 1) : Number(pageSize)
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const firstIndex = (currentPage - 1) * perPage
  const pageItems = filteredItems.slice(firstIndex, firstIndex + perPage)

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), totalPages))
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="app-shell components-shell">
      <header className="page-head" aria-labelledby="componentes-title">
        <div className="page-head-top">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Laboratório de UI
          </p>
          {headerAction}
        </div>
        <h1 id="componentes-title" className="display display--md">
          Best Elements
          <span className="page-subtitle">Galeria de componentes</span>
        </h1>
        <p className="lead">
          Curadoria de interfaces, componentes e micro-interações front-end para estudo e
          referência. Todos são interativos: use o botão de expandir para ver em detalhe.
        </p>
      </header>

      <section ref={sectionRef} className="components-section" aria-label="Galeria de elementos">
        <div className="components-bar">
          <div className="gallery-toolbar" aria-label="Ferramentas da galeria">
            <SelectMenu
              label="Ordenar itens da galeria"
              value={sortOrder || 'a-z'}
              options={sortOptions}
              onChange={(value) => {
                setSortOrder(value)
                setPage(1)
              }}
            />

            <SelectMenu
              className="page-size-menu"
              label="Itens por página"
              value={pageSize}
              options={pageSizeOptions}
              onChange={(value) => {
                setPageSize(value)
                setPage(1)
              }}
            />

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
                placeholder="Buscar componente"
                aria-label="Pesquisar por nome ou tipo"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                  setPage(1)
                }}
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
              onClick={() => {
                setShowOnlyLiked((currentState) => !currentState)
                setPage(1)
              }}
            >
              <Heart size={18} fill={showOnlyLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="gallery-grid">
          {pageItems.map((item) => (
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
        </div>

        {filteredItems.length > 0 ? (
          <nav className="gallery-pagination" aria-label="Paginação da galeria">
            <p className="gallery-pagination-info mono" aria-live="polite">
              {firstIndex + 1}–{firstIndex + pageItems.length} de {filteredItems.length}
            </p>

            {totalPages > 1 ? (
              <div className="gallery-pagination-pages">
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={17} />
                </button>
                {getPageList(currentPage, totalPages).map((entry, i) =>
                  entry === 'gap' ? (
                    <span key={`gap-${i}`} className="page-gap" aria-hidden="true">…</span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      className={`page-btn${entry === currentPage ? ' is-active' : ''}`}
                      onClick={() => goToPage(entry)}
                      aria-label={`Página ${entry}`}
                      aria-current={entry === currentPage ? 'page' : undefined}
                    >
                      {entry}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Próxima página"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            ) : null}

          </nav>
        ) : null}
      </section>
    </main>
  )
}
