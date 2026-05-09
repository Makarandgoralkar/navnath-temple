import React, { useState, useEffect } from 'react';
import "./Donate.css";
import { ref, push, runTransaction } from "firebase/database";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import { State, City } from "country-state-city";
import { database } from "../firebase";

function Donate() {

  const { t } = useTranslation();

  // ✅ STATES
  const [title, setTitle] = useState("Mr.");
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [donationFor, setDonationFor] = useState("General Donation"); // ✅ NEW
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

   // ✅ NEW STATES + CITIES
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  // ✅ LOAD STATES (India)
  useEffect(() => {
    const states = State.getStatesOfCountry("IN");
    setAllStates(states);
  }, []);

  // ✅ HANDLE STATE CHANGE
  const handleStateChange = (stateCode) => {
    setState(stateCode);
    setCity('');

    const cities = City.getCitiesOfState("IN", stateCode);
    setAllCities(cities);
  };

  const upiId = "vfa3arsrxk7p@idbi";
  const upiLink = `upi://pay?pa=${upiId}&pn=Navnath Mandir&am=${amount}&cu=INR`;

  const resetForm = () => {
  setTitle("Mr.");
  setName('');
  setMobile('');
  setEmail('');
  setDonationFor("General Donation");
  setAddress('');
  setCity('');
  setState('');
  setPincode('');
  setAmount('');
  setMessage('');
};

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const donationMap = {
  "Abhishek": "Abhishek Nidhi",
  "Annadan Fund": "Annadan Nidhi",
  "Building Fund": "Imarat Nidhi",
  "Education Fund": "Shikshan Nidhi",
  "General Donation": "Donation"
};

const getNextReceiptNumber = async () => {
  const counterRef = ref(database, "receiptCounter");

  const result = await runTransaction(counterRef, (current) => {
    return (current || 0) + 1;
  });

  return result.snapshot.val();
};
  // ✅ RECEIPT
  const generateReceipt = async (paymentId) => {

  const doc = new jsPDF();

  const receiptNumber = await getNextReceiptNumber();
  const receiptNo = `DnG/${new Date().getFullYear()}/${receiptNumber}`;
  const date = new Date().toLocaleDateString();

  doc.setDrawColor(0);
  doc.rect(10, 10, 190, 270);

  doc.addImage("/images/gallery3.jpg", "JPG", 15, 15, 20, 20);

  doc.setFontSize(14);
  doc.setTextColor(150, 0, 0);
  doc.text("|| Shree Chaitanya Navnath Seva Trust ||", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  // ✅ TRUST LINE BOLD
  doc.setFont("helvetica", "bold");
  doc.text("(Registered Public Trust – Reg. No. E-884 Jalgaon)", 105, 26, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.text("Address: Gorakshdham, Varangaon road, Bhusawal, Dist.Jalgaon, Maharashtra - 425201", 105, 32, { align: "center" });
  doc.text("Email: info@navnathtemple.org | Phone: +91 9284683257", 105, 38, { align: "center" });

  doc.line(15, 42, 195, 42);

  doc.setFontSize(10);

  // ✅ Receipt No & Date
  doc.setFont("helvetica", "bold");
  doc.text("Receipt No:", 15, 50);
  doc.text("Date:", 150, 50);

  doc.setFont("helvetica", "normal");
  doc.text(receiptNo, 45, 50);
  doc.text(date, 165, 50);

  // ✅ Name & Email
  doc.setFont("helvetica", "bold");
  doc.text("Name:", 15, 58);
  doc.text("Email:", 15, 65);

  doc.setFont("helvetica", "normal");
  doc.text(`${title} ${name}`, 40, 58);
  doc.text(email, 40, 65);

  // ✅ Donation For
  doc.setFont("helvetica", "bold");
  doc.text("Donation For:", 15, 72);

  doc.setFont("helvetica", "normal");
  doc.text(donationFor, 60, 72);

  doc.rect(15, 75, 180, 70);

  // ✅ Table Header Bold
  doc.setFont("helvetica", "bold");
  doc.text("Particulars", 20, 82);
  doc.text("Amount", 160, 82);

  doc.line(15, 85, 195, 85);

  let y = 92;

  const items = [
    "Abhishek Nidhi",
    "Annadan Nidhi",
    "Imarat Nidhi",
    "Shikshan Nidhi",
    "Donation"
  ];

  const selectedParticular = donationMap[donationFor];

  doc.setFont("helvetica", "normal");

  items.forEach((item) => {
    doc.text(item, 20, y);

    if (item === selectedParticular) {
      doc.text(`${amount}/-`, 160, y);
    }

    y += 8;
  });

  // ✅ Total Bold
  doc.setFont("helvetica", "bold");
  doc.text("Total", 20, y);
  doc.text(`${amount}/-`, 160, y);

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Thank you for your generous contribution! May Shri Navnath Maharaj bless you.",
    105,
    155,
    { align: "center" }
  );

  // ✅ Signature Section Bold
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Signature", 20, 180);
  doc.text("Receipt Issued By", 150, 180);

  doc.save(`Donation_Receipt_${receiptNo}.pdf`);
};

  // ✅ PAYMENT
  const handlePayment = async (e) => {

    e.preventDefault();

    if (!name || !mobile || !email || !address || !city || !state || !pincode) {
      alert("Please fill all required fields");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay failed');
      return;
    }

    const options = {
      key: 'rzp_test_ROXqfaxUd3xyLY',
      amount: amount * 100,
      currency: 'INR',
      name: 'Temple Donation',
      description: 'Donation to Navnath Mandir',

      handler: async function (response) {

        alert('Payment Successful!\nID: ' + response.razorpay_payment_id);

        const donationData = {
          title,
          name,
          mobile,
          email,
          donationFor, // ✅ NEW
          address,
          city,
          state,
          pincode,
          amount,
          message,
          paymentId: response.razorpay_payment_id,
          timestamp: Date.now()
        };

        push(ref(database, 'donations'), donationData);

        await generateReceipt(response.razorpay_payment_id);

        resetForm();
      },

      prefill: { name, email, contact: mobile },
      notes: { message },
      theme: { color: '#b76e00' }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (

    <section className="donate-section">
      <div className="donate-card">

        <h1>{t("donate.title")}</h1>

        <form onSubmit={handlePayment} className="donate-form">

          <label>{t("donate.title1")}:</label>
          <select value={title} onChange={(e) => setTitle(e.target.value)}>
            <option>{t("donate.mr")}</option>
            <option>{t("donate.mrs")}</option>
            <option>{t("donate.miss")}</option>
          </select>

          <label>{t("donate.name")}:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />

          <label>{t("donate.mobile")}:</label>
          <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} pattern="[0-9]{10}" required />

          <label>{t("donate.email")}:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          {/* ✅ NEW FIELD */}
          <label>{t("donate.donation for")}:</label>
          <select value={donationFor} onChange={(e) => setDonationFor(e.target.value)}>
            <option value="Abhishek">{t("donate.abhishek")}</option>
            <option value="Annadan Fund">{t("donate.annadan")}</option>
            <option value="Building Fund">{t("donate.building")}</option>
            <option value="Education Fund">{t("donate.education")}</option>
            <option value="General Donation">{t("donate.general donation")}</option>
          </select>

          <label>{t("donate.amount")} (₹):</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />

          <label>{t("donate.address")}:</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} required />

          {/* ✅ STATE */}
<label>{t("donate.state")}:</label>
<select value={state} onChange={(e) => handleStateChange(e.target.value)} required>
  <option value="">Select State</option>
  {allStates.map((s) => (
    <option key={s.isoCode} value={s.isoCode}>
      {s.name}
    </option>
  ))}
</select>

{/* ✅ CITY */}
<label>{t("donate.city")}:</label>
<select value={city} onChange={(e) => setCity(e.target.value)} required>
  <option value="">Select City</option>
  {allCities.map((c, index) => (
    <option key={index} value={c.name}>
      {c.name}
    </option>
  ))}
</select>

          <label>{t("donate.pincode")}:</label>
          <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} pattern="[0-9]{6}" required />

          <label>{t("donate.message")} (optional):</label>
          <textarea rows="3" value={message} onChange={e => setMessage(e.target.value)} />

          <button type="submit" className="donate-btn">
            {t("donate.submit")}
          </button>

        </form>

        <div className="qr-section">
          <h2>{t("donate.qr scan & donate")}</h2>
          <a href={upiLink}>
            <img src="/images/qr-donation.jpeg" alt="QR" className="qr-image" />
          </a>
          <p>{t("donate.click qr to pay via upi apps.")}</p>
        </div>

      </div>
    </section>
  );
}

export default Donate;