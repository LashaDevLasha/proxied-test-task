import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { GetServerSidePropsContext } from "next";
import { GET_CART } from "@/graphql/queries";
import client from "@/graphql/apollo-client";
import { useRemoveItem } from "@/utils/removeItem"; 
import { useUpdateQuantity } from "@/utils/updateQuantity"; 
import type { Cart } from "@/types/types";
import { Spin } from "antd";

type Props = {
  cartData: Cart;
};

const Cart = ({ cartData }: Props) => {
  const { setCart, cart } = useCart();
  const { removeItemFromCart, loadingItemId: loadingRemoveId, contextHolder: removeContextHolder } = useRemoveItem();
  const { updateItemQuantity, loadingItemId: loadingUpdateId, contextHolder: updateContextHolder } = useUpdateQuantity();

  const contextHolder = (
    <>
      {removeContextHolder}
      {updateContextHolder}
    </>
  );

  useEffect(() => {
    if (cartData && cartData.items) {
      setCart(cartData.items);
    }
  }, [cartData, setCart]);

  return (
    <div className="cart-page">
      {contextHolder}
      <h2 className="cart-header">Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.product?.title}</h3>
                <p className="cart-item-price">${item.product?.cost}</p>

                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                    disabled={loadingUpdateId === item._id}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="quantity-btn"
                    onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                    disabled={loadingUpdateId === item._id}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeItemFromCart(item._id)}
                disabled={loadingRemoveId === item._id}
              >
                {loadingRemoveId === item._id ? (
                  <Spin size="small" />
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="total-cost">
          <p>Total:</p>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.authToken || null;
  const { data } = await client.query({
    query: GET_CART,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      cartData: data.getCart || { items: [] },
    },
  };
}
