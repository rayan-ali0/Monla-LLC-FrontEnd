import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(Number(0));

  useEffect(() => {
    changeCartItem();
  }, []);

  const changeCartItem = () => {
    let dataArr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const product = JSON.parse(localStorage.key(i));
      dataArr.push(product);
    }

    let itemCount = Number(dataArr.length) || 0;
    setCartItemCount(itemCount);
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
