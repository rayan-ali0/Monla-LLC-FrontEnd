import React, { useEffect, useState } from "react";
import ProductCart from "../../Components/ProductCart/ProductCart.jsx";
import styles from "./SimiliarSection.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SimiliarSection = ({ myItem }) => {
  const [similiarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const paramsItem={
          category: myItem.category._id,

        }
        if(myItem.brand){
          paramsItem.brand=myItem.brand._id

        }
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND}/product/related/five`,
          {
            params: paramsItem
          }
        );

        if (response.data) {
          setSimilarProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error.message);
      }
    };

    // if (myItem.brand && myItem.brand.brand) {
      fetchSimilarProducts();
    // }
  }, [myItem]);

  // const handleClick = () => {
  //   window.location.reload();
  // }

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
            {similiarProducts.map((item) => (
              // <div className={styles.single__product} key={item._id} onClick={handleClick}>
              <div className={styles.single__product} key={item._id}>

                {/* <Link to={`/productdetails/${item.slug}`} state={item}> */}
                  <ProductCart
                    item={item}
                    single__product={true}
                  />
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimiliarSection;
