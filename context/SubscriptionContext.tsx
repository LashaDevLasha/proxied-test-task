import { createContext, useContext, useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { CART_ITEM_UPDATE } from "@/graphql/cartSubscriptions";
import { useCart } from "@/context/CartContext";
import CartUpdateModal from "@/components/CartUpdateModal";
import { CartItemUpdate, SubscriptionData } from "@/types/types";

type SubscriptionContextType = {
  subscriptionData: SubscriptionData | null;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { setCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedItems, setUpdatedItems] = useState<CartItemUpdate[]>([]);

  const { data } = useSubscription<SubscriptionData>(CART_ITEM_UPDATE);

  // Ensure subscriptionData is never undefined, it will be null if no data
  const subscriptionData = data ? data : null;

  useEffect(() => {
    if (subscriptionData && subscriptionData.cartItemUpdate) {
      const updatedItem = subscriptionData.cartItemUpdate;
      console.log(updatedItem);

      // Optionally update the cart state if needed
      // setCart((prevCart) => {
      //   const updatedCart = prevCart.items.map((item) =>
      //     item._id === updatedItem.payload._id
      //       ? { ...item, quantity: updatedItem.payload.quantity }
      //       : item
      //   );
      //   return updatedCart;
      // });

      // Store the updated item in the modal state
      setUpdatedItems((prevItems) => [...prevItems, updatedItem]);
      setModalVisible(true);
    }
  }, [subscriptionData, setCart]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setUpdatedItems([]); 
  };

  return (
    <SubscriptionContext.Provider value={{ subscriptionData }}>
      {children}
      <CartUpdateModal
        open={modalVisible}
        onClose={handleCloseModal}
        updatedItems={updatedItems}
      />
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionData = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscriptionData must be used within a SubscriptionProvider"
    );
  }
  return context;
};
