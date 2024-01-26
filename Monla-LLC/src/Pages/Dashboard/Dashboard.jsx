import React from 'react'
import Styles from  "./Dashboard.module.css"
import DashSidebar from '../../Components/DashSidebar/DashSidebar'
import CategoryTable from '../CategoryTable/CategoryTable'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className={Styles.container}>

      <DashSidebar/>
      <section className={Styles.outlet}>
      <Outlet  />
      </section>
     
    </div>
  )
}

export default Dashboard
