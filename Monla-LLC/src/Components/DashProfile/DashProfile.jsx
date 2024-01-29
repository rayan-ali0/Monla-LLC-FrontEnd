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
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    if (!formData.name) {
      toast.error("Please enter your name.");
      return;
    }
    if (!nameRegex.test(formData.name)) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!formData.email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validate new password
    if (!newPassword) {
      toast.error("Enter your new password.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      toast.error("New password should be at least 8 characters.");
      return;
    }

    if (!verifyPassword) {
      toast.error("Enter your verfiy password.");
      return;
    }

    if (!passwordRegex.test(verifyPassword)) {
      toast.error("Verfiy password should be at least 8 characters.");
      return;
    }

    if (newPassword !== verifyPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    console.log("newPassword", newPassword);
    console.log("verifyPassword", verifyPassword);
    console.log("formData.password",formData.password);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/user/${user._id}`,
        { ...formData, password: newPassword }
      );
      if (response.data) {
        console.log("response.data indside the put that will set in the user: ", response.data);
        setUser(response.data);
        toast.success("Data updated successfully!");
        setNewPassword("");
        setVerifyPassword("");
        setUserUpdated(true);
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating user data.");
    }
  };

  useEffect(() => {
    const updateUserInContext = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND}/logged-in-user`,
          { withCredentials: true }
        );
        console.log("response.data.user inside the new function: ", response.data.user)
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    updateUserInContext(); // Call this function immediately after the component renders

    // Use the cleanup function to run this after the component unmounts
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
          />
        </div>

        {/* Old Password check */}
        {/* <div className={style.input}>
          <label htmlFor="oldPassword" className={style.label}>
            Old Password:
          </label>
          <input
            type={showPassword1 ? "text" : "password"}
            name="password"
            id="oldPassword"
            value={formData.password}
            onChange={handleInputChange}
          />
          <img
            src={showPassword1 ? hide : eye}
            className={style.icon}
            alt="Hide and Show an Eye"
            onClick={() => setShowPassword1(!showPassword1)}
          />
        </div> */}

        {/* New Password */}
        <div className={style.input}>
          <label htmlFor="newPassword" className={style.label}>
            New Password
          </label>
          <input
            type={showPassword1 ? "text" : "password"}
            name="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <img
            src={showPassword1 ? hide : eye}
            className={style.icon}
            alt="Hide and Show an Eye"
            onClick={() => setShowPassword1(!showPassword1)}
          />
        </div>

        {/* Verify Password */}
        <div className={style.input}>
          <label htmlFor="verifyPassword" className={style.label}>
            Verify Password
          </label>
          <input
            type={showPassword2 ? "text" : "password"}
            name="verifyPassword"
            id="verifyPassword"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
          <img
            src={showPassword2 ? hide : eye}
            className={style.icon}
            alt="Hide and Show an Eye"
            onClick={() => setShowPassword2(!showPassword2)}
          />
        </div>

        <div className={style.buttons}>
          <button type="reset" className={style.reset}>
            Reset
          </button>
          <button type="submit" className={style.submit}>
            Update Info
          </button>
        </div>
      </form>
    </main>
  );
};

export default DashProfile;
