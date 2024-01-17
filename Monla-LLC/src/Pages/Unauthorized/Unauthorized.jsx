import React from 'react';
import unauthorizedImage from '../../assets/images/police.png';
import styles from './Unauthorized.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Unauthorized = () => {
  return (
    <main className={styles.mainC}>
      <Helmet>
        <title>Unauthorized - Monla</title>
        <meta
          name="description"
          content="Unauthorized entry detected. Access to this page is restricted. Please go back to the homepage."
        />
        <meta name="keywords" content="unauthorized, restricted, access denied" />
      </Helmet>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={unauthorizedImage} alt="" />
          </div>
          <div className={styles.text__wrapper}>
            <p className={styles.denied}>Access Denied</p>
            <p className={styles.text}>Unauthorized entry detected.</p>
          </div>
        </div>
        <Link to={"/"} >
          <div className={styles.button__wrapper}>
            <button className={styles.button}>Back To Home</button>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Unauthorized;
