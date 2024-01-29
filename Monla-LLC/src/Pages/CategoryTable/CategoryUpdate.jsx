import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Input } from '@mui/material';

const CategoryUpdate = ({ onClose, data }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
  });

  useEffect(()=>{
    if(data){
      console.log("category data ",data)
      setFormData({
        title:data.title || '',
        image:data.image
      })
    }
  },[])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  // useEffect(() => {
  //   setFormData({
  //     name: '',
  //     brandId: '', // Default value for brandId when adding a new model
  //   });
  // }, [allBrands]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend= new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("image", formData.image)

      const response = await axios.post(`http://localhost:5000/category/updateCategory/${category}`, formDataToSend);
      console.log('Model added:', response.data);

      // Close the form after successful add
      onClose();
    } catch (error) {
      console.error('Error adding category:', error.message);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#163357' }}>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth   
            margin="normal"
          />
            <FormControl fullWidth margin="normal">
          {/* <InputLabel>Add a Picture</InputLabel> */}
          <Input
            type="file"
            name="image"
            // onChange={handleImageChange}
            onChange={handleImageChange}
            fullWidth
            // margin="normal"
            sx={{backgroundImage:"grenn" ,border:"1px solid grey", height:"3.4rem",padding:"0.5rem"}}
          />
            {/* <InputLabel>Brand</InputLabel> */}
            {/* <Select
              name="brandId"
              value={formData.brandId || ''}
              onChange={handleChange}
              input={<Input />}
            >
              <MenuItem value="">Select a Brand</MenuItem>
              {allBrands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.brand}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
          >
            Add Model
          </Button>
          <Button
            
            variant="contained"
            onClick={onClose}
            style={{ backgroundColor: 'white', color: '#163357', marginTop: '10px' }}
          >
            Cancel
          </Button>
          </div>
        </form>
      </Box>
    </Dialog>
  );
};

export default CategoryUpdate;
