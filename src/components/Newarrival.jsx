import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Newarrival.css";
import QuickViewModal from "../components/QuickViewModal";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const NewArrival = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [quickProduct, setQuickProduct] = useState(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [data] = useFetch(
    "https://dummyjson.com/products/category/mens-shirts"
  );

  if (!data) return null;

  // Only show clothing
  if (!data?.products) return null;

  const products = data.products.slice(0, 8);
  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setQuickProduct(product);
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };
  const handleAddToBag = (product, e) => {
  e.stopPropagation();
  addToCart(product);
};


  return (
  <section className="new-arrival-section container my-5">

    {/* HEADER */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold mb-0">
        New Arrivals.
        <span className="text-muted ms-2">
          Latest fashion picks
        </span>
      </h2>
    </div>

    {/* SLIDER CONTAINER */}
    <div className="slider-container">

      {/* LEFT ARROW */}
      <button className="slider-arrow left" onClick={scrollLeft}>
        ❮
      </button>

      {/* SLIDER */}
      <div className="slider-wrapper" ref={sliderRef}>
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="product-image">
              <span className="badge-new">New in</span>

              <button
                className={`wishlist ${isWishlisted(product.id) ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
              >
                {isWishlisted(product.id) ? "❤️" : "♡"}
              </button>

              <img src={product.images?.[0]} alt={product.title} />

              <div className="overlay">
                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToBag(product, e)}
                >
                  <i className="bi bi-bag-check">  </i>
                  Add to bag
                </button>

                <button
                  className="quick-view"
                  onClick={(e) => handleQuickView(product, e)}
                >
                  <i className="bi bi-arrows-angle-expand"></i>
                  Quick view
                </button>
              </div>
            </div>

            <div className="product-info">
              <h6 className="product-title">{product.title}</h6>

              <div className="product-bottom">
                <span className="priceN">₹ {product.price}</span>
                <span className="rating">⭐ {product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button className="slider-arrow right" onClick={scrollRight}>
        ❯
      </button>
    </div>
    {quickProduct && (
  <QuickViewModal
    product={quickProduct}
    onClose={() => setQuickProduct(null)}
  />
)}

    
  </section>
);
};

export default NewArrival;
