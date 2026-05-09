import { Moon, Sun } from 'lucide-react'

type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const Icon = theme === 'light' ? Moon : Sun

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={
        theme === 'light'
          ? 'Ativar modo escuro'
          : 'Ativar modo claro'
      }
      title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
    >
      <Icon size={20} strokeWidth={2.3} />
    </button>
  )
}