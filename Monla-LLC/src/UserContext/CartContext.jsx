import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(Number(0));

  useEffect(() => {
    changeCartItem();
  }, []);

  const changeCartItem = () => {
    let dataArr = [];

    console.log("lengthhhhhhhhhhhhhhhhhhhhhhh",localStorage.length)
    for (let i = 0; i < localStorage.length; i++) {
      const product = JSON.parse(localStorage.key(i));
      dataArr.push(product);
    }
    console.log("arraaaaaaaaaaaaaaaaaaaaay",dataArr.length)

    let itemCount = Number(dataArr.length) || 0;
console.log("itemmmmm countt",itemCount)
    setCartItemCount(itemCount);
    console.log(cartItemCount)
  };

  return (
    <CartContext.Provider
      value={{
        cartItemCount,
        setCartItemCount,
        changeCartItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};
