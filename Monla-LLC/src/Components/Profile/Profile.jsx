import React, { useState, useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import editIcon from "../../assets/icons/editing (2).png";
import { UserContext } from "../../UserContext/UserContext.jsx";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";

import axios from "axios";

const Profile = () => {
  const { user, setUser, setUserUpdated } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    oldPasswordInput: "",
  });

  const nameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex = /^.{8,}$/;
  const numberRegex = /^\d{8}$/;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    setEditLoading(true);
    event.preventDefault();

    // Validate the form fields
    if (formData.name && !nameRegex.test(formData.name)) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (formData.number && !numberRegex.test(formData.number)) {
      toast.error("Please enter a valid name.");
      return;
    }

    // Validate old password if it's provided
    if (
      formData.oldPasswordInput &&
      !passwordRegex.test(formData.oldPasswordInput)
    ) {
      toast.error("Old password should be at least 8 characters.");
      return;
    }

    // Validate new password and verify password
    if (formData.password !== "" || verifyPassword !== "") {
      console.log(formData.password);
      if (formData.password == "") {
        toast.error("Enter your new password.");
        return;
      }

      if (!passwordRegex.test(formData.password)) {
        toast.error("New password should be at least 8 characters.");
        return;
      }

      if (verifyPassword === "") {
        toast.error("Enter your verify password.");
        return;
      }

      if (!passwordRegex.test(verifyPassword)) {
        toast.error("Verify password should be at least 8 characters.");
        return;
      }

      if (formData.password !== verifyPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/user/${user._id}`,
        formData,
        { withCredentials: true }
      );
      if (response.data) {
        setUser(response.data);
        setVerifyPassword("");
        setUserUpdated(true);
        setEditLoading(false);
        toast.success("Data updated successfully!");
      }
    } catch (error) {
      setEditLoading(false);
      if (error.response.status === 401) {
        toast.error("Your old password is not correct.");
      } else {
        console.error(error);
        toast.error("Error updating user data.");
      }
    }
  };

  useEffect(() => {
    const updateUserInContext = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND}/logged-in-user`,
          { withCredentials: true }
        );
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    updateUserInContext();

    return () => {
      updateUserInContext();
    };
  }, [setUser]);

  return (
    <div className={`container ${styles.profilePage}`}>
      <div className={styles.related__ItemP}>
        <div className={styles.backgroundP}></div>
        <h2 className={styles.titleP}>My Profile</h2>
      </div>
      <div className={styles.profileContainer}>
        {user ? (
          <>
            <div className={styles.inputHolder}>
              <label className={styles.field}>
                <span className={styles.labelText}>Name</span>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  autoFocus
                  className={styles.textField}
                  defaultValue={user.name ? user.name : "N/A"}
                />
              </label>
            </div>

            <div className={styles.inputHolder}>
              <label className={styles.field}>
                <span className={styles.labelText}>Email</span>
                <input
                  type="email"
                  onChange={handleInputChange}
                  autoFocus
                  className={styles.textField}
                  name="email"
                  defaultValue={user.email}
                />
              </label>
            </div>

            <div className={styles.inputHolder}>
              <label className={styles.field}>
                <span className={styles.labelText}>Phone</span>
                <input
                  type="text"
                  onChange={handleInputChange}
                  autoFocus
                  className={styles.textField}
                  name="number"
                  defaultValue={user.number ? user.number : "N/A"}
                />
              </label>
            </div>

            <div className={`${styles.addressField}`}>
              <label className={styles.field}>
                <span className={styles.labelText}>Address</span>
                <input
                  type="textarea"
                  onChange={handleInputChange}
                  className={`${styles.textField} ${styles.fieldWidth}`}
                  name="address"
                  defaultValue={user.address ? user.address : "N/A"}
                />
              </label>
            </div>

            {/* Old Password check */}
            <div className={styles.inputHolder}>
              <label htmlFor="oldPasswordInput" className={styles.field}>
                <span className={styles.labelText}>Old Password</span>
                <input
                  type="password"
                  name="oldPasswordInput"
                  id="oldPasswordInput"
                  onChange={handleInputChange}
                  className={styles.textField}
                />
              </label>
            </div>

            {/* New Password */}
            <div className={styles.inputHolder}>
              <label htmlFor="newPassword" className={styles.field}>
                <span className={styles.labelText}>New Password</span>
                <input
                  type="password"
                  name="password"
                  id="newPassword"
                //   onChange={handleInputChange}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className={styles.textField}
                />
              </label>
            </div>

            {/* Verify Password */}
            <div className={styles.inputHolder}>
              <label htmlFor="verifyPassword" className={styles.field}>
                <span className={styles.labelText}>Verify Password</span>
                <input
                  type="password"
                  name="verifyPassword"
                  id="verifyPassword"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className={styles.textField}
                />
              </label>
            </div>

            <div className={`${styles.inputHolder} ${styles.btnHolder}`}>
              <span onClick={handleSubmit} className={styles.editBtn}>
                <img src={editIcon} className={styles.editPng} />{" "}
                <span style={{marginTop: "3px"}}>{editLoading ? "loading" : "Edit"} </span>
              </span>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
