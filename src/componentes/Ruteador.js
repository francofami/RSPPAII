import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Conversion from './Conversion'
import Criptomonedas from './Criptomonedas'

const Ruteador = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route exact path="/" element={<Criptomonedas/>} />
                <Route exact path="/conversion" element={<Conversion/>} />
                <Route path="*" element={
                    <div>
                        <h2>404 Page not found etc</h2>
                    </div>
                    }
                />
            </Routes>
        </Router>
    </div>
  )
}

export default Ruteador