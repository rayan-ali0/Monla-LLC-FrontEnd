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

export default function EditProduct() {
  const navigate = useNavigate()
  const location = useLocation()
  const { product } = location.state ? location.state : { product: null }
  // console.log(product)


  const [isAddFormOpen, setIsAddFormOpen] = useState(false);  // State for Add Form
  const [editedProduct, setEditedProduct] = useState({})
  const [displayVolume, setDisplayVolume] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])

  useEffect(() => {
    if (product.category === "Lubricants & Additives") {
      setDisplayVolume(true)
    }
    else {
      setDisplayForm(true)
    }
  }, [])

  useEffect(() => {
    if (product) {
      setEditedProduct({
        ...product,
        category: product.category ? product.category._id : null,
        volume: product.volume && product.volume !== 0 ? product.volume : 0,
        brand: product.brand ? {"label":product.brand.brand,"value":product.brand._id}: null,
        model: product.model ? {"label":product.model.name,"value":product.model._id} : null,
        year: product.year ? {"label":product.year.value.join('-'),"value":product.year._id} : null,
      });
    }
    else {
      console.log("no product")
    }
  }, [product]);

  useEffect(() => {
    console.log("editedd")
    console.log(editedProduct)
  }, [editedProduct]);

  useEffect(() => {
    fetchBrands()
  }, [])

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



  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/brand/readBrand`)
      if (res) {

        const brandData = res.data.map(brand => ({
          label: brand.brand,
          value: brand._id
        }))
        setBrands(brandData)
        console.log(brandData)
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
        setModels(modelData)
      }
    }
    catch (error) {
      toast.error("Error fetching Models, Please try Again!")
    }
  }


  const fetchYears = async (modelId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/byModel/${modelId}`)
      if (res) {
        const yearsData = res.data.map(year => ({
          label: year.value.join('-'),
          value: year._id
        }))
        setYears(yearsData)
        console.log(years)
      }
      console.log(error)
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching Years, Please try Again!")
    }
  }



  const editProduct = async () => {
  
    const simplifiedProduct = {
      ...editedProduct,
      volume: (editedProduct.volume && editedProduct.volume !== 0) ? editedProduct.volume : 0,
      brand: editedProduct.brand ? editedProduct.brand.value : null,
      model: editedProduct.model ? editedProduct.model.value : null,
      year: editedProduct.year ? editedProduct.year.value : null,
    };
  

    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/update`, simplifiedProduct,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      if (res) {
        if (res.status === 200) {
          toast.success("Product Edited Succesfully")
          setDisplayVolume(false);
          setDisplayForm(false);
        }
        else {
          toast.error(res.data.message)

        }
      }
      console.log(error)
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error editing Product, Please try Again!")
    }

  }

  useEffect(() => {
    // fetchCategories()
    fetchBrands()
  }, [])


  const handleEdit = (e, selectedOption, inputName) => {
    if (selectedOption) {
console.log(selectedOption)

      // if (inputName === "category" && selectedOption.label === "Lubricants & Additives") {
      //   setDisplayVolume(true)
      //   setDisplayForm(false)
      //   setEditedProduct({
      //     ...editedProduct,
      //     [inputName]: selectedOption.value,
      //     brand: undefined,
      //     model: undefined,
      //     year: undefined,
      //   });

      // }
      // else if (inputName === "category" && selectedOption.label !== "Lubricants & Additives") {
      //   setDisplayVolume(false)
      //   setDisplayForm(true)
      //   setEditedProduct({
      //     ...editedProduct,
      //     [inputName]: selectedOption.value,
      //     brand: null,
      //     model: null,
      //     year: null,
      //   });
      //   fetchBrands(selectedOption.value)
      // }
      if (inputName === "brand") {
        setEditedProduct({
          ...editedProduct,
          brand: {"label":selectedOption.label,"value":selectedOption.value},
          model: null,
          year:null

        });
        fetchModels(selectedOption.value)
      }
      else if (inputName === "model") {
        setEditedProduct({
          ...editedProduct,
          model: {"label":selectedOption.label,"value":selectedOption.value},
          volume: null
        });
        fetchYears(selectedOption.value)
      }
      else if (inputName === "year") {
        setEditedProduct({
          ...editedProduct,
          year: {"label":selectedOption.label,"value":selectedOption.value},
          volume: null
        });
      }
    }
    else if (!selectedOption && inputName) {
      if (inputName === "image") {
        setEditedProduct({
          ...editedProduct,
          [inputName]: e.target.files[0],
        });
      }

    }
    else if (!selectedOption && !inputName) {
      setEditedProduct({
        ...editedProduct,
        [e.target.name]: e.target.value,
      });
    }

    console.log(editedProduct)
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
    // console.log('Added :');
    navigate('/')

  };

  // const getCategoryTitleById = (categoryId) => {
  //   // console.log("hiii")
  //   // console.log(categories)
  //   // console.log(categoryId)
  //   for (const category of categories) {
  //     // console.log(category)
  //     if (category.value === categoryId) {
  //       // console.log(category.title)
  //       return category.label;
  //     }
  //   }
  //   return null;
  // };
const test = "hello"
  // console.log(getCategoryTitleById("65ae1c8b07892dfdb77df8e1"))
  return (
    <div className={style.addProductPage}>
      <div className={style.form1}>

        <TextField id="title" label="Title" name="title" variant="outlined" required
          onChange={handleEdit}
          value={editedProduct.title}
          sx={styleField} className={style.inputs} />

        <TextField id="description" label="Description" name="description" variant="outlined" required
          onChange={handleEdit}
          value={editedProduct?.description}

          sx={styleField} className={style.inputs} />

        <TextField id="price" label="Price" name="price" type="number" variant="outlined" required sx={styleField} className={style.inputs}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={handleEdit}
          value={product?.price}

        />
        <TextField id="SKU" label="SKU" name="SKU" variant="outlined" required
          onChange={handleEdit}
          value={editedProduct?.SKU}

          sx={styleField} className={style.inputs} />
        <TextField id="stock" label="Stock" name="stock" type="number" variant="outlined" required
          onChange={handleEdit}
          value={editedProduct?.stock}

          sx={styleField} className={style.inputs} />
        <TextField id="origin" label="Origin" name="origin" variant="outlined" required
          onChange={handleEdit}
          value={editedProduct?.origin}

          sx={styleField} className={style.inputs} />

        <TextField id="category" label="Category" name="category" variant="outlined"
          value={product?.category?.title}
          InputProps={{ readOnly: true }} // Set readOnly to true

          sx={styleField} className={style.inputs} />


        <div className={displayVolume ? style.inputs : style.displayVolum}
        >


          <TextField id="volume" label="Volume" name="volume" type="number" variant="outlined" required
            value={editedProduct && editedProduct.volume ? editedProduct.volume : ''}
            sx={styleField}
            className={style.volumeInput}
            InputProps={{
              startAdornment: <InputAdornment position="start">L</InputAdornment>,
            }}
          />
        </div>








        <div className={!displayForm ? style.form2 : style.formDisplay}>

          <Autocomplete
            value={editedProduct && editedProduct.brand ? { label: editedProduct.brand.label, value: editedProduct.brand.value } : null}

            className={style.inputs}
            disablePortal
            disableClearable
            id="combo-box-demo"
            options={brands}
            sx={styleField}
            onChange={(e, option) => handleEdit(e, option, "brand")}
            renderInput={(params) => (
              <TextField {...params} label="Brand" />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {/* {console.log("option:",option)}
                {console.log("option.label:", option.label)} */}
               {option.label}
               
              </li>
            )}
          />

          <Autocomplete
            value={editedProduct && editedProduct.model ? { label: editedProduct.model.label, value: editedProduct.model.value } : null}

            className={style.inputs}
            disablePortal
            disableClearable
            id="combo-box-demo"
            options={models}
            sx={styleField}
            onChange={(e, option) => handleEdit(e, option, "model")}
            renderInput={(params) => (
              <TextField {...params} label="Model" />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                  {option.label}

              </li>
            )}
          />

          <Autocomplete
            value={editedProduct && editedProduct.year ? { label: editedProduct.year.label, value: editedProduct.year.value} : null}

            className={style.inputs}
            disablePortal
            disableClearable
            id="combo-box-demo"
            options={years}
            sx={styleField}
            renderInput={(params) => (
              <TextField {...params} label="Year" />
            )}
            onChange={(e, option) => handleEdit(e, option, "year")}
            renderOption={(props, option) => (
              <li {...props}>
   
                  {option.label}
                
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
          onChange={(e) => handleEdit(e, null, "image")}
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
          onClick={editProduct}
        >
          Edit Product
        </Button>
      </div>



      {isAddFormOpen && <ModelAddForm onClose={handleAddFormClose} allBrands={brands} />}
    </div>
  )

}

