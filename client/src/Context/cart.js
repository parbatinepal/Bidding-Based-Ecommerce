import { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

const useCart = () => useContext(CartContext);
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];

      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    console.log(product, "caRT product added");
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart successfully...");
  };

  

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeCartItem,totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook

export { useCart, CartProvider };
