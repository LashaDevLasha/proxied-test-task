import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  _id: string;
  title: string;
  cost: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);
      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
