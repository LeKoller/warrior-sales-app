import { createContext, useState } from "react";
import { OrdersContextProps, OrdersContextType, IOrder, ITeam } from "../types";

const emptyOrder: IOrder = {
  id: 0,
  address: "",
  creation: "",
  delivery: "",
  team: {
    id: 0,
    name: "",
    description: "",
    licensePlate: "",
  },
};

const initial = {
  orders: [emptyOrder],
  setOrders: () => {},
  pagination: {
    pages: 1,
    currentPage: 1,
    total: 1,
  },
  setPagination: () => {},
};

const OrdersContext = createContext<OrdersContextType>(initial);

const OrdersContextProvider = ({ children }: OrdersContextProps) => {
  const [orders, setOrders] = useState(initial.orders);
  const [pagination, setPagination] = useState(initial.pagination);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        pagination,
        setPagination,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersContextProvider };
