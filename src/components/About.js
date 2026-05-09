import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";
import { useTranslation } from "react-i18next";

function About() {

  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="about-section">

      {/* Hero */}
      <div className="about-hero" data-aos="fade-down">
        <h1>{t("about.shri")}</h1>
        <p className="subtitle">{t("about.peace")}</p>
      </div>

      {/* Stats Section */}
      <div className="stats-section" data-aos="fade-up">
        <div className="stat">
          <h2>20+</h2>
          <p>{t("about.years")}</p>
        </div>
        <div className="stat">
          <h2>5000+</h2>
          <p>{t("about.bhakta")}</p>
        </div>
        <div className="stat">
          <h2>100+</h2>
          <p>{t("about.annual")}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline" data-aos="fade-right">
        <h2>📜 {t("about.temple")}</h2>

        <div className="timeline-item">
          <img src="/images/gallery2.jpg" alt="2002" className="timeline-img" />
          <div>
            <span>2002</span>
            <p>{t("about.inspiration")}</p>
          </div>
        </div>

        <div className="timeline-item">
          <img src="/images/gallery3.jpg" alt="2010" className="timeline-img" />
          <div>
            <span>2010</span>
            <p>{t("about.beginning")}</p>
          </div>
        </div>

        <div className="timeline-item">
          <img src="/images/gallery4.jpg" alt="2023" className="timeline-img" />
          <div>
            <span>2023</span>
            <p>{t("about.expansion")}</p>
          </div>
        </div>
      </div>

      {/* Guru Message */}
      <div className="guru-message" data-aos="zoom-in">
        <img 
          src="/images/gallery8.jpg" 
          alt="Guru"
          className="guru-img"
        />
        <h2>{t("about.message")}</h2>
        <blockquote>
          {t("about.devotion")}
        </blockquote>
        <p>{t("about.venerable")}</p>
      </div>

    </section>
  );
}

export default About;