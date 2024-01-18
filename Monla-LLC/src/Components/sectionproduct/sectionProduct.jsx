import React, { useState, useEffect } from 'react';
import Styles from './sectionproduct.module.css';
import heart from '../../assets/heart.png';

const ProductCarthome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/read/all');
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Limit to the first 3 products
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
    <div className={Styles.productlinecontainer}>
      {products.map((product) => (
        <div className={Styles.container} key={product._id}>
          <img src={heart} className={Styles.heart} alt="" />
          <div>
            <img className={Styles.image} src={`http://localhost:5000/${product.image}`}  alt="" />
          </div>
          <div className={Styles.text}>
            <h2 className={Styles.price}>{product.price}</h2>
            <p className={Styles.title}>{product.title}</p>
            <p className={Styles.desc}>{product.desc}</p>
          </div>
          <button className={Styles.btn}>ADD TO CART</button>
        </div>
      ))}
    </div>
  );
};

export default ProductCarthome;
