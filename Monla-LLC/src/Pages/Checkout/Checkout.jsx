import React, { useState, useEffect, useContext } from "react";
import styles from "./Checkout.module.css";
import axios from "axios";
import Summary from "../../Components/orderSummary/Summary.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";

const Checkout = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const [locationBoolean, setLocationBoolean] = useState(false);
console.log(user)
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    address: "",
    status: "pending",
    total: 0,
    shippingId: "",
    productsOrdered: [],
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

  useEffect(() => {
    let totalPrice = Number(0);
    let arr = [];
    let idsArr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const product = JSON.parse(localStorage.key(i));
      const quantityValue = localStorage.getItem(localStorage.key(i));
      totalPrice += product.price * quantityValue;
      arr.push(product);
      idsArr.push({ productId: product._id, quantity: quantityValue });
    }

    setFormData({ 
      ...formData, 
      productsOrdered: idsArr,
      total: totalPrice
    });
  }, []);

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const selectedLocationObject = data.find(
      (location) => location._id === selectedId
    );
    console.log(formData);
    setFormData({
      ...formData,
      shippingId: selectedId,
    });

    if (selectedLocationObject) {
      setLocationBoolean(true);
      setSelectedLocation(selectedLocationObject);
    } else {
      setSelectedLocation(null);
    }
  };

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
    if (!formData.userName) {
      toast.error("Please enter your name.");
      return;
    }
    if (!nameRegex.test(formData.userName)) {
      toast.error("Please enter a valid name.");
      return;
    }
    /* ---- */
    if (!formData.userEmail) {
      toast.error("Please enter your email.");
      return;
    }
    if (!emailRegex.test(formData.userEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    /* ---- */
    if (!formData.userPhone) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!phoneRegex.test(formData.userPhone)) {
      toast.error("Invalid Phone number.");
      return;
    }
    /* ---- */
    if (!locationBoolean) {
      toast.error("Please select your location.");
      return;
    }
    /* ---- */
    if (!formData.address) {
      toast.error("Please enter your address.");
      return;
    }
    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/order/create`,
        formData
      );
      if (response.data) {
        toast.success("Order created successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
      localStorage.clear();
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
                      name="userName"
                      id="na"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className={styles.email}>
                    <label htmlFor="na">Email*</label>
                    <input
                      type="email"
                      name="userEmail"
                      value={formData.userEmail}
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
                      name="userPhone"
                      pattern="[0-9]{8}"
                      value={formData.userPhone}
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
