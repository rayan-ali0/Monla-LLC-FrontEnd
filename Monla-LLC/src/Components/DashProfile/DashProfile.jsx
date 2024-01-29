import { React, useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext/UserContext.jsx";
import style from "./DashProfile.module.css";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
import eye from "../../assets/icons/eye.png";
import hide from "../../assets/icons/hide.png";

const DashProfile = () => {
  const { user, setUser, setUserUpdated } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    oldPasswordInput: '',
  });

  const nameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex = /^.{8,}$/;

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
if (formData.name && !nameRegex.test(formData.name)) {
  toast.error("Please enter a valid name.");
  return;
}

// Validate new password
if (newPassword || verifyPassword) {
  if (!newPassword) {
    toast.error("Enter your new password.");
    return;
  }

  if (!passwordRegex.test(newPassword)) {
    toast.error("New password should be at least 8 characters.");
    return;
  }

  if (!verifyPassword) {
    toast.error("Enter your verify password.");
    return;
  }

  if (!passwordRegex.test(verifyPassword)) {
    toast.error("Verify password should be at least 8 characters.");
    return;
  }

  if (newPassword !== verifyPassword) {
    toast.error("Passwords do not match.");
    return;
  }
}

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/user/${user._id}`,
        { ...formData, password: newPassword },
        { withCredentials: true }
      );
      if (response.data) {
        setUser(response.data);
        toast.success("Data updated successfully!");
        setNewPassword("");
        setVerifyPassword("");
        setUserUpdated(true);
      }
    } catch (error) {
      if(error.response.status === 401) {
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
    <main className={style.main}>
      <form
        className={style.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data">
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
            readOnly
          />
        </div>

        {/* Old Password check */}
        <div className={style.input}>
          <label htmlFor="oldPasswordInput" className={style.label}>
            Old Password:
          </label>
          <input
            type={showPassword1 ? "text" : "password"}
            name="oldPasswordInput"
            id="oldPasswordInput"
            value={formData.oldPasswordInput}
            onChange={handleInputChange}
          />
          <img
            src={showPassword1 ? hide : eye}
            className={style.icon}
            alt="Hide and Show an Eye"
            onClick={() => setShowPassword1(!showPassword1)}
          />
        </div>

        {/* New Password */}
        <div className={style.input}>
          <label htmlFor="newPassword" className={style.label}>
            New Password
          </label>
          <input
            type={showPassword2 ? "text" : "password"}
            name="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <img
            src={showPassword2 ? hide : eye}
            className={style.icon}
            alt="Hide and Show an Eye"
            onClick={() => setShowPassword2(!showPassword2)}
          />
        </div>

        {/* Verify Password */}
        <div className={style.input}>
          <label htmlFor="verifyPassword" className={style.label}>
            Verify Password
          </label>
          <input
            type={showPassword3 ? "text" : "password"}
            name="verifyPassword"
            id="verifyPassword"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
          <img
            src={showPassword3 ? hide : eye}
            className={style.icon}
            alt="Hide and Show an Eye"
            onClick={() => setShowPassword3(!showPassword3)}
          />
        </div>

        <div className={style.buttons}>
          <button type="submit" className={style.submit}>
            Update Info
          </button>
        </div>
      </form>
    </main>
  );
};

export default DashProfile;
