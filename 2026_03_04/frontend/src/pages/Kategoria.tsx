import { useState, useEffect } from 'react'

const ENUMS = ['fajne', 'niefajne', 'cool', 'disgusting', 'freaky', 'insane']

function KategoriaPage() {
  const [kategorie, setKategorie] = useState<any[]>([])
  const [nazwa, setNazwa] = useState('')
  const [opis, setOpis] = useState('')

  const load = () =>
    fetch('/kategoria')
      .then((r) => r.json())
      .then(setKategorie)
  useEffect(() => {
    load()
  }, [])

  const dodaj = () => {
    fetch('/kategoria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nazwa, description: opis })
    }).then(() => {
      setNazwa('')
      setOpis('')
      load()
    })
  }

  return (
    <div className="container">
      <h2>Kategorie</h2>
      {kategorie.map((k) => (
        <div className="card" key={k.id} style={{ cursor: 'default' }}>
          <strong>{k.Kategoria}</strong> — {k.Opis}
        </div>
      ))}

      <hr />
      <h3>Dodaj kategorię</h3>
      <label>Nazwa</label>
      <select value={nazwa} onChange={(e) => setNazwa(e.target.value)}>
        <option value="">— wybierz —</option>
        {ENUMS.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <label>Opis</label>
      <input value={opis} onChange={(e) => setOpis(e.target.value)} />
      <button onClick={dodaj} disabled={!nazwa || !opis}>
        Dodaj
      </button>
    </div>
  )
}

export default KategoriaPage
