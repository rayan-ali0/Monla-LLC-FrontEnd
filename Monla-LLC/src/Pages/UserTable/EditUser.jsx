import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const EditUser = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    role: "",
  });

  useEffect(() => {
    user ? setFormData({ role: user.role || "" }) : console.error("Error");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_PATH}/user/${user._id}`,
        formData
      );
      window.location.reload()
      onClose()
    } catch (error) {
      console.error("Error editing user:", error.response.data.error);
    }
  };

  return (
    <Dialog open={!!user} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          width: 400,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#163357" }}>Edit User</h2>
        <form onSubmit={handleSubmit}>
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
              <MenuItem value={"admin"}>admin</MenuItem>
              <MenuItem value={"user"}>user</MenuItem>
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
            Update User
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default EditUser;
