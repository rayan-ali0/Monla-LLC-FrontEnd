import React from 'react'
import Styles from "./ProductNav.module.css"
import { useState } from 'react';
// import Autocomplete from "@mui/material/Autocomplete";
import Stack from '@mui/material/Stack';
import Autocomplete from "@mui/material/Autocomplete"
import {  TextField } from "@mui/material"
import { flexbox } from '@mui/system';






const ProductNav = ({searchTerm, setSearchTerm, onSearch, productData, onChange}) => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
      };
      // console.log(data)
      const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
      };
      const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
      };

      const handleSearch = () => {
        onSearch(); // Pass the search term to the parent component
      };
    

  return (
    <div className={Styles.container}>
        {/* <h2 className={Styles.h2}>Filter by </h2> */}
      
        <div  className={Styles.searc}>
     
      <select className={Styles.input} id="brandSelect" name="brands" value={selectedBrand} onChange={handleBrandChange}>
        <option value="" className={Styles.option}>Select a brand</option>
        <option value="Bmw" className={Styles.option}>BMW</option>
        <option value="Mercedes" className={Styles.option}>Mercedes</option>
        <option value="Honda" className={Styles.option}>Honda</option>
        <option value="Hundai" className={Styles.option}>Hundai</option>
      </select>
      <select className={Styles.input} id="modukeSelect" name="module" value={selectedModule} onChange={handleModuleChange}>
        <option value="" className={Styles.option}>Select a Module</option>
        <option value="F10" className={Styles.option}>F10</option>
        <option value="Accord" className={Styles.option}>Accord</option>
        <option value="Tucson" className={Styles.option}>Tucson</option>
        <option value="C250" className={Styles.option}>C250</option>
      </select>
      <select className={Styles.input} id="yearSelect" name="Year" value={selectedYear} onChange={handleYearChange}>
        <option value="" className={Styles.option}>2006-2010</option>
        <option value="F10" className={Styles.option}>2011-2015</option>
        <option value="Accord" className={Styles.option}>2016-2020</option>
        <option value="Tucson" className={Styles.option}>2021-2024</option>
    
      </select>
      <button className={Styles.btn}>GO</button>
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
                      options={ productData && productData.map((item) => ({
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
