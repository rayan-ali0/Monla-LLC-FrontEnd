// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Styles from './sectionproduct.module.css';
// import heart from '../../assets/Images/heart.png';

// const ProductCarthome = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const brand = queryParams.get('brand');
//   const model = queryParams.get('model');
//   const year = queryParams.get('year');

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = `http://localhost:5000/product/filter/By?brand=${brand}`;

//         if (model) {
//           url += `&model=${model}`;
//         }
//         if (year) {
//           url += `&year=${year}`;
//         }

//         const response = await fetch(url);
//         const data = await response.json();
//         setProducts(data);
//         setLoading(false); // Set loading to false when data is received
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     // Fetch products only if the brand is selected
//     if (brand) {
//       fetchProducts();
//     }
//   }, [brand, model, year]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (products.length === 0) {
//     return <div>No products found.</div>;
//   }

//   return (
//     <div className={Styles.productlinecontainer}>
//       {products.map((product) => (
//         <div className={Styles.container} key={product._id}>
//           <img src={heart} className={Styles.heart} alt="" />
//           <div>
//             <img className={Styles.image} src={`http://localhost:5000/${product.image}`} alt="" />
//           </div>
//           <div className={Styles.text}>
//             <h2 className={Styles.price}>{product.price}</h2>
//             <p className={Styles.title}>{product.title}</p>
//             <p className={Styles.desc}>{product.desc}</p>
//           </div>
//           <button className={Styles.btn}>ADD TO CART</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductCarthome;

import React, { useState, useEffect } from 'react';
import Styles from './sectionproduct.module.css';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
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
      const response = await fetch('http://localhost:5000/product/related/five');
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
            <Link className={Styles.linkTo} to={`/productdetails/${product.slug}`} state={product}>
              <div>
              
                <img className={Styles.image} src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${product.image}`} alt="" />

              </div>
              <div className={Styles.text}>
                <p className={Styles.title}>{product.title+="dfsgsdfgsdfgsdgfsdfbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" }</p>
              </div>
            </Link>
            <div className={Styles.bottomSection}>
              <h2 className={Styles.price}>${product.price}</h2>
              <button className={product.stock > 0 ? Styles.btn : Styles.btnSold} onClick={()=>purchase(product)}>{product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}</button>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);}


export default ProductCarthome;