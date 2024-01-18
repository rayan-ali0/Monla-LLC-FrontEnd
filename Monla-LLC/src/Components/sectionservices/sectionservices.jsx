// ServicesSection.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../sectionservices/servicesSection.module.css';

const ServicesSection = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/service/read/all');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error.message);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <h2>Explore below our best car services</h2>
            <div className={styles.servicesContainer}>
                {services.slice(0, 3).map(service => (
                    <div key={service._id} className={styles.serviceCard}>
                        <img src={`http://localhost:5000/${service.image}`} alt={service.title} />
                        <h3>{service.title}</h3>
                    </div>
                ))}
            </div>
            <button className={styles.viewMoreButton}>View More Services</button>
        </div>
    );
};

export default ServicesSection;
