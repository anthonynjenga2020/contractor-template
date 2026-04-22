import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import config from './config/gym.config.json'
import { applyTheme } from './themes/themes.js'

// Apply the full theme (colors + fonts + body class) before render
// This reads config.templateVariant (V1–V5) and config.primaryColor
applyTheme(config.templateVariant ?? 'V1', config.primaryColor)

// Set page title and meta description
document.title = config.gymName
const metaDesc = document.querySelector('meta[name="description"]')
if (metaDesc) {
  metaDesc.setAttribute('content', config.tagline ?? config.gymName)
} else {
  const meta = document.createElement('meta')
  meta.name    = 'description'
  meta.content = config.tagline ?? config.gymName
  document.head.appendChild(meta)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
