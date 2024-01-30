import React from 'react'
import Footer from '../Layout/Footer/Footer'
import Header from '../Components/navbar/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Header/>
    <Outlet />
    <div style={{marginTop:"2rem"}}>
    <Footer />
    </div>
    </>
  )
}
