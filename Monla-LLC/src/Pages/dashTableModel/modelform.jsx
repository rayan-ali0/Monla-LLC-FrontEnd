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

const ModelForm = ({ model, onClose, allBrands,fetchUpdatedData }) => {
  const [formData, setFormData] = useState({
    name: '',
    brandId: '',
  });

  useEffect(() => {
    if (model) {
      setFormData({
        name: model.name || '',
        brandId: model.brandId ? model.brandId._id || '' : '',
      });
    }
  }, [model]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/model/${model._id}`, formData);
      fetchUpdatedData();
      // Close the form after successful update
      onClose();
    } catch (error) {
      console.error('Error updating model:', error.response.data.error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Dialog open={!!model} onClose={onClose}>
      <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#163357' }}>Edit Model</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Brand</InputLabel>
            <Select
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
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
          >
            Update Model
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default ModelForm;
