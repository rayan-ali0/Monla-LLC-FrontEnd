import React, { useEffect, useState } from 'react'
import style from './Services.module.css'
import { Helmet } from "react-helmet-async";
import PageHero from '../../Components/PageHero/PageHero'
import axios from 'axios'
import support from '../../assets/HelmetIcons/support.png'
import Loading from '../../Components/Loading/Loading';
import { motion } from 'framer-motion';

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


const Services = () => {
     const [services, setServices] = useState([])
     const [loading, setLoading] = useState(true)


     const fetchServices = async () => {
          try {
               const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/service/read/all`)
               if (res) {
                    setServices(res.data)
                    setLoading(false)
               }
          }
          catch (error) {
               console.log("Error fetching Services")
               setLoading(false)
          }
     }
     useEffect(() => {

          fetchServices()
     }, [])

     return (
          <motion.main className={style.serviceHolder} variants={variants}>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>Services</title>
                    <meta name="description" content="Services Page" />
                    <link rel="icon" href={support} />
                    <meta name="keywords" content="services" />

               </Helmet>
               <PageHero title={"Our Services"} />
               <motion.div className={style.servicePage} variants={variants} initial="initial" animate="animate">
                    
                        { services.map((service, index) => (
                              <motion.section key={index} className={style.service} variants={variants}>
                                   <motion.div className={style.serviceImage} variants={variants} >
                                        <motion.img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${service.image}`} alt="serviceImage" />
                                   </motion.div>
                                   <motion.div className={style.serviceDetails} variants={variants}>
                                        <motion.h3 className={style.serviceTitle} variants={variants}>{service.title}</motion.h3>
                                        <motion.p className={style.serviceText}>{service.description}

                                        </motion.p>
                                   </motion.div>
                              </motion.section>

                         ))}

                    
               </motion.div>
               {loading && <Loading />}
          </motion.main>
     )
}

export default Services