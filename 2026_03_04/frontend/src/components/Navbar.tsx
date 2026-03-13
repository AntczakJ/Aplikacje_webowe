import { NavLink } from 'react-router-dom'
import '../styles/navbar.scss'

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="brand">
        Blog
      </NavLink>
      <NavLink to="/wpis">Wpisy</NavLink>
      <NavLink to="/kategoria">Kategorie</NavLink>
      <NavLink to="/komentarz">Komentarze</NavLink>
    </nav>
  )
}

export default Navbar
