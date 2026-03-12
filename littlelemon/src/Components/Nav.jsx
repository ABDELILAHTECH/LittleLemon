import React from 'react'

export default function Nav() {
  const navItems = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login']
  return (
    <nav>
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
