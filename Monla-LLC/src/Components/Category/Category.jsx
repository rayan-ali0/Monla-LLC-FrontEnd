import Loading from "../Loading/Loading";
import Styles from "./Category.module.css"
import { motion } from "framer-motion"

export const Category = ({data, error, loading:categoryLoading,onChange, selectedCategories,handlCategoryId , setFileterdBy}) => {
 
  return (
<div className={Styles.wrapper}>
    <div className={Styles.container}>
        {!categoryLoading? (  data.map((item,index)=>(
            <motion.div onClick={() => {
              setFileterdBy((prev) => ({ ...prev, category: item._id }));}} key={item._id} className={Styles.category} onChange={()=>onChange(item.title)} initial={{scale:1}} whileHover={{scale:1.1}} transition={{duration:0.15}}>
            <img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`}  className={Styles.image}/>
           <h3 className={Styles.h3}>{item.title}</h3>
            </motion.div>
            ))): <Loading />}
            {error && <p>Error: {error.message}</p>}
      
   
          </div>
          </div>
  )
}


