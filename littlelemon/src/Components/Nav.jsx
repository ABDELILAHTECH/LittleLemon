import "./Nav.scss" 
import { Link } from "react-router-dom"

export default function Nav({ direction = "row" ,label = "Navigation" }) {
  const navItems = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login']

  return (
    <nav className={`nav-${direction}`} aria-label={label} >
      <ul>
        {navItems.map((item) => {
          if (item === 'About' || item === 'Menu') {
            return (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            )
          }
          return (
            <li key={item}>
              <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}>
                {item}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}