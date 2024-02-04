import React, { useEffect, useState } from 'react'
import style from './addProduct.module.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';

export default function AddProduct() {

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
    volume: 0,
    category: "",
    brand: "",
    model: "",
    year: '',
    image: "",
  })




  /*******************FETCHING****************** */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/category/readCategory`)
      if (res) {
        const categoryData = res.data.map(category => ({
          label: category.title,
          value: category._id
        }))
        setCategories(categoryData)
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
      }
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching Years, Please try Again!")
    }
  }



  const addProduct = async () => {

    try {
      const productToSend = new FormData();

      let errorOccurred = false;

      const requiredKeys = ['title', 'description', 'stock', 'price', 'SKU', 'origin', 'category', 'image'];
      for (const [key, value] of Object.entries(addedProduct)) {
        if (requiredKeys.includes(key)) {
          if (value !== "" || value !== null) {
            productToSend.append(key, value);

          }
          else {
            errorOccurred = true
            toast.error("Required Fields are empty");
            break;
          }
        }
        else {
          if (key === "volume") {
            if (displayVolume) {

              if (value === 0) {
                toast.error("Volume is Required for this category")
                errorOccurred = true

                break;
              } else {
                productToSend.append(key, value);

              }


            }
          }
          if (key === "brand" || key === "model" || key === "year") {
            if (displayForm) {
              if (value === '' || value === null) {
                toast.error("Car Fields are Required for this category")
                errorOccurred = true
                break;
              }
              else {
                // productToSend[key] = value;
                productToSend.append(key, value);

              }
            }
          }
        }
      }
      if (!errorOccurred) {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/product/create`, productToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        if (res) {
          if (res.status === 200) {
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
              volume: 0,
              category: "",
              brand: "",
              model: "",
              year: '',
              image: "",
            })
          }

        }
        else {
          toast.error(res.data.message)
        }
      }
    }
    catch (error) {
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
      else if (inputName === "brand") {
        setAddedProduct({
          ...addedProduct,
          [inputName]: selectedOption.value,
          model: null,
          year: null
        });
        setModels([])
        setYears([])
        fetchModels(selectedOption.value)
      }
      else if (inputName === "model") {
        setYears([])
        setAddedProduct({
          ...addedProduct,
          [inputName]: selectedOption.value,

          year: null
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
      }

    }
    else if (!selectedOption && !inputName) {
      setAddedProduct({
        ...addedProduct,
        [e.target.name]: e.target.value,
      });
    }

  }


  const getModelLabelById = (modelId) => {
    const foundModel = models.find((model) => model.value === modelId);

    // If the model is found, return its label; otherwise, return null or handle it accordingly
    return foundModel ? foundModel.label : null;
  };


  const getYearLabelById = (yearId) => {
    const foundYear = years.find((year) => year.value === yearId);

    return foundYear ? foundYear.label : null;
  };
  const getBrandLabelById = (brandId) => {
    const foundBrand = brands.find((brand) => brand.value === brandId);

    return foundBrand ? foundBrand.label : null;
  };

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


  return (
    <div className={style.addProductPage}>
      <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }} className={style.editTitle}>Add Product</h1>

      <div className={style.form1}>

        <TextField id="title" label="Title" name="title" variant="outlined" required
          onChange={handleAdd}
          defaultValue={addedProduct.title || ''}

          sx={styleField} className={style.inputs} />

        <TextField id="description" label="Description" name="description" variant="outlined" required
          onChange={handleAdd}
          value={addedProduct.description || ''}

          sx={styleField} className={style.inputs} />

        <TextField id="price" label="Price" name="price" type="number" variant="outlined" required sx={styleField} className={style.inputs}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={handleAdd}
          defaultValue={addedProduct.price || 0}

        />
        <TextField id="SKU" label="SKU" name="SKU" variant="outlined" required
          onChange={handleAdd}
          value={addedProduct.SKU || ''}

          sx={styleField} className={style.inputs} />
        <TextField id="stock" label="Stock" name="stock" type="number" variant="outlined" required
          onChange={handleAdd}
          value={addedProduct.stock || ''}

          sx={styleField} className={style.inputs} />
        <TextField id="origin" label="Origin" name="origin" variant="outlined" required
          onChange={handleAdd}
          value={addedProduct.origin || ''}

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
              {
                option.label
              }
            </li>
          )}
        />
        <div className={displayVolume ? style.inputs : style.displayVolum}
        >


          <TextField id="volume" label="Volume" name="volume" type="number" variant="outlined" required
            value={addedProduct.volume || 0}
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

            value={addedProduct.brand ? getBrandLabelById(addedProduct.brand) : ""}

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
            value={addedProduct.model ? getModelLabelById(addedProduct.model) : ""}

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
            value={addedProduct.year ? getYearLabelById(addedProduct.year) : ""}
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
            backgroundColor: '#C62507',
            color: 'white',
            '&:hover': {
              backgroundColor: '#a5250e',
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
            backgroundColor: '#C62507',
            color: 'white',
            '&:hover': {
              backgroundColor: '#a5250e',
            },
          }}
          onClick={addProduct}
        >
          Add Product
        </Button>
      </div>

    </div>
  )

}

