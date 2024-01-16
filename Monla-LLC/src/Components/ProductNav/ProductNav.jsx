import React from 'react'
import Styles from "./ProductNav.module.css"
import { useState } from 'react';

const ProductNav = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
      };
      const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
      };
      const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
      };

  return (
    <div className={Styles.container}>
        <h2 className={Styles.h2}>Search: </h2>
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
      

  )
}

export default ProductNav
