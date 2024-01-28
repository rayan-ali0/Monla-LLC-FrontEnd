// ConfirmationPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './confirme.module.css';
import  image from '../../assets/checkmark3.png'

const ConfirmationPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  // useEffect(() => {
  //   // Fetch order details from the backend
  //   const orderId = 'your_order_id'; // Replace with actual logic to generate/order ID
  //   axios.get(`http://localhost:5000/order/${orderId}`)
  //     .then(response => {
  //       setOrderDetails(response.data.Order);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching order details:', error);
  //     });
  // }, []);

  // if (!orderDetails) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.container}>
      {/* Checkmark image */}
      <img src={image} alt="Checkmark" className={styles.icon} />

      <h1 className={styles.heading}>Thank you for your purchase!</h1>
      <p className={styles.details}>Your order has been confirmed, and we're thrilled to have you as a valued customer. Here are the details of your order:</p>
      <p className={styles.details}>Order Number:
        {/* {orderDetails._id} */}
      </p>
      <p className={styles.details}>Date of Order:
        {/* {new Date(orderDetails.date).toLocaleDateString()} */}
      </p>
      {/* Other order details can be displayed here */}
      <button className={styles.button} onClick={() => window.location.href = '/'}>Continue Shopping</button>
    </div>
  );
};

export default ConfirmationPage;
