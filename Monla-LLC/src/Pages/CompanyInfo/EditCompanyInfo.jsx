import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditCompanyInfo = ({ company, onClose }) => {

    const [formData, setFromData] = useState({
        name: "",
        email: "",
        number: "",
        whatsapp: "",
        location: "",
        facebook: "",
        instagram: "",
        tiktok: "",
      });

      useEffect(() => {
        company ? setFromData({
            name: company.name,
            email: company.email,
            number: company.number,
            whatsapp: company.whatsapp,
            location: company.location,
            facebook: company.facebook,
            instagram: company.instagram,
            tiktok: company.tiktok
        }) : console.error("Error")
      }, [company])

      const handleChange = (e) => {
        const { name, value } = e.target
        setFromData({
            ...formData,
            [name]: value
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_PATH}/company/${company._id}`, formData)
            console.log("Company Info edited:", response.data)
            window.location.reload()
            onClose()
        }
        catch (error) {
            console.error("Error editing company info:", error.response.data.error);
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
        <h2 style={{ color: "#163357" }}>Add Company Info</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company name"
          />

          <TextField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company email"
          />

          <TextField
            label="Number"
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company number"
          />

          <TextField
            label="Whatsapp"
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company whatsapp"
          />

          <TextField
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company location"
          />

          <TextField
            label="Facebook"
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company facebook"
          />

          <TextField
            label="Instagram"
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company instagram"
          />

          <TextField
            label="Tiktok"
            type="text"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter company tiktok"
          />

          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#163357",
              color: "white",
              marginTop: "10px",
            }}
          >
            Edit Company Info
          </Button>
        </form>
      </Box>
    </Dialog>
  )
}

export default EditCompanyInfo