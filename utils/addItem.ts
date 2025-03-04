import { useCart } from "@/context/CartContext";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_CART } from "@/graphql/mutations";
import { notification } from "antd";
import { validateAddItem } from "@/utils/zodValidation";
import { ApolloError } from "@apollo/client";
import { CartItem } from "@/types/types";
import { useState } from "react";

export const useAddItem = () => {
  const { setCart } = useCart();
  const [api, contextHolder] = notification.useNotification();
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const [addItemMutation] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted: (data) => {
      if (data?.addItem) {
        const updatedCart = data.addItem;
        setCart(updatedCart.items);
        api.success({
          message: "Item Added",
          description: `The item has been successfully added to your cart.`,
        });
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

  const addItemToCart = async (item: CartItem) => {
    const validation = validateAddItem({
      productId: item._id,
      quantity: item.quantity,
    });

    if (!validation.success) {
      validation.error.errors.forEach((err) => {
        api.error({
          message: "Validation Error",
          description: err.message,
        });
      });
      return;
    }

    setLoadingItemId(item._id);

    await addItemMutation({
      variables: { input: { productId: item._id, quantity: item.quantity } },
    });
  };

  return {
    addItemToCart,
    loadingItemId,
    contextHolder,
  };
};
