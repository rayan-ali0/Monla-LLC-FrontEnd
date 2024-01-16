import React from 'react';
import Styles from './ProductCart.module.css';
import heart from "../../assets/heart.png"

const ProductCart = ({ img, price, title, desc }) => {
  return (
    <div className={Styles.container}>
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
