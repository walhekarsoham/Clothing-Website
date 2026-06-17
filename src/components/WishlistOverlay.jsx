import { useEffect } from "react";
import "./wishlistOverlay.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const WishlistOverlay = ({ open, onClose }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <div
      className={`wishlist-overlay ${open ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        className="wishlist-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="wishlist-header">
          <h4>Wishlist</h4>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="wishlist-body">
          {wishlist.length === 0 ? (
            <p className="empty">Your wishlist is empty</p>
          ) : (
            wishlist.map((item) => (
              <div className="wishlist-item" key={item.id}>
                <img
                  src={item.image}  
                  alt={item.title}
                  onClick={() => {
                    onClose();
                    navigate(`/product/${item.id}`);
                  }}
                />

                <div className="wishlist-info">
                  <p className="title">{item.title}</p>

                  <span className="price">
                    ₹ {item.price}
                  </span>

                  <div className="actions">
                    <button
                      className="add-cart"
                      onClick={() => {
                        addToCart(item);
                        toggleWishlist(item);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="remove"
                      onClick={() =>
                        toggleWishlist(item)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistOverlay;
