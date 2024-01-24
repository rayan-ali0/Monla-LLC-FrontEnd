import {Category} from "../../Components/Category/Category"
import ProductCart from "../../Components/ProductCart/ProductCart"
import Styles from "./Products.module.css"
import ProductNav from "../../Components/ProductNav/ProductNav"
import { useFetchData } from "../../CustomHook/GetData"
import { useState } from "react"
import { Link } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useQuery } from "react-query"
import axios from "axios"



const Products = () => {

  
  // const api=`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all`
  // const {data ,error, loading}=useFetchData(api)
  const [selectedCategory, setSelectedCategory]=useState([])
  const [currentPage, setCurrentPage]=useState(1)

  const categoryApi=`${import.meta.env.VITE_REACT_APP_BACKEND}/category/readCategory`
  const {data:categoryData, loading:loadingCategory, error: errorCategory }=useFetchData(categoryApi)

  const {
    isPending: isProductPending,
    error: productError,
    data:productData
  }=useQuery({
    queryKey:["productData", currentPage],
    queryFn:async()=>{
      try {
        const response= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all?pageNumber=${currentPage}&pageSize=${4}`)
        console.log(response.data)
        return response.data
      } catch (error) {
        
      }
    }
  })

  // const filteredProduct= data.filter(product=>
  //   selectedCategory.includes(product.category))


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
      {isProductPending && <p>Loading...</p>}
          {productError && <p>Error: {productError.message}</p>}
        {productData && productData.map((item)=>(
          <Link key={item.id} to={`/productdetails/${item.slug}`} state={item}>
          <ProductCart key={item.id} item={item} img={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`}  />
           </Link>
        ))}
      </div>
      </div>
      <Stack spacing={2}>
        {productData && ( <Pagination
              count={Math.ceil(productData)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              variant="outlined"
           />)}
     
    </Stack>
    </div>
  )
}

export default Products
