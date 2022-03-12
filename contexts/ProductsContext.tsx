import { createContext, useState } from "react";
import { ProductsContextProps, ProductsContextType, IProduct } from "../types";

const emptyProduct: IProduct = {
  id: 0,
  name: "",
  price: 0,
  category: "",
  description: "",
  stock: 0,
};

const initial = {
  item: emptyProduct,
  setItem: () => {},
  products: [emptyProduct],
  setProducts: () => {},
};

const ProductsContext = createContext<ProductsContextType>(initial);

const ProductsContextProvider = ({ children }: ProductsContextProps) => {
  const [item, setItem] = useState(initial.item);
  const [products, setProducts] = useState(initial.products);

  return (
    <ProductsContext.Provider
      value={{
        item,
        setItem,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
