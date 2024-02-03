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

const YearForm = ({ year, onClose, allModels , fetchUpdatedData}) => {
    const [formData, setFormData] = useState({
        value: [],
        modelId: '',
    });

    useEffect(() => {
        if (year) {
            setFormData({
                value: year.value || [],
                modelId: year.modelId ? year.modelId._id || '' : '',
            });
        }
    }, [year]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'value' ? value.split(',').map(Number) : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/year/${year._id}`, formData);
            fetchUpdatedData();
            // Close the form after successful update
            onClose();
        } catch (error) {
            console.error('Error updating year:', error.response.data.error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <Dialog open={!!year} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Edit Year</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Value"
                        type="text"
                        name="value"
                        value={formData.value.join(', ')}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
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
                        Update Year
                    </Button>
                </form>
            </Box>
        </Dialog>
    );
};

export default YearForm;
