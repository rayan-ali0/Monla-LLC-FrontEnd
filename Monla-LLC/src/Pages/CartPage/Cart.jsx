import React, { useEffect, useState, useContext } from 'react'
import style from './Cart.module.css'
import axios from 'axios'
import producImage from '../../assets/images/backgorundImage.png'
import bin from "../../assets/bin.png"
import cross from '../../assets/icons/cross.png'
import { Link, useNavigate } from "react-router-dom";
import emptyCart from '../../assets/images/emptyCart.png'
import { CartContext } from "../../UserContext/CartContext";
const Cart = () => {
    const { changeCartItem } = useContext(CartContext)
    const navigate=useNavigate()

    const [arr, setArr] = useState([]);
    const [idsArr, setIdsArr] = useState({})
    const [totalPrice, setTotalPrice] = useState(0);
    const fetchDataFromLocalStorage = () => {
        let totalPrice = Number(0);
        let dataArr = [];
        let idsArr = {};
  console.log()
        for (let i = 0; i < localStorage.length; i++) {
          const product = JSON.parse(localStorage.key(i));
          const quantityValue = localStorage.getItem(localStorage.key(i));
          totalPrice += product.price * quantityValue;
          dataArr.push(product);
          idsArr[product._id] = quantityValue;
        }
  
        setArr(dataArr);
        setIdsArr(idsArr);
        setTotalPrice(totalPrice);
      };
  

    useEffect(() => {
 
          fetchDataFromLocalStorage();

      }, [])
    



    const decreaseOne = (product) => {
        let max=product.stock
        console.log(max)
        console.log("hiii")
        const storedQuantity = JSON.parse(localStorage.getItem(JSON.stringify(product)));
        console.log(storedQuantity)
        console.log(storedQuantity===1)
if(storedQuantity===1){
    localStorage.removeItem(JSON.stringify(product));
    fetchDataFromLocalStorage()
    changeCartItem()
}
else{
    localStorage.setItem(JSON.stringify(product), JSON.stringify(storedQuantity-1));
    fetchDataFromLocalStorage()
}
            
        // }
      };
    
      const increaseOne = (product) => {
        console.log("hiiiiiiiiiiiii")
        let max=product.stock
        console.log(max)
        const storedQuantity = JSON.parse(localStorage.getItem(JSON.stringify(product))) ;
        if(storedQuantity===max){
            return;
        }
        else{
            localStorage.setItem(JSON.stringify(product), JSON.stringify(storedQuantity+1));
            fetchDataFromLocalStorage()
        }
        console.log(storedQuantity)

      };
      const removeFromCart=(product)=>{
        localStorage.removeItem(JSON.stringify(product));
        fetchDataFromLocalStorage()
        changeCartItem()
      }

      const viewAgain=(product)=>{
        navigate(`/productdetails/${product.slug}`,{state:product})

      }
      const goShop=()=>{
        navigate('/product')
      }

      const goToCheckout=()=>{
        navigate('/checkout')

      }
    return (


        <div className={style.cartPage}>
            <div className={style.cartNav}></div>
            <div className={style.buyHistory}>
                <div className={style.related__Item}>
                    <div className={style.background}></div>
                    <h2 className={style.title}>My Cart</h2>
                </div>
            </div>

            
   { arr&& arr.length>0?(
            <div className={style.cartHolder}>
                <section className={`${style.cartRow} ${style.cartHeader}`}>
                    <span className={`${style.image}`}></span>
                    <div className={style.styleDiv}>
                        <span className={`${style.productHolder}`}>Product</span>
                        <span className={style.custmWidth}>Price</span>
                        <span className={style.qtyWidth}>Quantity</span>
                        <span className={style.custmWidth}>Subtotal</span>
                    </div>
                    <span className={style.removeIcon}>Remove</span>
                </section>
                <div className={style.cartItems}>


        {arr.map(item=>
            <section key={item._id} className={`${style.cartRow} ${style.cartLine}`}>
            <span className={style.image} onClick={()=>viewAgain(item)}>
                <img src={`${import.meta.env.VITE_REACT_APP_BACKEND}/${item.image}`} />

                </span>
            <div className={style.styleDiv}>
                <span className={`${style.productHolder}`}><b className={style.boldTitle}>Title:</b> {item.title}</span>
                <span className={style.custmWidth}> <b className={style.boldTitle}>Price:</b>${item.price}</span>
                <div className={` ${style.qtyWidth}`}>
                    <div className={`${style.quantity__to__buy1}`}>
                        <span className={style.decrease1}  onClick={()=>decreaseOne(item)}>{" "+idsArr[item._id]==1?<img src={cross} className={style.crossIcon}/>:"-"}</span>
                        <span className={style.number1}>{idsArr[item._id]}</span>
                        <span className={style.increase1} onClick={()=>increaseOne(item)}>+</span>
                    </div>
                </div>
    
                <span className={style.custmWidth}><b className={style.boldTitle}>Total Price:</b>${" "+idsArr[item._id]*item.price}</span>
            </div>
            <span className={style.removeIcon} onClick={()=>removeFromCart(item)}><img src={bin} className={style.binIcon} /></span> {/**6 */}
        </section>
            )
    
   

                       }    
                    



                </div>

                <section className={`${style.checkRow} ${style.cartLine}`}>
                    <Link className={`${style.shopBtn} ${style.cartBtns}`} to='/product'>
                    <span >Return To Shop</span>
                    </Link>

                    <span><b>Total Cart :</b>${totalPrice}</span>
                    <span className={`${style.checkBtn} ${style.cartBtns}`} onClick={goToCheckout}>Checkout</span>
                </section>
            </div>
            ):(
                <div className={style.emptyCartHolder}>
                    <section className={`${style.emptyImg} ${style.emptySections}`}>
                        <img src={emptyCart} className={style.cartPic}/>
                    </section>
                    <section className={`${style.textSection} ${style.emptySections}`}>
                        <h1>Your Cart is Empty</h1>
                        <p>Let's add something</p>
                    </section>
                    <section className={`${style.btnSection} ${style.emptySections}`}>
                        <span className={`${style.shopping}`} onClick={goShop}>
                            Continue Shopping
                        </span>
                    </section>
                    </div>
            )
}
        
        </div>
    )

}


export default Cart
