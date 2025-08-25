import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import './reset.css'
import './index.css'
import routes from "./routes.js";
import App from './App.jsx'
import EscolaTeste from './components/escolas/escolaTeste/EscolaTeste.jsx'
import Sartre1Ano from './components/escolas/sartre/sartre-1o-ano/Sartre1Ano.jsx'
import Sartre2Ano from './components/escolas/sartre/sartre-2o-ano/Sartre2Ano.jsx'
import SartreHS from './components/escolas/sartre/sartre-highschool/SartreHS.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path={routes.home} element={<App />} />
        <Route path={routes.escolaTeste} element={<EscolaTeste />} />
        <Route path={routes.sartre1ano} element={<Sartre1Ano />} />
        <Route path={routes.sartre2ano} element={<Sartre2Ano />} />
        <Route path={routes.sartreHS} element={<SartreHS />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
