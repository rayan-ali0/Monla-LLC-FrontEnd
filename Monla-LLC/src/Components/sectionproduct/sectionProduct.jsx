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



// 65a6849a53062ad8801ba0e7
// 65ab93f28a96bff83216925f
// 65ab9433b34ee3d4592d9e45
// 65a697469967afb7541a8bcb
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