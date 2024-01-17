import React from 'react';
import { Link } from 'react-router-dom';
import car1 from '../../assets/car1.png';
import car2 from '../../assets/car2.png';
import car3 from '../../assets/car3.png';
import Styles from '../sectionservices/servicesSection.module.css'
const ServicesSection = () => {
  return (
    <div style={{ marginTop:'50px' }}>
    <h2>Our Services</h2>
      
      <div style={{ display: 'flex', gap: '7rem' }}>
        {/* Service Card 1 */}
        <div>
          <img src={car1} alt="Service 1" style={{ width: '100%', height: 'auto' }} />
          <h3>Service 1 Title</h3>
        </div>

        {/* Service Card 2 */}
        <div>
          <img src={car2} alt="Service 2" style={{ width: '100%', height: 'auto' ,borderRadius:'10px'}} />
          <h3>Service 2 Title</h3>
        </div>

        {/* Service Card 3 */}
        <div>
          <img src={car3} alt="Service 3" style={{ width: '100%', height: 'auto' }} />
          <h3>Service 3 Title</h3>
        </div>
      </div>

      {/* View More Services Button */}
      <div style={{ display: 'flex',marginLeft:'550px', marginTop: '2rem' }}>
        <Link to="/services" className={Styles.view} >
          View More Services
        </Link>
      </div>
    </div>
  );
};

export default ServicesSection;
