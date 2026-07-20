import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Desafio from './pages/Desafio'
import Proceso from './pages/Proceso'
import Solucion from './pages/Solucion'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/desafio" element={<Desafio />} />
          <Route path="/proceso" element={<Proceso />} />
          <Route path="/solucion" element={<Solucion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
