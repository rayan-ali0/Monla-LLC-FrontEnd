import React from 'react'
import HeroSectionHomepage from './HeroSectionHomepage'
import Style from  "./Home.module.css"
import Searchfilter from '../../Components/Category/searchfilter/searchfilter'
import Brand from '../../Components/brands/brand'
import Aboutus from '../../Components/sectionaboutus/setionABoutUs'
import carImage from '../../assets/GettyImages-693170166-5a99f020c67335003717a070 1.jpg';
import ServicesSection from '../../Components/sectionservices/sectionservices'
import ProductCarthome from '../../Components/sectionproduct/sectionProduct'

const Home = () => {


  return (
    <div>
    <div className={Style.container}>
      {/* <div className={Style.hero}></div> */}
      <HeroSectionHomepage/>
      <Searchfilter/>
    
</div>
<div className={Style.product}>
      
      <ProductCarthome/>

   
  </div>
      <div className={Style.search}>
      <Brand/>
     <div className={Style.about}>
     <Aboutus
            title="WE UNDERSTAND HOW IMPORTANT IT IS TO FIND THE RIGHT AUTO SERVICE"
            description="Car repairs and maintenance can be expensive and no one wants to have to pay to repair damage caused by shoddy repair service. When you bring your car into our auto shop, you won’t have to worry because our staff is comprised of ASE certified technicians who are committed to making sure you have a safe dependable car."
            imageUrl={carImage}
          />
     </div>
     <ServicesSection/>
    
    </div>
    </div>
    
  )
}

export default Home

