import React from 'react';
import { useCart } from '@/context/CartContext';  

const Cart = () => {
  const { cart } = useCart();  

  const totalAmount = cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>${item.cost.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
