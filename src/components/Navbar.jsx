import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./navbar.css";
import a1 from "../assets/testimonials/a1.jpg";
import CartOverlay from "./CartOverlay";
import { useCart } from "../context/CartContext";
import WishlistOverlay from "./WishlistOverlay";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ isSticky }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const { cartCount, clearCart } = useCart();
  const { wishlistCount, clearWishlist } = useWishlist();

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    if (!user) return;

    logout();
    clearWishlist();

    navigate("/", { replace: true });
  };

  /* ---------------- CLOSE DROPDOWN OUTSIDE CLICK ---------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-light ${
          isSticky ? "sticky-nav" : ""
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🛒 MyShop
          </Link>

          <div className="ms-auto d-flex align-items-center gap-3">

            {/* SEARCH */}
            <div className="search-wrapper">
              {!showSearch ? (
                <button
                  className="search-toggle"
                  onClick={() => setShowSearch(true)}
                >
                  <i className="bi bi-search"></i>
                </button>
              ) : (
                <form
                  className="search-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowSearch(false);
                  }}
                >
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search products"
                    autoFocus
                  />

                  <button className="btn btn-primary">
                    Search
                  </button>

                  <button
                    type="button"
                    className="close-search"
                    onClick={() => setShowSearch(false)}
                  >
                    ✕
                  </button>
                </form>
              )}
            </div>

            {/* PROFILE */}
            <div className="profile-wrapper" ref={dropdownRef}>
              <button
                className="profile-btn"
                onClick={() => setOpen(!open)}
              >
                <i className="bi bi-person-circle"></i>
              </button>

              {open && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <img src={a1} alt="User" />
                    <div>
                      <h5>{user ? user.username : "Guest"}</h5>
                      <span>
                        {user ? user.email : "Not logged in"}
                      </span>
                    </div>
                  </div>

                  <ul>
                    {user && <li onClick={() => navigate("/account")}>My Account</li>}
                    {user && <li onClick={() => navigate("/orders")}>My Orders</li>}
                    <li onClick={() => setShowWishlist(true)}>Wishlist</li>
                  </ul>

                  <div className="divider"></div>

                  <ul>
                    <li>Help</li>
                    {user ? (
                      <li className="logout" onClick={handleLogout}>
                        Log out
                      </li>
                    ) : (
                      <li onClick={() => navigate("/login")}>
                        Login
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* CART */}
            <div className="cart">
              <button
                className="Cart-btn"
                onClick={() => setShowCart(true)}
              >
                <i className="bi bi-cart"></i>
                {cartCount > 0 && (
                  <span className="badge">{cartCount}</span>
                )}
              </button>
            </div>

            {/* WISHLIST */}
            <div className="wishlist-icon">
              <button onClick={() => setShowWishlist(true)}>
                <i className="bi bi-heart"></i>
                {wishlistCount > 0 && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      <WishlistOverlay
        open={showWishlist}
        onClose={() => setShowWishlist(false)}
      />

      <CartOverlay
        open={showCart}
        onClose={() => setShowCart(false)}
      />
    </>
  );
};

export default Navbar;
