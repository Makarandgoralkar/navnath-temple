// src/components/Events.js
import React from "react";
import "./Events.css";
import { useTranslation } from "react-i18next";

function Events() {

   const { t } = useTranslation();
  return (
    <section className="events">

      <h1 className="events-title">{t("events.title")}</h1>

      {/* Darshan Timings */}
      <div className="darshan-section">
        <h2>🕉️ {t("events.darshan")}</h2>
        <table className="darshan-table">
          <thead>
            <tr>
              <th>{t("events.session")}</th>
              <th>{t("events.time")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("events.morning")}</td>
              <td>{t("events.morningtime")}</td>
            </tr>
            <tr>
              <td>{t("events.afternoon")}</td>
              <td>{t("events.afternoontime")}</td>
            </tr>
            <tr>
              <td>{t("events.evening")}</td>
              <td>{t("events.eveningtime")}</td>
            </tr>
            <tr>
              <td>{t("events.night")}</td>
              <td>{t("events.nighttime")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-section">
        <h2>✨ {t("events.upcoming")}</h2>

        <div className="event-card">
          <h3>{t("events.navratri")}</h3>
          <p><strong>{t("events.date")}:</strong> {t("events.date1")}</p>
          <p>{t("events.special")}</p>
        </div>

        <div className="event-card">
          <h3>{t("events.dussehra")}</h3>
          <p><strong>{t("events.date")}:</strong> {t("events.date2")}</p>
          <p>{t("events.grand")}</p>
        </div>

        <div className="event-card">
          <h3>{t("events.diwali")}</h3>
          <p><strong>{t("events.date")}:</strong> {t("events.date3")}</p>
          <p>{t("events.ceremony")}</p>
        </div>
      </div>

      {/* Parayan Section */}
      <div className="parayan-section">
        <h2>📖 {t("events.parayan")}</h2>

        <div className="parayan-grid">

          <div className="pothi-card">
            <img src="/images/gurucharitra.jpg" alt="Gurucharitra Pothi" />
            <h3>{t("events.gurucharitra")}</h3>
            <a href="/pothis/gurucharitra.pdf" download>
              📥 {t("events.download")}
            </a>
          </div>

          <div className="pothi-card">
            <img src="/images/navnath-bhaktisar.jpg" alt="Navnath Bhaktisar Pothi" />
            <h3>{t("events.navnathbhaktisar")}</h3>
            <a href="/pothis/navnathbhaktisar.pdf" download>
              📥 {t("events.download")}
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Events;