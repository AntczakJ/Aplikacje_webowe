import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Kategoria from '../pages/Kategoria'
import Komentarz from '../pages/Komentarz'
import Wpis from '../pages/Wpis'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kategoria" element={<Kategoria />} />
      <Route path="/komentarz" element={<Komentarz />} />
      <Route path="/wpis" element={<Wpis />} />
    </Routes>
  )
}

export default AppRouter
