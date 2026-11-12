import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import './styles/portfolio.css'
import { SiteFooter } from './components/SiteFooter.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { galleryItems } from './data/galleryItems.ts'
import { mobileScreens } from './data/mobileItems.ts'
import { profile } from './data/profile.ts'
import { AboutMePage } from './pages/AboutMePage.tsx'
import { ComponentsPage } from './pages/ComponentsPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { LirioPrivacyPolicyPage } from './pages/LirioPrivacyPolicyPage.tsx'
import { MobileGalleryPage } from './pages/MobileGalleryPage.tsx'
import { OlivPrivacyPolicyPage } from './pages/OlivPrivacyPolicyPage.tsx'
import { PinsBestSellerPrivacyPolicyPage } from './pages/PinsBestSellerPrivacyPolicyPage.tsx'
import { UneBrPrivacyPolicyPage } from './pages/UneBrPrivacyPolicyPage.tsx'

type ThemeMode = 'light' | 'dark'

function App() {
  const location = useLocation()

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem('be-theme')
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme
    } catch {
      /* storage indisponível */
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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
    try {
      localStorage.setItem('be-theme', theme)
    } catch {
      /* storage indisponível */
    }
  }, [theme])

  useEffect(() => {
    sessionStorage.setItem('be-favorites', JSON.stringify(likes))
  }, [likes])

  useEffect(() => {
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.pathname, location.hash])

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

  const isNavHidden =
    location.pathname === '/unebr/privacidade' ||
    location.pathname === '/oliv/privacy' ||
    location.pathname === '/pins-best-seller/privacy' ||
    location.pathname === '/lirio/privacy'

  return (
    <>
      {!isNavHidden && (
        <header
          className={`site-header ${hasScrolled ? 'is-scrolled' : ''}`}
          aria-label="Navegação principal"
        >
          <div className="site-header-inner">
            <Link to="/" className="brand" aria-label={`${profile.shortName}, página inicial`}>
              <span className="brand-mark" aria-hidden="true">fc</span>
              <span className="brand-text">
                <strong>{profile.shortName}</strong>
                <small>{profile.role}</small>
              </span>
            </Link>

            <nav className="site-nav" aria-label="Seções">
              <Link
                to="/"
                className={`site-nav-link ${location.pathname === '/' ? 'is-active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Projetos
              </Link>
              <Link
                to="/componentes"
                className={`site-nav-link ${location.pathname === '/componentes' ? 'is-active' : ''}`}
                aria-current={location.pathname === '/componentes' ? 'page' : undefined}
              >
                Componentes
              </Link>
              <Link
                to="/sobre-mim"
                className={`site-nav-link ${location.pathname === '/sobre-mim' ? 'is-active' : ''}`}
                aria-current={location.pathname === '/sobre-mim' ? 'page' : undefined}
              >
                Sobre
              </Link>
            </nav>

            <div className="site-header-actions">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <a className="btn btn-primary btn-sm site-header-cta" href={`mailto:${profile.email}`}>
                Contato
              </a>
            </div>
          </div>
        </header>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/componentes"
          element={
            <ComponentsPage
              items={galleryItems}
              likes={likes}
              onToggleLike={toggleLike}
            />
          }
        />
        <Route
          path="/mobile"
          element={
            <MobileGalleryPage
              screens={mobileScreens}
              likes={likes}
              onToggleLike={toggleLike}
            />
          }
        />
        <Route path="/sobre-mim" element={<AboutMePage />} />
        <Route path="/unebr/privacidade" element={<UneBrPrivacyPolicyPage />} />
        <Route path="/oliv/privacy" element={<OlivPrivacyPolicyPage />} />
        <Route path="/pins-best-seller/privacy" element={<PinsBestSellerPrivacyPolicyPage />} />
        <Route path="/lirio/privacy" element={<LirioPrivacyPolicyPage />} />
      </Routes>
      {!isNavHidden && <SiteFooter />}
    </>
  )
}

export default App
