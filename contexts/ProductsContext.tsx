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
  pagination: {
    pages: 0,
    currentPage: 0,
    total: 0,
  },
  setPagination: () => {},
};

const ProductsContext = createContext<ProductsContextType>(initial);

const ProductsContextProvider = ({ children }: ProductsContextProps) => {
  const [item, setItem] = useState(initial.item);
  const [products, setProducts] = useState(initial.products);
  const [pagination, setPagination] = useState(initial.pagination);

  return (
    <ProductsContext.Provider
      value={{
        item,
        setItem,
        products,
        setProducts,
        pagination,
        setPagination,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
