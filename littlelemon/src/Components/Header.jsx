import { useState, useEffect } from 'react'
import Logo from './Logo'
import Nav from './Nav'
import "./Header.scss"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header aria-label="Little Lemon Header">
      <Logo />

      <button
        className={`burger ${isOpen ? 'active' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <Nav label="Main Navigation" isOpen={isOpen} onLinkClick={() => setIsOpen(false)} />
    </header>
  )
}