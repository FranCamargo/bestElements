import { Heart, MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

type ItemPageShellProps = {
  title: string
  description: string
  isLiked: boolean
  children: React.ReactNode
}

export function ItemPageShell({
  title,
  description,
  isLiked,
  children,
}: ItemPageShellProps) {
  return (
    <main className="app-shell item-shell">
      <header className="item-header">
        <h1>{title}</h1>
        <div className="item-header-subline">
          <p>{description}</p>
          <Link to="/" className="back-link">
            <MoveLeft size={18} />
            Voltar para galeria
          </Link>
        </div>
        {isLiked && (
          <span className="item-like is-liked">
            <Heart size={16} fill="currentColor" />
            Este item esta nos favoritos
          </span>
        )}
      </header>

      <section className="item-preview">{children}</section>
    </main>
  )
}