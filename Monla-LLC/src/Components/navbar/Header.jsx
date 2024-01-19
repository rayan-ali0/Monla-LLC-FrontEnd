// Header.js - File where the Header component is defined

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from '../../assets/images/logo.svg';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink, useLocation } from "react-router-dom";


// Header Component Definition
const Header = () => {
  const [nav, setNav] = useState({
    isOpen: false,
    isCartOpen: false, // Add this property
  });
  
  const location = useLocation();
  

  useEffect(() => {
    // Close the mobile menu when a NavLink is clicked
    setNav(false);
  }, [location]);

  return (
    // Header Container
    <header className={styles.headerContainer}>
      <div className={styles.navbar}>
        {/* Logo */}
        <img src={logo} alt="/" />

        {/* Navigation Links */}
        <div className={styles.whatever}>
          <nav>
            <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]}>
              {/* NavLink for Home */}
              <li>
                <NavLink to='/' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/' ? styles.activeNavItem : ''}`}>
                  Home
                </NavLink>
              </li>

              {/* NavLink for Services */}
              <li>
                <NavLink to='/services' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/services' ? styles.activeNavItem : ''}`}>
                  Services
                </NavLink>
              </li>

              {/* NavLink for Portfolio */}
              <li>
                <NavLink to='/products' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/portfolio' ? styles.activeNavItem : ''}`}>
                  Products
                </NavLink>
              </li>

              {/* NavLink for About Us */}
              <li>
                <NavLink to='/about' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/about' ? styles.activeNavItem : ''}`}>
                  About 
                </NavLink>
              </li>

              {/* NavLink for Contact Us */}
              <li>
                <NavLink to='/contact' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/contact' ? styles.activeNavItem : ''}`}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to='/sginup' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/logout' ? styles.activeNavItem : ''}`}>
                SignUp
                </NavLink>
              </li>
            

            </ul>
          </nav>

          <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>

          {/* Cart Icon */}
          <div className={styles.cartIcon} >
            <AiOutlineShoppingCart size={25} className={styles.shopIcon} />
          </div>
        </div>

        {/* Mobile Menu Button */}

        {/* <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div> */}
      </div>
    </header>

    
  );
};

export default Header;
