// Importing necessary dependencies and styles
import React from "react";
import HeroSectionHomepageCss from "./HeroSectionHomapage.module.css";
import { motion } from "framer-motion"

// Functional component for the hero section on the homepage
const textVariants={
  initial:{
      x:-500,
      opacity:0,
  },
  animate:{
      x:0,
      opacity:1,
      transition:{
          duration:1,
          staggerChildren:0.2
      },
  },
}

const HeroSectionHomepage = () => {
  return (
    <div className={HeroSectionHomepageCss.containerHero} >
      {/* Background image container */}
      <div className={HeroSectionHomepageCss.backgroundImage}>
        {/* Content container */}
        <motion.div className={HeroSectionHomepageCss.content} variants={textVariants} initial="initial" animate="animate">
          {/* Main title */}
          <motion.h1 className={HeroSectionHomepageCss.title} variants={textVariants}>
          DRIVE IN STYLE & REPAIR WITH <span className={HeroSectionHomepageCss.spann}> EASE</span>
          </motion.h1>
          <motion.h2 className={HeroSectionHomepageCss.Title} variants={textVariants}>
            Cruise in Confidence. Unbeatable Prices. Discover All Your Car Essentials Right Here.</motion.h2>
          
          {/* Button linking to the contact page */}
          <motion.a href="/contmotion.act" className={HeroSectionHomepageCss.button} >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

// Exporting the HeroSectionHomepage component
export default HeroSectionHomepage;
