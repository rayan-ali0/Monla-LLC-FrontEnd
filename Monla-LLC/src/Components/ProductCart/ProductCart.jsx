import React, { useState, useEffect } from 'react';
import Styles from './ProductCart.module.css';
import heart from '../../assets/Images/heart.png';
import { motion } from "framer-motion"


const variant={
  initial:{
   y:20,
    opacity:0,
},
animate:{
    y:0,
    opacity:1,
    transition:{
        duration:0.7,
        staggerChildren:0.2
    },
}
}
const ProductCart = ({ item  ,single__product=false}) => {
  return (
    <motion.div  className={ single__product? Styles.single__container: Styles.container}whileHover={{opacity:0.7}} variants={variant} initial="initial"  animate="animate">
        <img src={heart} className={Styles.heart} alt="" />
      <div>
        <img className={Styles.image} src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} alt="" />
      </div>
      <div className={Styles.text}>
        <h2 className={Styles.price}>{item.price}</h2>
        <p className={Styles.title}>{item.title}</p>
        <p className={Styles.desc}>{item.desc}</p>
      </div>
      <button className={Styles.btn}>ADD TO CART</button>
    </motion.div>
    
  );
};

export default ProductCart;
