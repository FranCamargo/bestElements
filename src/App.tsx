import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import './styles/portfolio.css'
import { SiteFooter } from './components/SiteFooter.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { galleryItems } from './data/galleryItems.ts'
import { mobileScreens } from './data/mobileItems.ts'
import { ComponentsPage } from './pages/ComponentsPage.tsx'
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

  // As páginas de privacidade mantêm a paleta original (tons quentes)
  useEffect(() => {
    if (isNavHidden) document.documentElement.setAttribute('data-skin', 'classic')
    else document.documentElement.removeAttribute('data-skin')
  }, [isNavHidden])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ComponentsPage
              items={galleryItems}
              likes={likes}
              onToggleLike={toggleLike}
              headerAction={<ThemeToggle theme={theme} onToggle={toggleTheme} />}
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
        {/* Endereços antigos do portfólio levam para a galeria */}
        <Route path="/componentes" element={<Navigate to="/" replace />} />
        <Route path="/sobre-mim" element={<Navigate to="/" replace />} />
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
