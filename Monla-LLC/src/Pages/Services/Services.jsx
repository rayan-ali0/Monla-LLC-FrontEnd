import React, { useEffect, useState } from 'react'
import style from './Services.module.css'
import { Helmet } from "react-helmet-async";
import PageHero from '../../Components/PageHero/PageHero'
import axios from 'axios'
import support from '../../assets/HelmetIcons/support.png'
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
          <main className={style.serviceHolder}>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>Services</title>
                    <meta name="description" content="Services Page" />
                    <link rel="icon" href={support} />
                    <meta name="keywords" content="services" />

               </Helmet>
               <PageHero title={"Our Services"} />
               <div className={style.servicePage}>
                    {!loading ?
                         (services.map((service, index) => (
                              <section key={index} className={style.service}>
                                   <div className={style.serviceImage}>
                                        <img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${service.image}`} alt="serviceImage" />
                                   </div>
                                   <div className={style.serviceDetails}>
                                        <h3 className={style.serviceTitle}>{service.title}</h3>
                                        <p className={style.serviceText}>{service.description}

                                        </p>
                                   </div>
                              </section>

                         )))
                         :
                         (
                              <h1>loading....</h1>
                         )

                    }
               </div>
          </main>
     )
}

export default Services