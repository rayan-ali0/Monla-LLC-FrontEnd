import React, { useEffect, useState } from 'react'
import style from './addProduct.module.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import ModelAddForm from '../dashTableModel/modelAddForm';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate()
  const location=useLocation()
  const {action}=useParams()
  const {product}=location.state?location.state:{product:null}
  console.log(action)
  console.log(product)

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);  // State for Add Form
  const [categories, setCategories] = useState([])
  const [displayVolume, setDisplayVolume] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])
  const [addedProduct, setAddedProduct] = useState({
    title: "",
    description: 0,
    stock: "",
    price: "",
    SKU: "",
    origin: "",
    volume:0,
    category: "",
    brand: "",
    model: "",
    year:'',
    image: "",
  })

  console.log(addedProduct)

  // const handleAddModel = () => {
  //   setIsAddFormOpen(true);
  // };
  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  /*******************FETCHING****************** */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/category/readCategory`)
      if (res) {
        // setCategories(res.data)
        console.log(res.data)
        const categoryData = res.data.map(category => ({
          label: category.title,
          value: category._id
        }))
        // categoryData.push({ label: "Add new" })
        setCategories(categoryData)
        console.log(categories)
      }
      else {
        console.error("Error:", error);
      }

    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching Categories, Please try Again!")
    }
  }



  const fetchBrands = async (categoryId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/brand/readBrand`)
      if (res) {

        const brandData = res.data.map(brand => ({
          label: brand.brand,
          value: brand._id
        }))
        // brandData.push({ label: "Add new" })
        setBrands(brandData)
      }
    }
    catch (error) {
      toast.error("Error fetching Brands, Please try Again!")
    }
  }

  const fetchModels = async (brandId) => {

    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/model/byBrand/${brandId}`)
      if (res) {
        const modelData = res.data.map(model => ({
          label: model.name,
          value: model._id
        }))
        // modelData.push({ label: "Add new" })
        setModels(modelData)
      }
    }
    catch (error) {
      toast.error("Error fetching Models, Please try Again!")
    }
  }


  const fetchYears=async(modelId)=>{

    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/byModel/${modelId}`)
      if (res) {
        const yearsData = res.data.map(year => ({
          label: year.value.join('-'),
          value: year._id
        }))
        setYears(yearsData)
      }
      console.log(error)
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching Years, Please try Again!")
    }
  }



  const addProduct=async()=>{

    try {
      // const productToSend = {};
      const productToSend = new FormData();

      let errorOccurred = false;

      const requiredKeys = ['title', 'description', 'stock','price','SKU','origin','category','image'];
      for (const [key, value] of Object.entries(addedProduct)) {
        if (requiredKeys.includes(key)) {
          if (value !== "" || value!==null) {
            productToSend.append(key, value);

          }
          else{
            errorOccurred=true
            toast.error("Required Fields are empty");
            break;
          }
        }
       else{
       if(key==="volume"){
        if(displayVolume){

         if(value===0){
          toast.error("Volume is Required for this category")
          errorOccurred=true

          break;
         }else{
          // productToSend[key] = value;
          productToSend.append(key, value);

         }
         

        }
       }
       if(key==="brand" || key==="model" || key==="year" ){
        if(displayForm){
        if  (value==='' || value===null){
            toast.error("Car Fields are Required for this category") 
            errorOccurred=true
          break;
          } 
          else{
            // productToSend[key] = value;
            productToSend.append(key, value);

          }
        }
       }
      }
    }
    if(!errorOccurred){
      console.log(productToSend)
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/create`,productToSend ,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (res) {
       if(res.status===200){
        toast.success("Product Added Succesfully")
        setDisplayVolume(false);
        setDisplayForm(false);
        setAddedProduct({
          title: "",
          description: 0,
          stock: "",
          price: "",
          SKU: "",
          origin: "",
          volume:0,
          category: "",
          brand: "",
          model: "",
          year:'',
          image: "",
        })
    }
     
       }
       else{
        toast.error(res.data.message)
       }
      }
    }
    catch(error) {
      console.error("Error:", error);
      toast.error("Error Adding Product, Please try Again!")
    }

  }

  useEffect(() => {
    fetchCategories()
    fetchBrands()
  }, [])


  const handleAdd = (e, selectedOption, inputName) => {
    if (selectedOption) {
      setAddedProduct({
        ...addedProduct,
        [inputName]: selectedOption.value,
      });


      if (inputName === "category" && selectedOption.label === "Lubricants & Additives") {
        setDisplayVolume(true)
        setDisplayForm(false)
      }
      else if (inputName === "category" && selectedOption.label !== "Lubricants & Additives") {
        setDisplayVolume(false)
        setDisplayForm(true)
        fetchBrands(selectedOption.value)
      }
  else if(inputName==="brand"){
    setAddedProduct({
      ...addedProduct,
      [inputName]: selectedOption.value,
      model: null,
      year:null
    });
    // setModels([])
    // setYears([])
    fetchModels(selectedOption.value)
  }
  else if(inputName==="model"){
    // setYears([])
    setAddedProduct({
      ...addedProduct,
      [inputName]: selectedOption.value,

      year:null
    });
    fetchYears(selectedOption.value)


  }
    }
    else if (!selectedOption && inputName) {
      if (inputName === "image") {
        setAddedProduct({
          ...addedProduct,
          [inputName]: e.target.files[0],
        });
        console.log(addedProduct)
      }

    }
    else if (!selectedOption && !inputName) {
      setAddedProduct({
        ...addedProduct,
        [e.target.name]: e.target.value,
      });
    }

    console.log(addedProduct)
  }

  /************************************* */

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const styleField = {
    '& .MuiOutlinedInput-root': {
      borderColor: 'white !important', // Default border color
      color: "white",
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
        borderColor: 'white !important',
      },
      '& .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
        borderColor: 'white !important',
      },
      '& .MuiInputLabel-root': {
        color: 'white !important'
      },
      '& .MuiSvgIcon-root': {
        color: "white !important"
      },
      '& .MuiTypography-root': {
        color: 'white'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Set desired label color here
      borderColor: 'white'
    },



  }

  const handleAddMovie = () => {
    console.log('Added :');
    navigate('/')

  };

  return (
    <div className={style.addProductPage}>
      <div className={style.form1}>

        <TextField id="title" label="Title" name="title" variant="outlined" required
          onChange={handleAdd}
          defaultValue={addedProduct.title|| ''}

          sx={styleField} className={style.inputs} />

        <TextField id="description" label="Description" name="description" variant="outlined" required
          onChange={handleAdd}
          // defaultValue={action==="Edit"?product?.description:''}
          value={addedProduct.description|| ''}

          sx={styleField} className={style.inputs} />

        <TextField id="price" label="Price" name="price" type="number" variant="outlined" required sx={styleField} className={style.inputs}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={handleAdd}
          // defaultValue={action==="Edit"?product?.price:''}
          defaultValue={addedProduct.price|| 0}

        />
        <TextField id="SKU" label="SKU" name="SKU" variant="outlined" required
          onChange={handleAdd}
          // defaultValue={action==="Edit"?product?.SKU:''}
          value={addedProduct.SKU|| ''}

          sx={styleField} className={style.inputs} />
        <TextField id="stock" label="Stock" name="stock" type="number" variant="outlined" required
          onChange={handleAdd}
          value={addedProduct.stock|| ''}

          sx={styleField} className={style.inputs} />
        <TextField id="origin" label="Origin" name="origin" variant="outlined" required
          onChange={handleAdd}
          // defaultValue={action==="Edit"?product?.origin:''}
          value={addedProduct.origin|| ''}

          sx={styleField} className={style.inputs} />

        <Autocomplete
                  // defaultValue={addedProduct.category|| ''}

                  // defaultValue={action==="Edit"&&product.category}
                  // value={(action === "Edit" && product) ? { label: product.category.title, value: product.category._id } : null}
          className={style.inputs}
          disablePortal
          id="combo-box-demo"
          options={categories}
          sx={styleField}
          disableClearable
          name="category"
          onChange={(e, option) => handleAdd(e, option, "category")}
          renderInput={(params) => (
            <TextField {...params} label="Category" />
          )}
          renderOption={(props, option) => (
            <li {...props} >
              {
                option.label
              }
            </li>
          )}
        />
        <div className={displayVolume ? style.inputs : style.displayVolum}
        >


          <TextField id="volume" label="Volume" name="volume" type="number" variant="outlined" required
          // defaultValue={action==="Edit"&&product.volume?product.volume:''}
          value={addedProduct.volume|| 0}
          onChange={handleAdd}

            sx={styleField}
            className={style.volumeInput}
            InputProps={{
              startAdornment: <InputAdornment position="start">L</InputAdornment>,
            }}
          />
        </div>


      <div className={!displayForm ? style.form2 : style.formDisplay}>

<Autocomplete
          value={addedProduct.brand|| ''}

  className={style.inputs}
  disablePortal
  disableClearable
  id="combo-box-demo"
  options={brands}
  sx={styleField}
  onChange={(e, option) => handleAdd(e, option, "brand")}
  renderInput={(params) => (
    <TextField {...params} label="Brand" />
  )}
  renderOption={(props, option) => (
    <li {...props}>
      {
        option.label
      }
    </li>
  )}
/>

<Autocomplete
    // value={(action === "Edit" && product) ? { label: product.model.name, value: product.model._id } : null}
    // value={addedProduct.model|| ''}

  className={style.inputs}
  disablePortal
  disableClearable
  id="combo-box-demo"
  options={models}
  sx={styleField}
  onChange={(e, option) => handleAdd(e, option, "model")}
  renderInput={(params) => (
    <TextField {...params} label="Model" />
  )}
  renderOption={(props, option) => (
    <li {...props}>
      {
        option.label
      }
    </li>
  )}
/>

<Autocomplete
          // value={addedProduct.year|| ''}

            // value={(action === "Edit" && product) ? { label: product.year.value.join('-'), value: product.year._id } : null}
  className={style.inputs}
  disablePortal
  disableClearable
  id="combo-box-demo"
  options={years}
  sx={styleField}
  renderInput={(params) => (
    <TextField {...params} label="Year" />
  )}
  onChange={(e, option) => handleAdd(e, option, "year")}
  renderOption={(props, option) => (
    <li {...props}>
      {
        option.label
      }
    </li>
  )}
/>
</div>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} className={style.inputs}
          sx={{
            backgroundColor: 'white',
            color: 'blue',
            '&:hover': {
              backgroundColor: 'lightgray', // Add a different color for hover effect if needed
            },
          }}
          onChange={(e) => handleAdd(e, null, "image")}
        >
          Upload file
          <VisuallyHiddenInput type="file"
          />
        </Button>
        <Button component="label" variant="contained" startIcon={<AddIcon />} className={style.inputs}
          sx={{
            backgroundColor: 'white',
            color: 'blue',
            '&:hover': {
              backgroundColor: 'lightgray', // Add a different color for hover effect if needed
            },
          }}
          onClick={addProduct}
        >
          Add Product
        </Button>
      </div>

      {isAddFormOpen && <ModelAddForm onClose={handleAddFormClose} allBrands={brands} />}
    </div>
  )

}

