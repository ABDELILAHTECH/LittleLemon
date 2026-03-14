import "./Nav.scss" 
export default function Nav({direction = "row"}) {
  const navItems = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login']
 
  return (

    
    <nav className={`nav-${direction}`}>
      <ul>
        {navItems.map((item) => (
          <li key={item}>
            <a href={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
