import React, { useEffect, useState } from 'react';
import './Ambiance.css'
const Ambiance = () => {

  const [ambiance, setAmbiance] = useState([]);

    function getAmbiance() {
    fetch("http://localhost:3001/getAmbiance")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Ambiance fetched:", data);
        setAmbiance(data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  useEffect(() => {
    getAmbiance();
  }, []);
  return (
    <div className='principal'>
        <div>
            <h1 className='ambiance-text'>Experience Our Ambiance</h1>
            <p className='ambiance-description'>
                Discover the warm and inviting atmosphere of Golden Spoon. Where tradition meets modern elegance.
            </p>
        </div>
        <div className='ambiance-div'>
          {ambiance.map((data, index) => (
        <img
          key={index}
          src={data.image}
          alt={`Ambiance-${index}`}
          width={100}
          height="auto"
          style={{ margin: '10px' }}
          className='ambiance-image'
        />
      ))}
        </div>
    </div>
  )
}

export default Ambiance