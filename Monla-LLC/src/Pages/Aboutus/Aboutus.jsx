import React from 'react'
import style from './Aboutus.module.css'
import PageHero from '../../Components/PageHero/PageHero'
import Teamwork from '../../assets/Vector-1.svg'
import Vision from '../../assets/Vector-2.svg'
import Mission from '../../assets/Vector-3.svg'
import Testimon from '../../assets/testimon.svg'
import { VscFeedback } from "react-icons/vsc"

const Aboutus = () => {
  return (
    <>
      <PageHero title={'About'} />
      <main className={style.aboutusContainer}>
        <section className={style.aboutusFeatures}>
          <article className={style.aboutusFeaturesContent}>
            <img src={Teamwork} className={style.aboutusFeaturesContentIcon} />
            <h2 className={style.aboutusFeaturesContentTitle}>great team work</h2>
            <p className={style.aboutusFeaturesContentDescription}>Monla's team is a powerhouse in selling and repairing car AC system products. Each member's unique expertise contributes to our exceptional services, setting us apart in the automotive climate control industry.</p>
          </article>
          <article className={style.aboutusFeaturesContent}>
            <img src={Vision} className={style.aboutusFeaturesContentIcon} />
            <h2 className={style.aboutusFeaturesContentTitle}>our vision</h2>
            <p className={style.aboutusFeaturesContentDescription}>Monla envisions an enhanced driving experience with top-notch car AC solutions. We aim to set industry standards for quality and customer satisfaction.</p>
          </article>
          <article className={style.aboutusFeaturesContent}>
            <img src={Mission} className={style.aboutusFeaturesContentIcon} />
            <h2 className={style.aboutusFeaturesContentTitle}>our mission</h2>
            <p className={style.aboutusFeaturesContentDescription}>At Monla, our mission is clear — to provide exceptional car AC system products and repair services, ensuring every driver experiences comfort.</p>
          </article>
        </section>
        <section className={style.aboutusTestimonial}>
          <img src={Testimon} className={style.testimonialPicture} />
          <article className={style.testimonialDescription}>
            <VscFeedback className={style.testimonialDescriptionIcon} />
            <p className={style.testimonialDescriptionText}>Welcome to Al-Monla Air Conditioning and HVAC Systems,
             a family-owned business founded in 1974 by Abdallah Al-Monla in Mina, 
             Tripoli, Lebanon. Renowned for our exceptional service and expertise in automotive air conditioning and HVAC systems,
              we have grown to earn a sterling reputation across Lebanon. Today, led by the next generation, 
              we continue to combine skill and precision, ensuring optimal climate management for your vehicle.
               Our expansion into automotive parts sales further cements our commitment to enhancing your driving experience with reliability and comfort.
                Trust in our dedicated team of experts for unparalleled workmanship and customer satisfaction in every interaction.</p>
          </article>
        </section>
      </main>
    </>
  )
}

export default Aboutus