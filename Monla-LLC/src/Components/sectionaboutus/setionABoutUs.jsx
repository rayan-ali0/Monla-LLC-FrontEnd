import React from 'react';
import carImage from '../../assets/GettyImages-693170166-5a99f020c67335003717a070 1.jpg';
import { Link } from 'react-router-dom';
import style from '../sectionaboutus/sectionAbout.module.css'


const Aboutus = ({ title, description }) => {
  return (
    <div  className={style.Aboutcontainer}>
      <div style={{ flex: 1 }}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.description}>{description}</p>
        <Link to="/aboutus">Learn More About Us</Link>

      </div>
      <div style={{ flex: 0.8 }}>
        <img src={carImage} alt="Illustration" style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default Aboutus;
