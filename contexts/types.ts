import { ReactNode } from "react";

interface ICartItem {
  id: number;
  name: string;
  quantity: number;
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

type CartContextProps = {
  children: ReactNode;
};

type AuthContextProps = {
  children: ReactNode;
}

export type {
  CartContextType,
  CartContextProps,
  AuthContextType,
  AuthContextProps,
};
