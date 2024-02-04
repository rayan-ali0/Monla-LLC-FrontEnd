// ServicesSection.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../sectionservices/servicesSection.module.css';
import { useNavigate } from 'react-router-dom';
import { animate, motion } from 'framer-motion';

const serviceVariants={
    initial:{
        y:50,
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

const ServicesSection = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/services');
  };
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/service/read/all`);
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error.message);
            }
        };

        fetchServices();
    }, []);

    return (
        <motion.div variants={serviceVariants} initial="initial" whileInView="animate">
            <motion.h2 className={styles.title} variants={serviceVariants}>Explore below our best car services</motion.h2>
            <motion.div className={styles.servicesContainer} variants={serviceVariants}>
                {services.slice(0, 3).map(service => (
                    <motion.div key={service._id} className={styles.serviceCard} variants={serviceVariants}>
                        <motion.img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${service.image}`} alt={service.title} variants={serviceVariants} />
                        <motion.h3 variants={serviceVariants}>{service.title}</motion.h3>
                    </motion.div>
                ))}
            </motion.div>
            <button className={styles.viewMoreButton} onClick={handleViewMoreClick}>View More Services</button>
        </motion.div>
    );
};

export default ServicesSection;
