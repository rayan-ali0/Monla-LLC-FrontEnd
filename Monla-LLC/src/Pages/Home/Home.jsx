import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      homee
      <Link to={"/dashboard"}>
        <button style={{color: "white", background: "blue"}}>
          This button will take you to the dashboard
        </button>
      </Link>
    </div>
  )
}

export default Home
