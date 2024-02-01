import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from '../brands/brand.module.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const navigate= useNavigate()

  useEffect(() => {
    // Fetch brand data from the server using Axios
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:5000/brand/readBrand'); // Replace with your actual API endpoint
        const data = response.data;

        if (response.status === 200) {
          setBrands(data);
        } else {
          console.error('Failed to fetch brands:', data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error.message);
      }
    };

    fetchBrands();
  }, []);

  const handleSubmit = (id) => {
    const filterState={brand:id}
    navigate('/product',{state:{filterState}})
    // console.log(id)
  };
  return (
    <motion.div className={Styles.container} >
      {brands.map(brand => (
       <motion.div key={brand._id} onClick={()=>handleSubmit(brand._id)} initial={{ scale:0.5,opacity:0.1}} whileInView={{scale:1, opacity:1}} transition={{duration:0.8}}>
        <Link to={`/product?brand=${brand._id}`} key={brand._id} className={Styles.category}>
          {/* {console.log(brand.image)} */}
          {brand.image && <img src={`http://localhost:5000/${brand.image}`} alt={brand.brand} className={Styles.image} />}
          {!brand.image && <div className={Styles.noImage}>No Image Available</div>}
          <h3>{brand.brand}</h3>
        </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Brand;
