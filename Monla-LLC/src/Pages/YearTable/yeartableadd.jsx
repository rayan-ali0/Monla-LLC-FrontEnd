// YearAddForm.js
import React, { useState } from 'react';
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

const YearAddForm = ({ onClose, allModels, fetchUpdatedData }) => {
    const [formData, setFormData] = useState({
      value: '',  // This should be a string to hold the input value
      modelId: '',
    });
  
    const handleChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Convert the value to the desired format before sending it to the server
        const formattedValue = formData.value
          .split('-')
          .map((year) => parseInt(year.trim(), 10))
          .filter((year) => !isNaN(year));
  
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/create`, {
          ...formData,
          value: formattedValue,
        });
  
        fetchUpdatedData();
        onClose();
      } catch (error) {
        console.error('Error adding year:', error.response.data.error);
        // Handle error (show error message, etc.)
      }
    };
  
    return (
      <Dialog open={true} onClose={onClose}>
        <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ color: '#163357' }}>Add Year</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Value"
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="e.g., 2023-2024"
            />

          <FormControl fullWidth margin="normal">
            <InputLabel>Model</InputLabel>
            <Select
              name="modelId"
              value={formData.modelId || ''}
              onChange={handleChange}
              input={<Input />}
            >
              <MenuItem value="">Select a Model</MenuItem>
              {allModels.map((model) => (
                <MenuItem key={model._id} value={model._id}>
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
          >
            Add Year
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default YearAddForm;
