import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../Pages/Home/Home.jsx"
import Dashboard from '../Pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from "./Protected.jsx"
import React from 'react'
import { useContext } from "react"
import { UserContext } from "../UserContext/UserContext.jsx"
import Products from "../Pages/Products/Products.jsx"
import Signup from "../Pages/Signup/Signup.jsx"
import Login from "../Pages/Login/Login.jsx"
import Unauthorized from "../Pages/Unauthorized/Unauthorized.jsx"

const Router = () => {

  const { user } = useContext(UserContext)
  if(user) {
    console.log("there is a user")
  } else {
    console.log("there is no user here baby")
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/product" element={<Products />} />
            <Route index path="/signup" element={<Signup />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/403" element={<Unauthorized />} />

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
