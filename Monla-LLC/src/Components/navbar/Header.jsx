
import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from '../../assets/images/logo.svg';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink, useLocation ,useNavigate} from "react-router-dom";


const Header = () => {
  const [nav, setNav] = useState({
    isOpen: false,
    isCartOpen: false,
  });
  
  
  const location = useLocation();
  
  const navigate = useNavigate();

  const handleCartIconClick = () => {
    // Navigate to the cart page
    navigate('/cart');
  };
  useEffect(() => {
    // Close the mobile menu when a NavLink is clicked
    setNav(false);
  }, [location]);
console.log(location.pathname==='/profile')

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
                <NavLink to='/' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`} >
                  Home
                </NavLink>
              </li>

              {/* NavLink for Services */}
              <li >
                <NavLink to='/services' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/services' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  Services
                </NavLink>
              </li>

              {/* NavLink for Product page */}
              <li >

                <NavLink to='/product' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/product' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  Products
                </NavLink>
              </li>

              {/* NavLink for About Us */}
              <li >

                <NavLink to='/about' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/about' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  About 
                </NavLink>
              </li>

              {/* NavLink for Contact Us */}
              <li >

                <NavLink to='/contact' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/contact' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  Contact Us
                </NavLink>
              </li>
              <li >

                <NavLink to='/signup' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/signup' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                SignUp
                </NavLink>
              </li>
            

            </ul>
          </nav>

          <div onClick={() => setNav(!nav)} className={location.pathname==="/profile"|| location.pathname==="/cart"? styles.mobile_btn_blue:styles.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>

          {/* Cart Icon */}
          <div className={location.pathname==='/profile' || location.pathname==="/cart"?styles.cartIconBlue:styles.cartIcon} onClick={handleCartIconClick}>
            <AiOutlineShoppingCart size={25} className={styles.shopIcon} />
          </div>
        </div>


      
      </div>
    </header>

    
  );
};

export default Header;
