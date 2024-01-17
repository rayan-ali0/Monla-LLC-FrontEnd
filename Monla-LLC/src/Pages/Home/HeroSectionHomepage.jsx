// Importing necessary dependencies and styles
import React from "react";
import HeroSectionHomepageCss from "./HeroSectionHomapage.module.css";

// Functional component for the hero section on the homepage
const HeroSectionHomepage = () => {
  return (
    <div className={HeroSectionHomepageCss.containerHero}>
      {/* Background image container */}
      <div className={HeroSectionHomepageCss.backgroundImage}>
        {/* Content container */}
        <div className={HeroSectionHomepageCss.content}>
          {/* Main title */}
          <h1 className={HeroSectionHomepageCss.title}>
   Rent A Car & Travel <span className={HeroSectionHomepageCss.spann}>Endless</span>
          </h1>
          <h2 className={HeroSectionHomepageCss.Title}>No reservation costs. Great rates.
Find What You Need actually.</h2>
          
          {/* Button linking to the contact page */}
          <a href="/contact" className={HeroSectionHomepageCss.button}>
            contact us
          </a>
        </div>
      </div>
    </div>
  );
};

// Exporting the HeroSectionHomepage component
export default HeroSectionHomepage;
