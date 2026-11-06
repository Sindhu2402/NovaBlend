
import React, { useEffect, useState } from "react";
import "./App.css";

const slides = [
  {
    name: "Lime",
    title: "Sip into",
    highlight: "Freshness",
    description:
      "Discover a world of vibrant flavours with our premium lime selection. A fresh and zesty taste for moments of pure refreshment.",
    price: "$25.50",
    image: "lime.png",
    theme: "lime",
  },
  {
    name: "Coffee",
    title: "Sip into",
    highlight: "Richness",
    description:
      "Experience the deep aroma of freshly brewed coffee with silky smooth cream. A rich and delicious flavour in every sip.",
    price: "$25.50",
    image: "coffee.png",
    theme: "coffee",
  },
  {
    name: "Caramel",
    title: "Taste the",
    highlight: "Sweetness",
    description:
      "Enjoy a delicious caramel flavour with a smooth creamy finish. A perfect treat for your special moments.",
    price: "$25.50",
    image: "carmel.png",
    theme: "caramel",
  },
];

export default function App() {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowDown") nextSlide();
      if (event.key === "ArrowUp") previousSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <main className="app">
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateY(-${active * 100}vh)` }}
        >
          {slides.map((slide, index) => (
            <section className={`slide ${slide.theme}`} key={slide.name}>
              <img
                className="slide-background"
                src={slide.image}
                alt=""
              />

              <div className="image-overlay"></div>

              <div className="brand-name"></div>

              <div className="bubbles">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span className={`bubble bubble-${i + 1}`} key={i}></span>
                ))}
              </div>

              <div className="content">
                <div className="left-content">
                  <span className="eyebrow">DISCOVER THE FLAVOUR</span>

                  <h1>
                    {slide.title}
                    <br />
                    <span>{slide.highlight}</span>
                  </h1>

                  <div className="title-line"></div>

                  <p>{slide.description}</p>

                  <div className="price">{slide.price}</div>

                  <button
                    className="buy-button"
                    onClick={() => alert(`${slide.name} selected!`)}
                  >
                    Buy Now <span>↗</span>
                  </button>
                </div>
              </div>

              <div className="right-content">
                <span className="flavour-label">FLAVOUR</span>
                <h3>{slide.name}</h3>

                <div className="flavour-dots">
                  {slides.map((item, dotIndex) => (
                    <button
                      key={item.name}
                      className={`flavour-dot ${item.theme} ${
                        active === dotIndex ? "selected" : ""
                      }`}
                      onClick={() => setActive(dotIndex)}
                      aria-label={`Show ${item.name}`}
                    />
                  ))}
                </div>

                <button
                  className="side-buy-button"
                  onClick={() => alert(`${slide.name} selected!`)}
                >
                  Buy Now
                </button>
              </div>

              <div className="slide-count">
                <strong>0{index + 1}</strong> / 03
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="vertical-controls">
        <button onClick={previousSlide} aria-label="Previous slide">
          ↑
        </button>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ height: `${((active + 1) / 3) * 100}%` }}
          ></div>
        </div>

        <button onClick={nextSlide} aria-label="Next slide">
          ↓
        </button>
      </div>
    </main>
  );
}
