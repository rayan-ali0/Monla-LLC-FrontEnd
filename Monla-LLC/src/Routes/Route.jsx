import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../Pages/Home/Home.jsx"
import Dashboard from '../Pages/Dashboard/Dashboard.jsx'

import React from 'react'

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
