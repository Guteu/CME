import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import './index.css'
import App from './App.jsx'
//import Xyz from './components/teste.jsx'
import EscolaTeste from './components/escolas/escolaTeste/EscolaTeste.jsx'
import Sartre2Ano from './components/escolas/sartre/sartre-2o-ano/Sartre2Ano.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/escola-teste/ano-teste' element={<EscolaTeste />} />
        <Route path='/sartre/2ano' element={<Sartre2Ano />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
