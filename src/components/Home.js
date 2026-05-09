import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="home">
      <div className="hero">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Navnath Temple"
            className={`hero-slide ${index === current ? "active" : ""}`}
          />
        ))}

        <div className="hero-content">
          <h1>{t("home.welcome")}</h1>
          <p>{t("home.description")}</p>

          <div className="hero-buttons">
            <Link to="/donate" className="btn-primary">
              💰 {t("donate.submit")}
            </Link>

            <a
              href="https://www.youtube.com/watch?v=ugRqw5-DZlg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              📺 {t("home.liveDarshan")}
            </a>
          </div>
        </div>

        <button className="slide-btn prev" onClick={prevSlide}>
          ❮
        </button>
        <button className="slide-btn next" onClick={nextSlide}>
          ❯
        </button>

        {/* Dots */}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="highlights">
        <h2>✨ {t("home.temple highlights")}</h2>

        <div className="highlight-cards">
          <div className="card" data-aos="fade-up">
            <h3>🕉️ {t("home.spiritual peace")}</h3>
            <p>{t("home.p")}</p>
          </div>

          <div className="card" data-aos="fade-up">
            <h3>🙏 {t("home.daily aarti")}</h3>
            <p>{t("home.p1")}</p>
          </div>

          <div className="card" data-aos="fade-up">
            <h3>🎉 {t("home.festivals")}</h3>
            <p>{t("home.p2")}</p>
          </div>
        </div>
      </div>

      {/* Temple Timing */}
      <div className="timing-section">
        <h2>{t("home.timings")}</h2>
        <ul>
          <li>{t("home.time1")}</li>
          <li>{t("home.time2")}</li>
        </ul>

        <h3>📺 {t("home.liveDarshan")}</h3>
        <div className="live-darshan">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/ugRqw5-DZlg"
            title="Live Darshan"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Home;