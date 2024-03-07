
import React, { useState, useEffect } from 'react';
import Styles from './sectionproduct.module.css';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
import ProductCart from '../ProductCart/ProductCart';
const variant = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.2
    },
  }
}


const ProductCarthome = () => {
  const [products, setProducts] = useState([]);

  const purchase = (item) => {
    const storedQuantity = JSON.parse(localStorage.getItem(JSON.stringify(item))) || 0;
    console.log(storedQuantity)
    if (storedQuantity === item.stock) {
      toast.error("No More to Add!")
      return;
    } else {
      localStorage.setItem(JSON.stringify(item), JSON.stringify(storedQuantity + 1));
      toast.success("Product Added!")
    }

  }







  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/related/five`);
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Limit to the first 4 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  if (products.length === 0) {
    return <div>Loading...</div>; // You can render a loading state while fetching data
  }

  return (
    <div>
      <motion.h2 className={Styles.titleproduct} variants={variant}>Explore below our best seller</motion.h2>

      <div className={Styles.productlinewrapper}>
        <div className={Styles.productlinecontainer}>

          {products.map((product) => (
            <motion.div className={Styles.container} key={product._id} initial={{ opacity: 0.1 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>

              <ProductCart item={product} single__product={true} state={product} />

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default ProductCarthome;