import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 - Temple Info */}
        <div className="footer-col">
          <h3>Shri Chaitanya Navnath Seva Trust</h3>
          <p>
            A holy place of peace, devotion and blessings.
            The temple is developing with the grace of Shri Siddhnath Maharaj.
          </p>

          <div className="social-icons">
            <a href="https://www.facebook.com/100083481611436/about/"><FaFacebookF /></a>
            <a href="https://www.instagram.com/"><FaInstagram /></a>
            <a href="https://www.youtube.com/channel/UCF6GgtEr4K8FJoK4aLpaQCw"><FaYoutube /></a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/committee">Committee</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt /> Gorakshadham, Varangaon Road, Bhusawal</p>
          <p><FaPhone /> +91 9284683257</p>
          <p><FaEnvelope /> info@navnathtemple.org</p>
        </div>

        {/* Column 4 - Mini Map */}
        <div className="footer-col">
          <h4>Location</h4>
          <div className="footer-map">
            <iframe
              title="Temple Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845125.9305292442!2d72.62164115000003!3d19.754908549691436!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3bd9a60a5824cd7d%3A0x4a7a0377f3193b6a!2sNavnath%20Temple!5e0!3m2!1sen!2sin!4v1749541886173!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
  © {new Date().getFullYear()} Shri Chaitanya Navnath Seva Trust |
  All Rights Reserved | Trust Reg. No: E-884 / Jalgaon

  <div className="footer-extra">
    <Link to="/privacy-policy">Privacy Policy</Link> | 
    <Link to="/terms-conditions">Terms & Conditions</Link> | 
    <span>Designed & Developed with ❤️</span>
  </div>
</div>

    </footer>
  );
}

export default Footer;