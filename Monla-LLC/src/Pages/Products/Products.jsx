import {Category} from "../../Components/Category/Category"
import ProductCart from "../../Components/ProductCart/ProductCart"
import Styles from "./Products.module.css"
import ProductNav from "../../Components/ProductNav/ProductNav"
import { useFetchData } from "../../CustomHook/GetData"
import { useEffect, useState } from "react"
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
import { useLocation } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


const Products = () => {
  const [selectedCategory, setSelectedCategory]=useState("")
  const [currentPage, setCurrentPage]=useState(1)
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 12;
const [filterState,setFilterSate]=useState(false)
  const [products, setProducts] = useState([]);
  const [selectedBrand, setselectedBrand] = useState(null);
  const [selectedModel, setselectedModel] = useState(null);
  const [selectedYear, setselectedYear] = useState(null);
  const [fileterdBy, setFileterdBy] = useState(null);
const [filteredProducts,setFilteredProducts]=useState(null)

    const location = useLocation();


  const [loading, setLoading] = useState(true);
  
   
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
        const response= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all`)
        // console.log(response.data)
        return response.data
      } catch (error) {
        
      }
    }
  })
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const brand = queryParams.get('brand');
  //   const model = queryParams.get('model');
  //   const year = queryParams.get('year');
  //   const fetchProducts = async () => {
  //     try {
  //       let url = `http://localhost:5000/product/filter/By?brand=${brand} `;

  //       if (model) {
  //         url += `&model=${model}`;
  //       }
  //       if (year) {
  //         url += `&year=${year}`;
  //       }

  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setProducts(data);
  //       setLoading(false); // Set loading to false when data is received
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   // Fetch products only if the brand is selected
  //   if (brand) {
  //     fetchProducts();
  //   }
  // }, [brand, model, year]);


 const fetchProducts = async (paramdData) => {
  console.log(paramdData)
            try {
              // let url = `http://localhost:5000/product/filter/By?brand=${brand} `;
      
              // if (model) {
              //   url += `&model=${model}`;
              // }
              // if (year) {
              //   url += `&year=${year}`;
              // }

              const response= await axios.get(`http://localhost:5000/product/filter/By`,{
                params:paramdData
              })
              // const response = await fetch(url,fil);
              // const data = await response.json();
              if(response){
                setProducts(response.data)
                console.log(response.data)
                setLoading(false)
              }
              // setProducts(data);
              // setLoading(false); // Set loading to false when data is received
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };

  useEffect( ()=>{
    if(location.state?.filterState){
      console.log("stateeeee",location.state.filterState)
      setFileterdBy(location.state.filterState)
    //  fetchProducts(location.state.filterState)
    }
    else{
      // setFileterdBy({})
      fetchProducts({})
      // setProducts(productData)
    }
    console.log("pagee",productData)
  },[])

  useEffect( ()=>{

    if(fileterdBy){
      fetchProducts(fileterdBy)
    }
    else{
      // setProducts(productData)
      fetchProducts({})
      
    }
    console.log("--------------------------",products)
  },[fileterdBy])


//     const filteredProducts = productData?.filter((item)=>
//       item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
//     )
//     .filter((item) =>
//   selectedCategory === "" || (item.category && selectedCategory === item.category._id)
// );
  const handlCategoryId = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); 
    // refetch(); 
  };


  useEffect(()=>{
    const filters= productData?.filter((item)=>
    item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  )
  setFilteredProducts(filters)
  },[])


  const handleSearch = (event, value) => {
    setFilterSate(true)
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

  // // const paginatedProducts = filteredProducts && filteredProducts.slice(startIndex, endIndex);
  // const paginatedProducts = products && products.slice(startIndex, endIndex);

  const totalPages = products && Math.ceil(products.length / productsPerPage);
    // const totalPages = filteredProducts && Math.ceil(filteredProducts.length / productsPerPage);


  return (
    <div className={Styles.body}>
      
      {/* {console.log("-----------", fileterdBy)} */}
      <div className={Styles.nav}>
      <ProductNav
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
      fileterdByy={fileterdBy}
      productData={productData}
      setFileterdBy={setFileterdBy}
      onChange={handleSearch}
setProducts={setProducts} 
products={products}
      />
      </div>
      <div className={Styles.searchh}>
        <h1 style={{fontSize:"50px", color:"#163357"}}>Products</h1>
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
      //  onChange={handleCategoryChange}
      />
     
      </div>
     
      <div className={Styles.product}>
        
      {isProductPending && <p>Loading...</p>}
          {productError && <p>Error: {productError.message}</p>}
        {products && products.length === 0 ? (
          <div className={Styles.empty}>
            <SentimentVeryDissatisfiedIcon sx={{width:"10rem", height:"10rem", color :"#163357"}} />
          <h1 style={{color:"#163357", fontSize:"60px"}}>No Products Found</h1>
          </div>
        ) : (
          products && products.map((item) => (
            <Link key={item.id} to={`/productdetails/${item.slug}`} state={item}>
              <ProductCart key={item.id} item={item} img={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} />
            </Link>
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
