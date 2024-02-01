import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from '../searchfilter/searchfilter.module.css';
import {motion} from "framer-motion"

const Searchfilter = () => {
    const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filterState, setFilterState]= useState({})

  const handleChange=(e)=>{


    if(e.target.name==="brand"){
      // SON.parse(e.target.value)._id
fetchModels(e.target.value)
    }
    if(e.target.name==="model"){
      fetchYears(e.target.value)
          }
    setFilterState((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
    console.log(filterState)
    
  }

  useEffect(() => {
    fetchBrands();
  }, []);


  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:5000/brand/readBrand');
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const response = await axios.get(`http://localhost:5000/model/byBrand/${brandId}`);
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const fetchYears = async (modelId) => {
    try {
      const response = await axios.get(`http://localhost:5000/year/byModel/${modelId}`);
      setYears(response.data);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const handleSearch = () => {
    navigate('/product',{state:{filterState}})
  };

  return (
    <motion.div className={Styles.container} >
      <motion.div initial={{opacity:0.5, scale:0.7}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
        <select
          className={Styles.input}
          id="brandSelect"
          name="brand"
          value={filterState.model && filterState.brand.brand}
          // onChange={(e) => setSelectedBrand(e.target.value)}
          onChange={handleChange}
        >
          <option className={Styles.option} value=''>Select Brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {/* {console.log(brand)} */}
              {brand.brand}
            </option>
          ))}
        </select>
      </motion.div>
      <motion.div initial={{opacity:0.5, scale:0.7}} animate={{opacity:1, scale:1}} transition={{duration:0.3}}>
        <select
          className={Styles.input}
          id="modukeSelect"
          name="model"
          value={ filterState.model && filterState.model.name}
          // onChange={(e) => setSelectedModel(e.target.value)}
          onChange={handleChange}
        >
          <option className={Styles.option} value=''>Select Model</option>
          {models.map((model) => (
            <option key={model._id} value={model._id}>
              {model.name}
            </option>
          ))}
        </select>
      </motion.div>
      <motion.div initial={{opacity:0.5, scale:0.7}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
        <select
          className={Styles.input}
          id="yearSelect"
          name="year"
          value={ filterState.year && filterState.year.value}
          // onChange={(e) => setSelectedYear(e.target.value)}
          onChange={handleChange}
        >
          <option className={Styles.option} value=''>Select Year</option>
          {years.map((year) => (
            <option key={year._id} value={year._id}>
              {year.value.join('-')}
            </option>
          ))}
        </select>
      </motion.div>
      <motion.button className={Styles.btn} onClick={handleSearch} initial={{opacity:0.7, scale:0.5}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
        Search
      </motion.button>
    </motion.div>
  );
};

export default Searchfilter;
