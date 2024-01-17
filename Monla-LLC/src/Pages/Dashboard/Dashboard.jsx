import React from 'react'
import Styles from  "./Dashboard.module.css"
import DashSidebar from '../../Components/DashSidebar/DashSidebar'

const Dashboard = () => {
  return (
    <div className={Styles.container}>
      <DashSidebar/>
    </div>
  )
}

export default Dashboard
