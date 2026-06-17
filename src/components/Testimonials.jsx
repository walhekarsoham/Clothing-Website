import { useState, useEffect, useRef } from "react";
import "./Testimonials.css";

import a1 from "../assets/testimonials/a1.jpg";
import a2 from "../assets/testimonials/a2.jpg";
import a3 from "../assets/testimonials/a3.jpg";

const testimonials = [
  {
    text: "Great quality products, affordable prices, fast and friendly delivery. I highly recommend.",
    name: "Lennie Swiffan",
    img: a1,
  },
  {
    text: "Amazing customer service and premium quality. Shopping experience was seamless.",
    name: "Tiana Abie",
    img: a2,
  },
  {
    text: "Fast delivery, excellent packaging, and top-notch quality. Highly satisfied!",
    name: "Berta Emili",
    img: a3,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="testimonials">
      <div className="heading">
        <h2 className="title">
          Good news from far away <span>🏅</span>
        </h2>
        <p className="subtitle">
          Let's see what people think of MyShop
        </p>
      </div>

      <div
        className="testimonial-wrapper"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        {/* ARROWS */}
        <button className="arrow left" onClick={prevSlide}>
          ←
        </button>

        <button className="arrow right" onClick={nextSlide}>
          →
        </button>

        {/* SLIDER */}
        <div className="slider">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${active * 100}%)`,
            }}
          >
            {testimonials.map((item, i) => (
              <div className="slide" key={i}>
                <img
                  className="testi-image"
                  src={item.img}
                  alt={item.name}
                />

                <p className="quote-text">“{item.text}”</p>

                <h4 className="author">{item.name}</h4>

                <div className="stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
