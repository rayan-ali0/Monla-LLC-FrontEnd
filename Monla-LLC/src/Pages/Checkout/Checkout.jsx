import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import axios from "axios";
import Summary from "../../Components/orderSummary/Summary.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
  });

  // Regex validations
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{8,}$/;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/shipping/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const selectedLocationObject = data.find(
      (location) => location._id === selectedId
    );

    if (selectedLocationObject) {
      const locationInformData = selectedLocationObject.location;
      setFormData({
        ...formData,
        location: locationInformData,
      });
      setSelectedLocation(selectedLocationObject);
    } else {
      setFormData({
        ...formData,
        location: null,
      });
      setSelectedLocation(null);
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form fields
    if (!formData.name) {
      toast.error("Please enter your name.");
      return;
    }
    if (!nameRegex.test(formData.name)) {
      toast.error("Please enter a valid name.");
      return;
    }
    /* ---- */
    if (!formData.email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    /* ---- */
    if (!formData.phone) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid Phone number.");
      return;
    }
    /* ---- */
    if (formData.location == null) {
      toast.error("Please select your location.");
      return;
    }
    /* ---- */
    if (!formData.address) {
      toast.error("Please enter your address.");
      return;
    }
    console.log(formData)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/order/create`,
        formData
      );

      if (response.data) {
        setUser(response.data)
        toast.success("Order created successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      toast.error("Error while create your order.");
      console.error("Error:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.checkout__Wrapper}>
          <div className={styles.checkout}>
            <div className={styles.background}></div>
            <h2 className={styles.title}>Checkout</h2>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.form__area}>
            <h2 className={styles.title}>Shipping Details</h2>
            <div className={styles.form__wrapper}>
              <form
                className={styles.form}
                action=""
                onSubmit={handleSubmit}
                encType="multipart/form-data">
                <div className={styles.inputs}>
                  <div className={styles.name}>
                    <label htmlFor="na">Name*</label>
                    <input
                      type="text"
                      name="name"
                      id="na"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className={styles.email}>
                    <label htmlFor="na">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      id="em"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className={styles.inputs}>
                  <div className={styles.phone}>
                    <label htmlFor="ph">Phone*</label>
                    <input
                      type="tel"
                      id="ph"
                      name="phone"
                      pattern="[0-9]{8}"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className={styles.location}>
                    <label htmlFor="dropdown">Location*</label>
                    <select
                      name="location"
                      id="dropdown"
                      className={styles.dropdown}
                      value={selectedLocation ? selectedLocation._id : ""}
                      onChange={handleLocationChange}>
                      <option value="">Select location</option>
                      {data.map((location) => (
                        <option
                          key={location._id}
                          value={location._id}
                          className={styles.option}>
                          {location.location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedLocation && (
                  <section className={styles.message__wrapper}>
                    <p className={styles.message}>
                      {selectedLocation.message} And the associated cost is $
                      {selectedLocation.cost}
                    </p>
                  </section>
                )}
                <div className={styles.inputs}>
                  <div className={styles.address}>
                    <label htmlFor="add">Street address*</label>
                    <textarea
                      name="address"
                      id="add"
                      cols="30"
                      rows="10"
                      className={styles.address__input}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Detailed address"></textarea>
                  </div>
                </div>
                <div className={styles.confirm__order}>
                  <input
                    type="submit"
                    value="Confirm Order"
                    className={styles.confirm}
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className={styles.order__summary}>
            <Summary />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Checkout;
