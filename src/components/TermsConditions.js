import React from "react";
import "./TermsConditions.css";

function TermsConditions() {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>

      <p>
        Welcome to Shri Chaitanya Navnath Seva Trust ("we", "our", "us"). By
        accessing and using our website, you agree to comply with and be bound
        by the following Terms & Conditions.
      </p>

      <h3>1. Website Usage</h3>
      <p>
        This website is intended for devotional, informational, and donation
        purposes only. You agree to use the website lawfully and not engage in
        any activity that may harm the website or its users.
      </p>

      <h3>2. User Responsibilities</h3>
      <ul>
        <li>Provide accurate information when making donations or inquiries</li>
        <li>Not misuse the website or attempt unauthorized access</li>
        <li>Respect religious sentiments and website content</li>
      </ul>

      <h3>3. Donations</h3>
      <p>
        All donations made on this website are voluntary and are used for temple
        development, maintenance, and charitable activities.
      </p>

      <h3>4. Payment Terms</h3>
      <p>
        Payments are processed through secure third-party gateways such as
        Razorpay. We do not store your card or banking details on our servers.
      </p>

      <h3>5. Refund & Cancellation</h3>
      <p>
        Donations are non-refundable. However, in case of duplicate transactions
        or technical errors, users may request a refund by contacting us within
        a reasonable time.
      </p>

      <h3>6. Intellectual Property</h3>
      <p>
        All content on this website, including text, images, logos, and design,
        is the property of Shri Chaitanya Navnath Seva Trust and may not be
        copied or reused without permission.
      </p>

      <h3>7. Limitation of Liability</h3>
      <p>
        The Trust shall not be held responsible for any direct, indirect, or
        incidental damages arising from the use or inability to use this
        website.
      </p>

      <h3>8. Third-Party Links</h3>
      <p>
        Our website may include links to external websites. We are not
        responsible for their content or practices.
      </p>

      <h3>9. Privacy</h3>
      <p>
        Your use of this website is also governed by our Privacy Policy.
      </p>

      <h3>10. Changes to Terms</h3>
      <p>
        We reserve the right to update or modify these Terms & Conditions at any
        time without prior notice. Continued use of the website constitutes your
        acceptance of the updated terms.
      </p>

      <h3>11. Governing Law</h3>
      <p>
        These terms shall be governed and interpreted in accordance with the
        laws of India.
      </p>

      <h3>12. Contact Us</h3>
      <p>If you have any questions regarding these Terms & Conditions:</p>
      <ul>
        <li>Email: info@navnathtemple.org</li>
        <li>Phone: +91 9284683257</li>
        <li>Address: Navnath Temple, Maharashtra, India</li>
      </ul>

      <p className="last-updated">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}

export default TermsConditions;