// EditServiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  // Add this import


const EditServiceForm = ({ service, onClose ,fetchUpdatedData}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    useEffect(() => {
        if (service) {
            setFormData({
                title: service.title || '',
                description: service.description || '',
            });
        }
    }, [service]);

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
            formDataToSend.append('id', service._id);  // Add the service id to the form data
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);
    
            const response = await axios.put('http://localhost:5000/service/update', formDataToSend);
    
            fetchUpdatedData();
            // Close the form after successful update
            onClose();
        } catch (error) {
            console.error('Error updating service:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };
    

    return (
        <Dialog open={!!service} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Edit Service</h2>
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

              
                      <TextField
                        label="Description"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        style={{ width: '100%', minHeight: '80px', marginTop: '10px', padding: '8px', fontSize: '16px' }}
                        margin="normal"
                        placeholder="Description"
                        inputProps={{
                            maxLength: 500,
                        }}
                        multiline
                        rows={5}
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
                        Update Service
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default EditServiceForm;
