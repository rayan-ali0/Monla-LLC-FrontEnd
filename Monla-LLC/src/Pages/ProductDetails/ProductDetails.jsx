import { React, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import ProductViewDetails from "../../Components/ProductViewDetails/ProductViewDetails";
import SimiliarSection from "../../Components/SimiliarSection/SimiliarSection";

const ProductDetails = () => {
  const[idCategory, setIdCategory] = useState(null)
  const OnChange=(id)=>{
    setIdCategory(id)
  }

  return (
    <main className={styles.main}>
      <ProductViewDetails getCategoryId={OnChange}/>
      <SimiliarSection similiarId={idCategory}/>
    </main>
  );
};

export default ProductDetails;
