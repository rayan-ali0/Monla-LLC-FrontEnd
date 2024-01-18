import { React, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import OAuth from "../../OAuth/OAuth";
import eye from "../../assets/icons/eye.png";
import hide from "../../assets/icons/hide.png";
import { UserContext } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { user, setUser, fetchUserData } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Regex validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  const visiblePassword = () => {
    setShowPassword(!showPassword);
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
    if (!formData.email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password should be at least 8 characters.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/login`,
        formData,
        { withCredentials: true }
      );
      if (response.data) {
        await fetchUserData();
        toast.success("Login successfully");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Incorrect email or password");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In - Monla LLC</title>
        <meta
          name="description"
          content="Securely sign in to your Monla account. Access personalized features and services designed for you. Log in now to enjoy a seamless experience!"
        />
        <meta name="keywords" content="sign in, login, user authentication" />
      </Helmet>
      <main className={styles.main}>
        <div className={styles.content__wrapper}>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.logo}>
                {/* <img src={eye} alt="" /> */}
              </div>
              <h1 className={styles.title}>Log in</h1>
              <p className={styles.slogan}>Enter your infomation to login.</p>
            </div>
            <form
              onSubmit={handleSubmit}
              action=""
              className={styles.form}
              encType="multipart/form-data">
              <div className={styles.input__wrapper}>
                <label htmlFor="em">Email*</label>
                <input
                  type="email"
                  id="em"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={`${styles.input__wrapper} ${styles.pass__input}`}>
                <label htmlFor="pass">Password*</label>
                <input
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
                <img
                  src={showPassword ? hide : eye}
                  className={styles.icon}
                  alt="Hide and Show an Eye"
                  onClick={visiblePassword}
                />
              </div>
              <input
                type="submit"
                value={"Log in"}
                className={styles.submit__button}
                onClick={handleSubmit}
              />
              <div className={styles.signup__text}>
                Don't have an account?
                <Link to={"/signup"} className={styles.signup__link}>
                  Sign up
                </Link>
              </div>
              <div className={styles.or__hr}>
                <hr />
                <span className={styles.or__wrapper}>or</span>
              </div>
              <div className={styles.oauth}>
                <OAuth signup={false} />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
