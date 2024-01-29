import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddUser = ({ onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: null,
    address: '',
    password: '',
    role: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name] : value
    })
  }

  

  return (
    <div>AddUser</div>
  )
}

export default AddUser