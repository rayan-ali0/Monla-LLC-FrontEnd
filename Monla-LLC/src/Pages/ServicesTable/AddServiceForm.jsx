// ServiceAddForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ServiceAddForm = ({ onClose ,fetchUpdatedData}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
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
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);

            const response = await axios.post('http://localhost:5000/service/create', formDataToSend);

            fetchUpdatedData();
            // Close the form after successful add
            onClose();
        } catch (error) {
            console.error('Error adding service:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Add Service</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter service title"
                    />

                    <TextField
                        label="Description"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter service description"
                        inputProps={{
                            maxLength: 500,
                        }}
                        multiline
                        rows={4}
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
                        Add Service
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default ServiceAddForm;
