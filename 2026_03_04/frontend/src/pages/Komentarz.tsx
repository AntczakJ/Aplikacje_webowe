import { useState, useEffect } from 'react'

function KomentarzPage() {
  const [komentarze, setKomentarze] = useState<any[]>([])

  useEffect(() => {
    fetch('/komentarz')
      .then((r) => r.json())
      .then(setKomentarze)
  }, [])

  return (
    <div className="container">
      <h2>Komentarze</h2>
      {komentarze.length === 0 && <p>Brak komentarzy.</p>}
      {komentarze.map((k) => (
        <div className="card" key={k.id} style={{ cursor: 'default' }}>
          <span className="muted">wpis #{k.WpisId}</span> — {k.Komentarz}
        </div>
      ))}
    </div>
  )
}

export default KomentarzPage
