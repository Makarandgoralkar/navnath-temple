import React, { useEffect } from "react";
import "./Committee.css";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaUserCircle
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const members = [
  {
    name: "Shri Ramesh Bipinchandra Pandey",
    role: "President",
    photo: "/images/Member1.jpg",
    facebook: "https://www.facebook.com/ramdas.patil",
    instagram: "https://www.instagram.com/ramdas.patil",
    phone: "+9284683257",
  },
  {
    name: "Shri Pradeep Gangadhar Dhole",
    role: "Vice President",
    photo: "/images/Member2.jpg",
    facebook: "https://www.facebook.com/meena.joshi",
    instagram: "https://www.instagram.com/meena.joshi",
    phone: "+911234567892",
  },
  {
    name: "Shri Nishikant Vaman Kolte",
    role: "Secretary",
    photo: "/images/Member3.jpg",
    facebook: "https://www.facebook.com/vijay.deshmukh",
    instagram: "https://www.instagram.com/vijay.deshmukh",
    phone: "+9373410003",
  },
  {
    name: "Adv. Mahesh Sudhakar Chaudhari",
    role: "Joint Secretary",
    photo: "/images/Member1.jpg",
    facebook: "https://www.facebook.com/makarand.goralkar",
    instagram: "https://www.instagram.com/makarand.goralkar",
    phone: "+911234567894",
  },
  {
    name: "Shri Sachin Ramlal Pardeshi",
    role: "Treasurer",
    photo: "/images/Member2.jpg",
    facebook: "https://www.facebook.com/shri.mak",
    instagram: "https://www.instagram.com/shri.mak",
    phone: "+911234567895",
  },
  {
    name: "Shri Jagdish Vasudev Chaudhari",
    role: "Member",
    photo: "/images/Member3.jpg",
    facebook: "https://www.facebook.com/sunita.kulkarni",
    instagram: "https://www.instagram.com/sunita.kulkarni",
    phone: "+911234567896",
  },

  /* NO IMAGE MEMBERS */

  {
    name: "Smt. Rajshree Nishikant Kolte",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  },
  {
    name: "Smt. Chhaya Shravan Khandekar",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  },
  {
    name: "Shri Sunil Binjaraj Agrawal",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  },
  {
    name: "Shri Ganesh Ramchandra Dusane",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  },
  {
    name: "Shri Prafulla Janardan Wankhede",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  },
  {
    name: "Shri Rajnish Ramesh Pandey",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  },
  {
    name: "Shri Pramod Bhagwat Bhole",
    role: "Member",
    photo: "",
    phone: "+911234567896",
  }
];

function Committee() {

  const { t } = useTranslation();

  useEffect(() => {
    const cards = document.querySelectorAll(".member-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="committee-container">

      <h1 className="committee-title">
        {t("committee.title")}
      </h1>

      <div className="committee-grid">

        {members.map((m, i) => (

          <div key={i} className="member-card">

            <div className="card-inner">

              {/* FRONT SIDE */}
              <div className="card-front">

                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                <div
                  className="default-profile-icon"
                  style={{
                    display: m.photo ? "none" : "flex"
                  }}
                >
                  <FaUserCircle />
                </div>

                <h3>{m.name}</h3>

                <span
                  className={`role-badge ${
                    m.role === "President" ? "president" : ""
                  }`}
                >
                  {m.role}
                </span>

              </div>

              {/* BACK SIDE */}
              <div className="card-back">

                <h3>{m.name}</h3>

                <p>
                  Dedicated to temple service and spiritual growth.
                </p>

                <div className="social-icons">

                  {m.facebook && (
                    <a
                      href={m.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </a>
                  )}

                  {m.instagram && (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                  )}

                  {m.phone && (
                    <a href={`tel:${m.phone}`}>
                      <FaPhone />
                    </a>
                  )}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Committee;