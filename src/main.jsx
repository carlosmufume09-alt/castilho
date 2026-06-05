import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/shellsFashionElegance'
import ShellsFashionElegance from './pages/shellsFashionElegance'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShellsFashionElegance />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
