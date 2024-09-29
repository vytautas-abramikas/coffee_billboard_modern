import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import CoffeesContextProvider from './contexts/CofeesContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoffeesContextProvider>
      <App />
    </CoffeesContextProvider>
  </StrictMode>,
)
