import { useState, useEffect } from "react";
import "./hero.css";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";


const slides = [
  {
    id: 1,
    image: hero1,
    title: "REIMAGINED",
    subtitle: "THE STARRY NIGHT",
    align: "left",
  },
  {
    id: 2,
    image: hero2,
    title: "THE NEXT VINTAGE",
    subtitle: "STARTS HERE",
    align: "center",
  },
  {
    id: 3,
    image: hero3,
    title: "PUNISHER",
    subtitle: "TACTICAL BACKPACK",
    align: "left",
  },
  {
    id: 4,
    image: hero4,
    title: "DARTH VADER",
    subtitle: "SNEAKERS",
    align: "left",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <section className="hero">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${
            index === current ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div
            className={`hero-content ${slide.align} text-black`}
          >
            <p>{slide.subtitle}</p>
            <h1>{slide.title}</h1>
            <button className="btn btn-dark rounded-pill px-4 py-2 mt-3">Explore Now</button>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>
      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={
              index === current ? "dot active" : "dot"
            }
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
