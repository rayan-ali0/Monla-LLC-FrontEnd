import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditBrandForm = ({ brand, onClose,fetchUpdatedData }) => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
    });

    useEffect(() => {
        if (brand) {
            setFormData({
                name: brand.brand || '', // Use "brand" property for the name
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
            formDataToSend.append('brand', formData.name); // Use "brand" property for the name
            formDataToSend.append('image', formData.image);

            const response = await axios.put(`http://localhost:5000/brand/${brand._id}`, formDataToSend);
                  // Fetch updated data after successful addition
      fetchUpdatedData();




            onClose();
        } catch (error) {
            console.error('Error updating brand:', error.response.data.error);
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

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
