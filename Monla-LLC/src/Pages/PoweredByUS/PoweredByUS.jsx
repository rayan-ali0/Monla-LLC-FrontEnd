import React from "react";
import styles from "./PoweredByUS.module.css";
import { Link } from "react-router-dom";
import rachwan from "../../assets/developers/rachwan-harb.jpg";
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
          <img src={rachwan} alt="Rachwan Harb" className={styles.image} />
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
          <img src={rachwan} alt="Rachwan Harb" className={styles.image} />
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
          <img src={rachwan} alt="Rachwan Harb" className={styles.image} />
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
          <img src={rachwan} alt="Rachwan Harb" className={styles.image} />
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
          <img src={rachwan} alt="Rachwan Harb" className={styles.image} />
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
    </main>
  );
};

export default PoweredByUS;
