import React from 'react'
import Styles from "./Category.module.css"

const category=[
    {
        img:"https://natrad.com.au/wp-content/uploads/2019/06/how-long-does-a-radiator-last-hero-image.jpg",
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
]

const Category = () => {
  return (
    <div className={Styles.container}>
        {category.map(item=>(
            <div className={Styles.category}>
            <img src={item.img}  className={Styles.image}/>
           <h3>{item.title}</h3>
            </div>
            ))}
          </div>
  )
}

export default Category
