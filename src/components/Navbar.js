import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaCalendarAlt,
  FaImages,
  FaDonate,
  FaPhone,
  FaUserShield
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const closeMenu = () => setMenuOpen(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <nav className="navbar">

      {/* TOP ROW */}
      <div className="nav-top">

        {/* Language */}
        <div className="language-toggle">
          <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
            <option value="sa">संस्कृतम्</option>
            <option value="gu">ગુજરાતી</option>
          </select>
        </div>

        {/* Title */}
        <div className="nav-title">
          <img src="/images/gallery3.jpg" alt="logo" className="nav-logo" />
          <span>{t("nav.Shri Chaitanya Navnath Seva Trust")}</span>
        </div>

        {/* ✅ ADMIN BUTTON */}
        <div className="admin-login">
          <NavLink to="/admin-login">
            <FaUserShield /> Admin
          </NavLink>
        </div>

      </div>

      {/* NAV LINKS */}
      <div className="nav-container">

        {/* Overlay */}
        {menuOpen && <div className="overlay" onClick={closeMenu}></div>}

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Sidebar */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li>
            <NavLink to="/" onClick={closeMenu}>
              <FaHome /> {t("nav.home")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={closeMenu}>
              <FaInfoCircle /> {t("nav.about")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/committee" onClick={closeMenu}>
              <FaUsers /> {t("nav.committee")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/events" onClick={closeMenu}>
              <FaCalendarAlt /> {t("nav.events")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/gallery" onClick={closeMenu}>
              <FaImages /> {t("nav.gallery")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/donate" onClick={closeMenu}>
              <FaDonate /> {t("nav.donate")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              <FaPhone /> {t("nav.contact")}
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;