import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import HeroSlider from "../components/hero";
import NewArrival from "../components/Newarrival";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import TemplateSection from "../components/template";
import QuickViewModal from "../components/QuickViewModal";

const Home = () => {
  const [data] = useFetch("https://dummyjson.com/products?limit=194");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [quickProduct, setQuickProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSticky, setIsSticky] = useState(false);

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setQuickProduct(product);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data?.products) {
  return <h2 className="text-center mt-5">Loading...</h2>;
}


const handleAddToBag = (product, e) => {
  e.stopPropagation();
  addToCart(product);
};



  const categories = [
  "all",
  "mens-shirts",
  "mens-shoes",
  "womens-dresses",
  "womens-shoes",
  "tops"
];


  // Only clothing categories
const clothingCategories = [
  "mens-shirts",
  "mens-shoes",
  "womens-dresses",
  "womens-shoes",
  "tops",
  "sunglasses"
];

// First filter only clothing
const clothingProducts = data.products?.filter((p) =>
  clothingCategories.includes(p.category)
) || [];

// Then apply category filter
const filteredProducts =
  activeCategory === "all"
    ? clothingProducts
    : clothingProducts.filter(
        (p) => p.category === activeCategory
      );



  return (
    <div className="container-fluid">
      {/* NAVBAR */}
      <Navbar isSticky={isSticky} />

      <HeroSlider />
      <NewArrival />

      <TemplateSection/>

      <div className="heading">
        <h1>START EXPLORING.</h1>
      </div>

      {/* CATEGORY TABS */}
      <div className="category-tabs mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="container products">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="card product-card"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="product-img">
              <span className="badge-new">
                -{item.discountPercentage}%
              </span>

              <button
                className={`wishlist ${isWishlisted(item.id) ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
              >
                {isWishlisted(item.id) ? "❤️" : "♡"}
              </button>

              <img
                src={item.images?.[0]}
                className="card-img-top"
                alt={item.title}
              />

              <div className="overlay">
                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToBag(item, e)}
                >
                  <i className="bi bi-bag-check">  </i>
                  Add to bag
                </button>

                <button
                  className="quick-view"
                  onClick={(e) => handleQuickView(item, e)}
                >
                  <i className="bi bi-arrows-angle-expand"></i>
                  Quick view
                </button>
              </div>
            </div>

            <div className="card-body">
              <h6 className="card-title">
                {item.title}
              </h6>

              <h6>
                ⭐ {item.rating}
              </h6>

              <div className="product-bottom">
                <button className="priceH">
                  ₹ {item.price}
                </button>
              </div>
            </div>
          </div>
        ))}
      <QuickViewModal
        product={quickProduct}
        onClose={() => setQuickProduct(null)}
      />
      </div>
      

      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
