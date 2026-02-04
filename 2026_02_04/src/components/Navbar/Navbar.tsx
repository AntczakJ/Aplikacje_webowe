import {Link} from "react-router";

import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <Link to="/">Strona główna</Link>
        </li>
        <li>
          <Link to="/wpisy">Wpisy</Link>
        </li>
        <li>
          <Link to="/kontakt">Kontakt</Link>
        </li>
      </ul>
    </nav>
  )
}
