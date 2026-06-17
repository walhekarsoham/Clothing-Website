import { useState } from "react";
import "./SizeSelector.css";

const SizeSelector = () => {
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("S");

  return (
    <div className="size-wrapper">
      <h5 className="size-title">Size</h5>

      <div className="size-options">
        {sizes.map((size) => (
          <button
            key={size}
            className={`size-btn ${
              selectedSize === size ? "active" : ""
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
