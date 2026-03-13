import { useState, useEffect } from 'react'

function WpisPage() {
  const [wpisy, setWpisy] = useState<any[]>([])
  const [wybrany, setWybrany] = useState<any>(null)
  const [kategorie, setKategorie] = useState<any[]>([])
  const [tekst, setTekst] = useState('')
  const [katId, setKatId] = useState('')
  const [komentarz, setKomentarz] = useState('')

  const loadWpisy = () =>
    fetch('/wpis')
      .then((r) => r.json())
      .then(setWpisy)
  const loadWpis = (id: number) =>
    fetch(`/wpis/${id}`)
      .then((r) => r.json())
      .then(setWybrany)

  useEffect(() => {
    loadWpisy()
    fetch('/kategoria')
      .then((r) => r.json())
      .then(setKategorie)
  }, [])

  const dodajWpis = () => {
    fetch('/wpis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txt: tekst, KatId: katId })
    }).then(() => {
      setTekst('')
      setKatId('')
      loadWpisy()
    })
  }

  const dodajKomentarz = () => {
    fetch('/komentarz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comm: komentarz, WpisId: wybrany.id })
    }).then(() => {
      setKomentarz('')
      loadWpis(wybrany.id)
    })
  }

  if (!wybrany)
    return (
      <div className="container">
        <h2>Wpisy</h2>
        {wpisy.map((w) => (
          <div className="card" key={w.id} onClick={() => loadWpis(w.id)}>
            <strong>#{w.id}</strong> — {w.Text}{' '}
            <span className="muted">[{w.Kategoria?.Kategoria}]</span>
          </div>
        ))}

        <hr />
        <h3>Dodaj wpis</h3>
        <label>Treść</label>
        <input value={tekst} onChange={(e) => setTekst(e.target.value)} />
        <label>Kategoria</label>
        <select value={katId} onChange={(e) => setKatId(e.target.value)}>
          <option value="">— wybierz —</option>
          {kategorie.map((k) => (
            <option key={k.id} value={k.id}>
              {k.Kategoria}
            </option>
          ))}
        </select>
        <button onClick={dodajWpis} disabled={!tekst || !katId}>
          Dodaj
        </button>
      </div>
    )

  return (
    <div className="container">
      <button onClick={() => setWybrany(null)}>← Powrót</button>
      <h2>Wpis #{wybrany.id}</h2>
      <p>{wybrany.Text}</p>
      <p className="muted">Kategoria: {wybrany.Kategoria?.Kategoria}</p>

      <hr />

      <h3>Komentarze ({wybrany.Komentarze?.length})</h3>
      {wybrany.Komentarze?.length === 0 && <p>Brak komentarzy.</p>}
      {wybrany.Komentarze?.map((k: any) => (
        <div className="card" key={k.id} style={{ cursor: 'default' }}>
          {k.Komentarz}
        </div>
      ))}

      <label>Nowy komentarz</label>
      <textarea
        rows={2}
        value={komentarz}
        onChange={(e) => setKomentarz(e.target.value)}
      />
      <button onClick={dodajKomentarz} disabled={!komentarz}>
        Dodaj komentarz
      </button>
    </div>
  )
}

export default WpisPage
