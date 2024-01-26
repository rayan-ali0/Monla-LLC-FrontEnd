import React from "react";
import Numbers from "../../Components/Numbers/Numbers";
import Recents from "../../Components/RecentsOrder/Recents";
import style from './Overview.module.css'

const Overview=()=>{

    return(
        <div className={style.overviewHolder}>
            <Numbers/>
            <Recents/>
        </div>

    )
}

export default Overview;
