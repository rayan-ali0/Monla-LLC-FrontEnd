import React, { useState, useEffect } from 'react';
import Styles from './ProductCart.module.css';
import heart from '../../assets/Images/heart.png';

const ProductCart = ({ item }) => {
  return (
    <div className={Styles.container}>
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
    </div>
    
  );
};

export default ProductCart;
