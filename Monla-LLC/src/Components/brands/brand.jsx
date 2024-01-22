import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from '../brands/brand.module.css';

const Brand = () => {
  const [brands, setBrands] = useState([]);

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

  return (
    <div className={Styles.container}>
      {brands.map(brand => (
        <div key={brand._id} className={Styles.category}>
          {/* {console.log(brand.image)} */}
          {brand.image && <img src={`http://localhost:5000/${brand.image}`} bra alt={brand.brand} className={Styles.image} />}
          {!brand.image && <div className={Styles.noImage}>No Image Available</div>}
          <h3>{brand.brand}</h3>

        </div>
           
      ))}
    </div>
  );
};

export default Brand;
