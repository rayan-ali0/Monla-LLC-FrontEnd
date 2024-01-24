import React, { useState } from 'react'
import style from './Aboutus.module.css'
import PageHero from '../../Components/PageHero/PageHero'

const Aboutus = () => {

  const [loading, setLoading] = useState(true)

  return (
    <>
      <PageHero title={'About'} />
      <main className={style.aboutusContainer}>
        
      </main>
    </>
  )
}

export default Aboutus