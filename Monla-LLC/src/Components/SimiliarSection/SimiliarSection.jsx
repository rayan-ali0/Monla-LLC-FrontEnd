import React from "react";
import ProductCart from '../../Components/ProductCart/ProductCart.jsx'
import carImage from "../../assets/Images/carr.png";
import styles from './SimiliarSection.module.css';

const SimiliarSection = ({ similiarId }) => {
  return (
    <section className={styles.similiar__Products__Section}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.related__Item__Wrapper}>
          <div className={styles.related__Item}>
            <div className={styles.background}></div>
            <h2 className={styles.title}>Related Items</h2>
          </div>
        </div>
        <div className={styles.similiarProducts}>
          <div className={styles.wrapper}>
            <div className={styles.single__product}>
              <ProductCart
                img={carImage}
                price={15}
                title={"title"}
                desc={"desc"}
                single__product={true}
              />
            </div>
            <div className={styles.single__product}>
              <ProductCart
                img={carImage}
                price={15}
                title={"title"}
                desc={"desc"}
                single__product={true}
              />
            </div>
            <div className={styles.single__product}>
              <ProductCart
                img={carImage}
                price={15}
                title={"title"}
                desc={"desc"}
                single__product={true}
              />
            </div>
            <div className={styles.single__product}>
              <ProductCart
                img={carImage}
                price={15}
                title={"title"}
                desc={"desc"}
                single__product={true}
              />
            </div>
            <div
              className={`${styles.single__product} ${styles.additional__product}`}>
              <ProductCart
                img={carImage}
                price={15}
                title={"title"}
                desc={"desc"}
                single__product={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimiliarSection;