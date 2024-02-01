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
import { dark } from "@mui/material/styles/createPalette"
// import Autocomplete  from '@mui/material/Autocomplete';
import Autocomplete from "@mui/material/Autocomplete"
import { PaginationItem, TextField } from "@mui/material"
// import Stack from "@mui/material/Stack";



const Products = () => {
  const [selectedCategory, setSelectedCategory]=useState("")
  const [currentPage, setCurrentPage]=useState(1)
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 12;

  // const [currentPage, setCurrentPage] = useState(1);

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
        const response= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all?&categoryId=${selectedCategory}`)
        // console.log(response.data)
        return response.data
      } catch (error) {
        
      }
    }
  })
    const filteredProducts = productData?.filter((item)=>
      item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
    .filter((item) =>
  selectedCategory === "" || (item.category && selectedCategory === item.category._id)
);
  const handlCategoryId = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); 
    // refetch(); 
  };

  const handleSearch = (event, value) => {
    if(typeof value === "object" && value !==null){
      setSearchTerm(value.title || "");
    }else{
      setSearchTerm(value || "")
    }

    console.log(searchTerm)

    // setCurrentPage(1);
    // refetch();
  };
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = filteredProducts && filteredProducts.slice(startIndex, endIndex);

  const totalPages = filteredProducts && Math.ceil(filteredProducts.length / productsPerPage);
  

  return (
    <div className={Styles.body}>
      
      
      <div className={Styles.nav}>
      <ProductNav
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
      data={productData}
       />
      </div>
      <div className={Styles.searchh}>
        <h1 style={{fontSize:"50px", color:"#163357"}}>Products</h1>
      <Stack
                    className={Styles.stack}
                    sx={{ padding: "10px 0px" ,width:"20rem"}}
                  >
                    <Autocomplete
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
                      onChange={handleSearch}
                    />
                  </Stack>
                  </div>
      
      <div className={Styles.container}>
      <div className={Styles.category}>
      <Category 
      handlCategoryId={handlCategoryId}
       data={categoryData}
       loading={loadingCategory}
       error={errorCategory}
       selectedCategories={selectedCategory}
      //  onChange={handleCategoryChange}
      />
     
      </div>
     
      <div className={Styles.product}>
        
      {isProductPending && <p>Loading...</p>}
          {productError && <p>Error: {productError.message}</p>}
          {paginatedProducts && paginatedProducts.map((item) => (
  // <Link key={item.id} to={`/productdetails/${item.slug}`} state={item}>
    <ProductCart key={item.id} item={item} img={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} />
  // </Link>
))}
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
        disabled={!paginatedProducts || (paginatedProducts.length === 0 && item.page === currentPage)}
      />
    )}
  />
</Stack>
    </div>
  )
}

export default Products
