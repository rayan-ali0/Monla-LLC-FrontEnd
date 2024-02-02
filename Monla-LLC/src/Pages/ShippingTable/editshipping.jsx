// EditShippingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField'; 

const EditShippingForm = ({ shipping, onClose ,fetchUpdatedData}) => {
    const [formData, setFormData] = useState({
        location: '',
        message: '',
        cost: 0,
    });

    useEffect(() => {
        if (shipping) {
            console.log('Shipping data:', shipping);
            setFormData({
                location: shipping.location || '',
                message: shipping.message || '',
                cost: shipping.cost || 0,
            });
        }
    }, [shipping]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:5000/shipping/${shipping._id}`, formData);
    
            console.log('Shipping updated:', response.data);
            fetchUpdatedData();
            // Close the form after successful update
            onClose();
        } catch (error) {
            console.error('Error updating shipping:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };
    

    return (
        <Dialog open={!!shipping} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Edit Shipping</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    {/* Use TextareaAutosize for the message */}
                    <TextareaAutosize
                        minRows={3}
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '80px', marginTop: '10px', padding: '8px', fontSize: '16px' }}
                    />

                    {/* Input for cost */}
                    <TextField
                        label="Cost"
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
                    >
                        Update Shipping
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default EditShippingForm;
