import Styles from "./Category.module.css"
import { useFetchData } from '../../CustomHook/GetData'

export const Category = ({data, error, loading:categoryLoading,onChange, selectedCategories}) => {

  return (

    <div className={Styles.container}>
        {!categoryLoading? (  data.map((item,index)=>(
            <div  key={index} className={Styles.category} onChange={()=>onChange(item.title)}>
            <img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`}  className={Styles.image}/>
           <h3 className={Styles.h3}>{item.title}</h3>
            </div>
            ))): <h1> Loading</h1>}
            {error && <p>Error: {error.message}</p>}
      
   
          </div>
  )
}


