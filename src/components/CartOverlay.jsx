import "./cartOverlay.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartOverlay = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQty } = useCart();

  const navigate = useNavigate();

  // Lock background scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: "/checkout" },
      });
    } else {
      onClose();
      navigate("/checkout");
    }
  };

  return (
    <div className={`cart-overlay ${open ? "open" : ""}`}>
      {/* HEADER */}
      <div className="cart-header">
        <h4>Shopping Cart</h4>
        <button onClick={onClose}>✕</button>
      </div>

      {/* BODY */}
      <div className="cart-body">
        {cart.length === 0 ? (
          <p className="empty">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.productId}>

              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />

              <div className="cart-info">
                <h6>{item.title}</h6>

                <div className="qty-control">
                  <button
                    onClick={() =>
                      updateQty(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

              </div>

              <div className="price-actions">
                <span className="price-pill">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  className="remove-link"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))

        )}
      </div>

      {/* FOOTER */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <p className="note">
            Shipping and taxes calculated at checkout.
          </p>

          <div className="cart-actions">
            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Check out
            </button>
          </div>

          <p className="continue" onClick={onClose}>
            or CONTINUE SHOPPING →
          </p>
        </div>
      )}
    </div>
  );
};

export default CartOverlay;
