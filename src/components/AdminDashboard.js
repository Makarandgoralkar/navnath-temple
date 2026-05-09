import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { ref, onValue, remove, push } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { runTransaction } from "firebase/database";
import Swal from "sweetalert2";
import {
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];
  const [animatedTotal, setAnimatedTotal] = useState(0);

  const navigate = useNavigate();

  const totalDonationAmount = donations.reduce(
  (sum, d) => sum + Number(d.amount || 0), 0
);

const totalMessages = messages.length;
const totalImages = gallery.length;

const monthlyData = donations.reduce((acc, d) => {
  if (!d.timestamp) return acc;

  const date = new Date(d.timestamp);

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const key = `${month}-${year}`; // ✅ unique month-year

  const existing = acc.find(item => item.key === key);

  if (existing) {
    existing.amount += Number(d.amount || 0);
  } else {
    acc.push({
      key,
      month,
      year,
      label: `${month} ${year}`, // display label
      amount: Number(d.amount || 0)
    });
  }

  return acc;
}, []);

monthlyData.sort((a, b) => {
  const dateA = new Date(`${a.month} 1, ${a.year}`);
  const dateB = new Date(`${b.month} 1, ${b.year}`);
  return dateA - dateB;
});

const categoryData = Object.values(
  donations.reduce((acc, d) => {
    let key = d.donationFor;

    // ✅ FIX: handle empty / null / undefined properly
    if (!key || key.trim() === "") {
      key = "General Donation";
    }

    key = key.trim();

    if (!acc[key]) {
      acc[key] = {
        name: key,
        amount: 0
      };
    }

    acc[key].amount += Number(d.amount || 0);

    return acc;
  }, {})
);

