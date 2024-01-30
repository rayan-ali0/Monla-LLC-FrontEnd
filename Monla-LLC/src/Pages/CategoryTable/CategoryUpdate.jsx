// EditCategoryForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Input } from '@mui/material';

const UpdateCategory = ({ category, onClose ,data}) => {
    const [formData, setFormData] = useState({
        title: '',
        image: null,
    });

    useEffect(() => {
        if (category) {
            // console.log('Category data:', category);
            setFormData({
                title: category.title || '',
            });
        }
    }, [category]);

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
            formDataToSend.append('title', formData.title);
            formDataToSend.append('image', formData.image);

            const response = await axios.put(`http://localhost:5000/category/updateCategory/${category._id}`, formDataToSend);

            console.log('Category updated:', response.data);

            // Close the form after successful update
            onClose();
        } catch (error) {
            console.error('Error updating category:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <Dialog open={!!category} onClose={onClose}>
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
                        Update Category
                    </Button>
                    <Button
            
            variant="contained"
            onClick={onClose}
            style={{ backgroundColor: 'white', color: '#163357', marginTop: '10px' }}
          >
            Cancel
          </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default UpdateCategory;