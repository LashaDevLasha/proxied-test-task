import { useAddItem } from "@/utils/addItem";
import { Spin } from "antd";
import { ProductType } from "@/types/types";

type MainProps = {
  productsData: ProductType[];
};

export default function Main({ productsData }: MainProps) {
  const { addItemToCart, loadingItemId, contextHolder } = useAddItem();

  const handleAddToCart = async (product: ProductType) => {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    await addItemToCart(cartItem);
  };

  if (!productsData || productsData.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="product-list">
      {contextHolder}
      <h2>Product List</h2>
      <div className="products-container">
        {productsData.map((product) => {
          if (!product || !product._id) {
            console.error("Invalid product:", product);
            return null;
          }

          return (
            <div key={product._id} className="product-card">
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">
                  ${product.cost ? product.cost.toFixed(2) : "0.00"}
                </p>
                <p className="product-quantity">
                  Available: {product.availableQuantity}
                </p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={loadingItemId === product._id}
                >
                  {loadingItemId === product._id ? (
                    <Spin size="small" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
