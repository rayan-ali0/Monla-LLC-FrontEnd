// EditBrandForm.js
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

const EditBrandForm = ({ brand, onClose, allCategories }) => {
    const [formData, setFormData] = useState({
        brand: '',  // Change "name" to "brand"
        categoryId: '',
        image: null,
    });

    useEffect(() => {
        if (brand) {
            console.log('Brand data:', brand);
            setFormData({
                brand: brand.brand || '',  // Update to "brand" instead of "name"
                categoryId: brand.categoryId ? brand.categoryId._id || '' : '',
            });
        }
    }, [brand]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('brand', formData.brand);  // Update to "brand" instead of "name"
            formDataToSend.append('categoryId', formData.categoryId);
            formDataToSend.append('image', formData.image);

            const response = await axios.put(`http://localhost:5000/brand/updateBrand/${brand._id}`, formDataToSend);

            console.log('Brand updated:', response.data);

            // Close the form after successful update
            onClose();
        } catch (error) {
            console.error('Error updating brand:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <Dialog open={!!brand} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Edit Brand</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        name="brand"  // Update to "brand" instead of "name"
                        value={formData.brand}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="categoryId"
                            value={formData.categoryId || ''}
                            onChange={handleChange}
                            input={<Input />}
                        >
                            <MenuItem value="">Select a Category</MenuItem>
                            {allCategories && allCategories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Input for uploading a new image */}
                    <input
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
                    >
                        Update Brand
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default EditBrandForm;
