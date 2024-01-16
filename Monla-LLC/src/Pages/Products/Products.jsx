import Category from "../../Components/Category/Category"
import ProductCart from "../../Components/ProductCart/ProductCart"
import Styles from "./Products.module.css"
import image from "../../../public/car.png"
import img from "../../assets/carr.png"
import imge from "../../assets/motor.png"
import bg from "../../assets/bg.png"
import ProductNav from "../../Components/ProductNav/ProductNav"

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
]


const Products = () => {
  return (
    <div className={Styles.body}>
      <ProductNav />
      <div className={Styles.container}>
      <div className={Styles.category}>
      <Category />
      </div>
      <div className={Styles.product}>
        {items.map((item)=>(
          <ProductCart key={item.id} price={item.price} img={item.img} title={item.title} desc={item.desc} />

        ))}
      </div>
      </div>
    </div>
  )
}

export default Products
