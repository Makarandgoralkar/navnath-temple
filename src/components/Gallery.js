import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // 🔥 Fetch Images from Realtime DB
  useEffect(() => {
    const galleryRef = ref(database, "gallery");

    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data)
          .map((id) => ({
            id,
            ...data[id],
          }))
          .sort((a, b) => b.timestamp - a.timestamp); // newest first
        setImages(list);
      } else {
        setImages([]);
      }
    });

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Gallery</h2>

      {/* Empty State */}
      {images.length === 0 && (
        <p style={{ marginTop: "20px", color: "#777" }}>
          No images available
        </p>
      )}

      {/* Images Grid */}
      <div className="gallery-grid">
        {images.map((img) => (
          <div
            key={img.id}
            className="gallery-item"
            onClick={() => setSelectedImage(img.image)}
          >
            <img
              src={img.image}
              alt="gallery"
              className="gallery-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="modal"
          onClick={() => setSelectedImage(null)}
        >
          <span className="close">&times;</span>
          <img src={selectedImage} alt="full" className="modal-img" />
        </div>
      )}
    </section>
  );
}

export default Gallery;