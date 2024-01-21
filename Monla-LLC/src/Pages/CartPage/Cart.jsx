import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import axios from 'axios'
import PageHero from '../../Components/PageHero/PageHero.jsx'
import bin from '../../assets/bin.png'
const Cart = () => {
    return (


        <div className={style.cartPage}>
<div className={style.cartNav}></div>  
<div className={style.buyHistory}>
    <span className={style.historyBorder}>
    </span>
    MY CART
        </div>       


<div className={style.cartHolder}>
            <section className={`${style.cartRow} ${style.cartHeader}`}>
                <span>Product</span>
                <span>Price</span>
               <span>Quantity</span>
                <span>Subtotal</span>
                <span>Remove</span>
            </section>
            <div className={style.cartItems}>

            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <div className={style.quantity__to__buy1}> 
                  <span className={style.decrease1} >-</span>
                  <span className={style.number1}>3</span>
                  <span className={style.increase1}>+</span>
                
                </div>                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>  
                  <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <div className={style.quantity__to__buy1}> 
                  <span className={style.decrease1} >-</span>
                  <span className={style.number1}>3</span>
                  <span className={style.increase1}>+</span>
                
                </div>                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <div className={style.quantity__to__buy1}> 
                  <span className={style.decrease1} >-</span>
                  <span className={style.number1}>3</span>
                  <span className={style.increase1}>+</span>
                
                </div>                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            
            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            <section className={`${style.cartRow} ${style.cartLine}`}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span><img src={bin} className={style.binIcon}/></span>
            </section>
            </div>

            <section className={style.cartRow}>
                <span className={`${style.shopBtn} ${style.cartBtns}`}>Return To Shop</span>
                <span><b>Total Cart :</b>  $1000</span>
                <span className={`${style.checkBtn} ${style.cartBtns}`}>Checkout</span>
            </section>
            </div>
        </div>
    )

}


export default Cart