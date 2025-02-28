import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeItemFromCart, updateItemQuantity } = useCart();

  const handleRemoveItem = (itemId: string) => {
    removeItemFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity > 0) {
      updateItemQuantity(itemId, quantity);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.title}</h3>
              <p>Price: ${item.cost}</p>
              <p>Quantity: 
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
              </p>
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
