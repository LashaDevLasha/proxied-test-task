import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("cartId");
    router.push("/login");
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <header>
      <button
        onClick={handleLogout}
        style={{ marginLeft: "20px" }}
      >
        Logout
      </button>
      <button
        onClick={handleGoToCart}
        style={{ marginLeft: "20px" }}
      >
        Go to Cart
      </button>
    </header>
  );
}
