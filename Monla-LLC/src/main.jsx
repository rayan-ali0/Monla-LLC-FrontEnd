import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './UserContext/UserContext.jsx'
import { CartProvider } from './UserContext/CartContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HelmetProvider>
        <UserProvider>
          <CartProvider>
          <App />
          </CartProvider>
        </UserProvider>
      </HelmetProvider>
    </React.StrictMode>
)
