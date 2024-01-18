import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../Pages/Home/Home.jsx"
import Dashboard from '../Pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from "./Protected.jsx"
import React from 'react'
import { useContext } from "react"
import { UserContext } from "../UserContext/UserContext.jsx"
import Products from "../Pages/Products/Products.jsx"
import Services from "../Pages/Services/Services.jsx"
import Contact from "../Pages/Contact/ContactUs.jsx"
import Cart from "../Pages/CartPage/Cart.jsx"

const Router = () => {

  const { user }=useContext(UserContext)

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/product" element={<Products />} />
            <Route index path="/services" element={<Services />} />
            <Route index path="/contact" element={<Contact />} />
            <Route index path="/cart" element={<Cart />} />

            <Route element={<ProtectedRoute
                isAllowed={user && user.role === "admin"}
                redirectPath="/403"
              />} >
            <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
