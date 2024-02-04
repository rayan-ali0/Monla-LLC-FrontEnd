import React from "react";
import styleHero from './PageHero.module.css'
import heroImg from '../../assets/bluecar2.jpg'
const PageHero = ({ title }) => {


    return (


        <main className={styleHero.heroMain}>
            <div className={styleHero.heroBackgrd}></div>
            <img src={heroImg} className={styleHero.heroImage} />
            <h1 className={styleHero.pageTitle}>{title}</h1>
        </main>
    )

}
export default PageHero;
