import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SimilarProducts.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const SimilarProducts = ({ products }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="container my-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          Similar Products
          <span className="text-muted ms-2">
            You may also like
          </span>
        </h2>

        <div>
          <button className="arrow-btn me-2" onClick={scrollLeft}>
            ←
          </button>
          <button className="arrow-btn" onClick={scrollRight}>
            →
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div className="slider-wrapper" ref={sliderRef}>
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            {/* IMAGE */}
            <div className="product-image">

              {/* Discount Badge */}
              <span className="badge-new">
                -{product.discountPercentage}%
              </span>

              {/* Wishlist */}
              <button
                className={`wishlist ${
                  isWishlisted(product.id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
              >
                {isWishlisted(product.id) ? "❤️" : "♡"}
              </button>

              <img
                src={product.images?.[0]}
                alt={product.title}
              />

              {/* OVERLAY */}
              <div className="overlay">
                <button
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <i className="bi bi-bag-check"></i>
                  Add to bag
                </button>
              </div>
            </div>

            {/* INFO */}
            <div className="product-info">
              <h6 className="product-title">
                {product.title}
              </h6>

              <p className="product-sub">
                {product.brand}
              </p>

              <div className="product-bottom">
                <span className="priceN">
                  ₹ {product.price}
                </span>

                <span className="rating">
                  ⭐ {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SimilarProducts;
