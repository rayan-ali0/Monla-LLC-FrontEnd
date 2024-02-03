// ShippingAddForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ShippingAddForm = ({ onClose,fetchUpdatedData }) => {
    const [formData, setFormData] = useState({
        location: '',
        message: '',
        cost: 0,
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
            const response = await axios.post('http://localhost:5000/shipping/create', formData);

            fetchUpdatedData();
            // Close the form after successful add
            onClose();
        } catch (error) {
            console.error('Error adding shipping:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Add Shipping</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter shipping location"
                    />

                    <TextField
                        label="Message"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter shipping message"
                    />

                    <TextField
                        label="Cost"
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter shipping cost"
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
                    >
                        Add Shipping
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default ShippingAddForm;
