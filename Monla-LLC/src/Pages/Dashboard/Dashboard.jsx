import React from 'react'
import Styles from  "./Dashboard.module.css"
import DashSidebar from '../../Components/DashSidebar/DashSidebar'
import CategoryTable from '../CategoryTable/CategoryTable';

const Dashboard = () => {
  return (
    <div className={Styles.container}>
      <DashSidebar/>
      {/* <CategoryTable /> */}
     
    </div>
  )
}

export default Dashboard
