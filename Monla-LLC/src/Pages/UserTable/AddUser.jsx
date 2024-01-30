import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AddUser = ({ onClose, onCreation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: 0,
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PATH}/user/register`, formData
      )
      console.log("User added:", response.data)
      window.location.reload()
      onClose()
    } catch (error) {
      console.error("Error adding user:", error.response.data.error)
    }
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          width: 400,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#163357" }}>Add User</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter user name"
          />

          <TextField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter user email"
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter user password"
          />

          <TextField
            label="Number"
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter user number"
          />

          <TextField
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter user address"
          />

          <FormControl fullWidth>
            <InputLabel id="roleLabel">Role</InputLabel>
            <Select
              name="role"
              label="Role"
              value={formData.role}
              onChange={handleChange}
              labelId="roleLabel"
              fullWidth
            >
              <MenuItem value={"admin"}>
                admin
              </MenuItem>
              <MenuItem value={"user"}>
                user
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#163357",
              color: "white",
              marginTop: "10px",
            }}
          >
            Add User
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddUser;
