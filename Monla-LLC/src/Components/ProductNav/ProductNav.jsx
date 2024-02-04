import React, { useEffect } from 'react'
import Styles from "./ProductNav.module.css"
import "./ProductNav.css"
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import {  TextField } from "@mui/material"
import axios from 'axios';
import search from '../../assets/icons/search.png'

const ProductNav = ({  productData,setProducts, setFileterdBy}) => {
  const [brands, setBrands] = useState([]);
  const [module, setModels] = useState([]);
  const [year, setYears] = useState([]);
  const [term, setTerm]=useState("")

  const handleChange = (event) => {
    if(event.target.name === "brand"){
      setFileterdBy((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
          model:null,
          year:null
        }));
        setModels([])
        setYears([])
        fetchModels(event.target.value)
    }
    else if(event.target.name=== "model"){
      setFileterdBy((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
        year:null
      }));
      setYears([])
      fetchYears(event.target.value)
    }
    else{
        setFileterdBy((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    }

  };


      const fetchBrands = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/brand/readBrand`);
          if(response){
          setBrands(response.data);
        }else{
        }
       
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      };
    
      const fetchModels = async (brandId) => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/model/byBrand/${brandId}`);
          if(response){
          setModels(response.data);
          }
        } catch (error) {
          console.error('Error fetching models:', error);
        }
      };
    
      const fetchYears = async (modelId) => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/byModel/${modelId}`);
          if(response){
          setYears(response.data);
          }
        } catch (error) {
          console.error('Error fetching years:', error);
        }
      };
    
      useEffect(()=>{
        fetchBrands()
      },[])
      const onChangeTerm=(e)=>{
        setTerm(e.target.value)
      }
      const handleSubmut=()=>{
        if(term && term!==""){
          const filters= productData?.filter((item)=>
          item.title.toLowerCase().includes(term.toLowerCase())
        )
        setProducts(filters)
        }
        else{
          setProducts(productData)
        }
      }

  return (
    <div className={Styles.container}>
      <div className={Styles.newWrapper}>
        <div  className={Styles.searc}>
        <select
          className={Styles.input}
          id="brandSelect"
          name="brand"
          onChange={handleChange}
        >
         
          <option className={Styles.option} value=''>Select Brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.brand}
            </option>
          ))}
        </select>
        <select
          className={Styles.input}
          id="modukeSelect"
          name="model"
          onChange={handleChange}
        >
          <option className={Styles.option} value=''>Select Model</option>
          {module.map((model) => (
            <option key={model._id} value={model._id}>
              {model.name}
            </option>
          ))}
        </select>
        <select
          className={`${Styles.input} ${Styles.yearInput}`}
          id="yearSelect"
          name="year"
          onChange={handleChange}
        >
          <option className={Styles.option} value=''>Select Year</option>
          {year.map((year) => (
            <option key={year._id} value={year._id}>
              {year.value.join('-')}
            </option>
          ))}
        </select>
      <button onClick={()=>setFileterdBy({})} className={Styles.btn} >Reset</button>
    </div>
    <div className={Styles.searchh} >
      
        <Stack
                    className={Styles.stack}
                   
                  >
                        <TextField
      sx={{
        backgroundColor: "white",
        borderRadius: "4px 0 0 4px",
        height: "45px", // Adjust the height as needed
      }}
      disableClearable
      label="Search by title"
      InputProps={{
        type: "search",
      }}
      inputProps={{
        style: {
          height: "100%", // Set the height to cover the entire TextField
        },
      }}
      onChange={(e) => onChangeTerm(e)}

    />
                  </Stack>
                  <button onClick={handleSubmut} className={Styles.searchBtn} >
                    <img src={search} alt="Search Icon" className={Styles.searchIcon}/>
                  </button>
            
            </div>
            </div>
    </div>
      

  )
}

export default ProductNav
