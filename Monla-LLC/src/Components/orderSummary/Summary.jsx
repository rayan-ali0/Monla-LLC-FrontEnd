import React, { useEffect, useState } from "react";
import style from "./Summary.module.css";
import testImg from "../../assets/bin.png";

const Summary = ({ products, totalPrice, shipping, idsArr }) => {
  let count = 0;
  const handleRemoveFromLocalStorage = (obj) => {
    localStorage.removeItem(obj);
    window.location.reload();
  };

  return (
    <div className={style.summaryHolder}>
      <h2 className={style.summaryTitle}>Order Summary</h2>

      <div className={style.cartItems}>
        {products.map((product) => (
          <section
            className={`${style.summaryRow} ${style.cartLine}`}
            key={product._id}>
            <span className={style.rowD}>
              <img
                src={testImg}
                onClick={() => {
                  handleRemoveFromLocalStorage(JSON.stringify(product));
                }}></img>
              <span>{product.title}</span>
            </span>
            <span>{idsArr[count++].quantity} x ${product.price}</span>
          </section>
        ))}
      </div>

      <div className={style.cartCosts}>
        <section className={style.summaryRow}>
          <span>Total ({products.length || 0} items)</span>
          <span>${totalPrice}</span>
        </section>
        <section className={style.summaryRow}>
          <span>Shipping</span>
          <span> ${shipping}</span>
        </section>
        <section className={style.summaryRow}>
          <span>Total</span>
          <span>${totalPrice + shipping}</span>
        </section>
      </div>
    </div>
  );
};

export default Summary;

{
  /* <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>

        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section>
        <section className={`${style.summaryRow} ${style.cartLine}`}>
          <span className={style.rowD}>
            <img src={testImg}></img>Product Title
          </span>
          <span>$18</span>
        </section> */
}
