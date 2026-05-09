import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>

      <p>
        Shri Chaitanya Navnath Seva Trust ("we", "our", "us") is committed to
        protecting your privacy. This Privacy Policy explains how we collect,
        use, and safeguard your information when you visit our website.
      </p>

      <h3>1. Information We Collect</h3>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>Name, email address, and phone number</li>
        <li>Donation details such as amount and transaction ID</li>
        <li>Technical data such as IP address, browser type, and device info</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>Your information is used for:</p>
      <ul>
        <li>Processing donations securely</li>
        <li>Sending confirmation and updates</li>
        <li>Responding to inquiries</li>
        <li>Improving our website and services</li>
      </ul>

      <h3>3. Cookies and Tracking Technologies</h3>
      <p>
        We may use cookies and similar technologies to enhance user experience
        and analyze website traffic. You can control cookie settings through
        your browser.
      </p>

      <h3>4. Data Sharing and Third Parties</h3>
      <p>
        We do not sell or rent your personal data. However, we may share
        information with:
      </p>
      <ul>
        <li>Payment gateways (e.g., Razorpay) for donation processing</li>
        <li>Firebase services for secure data storage</li>
        <li>Legal authorities when required by law</li>
      </ul>

      <h3>5. Payment Security</h3>
      <p>
        All donations are processed through secure and trusted payment gateways.
        We do not store your card or banking details on our servers.
      </p>

      <h3>6. Donation Refund Policy</h3>
      <p>
        Donations made on this website are generally non-refundable. Refunds may
        be considered only in cases of duplicate transactions or technical
        errors. For refund requests, please contact us.
      </p>

      <h3>7. Data Security</h3>
      <p>
        We implement appropriate security measures to protect your personal data
        from unauthorized access, alteration, or disclosure.
      </p>

      <h3>8. User Rights</h3>
      <p>
        You have the right to request access, correction, or deletion of your
        personal data by contacting us.
      </p>

      <h3>9. Third-Party Links</h3>
      <p>
        Our website may contain links to external websites. We are not
        responsible for the privacy practices of those websites.
      </p>

      <h3>10. Policy Updates</h3>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated effective date.
      </p>

      <h3>11. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy, you can contact us:
      </p>
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

export default PrivacyPolicy;