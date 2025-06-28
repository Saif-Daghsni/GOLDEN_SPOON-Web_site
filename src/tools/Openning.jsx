import "./Openning.css"
import React, { useState, useEffect } from 'react';

export const Openning = () => {
  const [openings, setOpenings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function getOpenings() {
    fetch("http://localhost:3001/getOpening")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Openings fetched:", data);
        setOpenings(data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  useEffect(() => {
    getOpenings();
  }, []);

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % openings.length);
    }, 3000); // Change every 3s

    return () => clearInterval(interval);
  }, [openings.length]);

  return (
    <div className='all'>
        <div className='openning-image-container'>
      {openings.map((data, index) => (
        <img
          key={index}
          src={data.image}
          alt={`opening-${index}`}
          className={`opening-image ${index === currentIndex ? "fade-in" : "hidden"}`}
        />
      ))}
        </div>
        <div className='openning-text'>
            <label htmlFor="" className='welcome-text'>Welcome to Golden Spoon!</label>
            <p className='openningP'>Experience the authentic flavors of Tunisia at Golden Spoon.We offer a refined selection of traditional and
                 fusion dishes,prepared with the freshest ingredinents.Join us for a memorable dining experiences!</p>
            <button className='openningButton'>Explore Menu</button>
        </div>
    </div>
  )
}