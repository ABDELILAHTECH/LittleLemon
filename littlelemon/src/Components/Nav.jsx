import "./Nav.scss" 
import {Link} from "react-router-dom"
export default function Nav({direction = "row"}) {
  const navItems = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login']
 
  return (

    
    <nav className={`nav-${direction}`}>
      <ul>
        {navItems.map((item) => (
          <li key={item}>
            <Link to={`/${item.toLowerCase().replace(' ', '-')}`}>
            {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
