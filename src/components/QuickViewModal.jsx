import { useState, useEffect } from "react";
import "./QuickViewModal.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SizeSelector from "./SizeSelector";
import AccordionItem from "./ProductAccordion";

const QuickViewModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [product, onClose]);

  if (!product) return null;

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="quick-overlay" onClick={onClose}>
      <div
        className="quick-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="drawer-content">

          {/* IMAGE */}
          <div className="drawer-image">
            <img
              src={product.images?.[0]}
              alt={product.title}
            />
          </div>

          {/* INFO */}
          <div className="drawer-info">
            <h3>{product.title}</h3>

            <div className="price-row">
              <span className="new-price">
                ₹ {discountedPrice}
              </span>

              <span className="old-price">
                ₹ {product.price}
              </span>
            </div>

            <div className="rating-box">
              ⭐ {product.rating}
            </div>

            {/* QTY */}
            <div className="qty-box">
              <button
                onClick={() =>
                  setQty(qty > 1 ? qty - 1 : 1)
                }
              >
                −
              </button>

              <span>{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            <SizeSelector />

            {/* BUTTONS */}
            <div className="drawer-buttons">
              <button
                className="btn-dark"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="btn-outline"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  onClose();
                }}
              >
                View Details
              </button>
            </div>

            {/* ACCORDION */}
            <div className="description">
              <AccordionItem
                title="Description"
                defaultOpen
              >
                <p>{product.description}</p>
              </AccordionItem>

              <AccordionItem title="Brand">
                <p>{product.brand}</p>
              </AccordionItem>

              <AccordionItem title="Category">
                <p>{product.category}</p>
              </AccordionItem>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
