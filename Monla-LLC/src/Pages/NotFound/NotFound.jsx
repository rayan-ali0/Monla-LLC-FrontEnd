import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.error}>Error</h1>
        <h1 className={styles.fourOfour}>404</h1>
        <p className={styles.pageNotFound}>Page Not Found</p>
        <p className={styles.text}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to={"/"} >
          <div className={styles.button__wrapper}>
            <button className={styles.button}>Back To Home</button>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
