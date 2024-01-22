import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import axios from 'axios'
import producImage from '../../assets/images/backgorundImage.png'
import bin  from "../../assets/bin.png"

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
                    <span className={`${style.image}`}></span>
                    <div className={style.styleDiv}>
                    <span className={`${style.productHolder}`}>Product</span>
                    <span className={style.custmWidth}>Price</span>
                    <span className={style.qtyWidth}>Quantity</span>
                    <span className={style.custmWidth}>Subtotal</span>
                    </div>
                    <span className={style.removeIcon}>Remove</span>
                </section>
                <div className={style.cartItems}>

                    <section className={`${style.cartRow} ${style.cartLine}`}>
                        <span className={style.image}><img src={producImage} /></span>
                      <div className={style.styleDiv}>
                        <span className={`${style.productHolder}`}>This is a long product details ahahahahaha</span> 
                        <span className={style.custmWidth}>$ 1000</span> 
                        <div className={` ${style.qtyWidth}`}> 
                            <div  className={`${style.quantity__to__buy1}`}>

                            
                            <span className={style.decrease1} >-</span>
                            <span className={style.number1}>3</span>
                            <span className={style.increase1}>+</span>
                            </div>
                        </div>

                        <span  className={style.custmWidth}>$ 3000</span> 
                        </div>
                        <span className={style.removeIcon}><img src={bin} className={style.binIcon} /></span> {/**6 */}
                    </section>



                    <section className={`${style.cartRow} ${style.cartLine}`}>
                        <span className={style.image}><img src={producImage} /></span>
                      <div className={style.styleDiv}>
                        <span className={`${style.productHolder}`}>This is a long product details ahahahahaha</span> 
                        <span className={style.custmWidth}>$ 1000</span> 
                        <div className={` ${style.qtyWidth}`}> 
                            <div  className={`${style.quantity__to__buy1}`}>

                            
                            <span className={style.decrease1} >-</span>
                            <span className={style.number1}>3</span>
                            <span className={style.increase1}>+</span>
                            </div>
                        </div>

                        <span  className={style.custmWidth}>$ 3000</span> 
                        </div>
                        <span className={style.removeIcon}><img src={bin} className={style.binIcon} /></span> {/**6 */}
                    </section>
                    <section className={`${style.cartRow} ${style.cartLine}`}>
                        <span className={style.image}><img src={producImage} /></span>
                      <div className={style.styleDiv}>
                        <span className={`${style.productHolder}`}>This is a long product details ahahahahaha</span> 
                        <span className={style.custmWidth}>$ 1000</span> 
                        <div className={` ${style.qtyWidth}`}> 
                            <div  className={`${style.quantity__to__buy1}`}>

                            
                            <span className={style.decrease1} >-</span>
                            <span className={style.number1}>3</span>
                            <span className={style.increase1}>+</span>
                            </div>
                        </div>

                        <span  className={style.custmWidth}>$ 3000</span> 
                        </div>
                        <span className={style.removeIcon}><img src={bin} className={style.binIcon} /></span> {/**6 */}
                    </section>





                </div>

                <section className={`${style.checkRow} ${style.cartLine}`}>
                    <span className={`${style.shopBtn} ${style.cartBtns}`}>Return To Shop</span>
                    <span><b>Total Cart :</b>  $1000</span>
                    <span className={`${style.checkBtn} ${style.cartBtns}`}>Checkout</span>
                </section>
            </div>
        </div>
    )

}


export default Cart
