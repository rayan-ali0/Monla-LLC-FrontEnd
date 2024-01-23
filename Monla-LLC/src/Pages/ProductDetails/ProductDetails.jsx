import { React, useState, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import ProductViewDetails from "../../Components/ProductViewDetails/ProductViewDetails";
import SimiliarSection from "../../Components/SimiliarSection/SimiliarSection";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const location = useLocation();
  const myItem = location.state && location.state;

  return (
    <main className={styles.main}>
      <ProductViewDetails myItem={myItem}/>
      <SimiliarSection myItem={myItem}/>
    </main>
  );
};

export default ProductDetails;
