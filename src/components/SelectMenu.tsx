import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

type Option<T extends string> = { value: T; label: string }

type SelectMenuProps<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  label: string
}

/** Dropdown no estilo do site (substitui o <select> nativo, cuja lista não segue o tema). */
export function SelectMenu<T extends string>({ value, options, onChange, label }: SelectMenuProps<T>) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const id = useId()
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value))

  useEffect(() => {
    if (!open) return
    listRef.current?.focus()
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open])

  const openMenu = () => {
    setActive(selectedIndex)
    setOpen(true)
  }

  const choose = (index: number) => {
    onChange(options[index].value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onListKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((i) => (i + 1) % options.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((i) => (i - 1 + options.length) % options.length)
        break
      case 'Home':
        e.preventDefault()
        setActive(0)
        break
      case 'End':
        e.preventDefault()
        setActive(options.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        choose(active)
        break
      case 'Escape':
        e.preventDefault()
        e.stopPropagation()
        setOpen(false)
        buttonRef.current?.focus()
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div className={`select-menu${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="select-menu-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${options[selectedIndex]?.label}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            openMenu()
          }
        }}
      >
        <span>{options[selectedIndex]?.label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          className="select-menu-list"
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`select-menu-option${index === active ? ' is-active' : ''}`}
              onPointerEnter={() => setActive(index)}
              onClick={() => choose(index)}
            >
              {option.label}
              {option.value === value && <Check size={15} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
