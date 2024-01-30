import Styles from "./Category.module.css"
import { useFetchData } from '../../CustomHook/GetData'
import { motion } from "framer-motion"

export const Category = ({data, error, loading:categoryLoading,onChange, selectedCategories,handlCategoryId }) => {
 
  return (
<div className={Styles.wrapper}>
    <div className={Styles.container}>
        {!categoryLoading? (  data.map((item,index)=>(
            <motion.div onClick={()=>{handlCategoryId(item._id)}} key={item._id} className={Styles.category} onChange={()=>onChange(item.title)} initial={{scale:1}} whileHover={{scale:1.1}} transition={{duration:0.15}}>
              {/* <p>{item._id}</p> */}
            <img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`}  className={Styles.image}/>
           <h3 className={Styles.h3}>{item.title}</h3>
            </motion.div>
            ))): <h1> Loading</h1>}
            {error && <p>Error: {error.message}</p>}
      
   
          </div>
          </div>
  )
}


