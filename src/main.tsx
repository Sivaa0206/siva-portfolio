import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import './styles/animations.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container not found')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
