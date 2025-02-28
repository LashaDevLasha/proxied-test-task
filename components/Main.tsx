import { useCart } from "@/context/CartContext";
import { ADD_ITEM_TO_CART } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import React from "react";

type MainProps = {
  data: Array<{
    _id: string;
    title: string;
    cost: number;
    availableQuantity: number;
  }>;
};

export default function Main({ data }: MainProps) {
  const { addItemToCart } = useCart();
  const [addItemMutation] = useMutation(ADD_ITEM_TO_CART);

  const handleAddToCart = async (product: {
    _id: string;
    title: string;
    cost: number;
    availableQuantity: number;
  }) => {
    const itemToAdd = {
      _id: product._id,
      title: product.title,
      cost: product.cost,
      quantity: 1,
    };
    await addItemMutation({
      variables: {
        productId: product._id,
        quantity: itemToAdd.quantity,
      },
    });
    addItemToCart(itemToAdd);
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <div className="products-container">
        {data.map((product) => (
          <div
            key={product._id}
            className="product-card"
            id={`product-${product._id}`}
          >
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.cost.toFixed(2)}</p>
              <p className="product-quantity">
                Available: {product.availableQuantity}
              </p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
