import { createContext, useState } from "react";
import { CartContextProps, CartContextType } from "./types";

const initial = {
  address: "",
  setAddress: () => {},
  items: [
    {
      id: 0,
      name: "",
      quantity: 0,
    },
  ],
  setItems: () => {},
};

const CartContext = createContext<CartContextType>(initial);

const CartContextProvider = ({ children }: CartContextProps) => {
  const [address, setAddress] = useState(initial.address);
  const [items, setItems] = useState(initial.items);

  return (
    <CartContext.Provider
      value={{
        address,
        setAddress,
        items,
        setItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
