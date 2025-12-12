import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="nav">
            <NavLink to="/">Strona Główna   </NavLink>
            <NavLink to="/contact">Kontakt  </NavLink>
            <NavLink to="/about">O nas</NavLink>
        </nav>
    );
}
