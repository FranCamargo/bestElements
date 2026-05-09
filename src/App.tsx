import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { galleryItems } from './data/galleryItems.ts'
import { AboutMePage } from './pages/AboutMePage.tsx'
import { CuradoriaElementPage } from './pages/CuradoriaElementPage.tsx'
import { HomePage } from './pages/HomePage.tsx'

type ThemeMode = 'light' | 'dark'

function App() {
  const location = useLocation()

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('be-theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  const [likes, setLikes] = useState<Record<string, boolean>>(() => {
    const savedLikes = sessionStorage.getItem('be-favorites')

    if (!savedLikes) {
      return {}
    }

    try {
      return JSON.parse(savedLikes) as Record<string, boolean>
    } catch {
      return {}
    }
  })

  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('be-theme', theme)
  }, [theme])

  useEffect(() => {
    sessionStorage.setItem('be-favorites', JSON.stringify(likes))
  }, [likes])

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 8)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollState)
    }
  }, [])

  const toggleLike = (slug: string) => {
    setLikes((currentLikes) => ({
      ...currentLikes,
      [slug]: !currentLikes[slug],
    }))
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <header
        className={`top-navigation ${hasScrolled ? 'is-scrolled' : ''}`}
        aria-label="Navegacao principal"
      >
        <div className="top-navigation-inner">
          <nav className="top-navigation-links" aria-label="Atalhos principais">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'is-active' : ''}`}>
              Home
            </Link>
            <Link
              to="/sobre-mim"
              className={`nav-link ${location.pathname === '/sobre-mim' ? 'is-active' : ''}`}
            >
              Sobre mim
            </Link>
          </nav>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              items={galleryItems}
              likes={likes}
              onToggleLike={toggleLike}
            />
          }
        />
        {galleryItems.map((item) => (
          <Route
            key={item.slug}
            path={item.route}
            element={<CuradoriaElementPage item={item} isLiked={Boolean(likes[item.slug])} />}
          />
        ))}
        <Route path="/sobre-mim" element={<AboutMePage />} />
      </Routes>
    </>
  )
}

export default App
