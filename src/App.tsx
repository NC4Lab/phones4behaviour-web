import './App.css'
import NetworkSelection from './pages/NetworkSelection'
import Commands from './pages/Commands'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stream from './pages/components/Stream'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NetworkSelection />} />
        <Route path="/commands" element={<Commands />} />
        <Route path="/stream" element={<Stream />} />
      </Routes>
    </Router>
  )
}

export default App
