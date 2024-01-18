import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      homee<Link to={"/dashboard"}><p>Go to the dashboard from here</p></Link>
    </div>
  )
}

export default Home
