import './App.css'
import NetworkSelection from './pages/NetworkSelection'
import Commands from './pages/Commands'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NetworkSelection />} />
        <Route path="/commands" element={<Commands />} />
      </Routes>
    </Router>
  )
}

export default App
