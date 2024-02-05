import React from "react";
import styles from "./PoweredByUS.module.css";
import { Link } from "react-router-dom";
import Rachwan from "../../assets/developers/rachwan-harb.jpg";
import Abdulaziz from "../../assets/developers/IMG_4675.jpg";
import Rayan from "../../assets/developers/IMG-20240203-WA0102.jpg";
import Souhad from "../../assets/developers/IMG_4233.jpg";
import Abedrahman from "../../assets/developers/IMG-20240204-WA0120.jpg";
import { Helmet } from "react-helmet-async";

const PoweredByUS = () => {
  return (
    <main className={`container ${styles.main}`}>
      <Helmet>
        <title>Powered by Us - Showcase of Talented Developers</title>
        <meta
          name="description"
          content="Explore profiles of talented developers powered by their unique skills and achievements. Connect with skilled professionals in the tech industry."
        />
        <meta
          name="keywords"
          content="Powered by Us, developers, showcase, skills, achievements, tech industry"
        />
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={Rachwan} alt="Rachwan Harb" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Rachwan Harb</h1>
          <div className={styles.emailWrapper}>
            <Link
              to={"mailto:rachwan.harb2023@gmail.com"}
              className={styles.email}>
              <span>rachwan.harb2023@gmail.com</span>
            </Link>
          </div>
          <a
            href="https://wa.me/76445648"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.number}>
            +961 76 445 648
          </a>
          <div className={styles.links}>
            <Link to={"https://www.linkedin.com/in/rachwan-harb"}>
              <span>LinkedIn</span>
            </Link>
            <Link to={"https://github.com/Rachwan"}>
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={Abdulaziz} alt="Abdulaziz Charkawi" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Abdulaziz Charkawi</h1>
          <div className={styles.emailWrapper}>
            <Link
              to={"mailto:aboudecharkawi@gmail.com"}
              className={styles.email}>
              <span>aboudecharkawi@gmail.com</span>
            </Link>
          </div>
          <a
            href="https://wa.me/79165588"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.number}>
            +961 79 165 588
          </a>
          <div className={styles.links}>
            <Link to={"https://www.linkedin.com/in/abdelaziz-cherkawi-248233270/"}>
              <span>LinkedIn</span>
            </Link>
            <Link to={"https://github.com/abdulaziz79"}>
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={Rayan} alt="Rayan Ali" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Rayan Ali</h1>
          <div className={styles.emailWrapper}>
            <Link
              to={"mailto:rayan.ali.8205@gmail.com"}
              className={styles.email}>
              <span>rayan.ali.8205@gmail.com</span>
            </Link>
          </div>
          <a
            href="https://wa.me/76147030"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.number}>
            +961  76 147 030
          </a>
          <div className={styles.links}>
            <Link to={"https:// www.linkedin.com/in/rayan-ali-96a2391a0"}>
              <span>LinkedIn</span>
            </Link>
            <Link to={"https://github.com/rayan-ali0"}>
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={Souhad} alt="Souhad Moussa" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Souhad Moussa</h1>
          <div className={styles.emailWrapper}>
            <Link
              to={"mailto:souhadmoussa86@gmail.com"}
              className={styles.email}>
              <span>souhadmoussa86@gmail.com</span>
            </Link>
          </div>
          <a
            href="https://wa.me/70572631"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.number}>
            +961 70 572 631
          </a>
          <div className={styles.links}>
            <Link to={"https://www.linkedin.com/in/souhad-moussa-84ba67232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"}>
              <span>LinkedIn</span>
            </Link>
            <Link to={"https://github.com/sm612003"}>
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={Abedrahman} alt="Abdulrahman Ghassa" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Abdulrahman Ghassa</h1>
          <div className={styles.emailWrapper}>
            <Link
              to={"mailto:abdulrahman.ghassa93@gmail.com"}
              className={styles.email}>
              <span>abdulrahman.ghassa93@gmail.com</span>
            </Link>
          </div>
          <a
            href="https://wa.me/76548699"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.number}>
            +961 76 548 699
          </a>
          <div className={styles.links}>
            <Link to={"https://linkedin.com/in/abdulrahman-ghassa-2b0533225"}>
              <span>LinkedIn</span>
            </Link>
            <Link to={"https://github.com/Abed-Dev93"}>
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PoweredByUS;
