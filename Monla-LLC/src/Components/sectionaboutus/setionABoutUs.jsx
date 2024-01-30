import React from 'react';
import carImage from '../../assets/GettyImages-693170166-5a99f020c67335003717a070 1.jpg';
import { useNavigate } from 'react-router-dom';
import style from '../sectionaboutus/sectionAbout.module.css'
import { motion } from 'framer-motion';

const textVariants={
  initial:{
      y:100,
      opacity:0,
  },
  animate:{
      y:0,
      opacity:1,
      transition:{
          duration:1,
          staggerChildren:0.2
      },
  },
}



const Aboutus = ({ title, description }) => {
  const navigate = useNavigate();
  const handleLearnMoreClick = () => {
    // Navigate to the services page
    navigate('/about');
  };
  return (
    <motion.div  className={style.Aboutcontainer} variants={textVariants} initial="initial" whileInView="animate">
      <motion.div style={{ flex: 1 }}variants={textVariants}>
        <motion.h2 className={style.title} variants={textVariants}>{title}</motion.h2>
        <motion.p className={style.description} variants={textVariants}>{description}</motion.p>
        <button className={style.viewMoreButton} onClick={handleLearnMoreClick}>Learn more</button>

      </motion.div>
      <motion.div style={{ flex: 0.8 }} variants={textVariants}>
        <img src={carImage} alt="Illustration" style={{ width: '100%', height: 'auto' }} />
      </motion.div>
    </motion.div>
  );
};

export default Aboutus;
