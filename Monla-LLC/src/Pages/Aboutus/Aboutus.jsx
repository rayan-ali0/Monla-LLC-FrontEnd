import React from 'react'
import style from './Aboutus.module.css'
import PageHero from '../../Components/PageHero/PageHero'
import Teamwork from '../../assets/Vector-1.svg'
import Vision from '../../assets/Vector-2.svg'
import Mission from '../../assets/Vector-3.svg'
import Testimon from '../../assets/testimon.svg'
import { VscFeedback } from "react-icons/vsc"
import { motion } from 'framer-motion'

const variants={
  initial:{
      y:50,
      opacity:0,
  },
  animate:{
      y:0,
      opacity:1,
      transition:{
          duration:1,
          staggerChildren:0.2
      },
  },
}

const Aboutus = () => {
  return (
    <>
      <PageHero title={'About'} />
      <motion.main className={style.aboutusContainer} variants={variants} initial="initial" animate="animate">
        <motion.section className={style.aboutusFeatures} variants={variants}>
          <motion.article className={style.aboutusFeaturesContent} variants={variants}>
            <motion.img src={Teamwork} className={style.aboutusFeaturesContentIcon} variants={variants} />
            <motion.h2 className={style.aboutusFeaturesContentTitle} variants={variants}>great team work</motion.h2>
            <motion.p className={style.aboutusFeaturesContentDescription} variants={variants}>Monla's team is a powerhouse in selling and repairing car AC system products. Each member's unique expertise contributes to our exceptional services, setting us apart in the automotive climate control industry.</motion.p>
          </motion.article>
          <motion.article className={style.aboutusFeaturesContent} variants={variants} >
            <motion.img src={Vision} className={style.aboutusFeaturesContentIcon}  variants={variants} />
            <motion.h2 className={style.aboutusFeaturesContentTitle} variants={variants}>our vision</motion.h2>
            <motion.p className={style.aboutusFeaturesContentDescription} variants={variants}>Monla envisions an enhanced driving experience with top-notch car AC solutions. We aim to set industry standards for quality and customer satisfaction.</motion.p>
          </motion.article>
          <motion.article className={style.aboutusFeaturesContent} variants={variants}>
            <motion.img src={Mission} className={style.aboutusFeaturesContentIcon} variants={variants} />
            <motion.h2 className={style.aboutusFeaturesContentTitle} variants={variants}>our mission</motion.h2>
            <motion.p className={style.aboutusFeaturesContentDescription} variants={variants}>At Monla, our mission is clear — to provide exceptional car AC system products and repair services, ensuring every driver experiences comfort.</motion.p>
          </motion.article>
        </motion.section>
        <motion.section className={style.aboutusTestimonial} variants={variants}>
          <motion.img src={Testimon} className={style.testimonialPicture} variants={variants} />
          <motion.article className={style.testimonialDescription } variants={variants}>
            <VscFeedback className={style.testimonialDescriptionIcon} variants={variants} />
            <motion.p className={style.testimonialDescriptionText} variants={variants}>Welcome to Al-Monla Air Conditioning and HVAC Systems,
             a family-owned business founded in 1974 by Abdallah Al-Monla in Mina, 
             Tripoli, Lebanon. Renowned for our exceptional service and expertise in automotive air conditioning and HVAC systems,
              we have grown to earn a sterling reputation across Lebanon. Today, led by the next generation, 
              we continue to combine skill and precision, ensuring optimal climate management for your vehicle.
               Our expansion into automotive parts sales further cements our commitment to enhancing your driving experience with reliability and comfort.
                Trust in our dedicated team of experts for unparalleled workmanship and customer satisfaction in every interaction.</motion.p>
          </motion.article>
        </motion.section>
      </motion.main>
    </>
  )
}

export default Aboutus