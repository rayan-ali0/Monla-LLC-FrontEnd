import {Category} from "../../Components/Category/Category"
import ProductCart from "../../Components/ProductCart/ProductCart"
import Styles from "./Products.module.css"
import ProductNav from "../../Components/ProductNav/ProductNav"
import { useFetchData } from "../../CustomHook/GetData"
import { useEffect, useState } from "react"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useQuery } from "react-query"
import axios from "axios"
import { PaginationItem, TextField } from "@mui/material"
import { useLocation } from 'react-router-dom';
import Loading from "../../Components/Loading/Loading"


const Products = () => {
  const [selectedCategory, setSelectedCategory]=useState("")
  const [currentPage, setCurrentPage]=useState(1)
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 20;
  const [products, setProducts] = useState([]);
  const [fileterdBy, setFileterdBy] = useState(null);

    const location = useLocation();


  const [loading, setLoading] = useState(true);
  
   

  const categoryApi=`${import.meta.env.VITE_REACT_APP_BACKEND}/category/readCategory`
  const {data:categoryData, loading:loadingCategory, error: errorCategory }=useFetchData(categoryApi)
  
  const {
    isPending: isProductPending,
    error: productError,
    data:productData,
    refetch,
    } = useQuery ({
    queryKey:["productData", currentPage, selectedCategory, searchTerm],
    queryFn:async()=>{
      try {
        const response= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all`)
        return response.data
      } catch (error) {
        
      }
    }
  })

 const fetchProducts = async (paramdData) => {
            try {

              const response= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/filter/By`,{
                params:paramdData
              })

              setLoading(false)
              setProducts(response.data)
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };

  useEffect( ()=>{
    if(location.state?.filterState){
      setFileterdBy(location.state.filterState)
    }
    else{
      fetchProducts({})
    }
  },[])

  useEffect( ()=>{
    if(fileterdBy){
      fetchProducts(fileterdBy)
    }
    else{
      setProducts(productData)
      
    }
  },[fileterdBy])


  const handlCategoryId = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); 
  };



  const handleSearch = (e) => {
    if(e.target.value===""){

      setProducts(productData)
    
    }
    else{
      setSearchTerm(e.target.value);

    }
  };

  useEffect(()=>{
if(searchTerm && searchTerm!==""){
  const filters= productData?.filter((item)=>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
)
setProducts(filters)
}
  },[searchTerm])

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = products && products.slice(startIndex, endIndex);

  const totalPages = products && Math.ceil(products.length / productsPerPage);


  return (
    <div className={Styles.body}>
      

      <div className={Styles.nav}>
      <ProductNav
      setSearchTerm={setSearchTerm}

      fileterdByy={fileterdBy}
      productData={productData}
      setFileterdBy={setFileterdBy}
      onChange={handleSearch}
setProducts={setProducts} 
products={products}
      />
      </div>
      <div className={Styles.searchh}>
        <h1 className={Styles.title}>Products</h1>
      </div>
      
      <div className={Styles.container}>
      <div className={Styles.category}>
      <Category 
      handlCategoryId={handlCategoryId}
       data={categoryData}
       loading={loadingCategory}
       setFileterdBy={setFileterdBy}
       error={errorCategory}
       selectedCategories={selectedCategory}

      />
     
      </div>
     
      <div className={Styles.product}>
        
      {loading && <Loading />}
          {productError && <p>Error: {productError.message}</p>}
        {products && products.length === 0 && !loading? (
          <div className={Styles.empty}>
          <h1 style={{color:"#163357", fontSize:"60px"}}>No Products Found</h1>
          </div>
        ) : (
          products && paginatedProducts.map((item) => (
                          <ProductCart key={item.id} item={item} img={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} />
              
          ))
        )}

      </div>
      </div>
      <Stack spacing={2}>
  <Pagination
    count={totalPages}
    page={currentPage}
    onChange={(event, page) => setCurrentPage(page)}
    variant="outlined"
    renderItem={(item) => (
      <PaginationItem
        {...item}
        disabled={!products || (products.length === 0 && item.page === currentPage)}
      />
    )}
  />
</Stack>
    </div>
  )
}

export default Products
