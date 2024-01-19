import React, { useEffect, useState } from 'react'
import style from './Summary.module.css'
import axios from 'axios'
import testImg from '../../assets/bin.png'
const Summary = () => {
    return (


        <div className={style.summaryHolder}>
            <h2 className={style.summaryTitle}>Order Summary</h2>

            <div className={style.cartItems}>

                <section className={`${style.summaryRow} ${style.cartLine}`}>
                    <span className={style.rowD}><img src={testImg}></img>Product Title</span>
                    <span>$ subtotal</span>

                </section>

                <section className={`${style.summaryRow} ${style.cartLine}`}>
                <span className={style.rowD}><img src={testImg}></img>Product Title</span>
                    <span>$ subtotal</span>
                </section>
                <section className={`${style.summaryRow} ${style.cartLine}`}>
                <span className={style.rowD}><img src={testImg}></img>Product Title</span>
                    <span>$ subtotal</span>
                </section>
                <section className={`${style.summaryRow} ${style.cartLine}`}>
                <span className={style.rowD}><img src={testImg}></img>Product Title</span>
                    <span>$ subtotal</span>
                </section>
                <section className={`${style.summaryRow} ${style.cartLine}`}>
                <span className={style.rowD}><img src={testImg}></img>Product Title</span>
                    <span>$ subtotal</span>
                </section>
                <section className={`${style.summaryRow} ${style.cartLine}`}>
                <span className={style.rowD}><img src={testImg}></img>Product Title</span>
                    <span>$ subtotal</span>
                </section>
            </div>
            <div className={style.cartCosts}>
                <section className={style.summaryRow}>
                    <span >SubTotal (3 items)</span>
                    <span> $1000</span>
                </section>
                <section className={style.summaryRow}>
                    <span >Shipping</span>
                    <span> $10</span>
                </section>
                <section className={style.summaryRow}>
                    <span >Total</span>
                    <span> $1010</span>
                </section>
            </div>

        </div>
    )

}


export default Summary