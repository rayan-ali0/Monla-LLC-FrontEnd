// ConfirmationPage.js
import React, { useEffect, useState } from 'react';
import styles from './confirme.module.css';
import  image from '../../assets/checkmark3.png'
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const { orderNumber, dateOfOrder } = location.state || {};


  const orderDate = new Date(dateOfOrder);
  const timeDetails = orderDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dayDetails = orderDate.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });


  return (
    <div className={styles.container}>
      <img src={image} alt="Checkmark" className={styles.icon} />

      <h1 className={styles.heading}>Thank you for your purchase!</h1>
      <p className={styles.details}>Your order has been confirmed, and we're thrilled to have you as a valued customer.</p>
      <p className={styles.details} style={{marginBottom: "50px"}}> Here are the details of your order:</p>
      <p className={styles.details} style={{textDecoration: "underline", fontWeight:"bold"}}>Order Number {" -> "}
          {orderNumber}
      </p>
      <p className={styles.details} style={{textDecoration: "underline", fontWeight:"bold"}}>Date of Order {" -> "}
          {timeDetails} | {dayDetails}
      </p>
      {/* Other order details can be displayed here */}
      <button className={styles.button} onClick={() => window.location.href = '/'}>Continue Shopping</button>
    </div>
  );
};

export default ConfirmationPage;
