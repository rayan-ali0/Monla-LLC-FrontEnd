import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import style from '../../Components/DashProfile/DashProfile.module.css'

const CompanyInfo = () => {

  const [isloading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [formData, setFromData] = useState({
    name: "",
    email: "",
    number: "",
    whatsapp: "",
    location: "",
    facebook: ""
  });

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_PATH}/company/`)
        console.log(response);
        setRows(response.data);
        setIsLoading(false);
        response.data ? setFromData({
          name: rows[0].name,
          email: rows[0].email,
          number: rows[0].number,
          whatsapp: rows[0].whatsapp,
          location: rows[0].location,
          facebook: rows[0].facebook
      }) : console.error("Error")
      }
      catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchCompanyInfo()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFromData({
        ...formData,
        [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_PATH}/company/${rows[0]._id}`, formData)
        console.log("Company Info edited:", response.data)
        window.location.reload()
        onClose()
    }
    catch (error) {
        console.error("Error editing company info:", error.response.data.error);
      }
  }

  return (
    <main className={style.main}>
      <form
        className={style.form}
        encType="multipart/form-data"
        onSubmit={handleSubmit}>
        {/* Display existing user info */}
        <div className={style.input}>
          <label htmlFor="nameLabel" className={style.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="nameLabel"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.input}>
          <label htmlFor="emailLabel" className={style.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="emailLabel"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.input}>
          <label htmlFor="numberLabel" className={style.label}>
            Number
          </label>
          <input
            type="number"
            name="number"
            id="numberLabel"
            value={formData.number}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.input}>
          <label htmlFor="whatsappLabel" className={style.label}>
            Whatsapp
          </label>
          <input
            type="text"
            name="whatsapp"
            id="whatsappLabel"
            value={formData.whatsapp}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.input}>
          <label htmlFor="locationLabel" className={style.label}>
            Location
          </label>
          <input
            type="text"
            name="location"
            id="locationLabel"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.input}>
          <label htmlFor="facebookLabel" className={style.label}>
            Facebook
          </label>
          <input
            type="text"
            name="facebook"
            id="facebookLabel"
            value={formData.facebook}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.buttons}>
          <button type="submit" className={style.submit}>
            Update Info
          </button>
        </div>
      </form>
    </main>
  )
}

export default CompanyInfo