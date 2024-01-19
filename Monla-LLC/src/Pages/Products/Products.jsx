import Category from "../../Components/Category/Category"
import ProductCart from "../../Components/ProductCart/ProductCart"
import Styles from "./Products.module.css"
import image from "../../assets/Images/car.png"
import img from "../../assets/Images/carr.png"
import imge from "../../assets/Images/motor.png"
import bg from "../../assets/Images/bg.png"
import ProductNav from "../../Components/ProductNav/ProductNav"
import { useFetchData } from "../../CustomHook/GetData"

const items=[
  {
    id:1,
    img:img,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:2,
    img:image,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:3,
    img:imge,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:4,
    img:bg,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:5,
    img:"https://p7.hiclipart.com/preview/266/884/893/motorcycle-accessories-goggles-automotive-design-car-drone-view.jpg",
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:6,
    img:"https://p7.hiclipart.com/preview/266/884/893/motorcycle-accessories-goggles-automotive-design-car-drone-view.jpg",
    price:"$460.61",
    title:"thigh performance engineever",
    desc:"Filter Uncatogarized"
  },
  {
    id:7,
    img:"https://p7.hiclipart.com/preview/266/884/893/motorcycle-accessories-goggles-automotive-design-car-drone-view.jpg",
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:8,
    img:img,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:9,
    img:image,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:10,
    img:imge,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:11,
    img:bg,
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:12,
    img:"https://p7.hiclipart.com/preview/266/884/893/motorcycle-accessories-goggles-automotive-design-car-drone-view.jpg",
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
  {
    id:14,
    img:"https://p7.hiclipart.com/preview/266/884/893/motorcycle-accessories-goggles-automotive-design-car-drone-view.jpg",
    price:"$460.61",
    title:"thigh performance engineever",
    desc:"Filter Uncatogarized"
  },
  {
    id:15,
    img:"https://p7.hiclipart.com/preview/266/884/893/motorcycle-accessories-goggles-automotive-design-car-drone-view.jpg",
    price:"$460.61",
    title:"high performance engine",
    desc:"Filter Uncatogarized"
  },
]



const Products = () => {
  const api=`${import.meta.env.VITE_REACT_APP_BACKEND}/product/read/all`
  const {data,error, loading}=useFetchData(api)
  return (
    <div className={Styles.body}>
      <div className={Styles.nav}>
      <ProductNav />
      </div>
      <div className={Styles.container}>
      <div className={Styles.category}>
      <Category />
      </div>
      <div className={Styles.product}>
      {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        {data.map((item)=>(
          <ProductCart key={item.id} price={item.price} img={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} title={item.title} desc={item.description} />

        ))}
      </div>
      </div>
    </div>
  )
}

export default Products
