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

type CartContextProps = {
  children: ReactNode;
};

export type { CartContextType, CartContextProps };
