import style from "./Footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
      <div className={style.footerContainerElements}>
        <div className={style.footerElement}>
          <h2 className={style.footerTitleLogo}>MONLA</h2>
          <p className={style.footerTitleContent}>Logo</p>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Support</h2>
          <p className={`${style.footerElementContent} ${style.footerElementContentFirst}`}>
            Tripoli , Bad AL ramel jsskskskk
          </p>
          <p className={style.footerElementContent}>monla@gmail.com</p>
          <p className={style.footerElementContent}>09610292020</p>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Account</h2>
          <p className={`${style.footerElementContent} ${style.footerElementContentFirst}`}>My Account</p>
          <p className={style.footerElementContent}>Login/Register</p>
          <p className={style.footerElementContent}>Cart</p>
          <p className={style.footerElementContent}>Shop</p>
        </div>
        <div className={style.footerElement}>
          <h2 className={style.footerElementTitle}>Quick Links</h2>
          <p className={`${style.footerElementContent} ${style.footerElementContentFirst}`}>Services</p>
          <p className={style.footerElementContent}>About us</p>
          <p className={style.footerElementContent}>Send a message</p>
          <p className={style.footerElementContent}>Whatsapp</p>
        </div>
        <div className={`${style.footerElement} ${style.footerElementLast}`}>
          <h2 className={style.footerElementTitle}>Keep In Touch</h2>
          <div className={style.footerSocialMedia}>
            <FaFacebookF className={style.footerSocialMediaIcon} />
            <FiTwitter className={style.footerSocialMediaIcon} />
            <FaInstagram className={style.footerSocialMediaIcon} />
            <FaLinkedinIn className={style.footerSocialMediaIcon} />
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
