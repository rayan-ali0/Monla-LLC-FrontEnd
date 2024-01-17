import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './UserContext/UserContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <React.StrictMode>
      <HelmetProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </HelmetProvider>
    </React.StrictMode>
  </CookiesProvider>,
)
