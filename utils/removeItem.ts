import { useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client";
import { notification } from "antd";
import { REMOVE_ITEM_FROM_CART } from "@/graphql/mutations";
import { validateRemoveItem } from "@/utils/zodValidation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export const useRemoveItem = () => {
  const { setCart } = useCart();
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const [removeItemMutation] = useMutation(REMOVE_ITEM_FROM_CART, {
    onCompleted: (data) => {
      if (data?.removeItem) {
        const updatedCart = data.removeItem;
        setCart(updatedCart.items);
        api.success({
          placement: "top",
          message: "Item Removed",
          description: `The item has been removed from your cart.`,
        });
      }
      setLoadingItemId(null);
    },
    onError: (error: ApolloError) => {
      const err = JSON.parse(error.message);
      api.error({
        placement: "top",
        message: "Error",
        description: err[0]?.message,
      });
      setLoadingItemId(null);
    },
  });

  const removeItemFromCart = async (cartItemId: string) => {
    const validation = validateRemoveItem({ cartItemId });

    if (!validation.success) {
      api.error({
        placement: "top",
        message: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    setLoadingItemId(cartItemId);
    await removeItemMutation({ variables: { cartItemId } });
  };

  return {
    removeItemFromCart,
    loadingItemId,
    contextHolder,
  };
};
