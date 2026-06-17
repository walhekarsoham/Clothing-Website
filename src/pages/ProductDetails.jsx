import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./productDetails.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import SizeSelector from "../components/SizeSelector";
import AccordionItem from "../components/ProductAccordion";
import SimilarProducts from "../components/SimilarProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const [data] = useFetch(`https://dummyjson.com/products/${id}`);
  const [activeImg, setActiveImg] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.category) return;

    fetch(`https://dummyjson.com/products/category/${data.category}`)
      .then((res) => res.json())
      .then((res) => {
        const filtered = res.products.filter(
          (p) => p.id !== data.id
        );
        setSimilarProducts(filtered.slice(0, 4));
      })
      .catch(console.error);
  }, [data?.category, data?.id]);

  if (!data) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const discountedPrice = (
    data.price -
    (data.price * data.discountPercentage) / 100
  ).toFixed(2);

  const clothingCategories = [
  "mens-shirts",
  "womens-dresses",
  "tops"
];

return (
  <>
    <Navbar />

    <div className="container product-page py-5">
      <div className="row g-5">

        {/* LEFT - IMAGE GALLERY */}
        <div className="col-lg-6">
          <div className="main-image-wrapper">
            <img
              src={data.images?.[activeImg]}
              alt={data.title}
              className="main-image"
            />
          </div>

          <div className="thumbnail-row">
            {data.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                className={`thumbnail ${activeImg === index ? "active" : ""}`}
                onClick={() => setActiveImg(index)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="col-lg-6">
          <h2 className="product-title">{data.title}</h2>

          <div className="rating">
            ⭐ {data.rating} Rating
          </div>

          {/* PRICE */}
          <div className="price-section">
            <span className="discount">
              -{Math.round(data.discountPercentage)}%
            </span>

            <div className="price-wrapper">
              <span className="final-price">
                ₹ {discountedPrice}
              </span>
              <span className="original-price">
                ₹ {data.price}
              </span>
            </div>
          </div>

          {/* SIZE SELECTOR */}
          {clothingCategories.includes(data.category) && (
            <SizeSelector />
          )}

          {/* BUTTONS */}
          <div className="button-group">
            <button
              className="btn-outline"
              onClick={() => addToCart(data)}
            >
              Add to Cart
            </button>

            <button
              className="btn-primary"
              onClick={() =>
                navigate("/checkout", {
                  state: { buyNowProduct: { ...data, qty: 1 } },
                })
              }
            >
              Buy Now
            </button>
          </div>

          {/* ACCORDION */}
          <div className="description pt-4">
            <AccordionItem title="Description" defaultOpen>
              <p>{data.description}</p>
            </AccordionItem>

            <AccordionItem title="Brand">
              <p>{data.brand}</p>
            </AccordionItem>

            <AccordionItem title="Category">
              <p>{data.category}</p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <SimilarProducts products={similarProducts} />

    </div>

    <Footer />
  </>
);

};

export default ProductDetails;
