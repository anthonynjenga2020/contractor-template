import { useMemo } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import defaultConfig from './config/config.json'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ContractorConciergeWidget from './components/ContractorConciergeWidget.jsx'

// Pages
import HomePage from './pages/HomePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import MaintenancePage from './pages/MaintenancePage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import TeamMemberPage from './pages/TeamMemberPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import { AnimatePresence } from 'framer-motion'

// Hide navbar/footer/whatsapp button on the /review page
function Layout({ children, config }) {
  const { pathname } = useLocation()
  const isReview = pathname === '/review'
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {!isReview && <Navbar config={config} />}
      {children}
      {!isReview && <Footer config={config} />}
      {!isReview && <ContractorConciergeWidget config={config} />}
    </div>
  )
}

export default function App() {
  const config = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const businessQuery = searchParams.get('business')
    const locationQuery = searchParams.get('location')
    
    if (businessQuery || locationQuery) {
      const newConfig = { ...defaultConfig }
      
      if (businessQuery) {
        newConfig.businessName = businessQuery
        // Replace all instances of Ironclad Landscaping in messages and descriptions
        newConfig.whatsappMessage = newConfig.whatsappMessage.replace(/Ironclad Landscaping/g, businessQuery)
        newConfig.aboutDescription = newConfig.aboutDescription.replace(/Ironclad Landscaping/g, businessQuery)
      }
      
      if (locationQuery) {
        newConfig.location = locationQuery
      }
      
      return newConfig
    }
    return defaultConfig
  }, [])

  return (
    <BrowserRouter>
      <Layout config={config}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"                    element={<HomePage            config={config} />} />
            <Route path="/services"            element={<ServicesPage        config={config} />} />
            <Route path="/projects"            element={<ProjectsPage        config={config} />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage   config={config} />} />
            <Route path="/maintenance"         element={<MaintenancePage     config={config} />} />
            <Route path="/pricing"             element={<PricingPage         config={config} />} />
            <Route path="/team"                element={<TeamPage            config={config} />} />
            <Route path="/team/:memberId"      element={<TeamMemberPage      config={config} />} />
            <Route path="/shop"                element={<ShopPage            config={config} />} />
            <Route path="/review"              element={<ReviewPage          config={config} />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  )
}
