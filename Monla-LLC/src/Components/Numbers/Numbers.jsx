import React, { useEffect, useState } from "react"
import style from './Numbers.module.css'
import userIcons from '../../assets/icons/users.png'
import orderIcon from '../../assets/icons/order.png'
import delivered from '../../assets/icons/completed.png'
import axios from "axios"
import ordersImg from '../../assets/checkout.png'
const Numbers=()=>{
    const [numbers,setNumbers]=useState({})

const fetchNumbers=async()=>{
    try{

        const response=await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/numbers`)
        if(response){
            setNumbers(response.data)

        }
        else{
            console.log("No response ")
        }
    }
    catch(error){
        console.log(error.message)
    }
}

// const columns = [
//     { field: '_id', headerName: 'ID', flex: 1 },
//     { field: 'orderNumber', headerName: 'Order Number', flex: 1 },
//     { field: 'userName', headerName: 'User Name', flex: 1 },
//     { field: 'userEmail', headerName: 'User Email', flex: 1 },
//     { field: 'userPhone', headerName: 'User Phone', flex: 1 },
//     { field: 'address', headerName: 'Address', flex: 1 },
//     { field: 'deliverDate', headerName: 'Delivery Date', flex: 1 },
//     { field: 'status', headerName: 'Status', flex: 1 },
//     { field: 'total', headerName: 'Total', flex: 1 },
//     {
//       field: 'productsOrdered',
//       headerName: 'Products Ordered',
//       flex: 1,
//       renderCell: (params) => (
//         <div>
//           {params.row.productsOrdered.map((product) => (
//             <div key={product.productId}>{`${product.quantity} x ${product.productId}`}</div>
//           ))}
//         </div>
//       ),
//     },
//     { field: 'userId', headerName: 'User ID', flex: 1 },
//     { field: 'shippingId', headerName: 'Shipping ID', flex: 1 },
//     { field: 'createdAt', headerName: 'Created At', flex: 1 },
//     { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 1,
//       renderCell: (params) => (
//         <div style={{ display: "flex" }}>
//           <div onClick={() => handleEditClick(params.row)} style={{ cursor: "pointer" }}>
//             <EditIcon />
//           </div>
//           <div onClick={() => handleDeleteClick(params.row._id, params.row.status)} style={{ cursor: "pointer" }}>
//             <DeleteIcon />
//           </div>

//           </div>
//       ),
//     },
//   ];



useEffect(()=>{
fetchNumbers()
},[])
    return(
        
        <main className={style.numbersHolder}>
<section className={style.nbHolder}>
<div className={style.nbRow}>
    <span className={style.nbs}>
    {numbers.usersNb?numbers.usersNb:0}
    </span>
    <span className={style.icons}>
<img src={userIcons}/>
    </span>
</div>
<div className={style.nbTitle}> Total Users</div>
</section>
<section className={style.nbHolder}>
<div className={style.nbRow}>
    <span className={style.nbs}>
    {numbers.ordersNumber?numbers.ordersNumber:0}
    </span>
    <span className={style.icons}>
<img src={ordersImg}/>
    </span>
</div>
<div className={style.nbTitle}> Total Orders</div>
</section>
<section className={style.nbHolder}>
<div className={style.nbRow}>
    <span className={style.nbs}>
    {numbers.deliveredNb?numbers.deliveredNb:0}
    </span>
    <span className={style.icons}>
<img src={orderIcon}/>
    </span>
</div>
<div className={style.nbTitle}> Total Delivered</div>
</section>
<section className={style.nbHolder}>
<div className={style.nbRow}>
    <span className={style.nbs}>
    {numbers.productsNb?numbers.productsNb:0}
    </span>
    <span className={style.icons}>
<img src={delivered}/>
    </span>
</div>
<div className={style.nbTitle}> Total Products</div>
</section>
<section className={style.nbHolder}>
<div className={style.nbRow}>
    <span className={style.nbs}>
    {numbers.totalStock?numbers.totalStock:0}
    </span>
    <span className={style.icons}>
<img src={delivered}/>
    </span>
</div>
<div className={style.nbTitle}> Total Stock</div>
</section>

        </main >

    )
}

export default Numbers