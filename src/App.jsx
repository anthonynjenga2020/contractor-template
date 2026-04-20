import { BrowserRouter, Routes, Route } from 'react-router-dom'
import config from './config/gym.config.json'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

// Pages
import HomePage from './pages/HomePage.jsx'
import ClassesPage from './pages/ClassesPage.jsx'
import TrainersPage from './pages/TrainersPage.jsx'
import TrainerPage from './pages/TrainerPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <Navbar config={config} />
        <Routes>
          <Route path="/" element={<HomePage config={config} />} />
          <Route path="/classes" element={<ClassesPage config={config} />} />
          <Route path="/trainers" element={<TrainersPage config={config} />} />
          <Route path="/trainers/:trainerId" element={<TrainerPage config={config} />} />
        </Routes>
        <Footer config={config} />
        <WhatsAppButton config={config} />
      </div>
    </BrowserRouter>
  )
}
