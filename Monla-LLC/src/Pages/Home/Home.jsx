import React, {useEffect,useState} from 'react'
import HeroSectionHomepage from './HeroSectionHomepage'
import Style from "./Home.module.css"
import Searchfilter from '../../Components/Category/searchfilter/searchfilter'
import Brand from '../../Components/brands/brand'
import Aboutus from '../../Components/sectionaboutus/setionABoutUs'
import carImage from '../../assets/GettyImages-693170166-5a99f020c67335003717a070 1.jpg';
import ServicesSection from '../../Components/sectionservices/sectionservices'
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import { Helmet } from 'react-helmet';
import ProductCart from '../../Components/ProductCart/ProductCart'
import ProductCarthome from '../../Components/sectionproduct/sectionProduct'
import axios from 'axios'



const Home = () => {
  const [companyInfo, setCompanyInfo] = useState({
    whatsapp: '',

  });
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/company/`);
        setCompanyInfo(res.data);
      } catch (error) {
        console.error('Error fetching company information:', error.message);
      }
    };
  
    fetchCompanyInfo();
  }, []);

  return (
    <div>
     <Helmet>
        <title>Al Monla</title>
        <meta name="description" content="Explore high-quality car AC products, repair services, and maintenance solutions. We specialize in providing reliable and efficient air conditioning solutions for your vehicles." />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "AutomotiveBusiness",
              "name": "Al Monla",
              "description": "Specializing in car AC products, repair services, and maintenance solutions.",
              "image": "URL_TO_YOUR_LOGO_IMAGE",
            }
          `}
        </script>
      </Helmet>
      <main className={Style.newColor}>
        <section className={`conatiner ${Style.NewContainer}`}>

          <HeroSectionHomepage />
          <Searchfilter />

        </section>




        <section className={Style.search}>
          <Brand />
          <ProductCarthome />
        </section>
      </main>

      <section className={Style.about}>
        <Aboutus
          title="About us"
          description="Car repairs and maintenance can be expensive and no one wants to have to pay to repair damage caused by shoddy repair service. When you bring your car into our auto shop, you won’t have to worry because our staff is comprised of ASE certified technicians who are committed to making sure you have a safe dependable car."
          imageUrl={carImage}
        />
        <ServicesSection />
        </section>
      <aside className={Style.whatsappButton}>
        <a
          href={`https://wa.me/${companyInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={40} />
        </a>
      </aside >
    </div>
  )
}

export default Home

