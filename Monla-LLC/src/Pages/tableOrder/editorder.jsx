import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Input } from '@mui/material';

const EditOrderForm = ({ order, onClose }) => {
    const [formData, setFormData] = useState({
        status: order.status || '',
    });

    useEffect(() => {
        if (order) {
            console.log('Order data:', order);
            setFormData({
                status: order.status || '',
            });
        }
    }, [order]);

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
            const response = await axios.put(`http://localhost:5000/order/update/${order._id}`, {
                status: formData.status,
            });

            console.log('Order updated:', response.data);

            // Close the form after successful update
            onClose();
        } catch (error) {
            console.error('Error updating order:', error.response.data.message);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <Dialog open={!!order} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Edit Order</h2>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            input={<Input />}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="sent">Sent</MenuItem>
                            <MenuItem value="accepted">Accepted</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        type="submit"
                        style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
                    >
                        Update Order
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default EditOrderForm;
