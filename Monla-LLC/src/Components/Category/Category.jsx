import React, { useEffect, useState } from 'react'
import Styles from "./Category.module.css"
import image from "../../assets/Images/car.png"
import img from "../../assets/Images/carr.png"
import bg from "../../assets/Images/bg.png"
import axios from "axios"
import { useFetchData } from '../../CustomHook/GetData'

const category=[
    {
        img:image,
        title:"Lightings"
    },
    {
        img:img,
        title:"Filters"
    },
    {
        img:img,
        title:"Wheels& tires"
    },
    {
        img:bg,
        title:"Break System "
    },
    {
        img:img,
        title:"Seat Parts"
    },
    {
        img:img,
        title:"Lightings"
    },
    {
        img:img,
        title:"Break System"
    },
    {
        img:img,
        title:"Filters"
    },
    {
        img:img,
        title:"whateverr"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
        title:"hiiiii"
    },

]

const Category = () => {
    const api=`${import.meta.env.VITE_REACT_APP_BACKEND}category/readCategory`
    const {data, loading, error }=useFetchData(api)

  return (

    <div className={Styles.container}>
        {!loading? (  data.map((item,index)=>(
            <div  key={index} className={Styles.category}>
            <img src={`${import.meta.env.VITE_REACT_APP_BACKEND}${item.image}`}  className={Styles.image}/>
           <h3>{item.title}</h3>
            </div>
            ))): <h1> Loading</h1>}
            {error && <p>Error: {error.message}</p>}
      
   
          </div>
  )
}

export default Category
