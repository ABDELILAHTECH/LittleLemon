import "./Nav.scss"
import { Link } from "react-router-dom"

export default function Nav({ direction = "row", label = "Navigation", isOpen = false, onLinkClick }) {
  const navItems = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login']

  return (
    <nav className={`nav-${direction} ${isOpen ? 'open' : ''}`} aria-label={label}>
      <ul>
        {navItems.map((item) => {
          if (item === 'About' || item === 'Menu') {
            return (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={onLinkClick}>{item}</a>
              </li>
            )
          }
          return (
            <li key={item}>
              <Link
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                onClick={onLinkClick}
              >
                {item}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}