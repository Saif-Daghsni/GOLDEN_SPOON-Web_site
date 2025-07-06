import "./Openning.css";
import React, { useState, useEffect } from 'react';

export const Openning = () => {
  const [openings, setOpenings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/getOpening")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Openings fetched:", data);
        if (Array.isArray(data.data)) {
          setOpenings(data.data);
        } else {
          setOpenings([]);
        }
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  useEffect(() => {
    if (openings.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % openings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [openings]);

  // Clamp index if openings change to smaller array
  useEffect(() => {
    if (currentIndex >= openings.length) {
      setCurrentIndex(0);
    }
  }, [openings, currentIndex]);

  return (
    <div className='all'>
      <div className='openning-image-container'>
        {openings.map((data, index) => (
          <img
            key={index}
            src={data.image || "fallback.jpg"}
            alt={`opening-${index}`}
            className={`opening-image ${index === currentIndex ? "fade-in" : "hidden"}`}
          />
        ))}
      </div>
      <div className='openning-text'>
        <label className='welcome-text'>Welcome to Golden Spoon!</label>
        <p className='openningP'>
          Experience the authentic flavors of Tunisia at Golden Spoon.
          We offer a refined selection of traditional and fusion dishes,
          prepared with the freshest ingredients. Join us for a memorable dining experience!
        </p>
        <button className='openningButton'>Explore Menu</button>
      </div>
    </div>
  );
};