import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Wait for the non-blocking CSS to apply before mounting React.
// Without this, React renders with Tailwind class names but no styles applied
// (FOUC), then CSS loads and the page re-styles — users perceive this as slow.
function waitForCss(): Promise<void> {
  const link = document.querySelector<HTMLLinkElement>('link[as="style"]')
  if (!link || link.rel === 'stylesheet') return Promise.resolve()
  return new Promise(resolve => {
    link.addEventListener('load', () => resolve(), { once: true })
    setTimeout(resolve, 2000) // mount anyway after 2s max (offline / slow)
  })
}

waitForCss().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
