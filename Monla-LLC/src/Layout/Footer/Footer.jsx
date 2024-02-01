import React, { useState, useEffect } from "react";
import style from "./Footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import DashProfile from "../../Components/DashProfile/DashProfile";
import Register from "../../Pages/Login/Login";
import Cart from "../../Pages/CartPage/Cart";
import Products from "../../Pages/Products/Products";
import Services from "../../Pages/Services/Services";
import AboutUs from "../../Pages/Aboutus/Aboutus";
import ContactUs from "../../Pages/Contact/ContactUs";

const Footer = () => {
  const [isloading, setIsLoading] = useState(true);
  const [companyInfos, setCompanyInfos] = useState([]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_PATH}/company/`
        );
        console.log(response);
        setCompanyInfos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCompanyInfo();
  }, []);

  return (
    <footer className={style.footerContainer}>
      <div className={style.footerContainerElements}>
        <div className={style.footerElement}>
          <h2 className={style.footerTitleLogo}>MONLA</h2>
          <p className={style.footerTitleContent}>Logo</p>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Support</h2>
          <p
            className={`${style.footerElementContent} ${style.footerElementContentFirst}`}
          >
            {companyInfos[0].location}
          </p>
          <p className={style.footerElementContent}>{companyInfos[0].email}</p>
          <p className={style.footerElementContent}>{companyInfos[0].number}</p>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Account</h2>
          <Link
            className={`${style.footerElementContent} ${style.footerElementContentFirst}`}
            to={DashProfile}
          >
            My Account
          </Link>
          <Link className={style.footerElementContent} to={Register}>
            LogiRegister
          </Link>
          <Link className={style.footerElementContent} to={Cart}>
            Cart
          </Link>
          <Link className={style.footerElementContent} to={Products}>
            Shop
          </Link>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Quick Links</h2>
          <Link
            className={`${style.footerElementContent} ${style.footerElementContentFirst}`}
            to={Services}
          >
            Services
          </Link>
          <Link className={style.footerElementContent} to={AboutUs}>
            About us
          </Link>
          <Link className={style.footerElementContent} to={ContactUs}>
            Send a message
          </Link>
          <Link
            className={style.footerElementContent}
            to="https://wa.me/03228280"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whatsapp
          </Link>
        </div>
        <div className={`${style.footerElement} ${style.footerElementLast}`}>
          <h2 className={style.footerElementTitle}>Keep In Touch</h2>
          <div className={style.footerSocialMedia}>
            <Link to={companyInfos[0].facebook}>
              <FaFacebookF className={style.footerSocialMediaIcon} />
            </Link>
            <Link to={companyInfos[0].instagram}>
              <FaInstagram className={style.footerSocialMediaIcon} />
            </Link>
            <Link to={companyInfos[0].tiktok}>
              <FaTiktok className={style.footerSocialMediaIcon} />
            </Link>
          </div>
        </div>
      </div>
      <h3 className={style.footerCopyright}>
        Copyright , All rights reserved | Powered By : <u>Codi Team</u>
      </h3>
    </footer>
  );
};

export default Footer;
