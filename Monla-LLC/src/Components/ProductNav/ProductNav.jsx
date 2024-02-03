import React, { useEffect } from 'react'
import Styles from "./ProductNav.module.css"
import "./ProductNav.css"
import { useState } from 'react';
// import Autocomplete from "@mui/material/Autocomplete";
import Stack from '@mui/material/Stack';
import Autocomplete from "@mui/material/Autocomplete"
import {  TextField } from "@mui/material"
import { flexbox, style } from '@mui/system';
import axios from 'axios';
import search from '../../assets/icons/search.png'

const ProductNav = ({ setSearchTerm, onSearch, productData, onChange,setProducts,products, fileterdByy, setFileterdBy}) => {
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
      // console.log(data)

      // const handleSearch = () => {
      //   onSearch(); // Pass the search term to the parent component
      // };

      const fetchBrands = async () => {
        try {
          const response = await axios.get('http://localhost:5000/brand/readBrand');
          // console.log("--------------------------",response)
          if(response){
          setBrands(response.data);
        }else{
          // console.log("noooooooooooooooooooohggggggggghh")
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
        // console.log("yoyoidddddddddddddddddddddddddddddddddddddddddddddddddouio", productData)
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
        {/* <h2 className={Styles.h2}>Filter by </h2> */}
        {/* { console.log(brands)} */}
      <div className={Styles.newWrapper}>
        <div  className={Styles.searc}>
        {/* {console.log(fileterdByy)} */}
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
          className={`${Styles.input} ${Styles.yearInput}`}
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
      // onChange={(e) => onChange(e)}
      onChange={(e) => onChangeTerm(e)}

    />
                           {/* <TextField
                    sx={{backgroundColor:"white", borderRadius:"10px", height:"100%"}}
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
                          sx={{backgroundColor:"white", borderRadius:"10px", height:"100%"}}
                          {...params}
                          label="Search by title"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                      onChange={(e, value) => onChange(e, value)}
                      /> */}
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
