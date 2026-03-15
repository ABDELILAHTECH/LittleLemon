import Logo from './Logo'
import Nav from './Nav'
import "./Header.scss"

export default function Header() {
  return (
    <header aria-label='Little Lemon Header' >
        <Logo />
        <Nav label='Main Navigation' />
    </header>
  )
}