const exportToExcel = () => {
  const data = donations.map((d) => ({
    Name: `${d.title || ""} ${d.name || ""}`,
    Mobile: d.mobile,
    Email: d.email,
    DonationFor: d.donationFor,
    Amount: d.amount,
    PaymentID: d.paymentId,
    Address: d.address,
    City: d.city,
    State: d.state,
    Pincode: d.pincode,
    Message: d.message,
    Date: d.timestamp
      ? new Date(d.timestamp).toLocaleDateString()
      : ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const fileData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(fileData, "Donations_Data.xlsx");
};

const getNextReceiptNumber = async () => {
  const counterRef = ref(database, "receiptCounter");

  const result = await runTransaction(counterRef, (current) => {
    return (current || 0) + 1;
  });

  return result.snapshot.val();
};

const donationMap = {
  "Abhishek": "Abhishek Nidhi",
  "Annadan Fund": "Annadan Nidhi",
  "Building Fund": "Imarat Nidhi",
  "Education Fund": "Shikshan Nidhi",
  "General Donation": "Donation"
};

const generateReceipt = async (d) => {

  const doc = new jsPDF();

  // ✅ AUTO INCREMENT RECEIPT NUMBER
  const receiptNumber = await getNextReceiptNumber();

  const receiptNo = `DnG/${new Date().getFullYear()}/${receiptNumber}`;

  const date = d.timestamp
    ? new Date(d.timestamp).toLocaleDateString()
    : "";

  // BORDER
  doc.setDrawColor(0);
  doc.rect(10, 10, 190, 270);

  // LOGO
  doc.addImage("/images/gallery3.jpg", "JPG", 15, 15, 20, 20);

  // HEADER
  doc.setFontSize(14);
  doc.setTextColor(150, 0, 0);
  doc.text("|| Shree Chaitanya Navnath Seva Trust ||", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  doc.setFont("helvetica", "bold");
  doc.text("(Registered Public Trust – Reg. No. E-884 Jalgaon)", 105, 26, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.text("Address: Gorakshdham, Varangaon road, Bhusawal, Dist. Jalgaon - 425201", 105, 32, { align: "center" });
  doc.text("Email: info@navnathtemple.org | Phone: +91 9284683257", 105, 38, { align: "center" });

  doc.line(15, 42, 195, 42);

  // RECEIPT DETAILS
  doc.setFont("helvetica", "bold");
  doc.text("Receipt No:", 15, 50);
  doc.text("Date:", 150, 50);

  doc.setFont("helvetica", "normal");
  doc.text(receiptNo, 45, 50);
  doc.text(date, 165, 50);

  // USER DETAILS
  doc.setFont("helvetica", "bold");
  doc.text("Name:", 15, 58);
  doc.text("Email:", 15, 65);

  doc.setFont("helvetica", "normal");
  doc.text(`${d.title || ""} ${d.name}`, 40, 58);
  doc.text(d.email || "", 40, 65);

  // DONATION FOR
  doc.setFont("helvetica", "bold");
  doc.text("Donation For:", 15, 72);

  doc.setFont("helvetica", "normal");
  doc.text(d.donationFor || "General Donation", 60, 72);

  // TABLE
  doc.rect(15, 75, 180, 70);

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

  const selectedParticular = donationMap[d.donationFor];

  doc.setFont("helvetica", "normal");

  items.forEach((item) => {
    doc.text(item, 20, y);

    if (item === selectedParticular) {
      doc.text(`${d.amount}/-`, 160, y);
    }

    y += 8;
  });

  // TOTAL
  doc.setFont("helvetica", "bold");
  doc.text("Total", 20, y);
  doc.text(`${d.amount}/-`, 160, y);

  // FOOTER
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Thank you for your generous contribution! May Shri Navnath Maharaj bless you.",
    105,
    155,
    { align: "center" }
  );

  // SIGNATURE
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Signature", 20, 180);
  doc.text("Receipt Issued By", 150, 180);

  doc.save(`Donation_Receipt_${receiptNo}.pdf`);
};

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    onValue(ref(database, "contacts"), (snap) => {
      const data = snap.val() || {};
      setMessages(Object.keys(data).map(id => ({ id, ...data[id] })).reverse());
    });

    onValue(ref(database, "donations"), (snap) => {
      const data = snap.val() || {};
      setDonations(Object.keys(data).map(id => ({ id, ...data[id] })).reverse());
    });

    onValue(ref(database, "gallery"), (snap) => {
      const data = snap.val() || {};
      setGallery(Object.keys(data).map(id => ({ id, ...data[id] })).reverse());
    });
  }, []);

  const deleteMessage = (id) => {
  Swal.fire({
    title: "Delete Message?",
    text: "Are you sure you want to delete this message? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      remove(ref(database, `contacts/${id}`));

      Swal.fire("Deleted!", "Message has been deleted.", "success");
    }
  });
};

  const deleteImage = (id) => {
  Swal.fire({
    title: "Delete Photo?",
    text: "Are you sure you want to delete this photo? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      remove(ref(database, `gallery/${id}`));

      Swal.fire("Deleted!", "Photo has been deleted.", "success");
    }
  });
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
  setImageFile(null);
  setPreview(null);

  // reset file input
  document.getElementById("fileInput").value = "";
};

  const handleUpload = () => {
    if (!imageFile) return alert("Select Image");

    const reader = new FileReader();
    reader.onloadend = async () => {
      await push(ref(database, "gallery"), {
        image: reader.result,
        timestamp: Date.now(),
      });
      setPreview(null);
      setImageFile(null);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const filteredDonations = donations.filter((d) => {
  const searchLower = searchTerm.toLowerCase();

  const nameMatch =
    d.name?.toLowerCase().includes(searchLower) ||
    d.email?.toLowerCase().includes(searchLower) ||
    d.mobile?.includes(searchTerm) ||
    d.donationFor?.toLowerCase().includes(searchLower) ||
    d.city?.toLowerCase().includes(searchLower) ||
    d.state?.toLowerCase().includes(searchLower);

  const amountMatch =
    d.amount?.toString().includes(searchTerm);

  const typeMatch =
    filterType === "All" || d.donationFor === filterType;

  // ✅ DATE FILTER
  let dateMatch = true;

if (dateFilter !== "All") {
  if (!d.timestamp) {
    return false; // ❌ remove items with no date
  }

  const date = new Date(d.timestamp);
  const now = new Date();

  if (dateFilter === "Today") {
    dateMatch = date.toDateString() === now.toDateString();
  } else if (dateFilter === "Monthly") {
    dateMatch =
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  } else if (dateFilter === "Yearly") {
    dateMatch = date.getFullYear() === now.getFullYear();
  }
}

  return (nameMatch || amountMatch) && typeMatch && dateMatch;
});

const topDonors = Object.values(
  donations.reduce((acc, d) => {
    const key = d.name || "Anonymous";

    if (!acc[key]) {
      acc[key] = {
        name: key,
        amount: 0
      };
    }

    acc[key].amount += Number(d.amount || 0);

    return acc;
  }, {})
)
.sort((a, b) => b.amount - a.amount)
.slice(0, 5); // Top 5 donors

const dailyData = donations.reduce((acc, d) => {
  if (!d.timestamp) return acc;

  const date = new Date(d.timestamp).toLocaleDateString();

  const existing = acc.find(item => item.date === date);

  if (existing) {
    existing.amount += Number(d.amount || 0);
  } else {
    acc.push({
      date,
      amount: Number(d.amount || 0)
    });
  }

  return acc;
}, []);

// sort by date
dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));

