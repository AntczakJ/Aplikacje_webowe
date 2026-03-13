import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container">
      <h2>Witaj na blogu</h2>
      <ul>
        <li>
          <Link to="/wpis">Wpisy</Link>
        </li>
        <li>
          <Link to="/kategoria">Kategorie</Link>
        </li>
        <li>
          <Link to="/komentarz">Komentarze</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
