import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CartProvider from './contexts/CartContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </CartProvider>
  </AuthProvider>
)