useEffect(() => {
  let start = 0;
  const duration = 1000; // 1 sec animation
  const increment = totalDonationAmount / (duration / 16);

  const counter = setInterval(() => {
    start += increment;

    if (start >= totalDonationAmount) {
      setAnimatedTotal(totalDonationAmount);
      clearInterval(counter);
    } else {
      setAnimatedTotal(Math.floor(start));
    }
  }, 16);

  return () => clearInterval(counter);
}, [totalDonationAmount]);


  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveTab("dashboard")} className={activeTab==="dashboard"?"active":""}>Dashboard</li>
          <li onClick={() => setActiveTab("messages")} className={activeTab==="messages"?"active":""}>Messages</li>
          <li onClick={() => setActiveTab("donations")} className={activeTab==="donations"?"active":""}>Donations</li>
          <li onClick={() => setActiveTab("gallery")} className={activeTab==="gallery"?"active":""}>Gallery</li>
          <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
      </div>

      {/* MAIN WRAPPER */}
      <div className="main-wrapper">

        {/* TOP CENTER TITLE */}
        <h2 className="page-title">Admin Panel</h2>

        {/* MAIN CONTENT */}
        <div className="main">
          {activeTab === "dashboard" && (
  <div className="section">

    <h3>Dashboard Overview</h3>

    {/* CARDS */}
    <div className="dashboard-cards">
      <div className="card">
        <h4>Total Donations</h4>
        <p>₹ {animatedTotal}</p>
      </div>

      <div className="card">
        <h4>Total Messages</h4>
        <p>{totalMessages}</p>
      </div>

      <div className="card">
        <h4>Gallery Images</h4>
        <p>{totalImages}</p>
      </div>
    </div>

    <div className="chart-section">
  <h4>Top Donors 🏆</h4>

  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Total Donation</th>
      </tr>
    </thead>
    <tbody>
      {topDonors.map((d, index) => (
        <tr key={index}>
          <td>#{index + 1}</td>
          <td>{d.name}</td>
          <td>₹ {d.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    <div className="chart-section">
  <h4>Monthly Donations</h4>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={monthlyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

<div className="chart-section">
  <h4>Daily Donations Trend 📈</h4>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={dailyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

<div className="chart-section">
  <h4>Donation by Category</h4>

  <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={categoryData}
      dataKey="amount"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={60}   // 🔥 makes it DONUT
      outerRadius={100}
      paddingAngle={3}
    >
      {categoryData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
</div>
  </div>
)}

          {activeTab === "messages" && (
  <div className="section">
    <h3>Messages</h3>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>
                <button onClick={() => deleteMessage(msg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

  {activeTab === "donations" && (
  <div className="section">
    <h3>Donations</h3>
    <button className="export-btn" onClick={exportToExcel}>
      Export to Excel
    </button>

    <div className="filter-bar">
  <input
    type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
>
  <option value="All">All Dates</option>
  <option value="Today">Today</option>
  <option value="Monthly">This Month</option>
  <option value="Yearly">This Year</option>
</select>

  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
  >
    <option value="All">All</option>
    <option value="Abhishek">Abhishek</option>
    <option value="Annadan Fund">Annadan Fund</option>
    <option value="Building Fund">Building Fund</option>
    <option value="Education Fund">Education Fund</option>
    <option value="General Donation">General Donation</option>
  </select>



</div>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Donation For</th>
            <th>Amount</th>
            <th>Payment ID</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Message</th>
            <th>Date</th>
            <th>Receipt</th>
          </tr>
        </thead>

        <tbody>
          {filteredDonations.map((d) => (
            <tr key={d.id}>
              <td>{d.title} {d.name}</td>
              <td>{d.mobile}</td>
              <td>{d.email}</td>
              <td>{d.donationFor}</td>
              <td>₹{d.amount}</td>
              <td>{d.paymentId}</td>
              <td>{d.address}</td>
              <td>{d.city}</td>
              <td>{d.state}</td>
              <td>{d.pincode}</td>
              <td>{d.message || " "}</td>
              <td>
                {d.timestamp
                  ? new Date(d.timestamp).toLocaleDateString()
                  : " "}
              </td>
              <td><button onClick={() => generateReceipt(d)}>Download</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

          {activeTab === "gallery" && (
            <div className="section">
              <h3>Upload Image</h3>

              <input id="fileInput" type="file" onChange={handleFileChange} />
              {preview && (
              <>
                <img src={preview} alt="preview" width="150" />

                <div>
                  <button onClick={handleUpload}>Upload</button>

                  <button
                    onClick={handleCancelImage}
                    style={{ marginLeft: "10px", background: "gray", color: "#fff" }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

              <div className="gallery">
                {gallery.map(img => (
                  <div key={img.id} className="gallery-card">
                    <img src={img.image} alt="" />
                    <button onClick={() => deleteImage(img.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;