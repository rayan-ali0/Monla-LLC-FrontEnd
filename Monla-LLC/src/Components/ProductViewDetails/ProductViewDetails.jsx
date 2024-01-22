import React, { useState, useEffect } from "react";
import densoImg from "../../assets/images/densoProduct.jpeg";
import benifitIcon from "../../assets/icons/Icon-return.svg";
import styles from "./ProductViewDetails.module.css";
import { useLocation } from "react-router-dom";

const ProductViewDetails = ({ getCategoryId }) => {
  const location = useLocation();
  const myItem = location.state && Location.state;
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [stock, setStock] = useState(0);

  // const stock = productData.stock;
  // const stock = 100
  // const quality = 100;

  useEffect(() => {
    setStock(myItem.stock || 0);

    const storedQuantity = JSON.parse(localStorage.getItem(productData._id));
    if (storedQuantity) {
      setCount(storedQuantity);
    }

    // passing the id into Similair Product component
    if (!loading) {
      getCategoryId(myItem.category);
    }
  }, []);

  const updateStock = async () => {
    if (count > stock) {
      alert("Selected quantity exceeds available stock");
      return;
    }

    const storedQuantity = JSON.parse(localStorage.getItem(myItem._id)) || 0;
    localStorage.setItem(myItem._id, JSON.stringify(storedQuantity + count));

    setAddedToCart(true);
    setCount(1);
  };

  const decreaseOne = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseOne = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  return (
    <section className={styles.productView}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.image}>
          <img src={densoImg} alt="" />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h2 className={styles.product__title}>
              <span className={styles.productName}>{myItem.title}</span>
            </h2>
            <p className={styles.check__stock}>
              {stock !== 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className={styles.price}>${myItem.price}</p>
            <div className={styles.description}>
              {myItem.description}
            </div>
            <div className={styles.details}>
              <div className={styles.brand}>
                <pre>
                  Brand: <span>{myItem.brand}</span>
                </pre>
                {"  "}
              </div>
              <div className={styles.model}>
                <pre>
                  Model: <span>{myItem.model}</span>
                </pre>
              </div>
              <div className={styles.year}>
                <pre>
                  Year: <span>{myItem.year}</span>
                </pre>
              </div>
            </div>
            <div
              className={styles.purchase__buttons}
              style={{ display: stock !== 0 ? "flex" : "none" }}>
              <div className={styles.quantity__to__buy}>
                <span className={styles.decrease} onClick={decreaseOne}>
                  -
                </span>
                <span className={styles.number}>{count}</span>
                <span className={styles.increase} onClick={increaseOne}>
                  +
                </span>
              </div>
              <div className={styles.addToCart}>
                <button
                  className={styles.button}
                  style={{
                    backgroundColor: addedToCart
                      ? "var(--button-background-hover-color)"
                      : "var(--button-background-color-red)",
                  }}
                  onClick={() => updateStock()}>
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.icon}>
                <img src={benifitIcon} alt="" />
              </div>
              <div className={styles.benefitContent}>
                <p className={styles.title}>Guarantee</p>
                <p className={styles.info}>Free 30 Days Delivery Returns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewDetails;
