import React, { useState, useEffect, useContext } from "react";
import styles from "./Checkout.module.css";
import axios from "axios";
import Summary from "../../Components/orderSummary/Summary.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const [locationBoolean, setLocationBoolean] = useState(false);
  const [shippingCost, setShippingCost] = useState(0)

  const [arr, setArr] = useState([]);
  const [idsArr, setIdsArr] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);

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
    let dataArr = [];
    let idsArr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const product = JSON.parse(localStorage.key(i));
      const quantityValue = localStorage.getItem(localStorage.key(i));
      totalPrice += product.price * quantityValue;
      dataArr.push(product);
      idsArr.push({ productId: product._id, quantity: quantityValue });
    }

    setFormData({
      ...formData,
      productsOrdered: idsArr,
      total: totalPrice,
    });
    setArr(dataArr);
    setIdsArr(idsArr);
    setTotalPrice(totalPrice);
  }, [localStorage]);

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const selectedLocationObject = data.find(
      (location) => location._id === selectedId,
    );
    setFormData({
      ...formData,
      shippingId: selectedId,
    });

    if (selectedLocationObject) {
      setLocationBoolean(true);
      setSelectedLocation(selectedLocationObject);
      setShippingCost(selectedLocationObject.cost)
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/order/create`,
        formData
      );
      if (response.data) {
        toast.success("Order created successfully!");
        setTimeout(() => {
          navigate("/confirmed", {
            state: {
              orderNumber: response.data.Order.orderNumber,
              dateOfOrder: response.data.Order.createdAt,
            },
          });
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
      <Helmet>
        <title>Checkout - Monla</title>
        <meta
          name="description"
          content="Complete your order seamlessly by providing your shipping details, contact information, and preferred payment method. Enjoy a hassle-free transaction as you confirm your purchase and get ready to receive your high-quality products. Shop confidently with our straightforward checkout, making online shopping a breeze."
        />
        <meta name="keywords" content="checkout, order, products, payment" />
      </Helmet>
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
          <Summary products={arr} totalPrice={totalPrice} shipping={shippingCost} idsArr={idsArr}/>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Checkout;
