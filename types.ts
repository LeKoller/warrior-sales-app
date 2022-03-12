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

interface IOrder {
  id: number;
  address: string;
  creation: string;
  delivery: string;
  team: ITeam;
}

interface ITeam {
  id: number;
  name: string;
  description: string;
  licensePlate: string;
}

interface IProductsTableCore {
  rowsPerPage: number;
  rows: ProductRow[];
  page: number;
  emptyRows: number;
  products: IProduct[];
}

interface IOrdersTableCore {
  rowsPerPage: number;
  rows: OrderRow[];
  page: number;
  emptyRows: number;
  orders: IOrder[];
}

interface IPagination {
  pages: number;
  currentPage: number;
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

type OrdersContextType = {
  orders: IOrder[];
  setOrders: (newOrders: IOrder[]) => void;
  pagination: IPagination;
  setPagination: (newPagination: IPagination) => void;
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

type OrdersContextProps = {
  children: ReactNode;
};

type ProductRow = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type OrderRow = {
  id: number;
  address: string;
  delivery: string;
  team: string;
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
  OrderRow,
  IProductsTableCore,
  IOrdersTableCore,
  ICartItem,
  OrdersContextProps,
  OrdersContextType,
  IOrder,
  ITeam,
};
