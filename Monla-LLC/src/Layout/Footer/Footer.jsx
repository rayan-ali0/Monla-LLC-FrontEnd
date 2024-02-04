import React, { useState, useEffect } from "react";
import style from "./Footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DashProfile from "../../Components/DashProfile/DashProfile";
import Register from "../../Pages/Login/Login";
import Cart from "../../Pages/CartPage/Cart";
import Products from "../../Pages/Products/Products";
import Services from "../../Pages/Services/Services";
import AboutUs from "../../Pages/Aboutus/Aboutus";
import ContactUs from "../../Pages/Contact/ContactUs";

const Footer = () => {
  const navigate= useNavigate()
  const [isloading, setIsLoading] = useState(true);
  const [companyInfos, setCompanyInfos] = useState([]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_PATH}/company/`, {withCredentials: true}
        );
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
            {companyInfos.location}
          </p>
          <p className={style.footerElementContent}>{companyInfos.email}</p>
          <p className={style.footerElementContent}>{companyInfos.number}</p>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Account</h2>
          <ul className={style.footerElementList}>
            <li className={`${style.footerElementContent} ${style.footerElementContentFirst}`}><Link
             className={style.footerElementContentLink}
              to={DashProfile}
            >
              My Account
            </Link></li>
            <li className={style.footerElementContent}><Link className={style.footerElementContentLink} to={Register}>
              Login/Register
            </Link></li>
            <li className={style.footerElementContent}><Link className={style.footerElementContentLink} to={Cart}>
              Cart
            </Link></li>
            <li className={style.footerElementContent}><Link className={style.footerElementContentLink} to={Products}>
              Shop
            </Link></li>
          </ul>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Quick Links</h2>
          <ul className={style.footerElementList}>
          <li className={`${style.footerElementContent} ${style.footerElementContentFirst}`}><Link
            to={Services}
            className={style.footerElementContentLink}
          >
            Services
          </Link></li>
          <li className={style.footerElementContent}><Link className={style.footerElementContent} to={AboutUs}>
            About us
          </Link></li>
          <li className={style.footerElementContent}><Link className={style.footerElementContent} to={ContactUs}>
            Send a message
          </Link></li>
          <li className={style.footerElementContent}><Link
            className={style.footerElementContent}
            to="https://wa.me/03228280"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whatsapp
          </Link></li>
          </ul>
        </div>
        <div className={`${style.footerElement} ${style.footerElementLast}`}>
          <h2 className={style.footerElementTitle}>Keep In Touch</h2>
          <div className={style.footerSocialMedia}>
            <Link to={companyInfos.facebook}>
              <FaFacebookF className={style.footerSocialMediaIcon} />
            </Link>
            <Link to={companyInfos.instagram}>
              <FaInstagram className={style.footerSocialMediaIcon} />
            </Link>
          </div>
        </div>
      </div>
      <h3 className={style.footerCopyright}>
        Copyright , All rights reserved | Powered By : <u><NavLink to="/developers" style={{color:"white"}}>Codi Team</NavLink></u>
      </h3>
    </footer>
  );
};

export default Footer;
