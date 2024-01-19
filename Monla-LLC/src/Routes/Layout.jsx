import React, { Children } from 'react'
import Footer from '../Layout/Footer/Footer'
import Header from '../Components/navbar/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Header/>
    <Outlet />
    <Footer />
    </>
  )
}
