import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [instantBuy, setInstantBuy] = useState([]);

  /* ---------------- LOAD CART ---------------- */

  useEffect(() => {
    if (!token) {
      setCart([]);
      return;
    }

    fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.items || []);
      });
  }, [token]);

  /* ---------------- ADD ---------------- */

  const addToCart = async (product) => {
    if (!token) return alert("Please login first");

    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          quantity: 1,
        },
      }),
    });

    const data = await res.json();
    setCart(data.items);
  };

  /* ---------------- REMOVE ---------------- */

  const removeFromCart = async (productId) => {
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    setCart(data.items);
  };

  /* ---------------- UPDATE QTY ---------------- */

  const updateQty = async (productId, newQty) => {
  const res = await fetch("http://localhost:5000/api/cart/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity: newQty,
    }),
  });

  const data = await res.json();
  setCart(data.items);
};


  /* ---------------- HELPERS ---------------- */

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  /* ---------------- CLEAR (DB) ---------------- */

  const clearCart = async () => {
    if (!token) return;

    for (const item of cart) {
      await removeFromCart(item.productId);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        instantBuy,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
