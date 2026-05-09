// src/components/Contact.js
import React, { useState } from 'react';
import "./Contact.css";
import { ref, push } from "firebase/database";
import { useTranslation } from "react-i18next";
import { database } from "../firebase";


function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      message,
      timestamp: Date.now()
    };

    // Save under "contacts/" with a unique push key
    push(ref(database, 'contacts/'), contactData)
      .then(() => {
        alert('✅ Message sent successfully!');
        // Optionally, clear form:
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('❌ Error sending message:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
  <section className="contact-section">

    <div className="contact-container">

      {/* LEFT SIDE – Info */}
      <div className="contact-info">
        <h1>{t("contact.title")}</h1>

        <p><strong>{t("contact.temple")}:</strong><br />
        || Shri Chaitanya Navnath Seva Trust ||<br />
        Gorakshadham, Varangaon Road, Bhusawal,<br />
        Dist. Jalgaon, Maharashtra</p>

        <p><strong>{t("contact.phone")}:</strong> +91 9284683257</p>
        <p><strong>{t("contact.email")}:</strong> info@navnathtemple.org</p>
      </div>

      {/* RIGHT SIDE – Form */}
      <div className="contact-form-card">
        <h2>{t("contact.sendMessage")}</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <label>{t("contact.name")}:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <label>{t("contact.email")}:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>{t("contact.message")}:</label>
          <textarea
            rows="4"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />

          <button type="submit" className="contact-btn">
            {t("contact.sendMessage")}
          </button>
        </form>
      </div>

    </div>

    {/* Map Full Width Below */}
    <div className="map-container">
      <iframe
        title="Temple Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845125.9305292442!2d72.62164115000003!3d19.754908549691436!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3bd9a60a5824cd7d%3A0x4a7a0377f3193b6a!2sNavnath%20Temple!5e0!3m2!1sen!2sin!4v1749541886173!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>

  </section>
);
}

export default Contact;
