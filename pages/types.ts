import { ReactNode } from "react";

interface ICartItem {
  id: number;
  name: string;
  quantity: number;
}

interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

interface IProductsTableCore {
  rowsPerPage: number;
  rows: ProductRow[];
  page: number;
  emptyRows: number;
  products: IProduct[];
}

type CartContextType = {
  address: string;
  setAddress: (newAddress: string) => void;
  items: ICartItem[];
  setItems: (newItems: ICartItem[]) => void;
};

type AuthContextType = {
  token: string;
  setToken: (newToken: string) => void;
};

type ProductsContextType = {
  item: IProduct;
  setItem: (newItem: IProduct) => void;
  products: IProduct[];
  setProducts: (newProducts: IProduct[]) => void;
};

type CartContextProps = {
  children: ReactNode;
};

type AuthContextProps = {
  children: ReactNode;
};

type ProductsContextProps = {
  children: ReactNode;
};

type ProductRow = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type {
  CartContextType,
  CartContextProps,
  AuthContextType,
  AuthContextProps,
  IProduct,
  ProductsContextType,
  ProductsContextProps,
  ProductRow,
  IProductsTableCore,
};
