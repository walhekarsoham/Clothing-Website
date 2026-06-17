import "./CheckOut.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CheckOut = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  /* ---------------- PROTECT ROUTE ---------------- */

  useEffect(() => {
    if (!token) {
      navigate("/login", {
        state: { from: "/checkout" },
      });
    }
  }, [token, navigate]);

  if (!token) return null;

  /* ---------------- NORMALIZE ITEMS ---------------- */

  const checkoutItems = location.state?.buyNowProduct
    ? [
        {
          productId: location.state.buyNowProduct.id,
          title: location.state.buyNowProduct.title,
          price: location.state.buyNowProduct.price,
          image:
            location.state.buyNowProduct.images?.[0] ??
            location.state.buyNowProduct.image,
          quantity: 1,
        },
      ]
    : cart;

  const formatPrice = (v) => Number(v).toFixed(2);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- PLACE ORDER ---------------- */

  const handlePlaceOrder = async () => {
  if (checkoutItems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:5000/api/payment/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: subtotal,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert("Payment initiation failed");
      return;
    }

    const redirectUrl =
      data.data.instrumentResponse.redirectInfo.url;

    window.location.href = redirectUrl;

  } catch (error) {
    console.error(error);
    alert("Payment failed");
  }
};



  return (
    <>
      <Navbar isSticky={true} />

      <div className="checkout-page container mt-5">
        <div className="checkout-grid">

          {/* LEFT — BILLING */}
          <div className="checkout-left">
            <h3>Billing Details</h3>

            <form className="billing-form">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <input type="tel" placeholder="Mobile Number" />
              <input type="text" value="India" readOnly />
              <input type="text" placeholder="Street Address" />

              <div className="row-2">
                <input type="text" placeholder="City" />
                <input type="text" placeholder="State" />
              </div>

              <input type="text" placeholder="ZIP / Postal Code" />
            </form>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="checkout-right">
            <h3>Your Order</h3>

            <div className="order-items">
              {checkoutItems.map((item) => (
                <div className="order-item" key={item.productId}>
                  <div className="order-left">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/80")
                      }
                    />

                    <div className="order-info">
                      <p className="order-title">{item.title}</p>
                      <span className="order-qty">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="order-price">
                    <p>
                      ₹ {formatPrice(item.price * item.quantity)}
                    </p>

                    {!location.state?.buyNowProduct && (
                      <button
                        className="remove-link"
                        onClick={() =>
                          removeFromCart(item.productId)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹ {formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="summary-row total">
                <span>Total</span>
                <span>₹ {formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="payment">
              <h4>Payment Method</h4>

              <label className="radio">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Credit / Debit Card
              </label>

              <label className="radio">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                UPI / Digital Wallet
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="payment-form">
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Name on Card" />
                <div className="row">
                  <input type="text" placeholder="MM / YY" />
                  <input type="password" placeholder="CVV" />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="payment-form">
                <input type="text" placeholder="UPI ID" />
              </div>
            )}

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckOut;
