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
            <p className={style.testimonialDescriptionText}>Monla stands as a leading force in the automotive industry, specializing in the sale and repair of cutting-edge car AC system products. With a team of experts whose unique skills form the backbone of our success, we take pride in delivering top-quality solutions. Our commitment to excellence has established us as a standout in the automotive climate control sector. At Monla, we envision and strive towards creating unparalleled driving experiences by ensuring comfort and reliability on every journey.</p>
          </article>
        </section>
      </main>
    </>
  )
}

export default Aboutus