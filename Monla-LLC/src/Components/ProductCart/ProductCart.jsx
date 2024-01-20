import React, { useState, useEffect } from 'react';
import Styles from './ProductCart.module.css';
import heart from '../../assets/Images/heart.png';

const ProductCart = ({ img, price, title, desc,  single__product = false }) => {

  return (
    <div className={ single__product? Styles.single__container: Styles.container}>
        <img src={heart} className={Styles.heart} alt="" />
      <div>
        <img className={Styles.image} src={img} alt="" />
      </div>
      <div className={Styles.text}>
        <h2 className={Styles.price}>{price}</h2>
        <p className={Styles.title}>{title}</p>
        <p className={Styles.desc}>{desc}</p>
      </div>
      <button className={Styles.btn}>ADD TO CART</button>
    </div>
    
  );
};

export default ProductCart;
