import React, { useState, useEffect } from 'react';
import Styles from './ProductCart.module.css';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';

const variant = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.2
    },
  }
}


const ProductCart = ({ item, single__product = false }) => {

  const purchase = () => {
    const storedQuantity = JSON.parse(localStorage.getItem(JSON.stringify(item))) || 0;
    console.log(storedQuantity)
    if(storedQuantity===item.stock){
      toast.error("No More to Add!")
      return;
    }else{
      localStorage.setItem(JSON.stringify(item), JSON.stringify(storedQuantity + 1));
      toast.success("Product Added!")
    }

  }
  return (
    <motion.div className={single__product ? Styles.single__container : Styles.container} whileHover={{ scale: 1.001, opacity: 0.8 }} variants={variant} initial="initial" animate="animate">
      {/* <img src={heart} className={Styles.heart} alt="" /> */}
      <Link className={Styles.linkTo} to={`/productdetails/${item.slug}`}  state={item}>
        <div>
          <img className={Styles.image} src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} alt="" />
        </div>
        <div className={Styles.text}>
          <p className={Styles.title}>{item.title+"ndjdjdj djdjdjd djdjjfdjffffffffffffffffffffffffffffffffffndjdjdj djdjdjd djdjjfdjffffffffffffffffffffffffffffffffffffffffffHelloHElloHEllodj"}</p>
          {/* <p className={Styles.desc}>{item.description}</p> */}
        </div>
      </Link>
      <div className={Styles.bottomSection}>
        <h2 className={Styles.price}>${item.price}</h2>
        <button className={item.stock>0?Styles.btn:Styles.btnSold} onClick={purchase}>{item.stock > 0 ? "ADD TO CART" : "SOLD OUT"}</button>

      </div>

    </motion.div>

  );
};

export default ProductCart;
