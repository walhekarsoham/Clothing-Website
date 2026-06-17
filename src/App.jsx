import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CartOverlay from "./components/CartOverlay";
import Checkout from "./pages/CheckOut";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Product Details */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Cart */}
      <Route path="/cart" element={<CartOverlay />} />

      {/* Protected Checkout */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

    </Routes>
  );
}

export default App;
