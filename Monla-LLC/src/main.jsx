import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import reportWebVitals from "./reportWebVitals.jsx";
import { UserProvider } from './UserContext/UserContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'


ReactGA.initialize("G-Y09EZVPTZ0");

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HelmetProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </HelmetProvider>
    </React.StrictMode>
)


const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}

reportWebVitals(SendAnalytics);