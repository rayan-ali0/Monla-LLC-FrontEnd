import React, { Children } from 'react'
import Navbar from '../Layout/Header/Navbar'
import Footer from '../Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
