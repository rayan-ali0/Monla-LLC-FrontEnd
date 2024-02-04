import React, { useState, useEffect, useContext } from "react";
import benifitIcon from "../../assets/icons/Icon-return.svg";
import styles from "./ProductViewDetails.module.css";
import { CartContext } from "../../UserContext/CartContext";

const ProductViewDetails = ({ myItem }) => {
  const { changeCartItem } = useContext(CartContext);
  const stock = myItem.stock;
  const [addedToCart, setAddedToCart] = useState(false);

  const [count, setCount] = useState(0);

  const storedQuantity =
    JSON.parse(localStorage.getItem(JSON.stringify(myItem))) || 0;
  const [max, setMax] = useState(myItem.stock - storedQuantity);

  const updateStock = async () => {
    const storedQuantity =
      JSON.parse(localStorage.getItem(JSON.stringify(myItem))) || 0;
    localStorage.setItem(
      JSON.stringify(myItem),
      JSON.stringify(storedQuantity + count)
    );
    const quantity = JSON.parse(localStorage.getItem(JSON.stringify(myItem)));

    setMax(stock - quantity);
    setAddedToCart(true);
    setCount(0);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
    changeCartItem();
  };

  const decreaseOne = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseOne = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  return (
    <section className={styles.productView}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.image}>
          <img
            src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${myItem.image}`}
            alt=""
          />
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
            <div className={styles.description}>{myItem.description}</div>
            <div className={styles.details}>
              {myItem.volume ? (
                <div className={styles.oil}>
                  <pre>
                    Volume: <span>{myItem.volume}</span>
                  </pre>
                </div>
              ) : (
                <>
                  <div className={styles.brand}>
                    <pre>
                      Brand: <span>{myItem.brand.brand}</span>
                    </pre>
                    {"  "}
                  </div>
                  <div className={styles.model}>
                    <pre>
                      Model: <span>{myItem.model.name}</span>
                    </pre>
                  </div>
                  <div className={styles.year}>
                    <pre>
                      Year:{" "}
                      <span>
                        {myItem.year.value[0]} - {myItem.year.value[1]}
                      </span>
                    </pre>
                  </div>
                </>
              )}
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
