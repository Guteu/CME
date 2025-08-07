import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './reset.css'
import './index.css'
import App from './App.jsx'
import EscolaTeste from './components/escolas/escolaTeste/EscolaTeste.jsx'
import Sartre1Ano from './components/escolas/sartre/sartre-1o-ano/Sartre1Ano.jsx'
import Sartre2Ano from './components/escolas/sartre/sartre-2o-ano/Sartre2Ano.jsx'
import SartreHS from './components/escolas/sartre/sartre-highschool/SartreHS.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/CME' element={<App />} />
        <Route path='/CME/escola-teste/ano-teste' element={<EscolaTeste />} />
        <Route path='/CME/sartre/1ano' element={<Sartre1Ano />} />
        <Route path='/CME/sartre/2ano' element={<Sartre2Ano />} />
        <Route path='/CME/sartre/highschool' element={<SartreHS />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
