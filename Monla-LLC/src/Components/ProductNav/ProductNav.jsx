import React, { useEffect } from 'react'
import Styles from "./ProductNav.module.css"
import { useState } from 'react';
// import Autocomplete from "@mui/material/Autocomplete";
import Stack from '@mui/material/Stack';
import Autocomplete from "@mui/material/Autocomplete"
import {  TextField } from "@mui/material"
import { flexbox } from '@mui/system';
import axios from 'axios';





const ProductNav = ({searchTerm, setSearchTerm, onSearch, productData, onChange,setProducts,products, fileterdByy, setFileterdBy}) => {
  const [brands, setBrands] = useState([]);
  const [module, setModels] = useState([]);
  const [year, setYears] = useState([]);

  const handleChange = (event) => {
    setFileterdBy((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if(event.target.name ==="brand"){
      fetchModels(event.target.value)
    }
    if(event.target.name === "model"){
      fetchYears(event.target.value)
    }
  };
      // console.log(data)

      const handleSearch = () => {
        onSearch(); // Pass the search term to the parent component
      };

      const fetchBrands = async () => {
        try {
          const response = await axios.get('http://localhost:5000/brand/readBrand');
          console.log("--------------------------",response)
          if(response){
          setBrands(response.data);
        }else{
          console.log("noooooooooooooooooooohggggggggghh")
        }
       
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      };
    
      const fetchModels = async (brandId) => {
        try {
          const response = await axios.get(`http://localhost:5000/model/byBrand/${brandId}`);
          if(response){
          setModels(response.data);
          }
        } catch (error) {
          console.error('Error fetching models:', error);
        }
      };
    
      const fetchYears = async (modelId) => {
        try {
          const response = await axios.get(`http://localhost:5000/year/byModel/${modelId}`);
          if(response){
          setYears(response.data);
          }
        } catch (error) {
          console.error('Error fetching years:', error);
        }
      };
    
      useEffect(()=>{
        fetchBrands()
        console.log("yoyoiouio", productData)
      },[])

  return (
    <div className={Styles.container}>
        {/* <h2 className={Styles.h2}>Filter by </h2> */}
        { console.log(brands)}
      
        <div  className={Styles.searc}>
        {console.log(fileterdByy)}
        <select
          className={Styles.input}
          id="brandSelect"
          name="brand"
          // value={fileterdByy.brand && fileterdByy.brand}
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
        <select
          className={Styles.input}
          id="modukeSelect"
          name="model"
          // value={ filterState.model && filterState.model.name}
          // onChange={(e) => setSelectedModel(e.target.value)}
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
          className={Styles.input}
          id="yearSelect"
          name="year"
          // value={ filterState.year && filterState.year.value}
          // onChange={(e) => setSelectedYear(e.target.value)}
          onChange={handleChange}
        >
          <option className={Styles.option} value=''>Select Year</option>
          {year.map((year) => (
            <option key={year._id} value={year._id}>
              {year.value.join('-')}
            </option>
          ))}
        </select>
      <button onClick={()=>setFileterdBy({})} className={Styles.btn} >RESET</button>
    </div>
    <div>
      
        <Stack
                    className={Styles.stack}
                    sx={{ padding: "10px 0px" ,width:"20rem", color:"white" ,height:"3.5rem" }}
                  >
                    <Autocomplete
                    sx={{backgroundColor:"white", borderRadius:"10px", height:"4rem"}}
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={ products && products.map((item) => ({
                        title: item.title,
                      }))}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          className={`${Styles.searchInput}`}
                          {...params}
                          label="Search by title"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                      onChange={onChange}
                    />
                  </Stack>
                  
            
            </div>
    </div>
      

  )
}

export default ProductNav
