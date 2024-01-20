import React, { useEffect, useState } from 'react'
import style from './Services.module.css'
import serviceImg from "../../assets/Rectangle 29.png"
import PageHero from '../../Components/PageHero/PageHero'
import axios from 'axios'
 const Services = () => {
const [services,setServices]=useState([])
const [loading,setLoading]=useState(true)


const fetchServices=async()=>{
// console.log(process.env.REACT_APP_BACKEND)
     try{
               const res=await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/service/read/all`)
          if(res){
               console.log(res.data)
               setServices(res.data)
               setLoading(false)
          }
     }
     catch(error){
          console.log("Error fetching Services")
          setLoading(false)
     }
}
useEffect(()=>{

fetchServices()
},[])

  return (
     <>
          <PageHero title={"Our Services"}/>
    <main className={style.servicePage}>
    { !loading?
     ( services.map((service,index)=>(
          <section key={index} className={style.service}>
          <div className={style.serviceImage}>
          <img src={`http://localhost:5000/${service.image}`} alt="serviceImage"/>
          </div>
          <div className={style.serviceDetails}>
          <h3 className={style.serviceTitle}>{service.title}</h3>
          <p className={style.serviceText}>{service.description}</p>
          </div>
               </section>
          )))
     :
     (
     <h1>loading....</h1>
     )
     
     }
    </main>
    </>
  )
}

export default Services