import { React, useState, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import ProductViewDetails from "../../Components/ProductViewDetails/ProductViewDetails";
import SimiliarSection from "../../Components/SimiliarSection/SimiliarSection";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const location = useLocation();
  const myItem = location.state && location.state;
  const myItemID = myItem?._id;
  const [productData, setProductData] = useState(myItem || {});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (myItemID) {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND}/product/${myItemID}`
          );

          if (response.data) {
            setProductData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };
    fetchProduct();
  }, [myItemID]);

  return (
    <main className={styles.main}>
      <ProductViewDetails myItem={productData}/>
      <SimiliarSection myItem={productData}/>
    </main>
  );
};

export default ProductDetails;
