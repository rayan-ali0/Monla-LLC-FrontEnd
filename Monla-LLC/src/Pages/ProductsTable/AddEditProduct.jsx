import React, { useState } from 'react'
import style from './addProduct.module.css'
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddEditProduct() {


const styleField={
    '& .MuiOutlinedInput-root': {
      borderColor: 'white !important', // Default border color
      color:"white",
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
        borderColor: 'white !important',
      },
      '& .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
        borderColor: 'white !important',
      },
      '& .MuiInputLabel-root': {
        color: 'white !important'
      },
    },
      '& .MuiInputLabel-root': {
        color: 'white', // Set desired label color here
        borderColor:'white'
      },
  
    
  }

  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderColor: "white",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
      },
    },
    "& .MuiSelect-select": {
    //   backgroundColor: "white",
      color: "white", // adjust as needed
    },
    "& .MuiSelect-icon": {
      color: "white", // adjust as needed
    },
    "& .MuiSelect-nativeInput": {
      color: "white", // adjust as needed
      backgroundColor: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    "& .MuiSelect-selectMenu": {
      backgroundColor: "white",
    },
    "& .MuiMenuItem-root": {
      color: "white", // adjust as needed
      backgroundColor: "white !important",
    },
    "& .MuiMenuItem-root:hover": {
    //   backgroundColor: "rgba(255, 255, 255, 0.8)", // add hover effect
    borderColor:"white !important",
    backgroundColor:'white'
    },
    '& .MuiOutlinedInput-root': {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white !important' ,
        },
      },
  }
    return (
        <div className={style.addProductPage}>
            <TextField id="name" label="Your Name" name="Name"  variant="outlined"  required   sx={styleField}
/>
<FormControl>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        sx={selectStyle}  
      >
        <MenuItem value="" disabled>
          Select an option
        </MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>

        </div>
    )


}