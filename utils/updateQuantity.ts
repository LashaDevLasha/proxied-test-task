import { useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client";
import { notification } from "antd";
import { UPDATE_ITEM_QUANTITY } from "@/graphql/mutations";
import { validateUpdateItemQuantity } from "@/utils/zodValidation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRemoveItem } from "@/utils/removeItem";

export const useUpdateQuantity = () => {
  const { setCart } = useCart();
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const { removeItemFromCart } = useRemoveItem();

  const [updateQuantityMutation] = useMutation(UPDATE_ITEM_QUANTITY, {
    onCompleted: (data) => {
      if (data?.updateItemQuantity) {
        const updatedCart = data.updateItemQuantity;
        setCart(updatedCart.items);
      }
      setLoadingItemId(null);
    },
    onError: (error: ApolloError) => {
      const err = JSON.parse(error.message);
      api.error({
        message: "Error",
        description: err[0]?.message,
      });
      setLoadingItemId(null);
    },
  });

  const updateItemQuantity = async (cartItemId: string, quantity: number) => {
    const validation = validateUpdateItemQuantity({ cartItemId, quantity });

    if (!validation.success) {
      api.error({
        message: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    if (quantity <= 0) {
      await removeItemFromCart(cartItemId);
      return;
    }
    await updateQuantityMutation({
      variables: { cartItemId, quantity },
    });
  };

  return {
    updateItemQuantity,
    loadingItemId,
    contextHolder,
  };
};
