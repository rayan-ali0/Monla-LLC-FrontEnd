import React, { useEffect, useState } from 'react'
import Styles from "./Category.module.css"
import image from "../../assets/Images/car.png"
import img from "../../assets/Images/carr.png"
import bg from "../../assets/Images/bg.png"
import axios from "axios"

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
    const [data, setData] =useState([])
    const [loading, setLoading] =useState(true)

    const fetchCategory=async()=>{
        try {
            const response= await axios.get(`http://localhost:5000/category/readCategory`)
            if(response){
             
                setData(response.data)
                setLoading(false)
                console.log(response.data)
            }else{
                setData([]);
                setLoading(false);
            }

        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchCategory()
    },[])

  return (

    <div className={Styles.container}>
        {!loading? (  data.map((item,index)=>(
            <div  key={index} className={Styles.category}>
            <img src={`http://localhost:5000/${item.image}`}  className={Styles.image}/>
           <h3>{item.title}</h3>
            </div>
            ))): <h1> Loading</h1>}
      
   
          </div>
  )
}

export default Category
