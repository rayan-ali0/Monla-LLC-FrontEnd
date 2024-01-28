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

export default function AddEditProduct() {
  const navigate = useNavigate()
  const location=useLocation()
  const {action}=useParams()
  const {product}=location.state&&location.state

  console.log(action)
  console.log(product)

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);  // State for Add Form
  const [categories, setCategories] = useState([])
  const [addedProduct, setAddedProduct] = useState({})
  const [displayVolume, setDisplayVolume] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])

  const handleAddModel = () => {
    setIsAddFormOpen(true);
  };
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
        categoryData.push({ label: "Add new" })
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
    console.log(categoryId)
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/brand/readByCategory/${categoryId}`)
      if (res) {
        // setBrands(res.data)
        console.log(res.data)
        const brandData = res.data.map(brand => ({
          label: brand.brand,
          value: brand._id
        }))
        brandData.push({ label: "Add new" })
        setBrands(brandData)
      }
      console.log(error)
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching Brands, Please try Again!")
    }
  }

  const fetchModels = async (brandId) => {
    console.log(brandId)
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/model/byBrand/${brandId}`)
      if (res) {
        // setBrands(res.data)
        console.log(res.data)
        const modelData = res.data.map(model => ({
          label: model.name,
          value: model._id
        }))
        modelData.push({ label: "Add new" })
        setModels(modelData)
      }
      console.log(error)
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching Models, Please try Again!")
    }
  }


  const fetchYears=async(modelId)=>{
    console.log(modelId)
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/byModel/${modelId}`)
      if (res) {
        // setBrands(res.data)
        console.log(res.data)
        const yearsData = res.data.map(year => ({
          label: year.value.join('-'),
          value: year._id
        }))
        yearsData.push({ label: "Add new" })
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
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/create`,addedProduct,
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
       }
       else{
        toast.error(res.data.message)

       }
      }
      console.log(error)
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error Adding Product, Please try Again!")
    }

  }

  useEffect(() => {
    fetchCategories()
  }, [])


  const handleAdd = (e, selectedOption, inputName) => {
    console.log("selexdccccc")
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
    fetchModels(selectedOption.value)
  }
  else if(inputName==="model"){
    fetchYears(selectedOption.value)
  }
    }
    else if (!selectedOption && inputName) {
      if (inputName === "image") {
        console.log(inputName)
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
    // Implement your logic to add the custom movie
    // Here, we're navigating to a new page called '/add-movie'
    console.log('Added :');
    navigate('/')

  };

  return (
    <div className={style.addProductPage}>
      <div className={style.form1}>
        <TextField id="title" label="Title" name="title" variant="outlined" required
          onChange={handleAdd}

          sx={styleField} className={style.inputs} />
        <TextField id="description" label="Description" name="description" variant="outlined" required
          onChange={handleAdd}

          sx={styleField} className={style.inputs} />
        <TextField id="price" label="Price" name="price" type="number" variant="outlined" required sx={styleField} className={style.inputs}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={handleAdd}

        />
        <TextField id="SKU" label="SKU" name="SKU" variant="outlined" required
          onChange={handleAdd}

          sx={styleField} className={style.inputs} />
        <TextField id="stock" label="Stock" name="stock" type="number" variant="outlined" required
          onChange={handleAdd}

          sx={styleField} className={style.inputs} />
        <TextField id="origin" label="Origin" name="origin" variant="outlined" required
          onChange={handleAdd}

          sx={styleField} className={style.inputs} />

        <Autocomplete
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
              {option === categories[categories.length - 1] ? (
                <Button variant="outlined" onClick={handleAddMovie}>
                  Add Category
                </Button>
              ) : (
                option.label
              )}
            </li>
          )}
        />
        <div className={displayVolume ? style.inputs : style.displayVolum}
        >


          <TextField id="volume" label="Volume" name="volume" type="number" variant="outlined" required
            sx={styleField}
            className={style.volumeInput}
            InputProps={{
              startAdornment: <InputAdornment position="start">L</InputAdornment>,
            }}
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
          // onChange={(e) => handleAdd(e, null, "image")}
          onClick={addProduct}
        >
          Add Product
        </Button>
      </div>



      <div className={!displayForm ? style.form2 : style.formDisplay}>

        <Autocomplete
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
              {option === brands[brands.length - 1] ? (
                <Button variant="outlined" onClick={handleAddModel}>
                  Add Brand
                </Button>
              ) : (
                option.label
              )}
            </li>
          )}
        />

        <Autocomplete
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
              {option === models[models.length - 1] ? (
                <Button variant="outlined" onClick={handleAddModel}
                >
                  Add Model
                </Button>
              ) : (
                option.label
              )}
            </li>
          )}
        />

        <Autocomplete
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
              {option === years[years.length - 1] ? (
                <Button variant="outlined" onClick={handleAddMovie}>
                  Add Year
                </Button>
              ) : (
                option.label
              )}
            </li>
          )}
        />
      </div>
      {isAddFormOpen && <ModelAddForm onClose={handleAddFormClose} allBrands={brands} />}
    </div>
  )

}

