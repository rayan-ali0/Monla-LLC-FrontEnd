import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import densoImg from '../../assets/images/densoProduct.jpeg';
import benifitIcon from '../../assets/icons/Icon-return.svg';

const ProductDetails = () => {
  const [count, setCount] = useState(1); 

  const decreaseOne = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseOne = () => {
    if (count < 100) { // here will be the stock instead of 100
      setCount(count + 1);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.productView}>
        <div className={`container ${styles.wrapper}`}>
          <div className={styles.image}>
            <img src={densoImg} alt="" />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <h2 className={styles.product__title}>
                <span className={styles.productName}>Radiator</span> -{' '}
                <span className={styles.info}>XXX</span>
              </h2>
              <p className={styles.check__stock}>In Stock</p>
              <p className={styles.price}>$192.00</p>
              <div className={styles.description}>
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess-free
                removal Pressure sensitive.
              </div>
              <div className={styles.details}>
                <div className={styles.brand}>
                  <pre>Brand:  <span>Mercedes</span></pre>{'  '}
                </div>
                <div className={styles.model}>
                  <pre>Model:  <span>C300</span></pre>
                </div>
                <div className={styles.year}>
                  <pre>Year:   <span>2015-2016</span></pre>
                </div>
              </div>
              <div className={styles.purchase__buttons}>
                <div className={styles.quantity__to__buy}>
                  <span className={styles.decrease} onClick={decreaseOne}>-</span>
                  <span className={styles.number}>{count}</span>
                  <span className={styles.increase} onClick={increaseOne}>+</span>
                </div>
                <div className={styles.addToCart}>
                  <button className={styles.button}>Add to cart</button>
                </div>
              </div>
              <div className={styles.benefit}>
                <div className={styles.icon}>
                  <img src={benifitIcon} alt="" />
                </div>
                <div className={styles.benefitContent}>
                  <p className={styles.title}>Guarantee</p>
                  <p className={styles.info}>
                    Free 30 Days Delivery Returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <div>component 1</div>
              <div>component 2</div>
              <div>component 3</div>
              <div>component 4</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
