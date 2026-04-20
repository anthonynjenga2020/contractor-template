import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import config from './config/gym.config.json'

// Inject config values as CSS variables so Tailwind can use them
const root = document.documentElement
root.style.setProperty('--primary', config.primaryColor)
root.style.setProperty('--primary-dark', config.primaryDark)
root.style.setProperty('--accent', config.accentColor)
root.style.setProperty('--bg', config.bgColor)
root.style.setProperty('--surface', config.surfaceColor)
root.style.setProperty('--border', config.borderColor)

// Set page title
document.title = config.gymName

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
