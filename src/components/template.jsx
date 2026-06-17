import { useEffect, useRef } from "react";
import "../components/template.css";
import giftImg from "../assets/gift.jpg"; // Replace with your image

const TemplateSection = () => {
  const sectionRef = useRef(null);

  // Scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("show");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <h1 className="heading fw-bolder">GIFT SECTION</h1>

        <section className="gifting-section" ref={sectionRef}>
        
      <div className="gifting-container">
        
        {/* LEFT CONTENT */}
        <div className="gifting-text">
          <h5>HANDPICKED & HEARTFELT</h5>

          <h1>
            Make them smile
          </h1>

          <p>
            We have curated the perfect gifting list for you.
            Surprise your loved ones with something special.
          </p>

          <button className="gift-btn">
            Check It Out
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="gifting-image">
          <img src={giftImg} alt="Gift Boxes" />
        </div>

      </div>
    </section>
    </>
  );
};

export default TemplateSection;
