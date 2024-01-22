import {Category} from "../../Components/Category/Category"
import ProductCart from "../../Components/ProductCart/ProductCart"
import Styles from "./Products.module.css"
import ProductNav from "../../Components/ProductNav/ProductNav"
import { useFetchData } from "../../CustomHook/GetData"
import { useState } from "react"
import { Link } from "react-router-dom"


const Products = () => {
  
  const api=`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all`
  const {data ,error, loading}=useFetchData(api)
  const [selectedCategory, setSelectedCategory]=useState([])

  const categoryApi=`${import.meta.env.VITE_REACT_APP_BACKEND}/category/readCategory`
  const {data:categoryData, loading:loadingCategory, error: errorCategory }=useFetchData(categoryApi)

  const filteredProduct= data.filter(product=>
    selectedCategory.includes(product.category))


    const handleCategoryChange = category => {
      setSelectedCategory(prevCategories =>
        prevCategories.includes(category)
          ? prevCategories.filter(cat => cat !== category)
          : [...prevCategories, category]
      );
    };


  return (
    <div className={Styles.body}>
      <div className={Styles.nav}>
      <ProductNav />
      </div>
      <div className={Styles.container}>
      <div className={Styles.category}>
      <Category 
       data={categoryData}
       loading={loadingCategory}
       error={errorCategory}
       selectedCategories={selectedCategory}
       onChange={handleCategoryChange}
      />
      </div>
      <div className={Styles.product}>
      {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        {data.map((item)=>(
          <Link to={`/productdetails/${item.slug}`} state={item}>
          <ProductCart key={item.id} price={item.price} img={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} title={item.title} desc={item.description} />
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Products
