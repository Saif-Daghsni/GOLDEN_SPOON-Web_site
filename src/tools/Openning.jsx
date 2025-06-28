import React from 'react'
import "./Openning.css"
import useOpening from '../../models/opening/useOpening';

export const Openning = () => {

  
  const { opening, loading, error } = useOpening();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading image</p>;
  /*let image = opening[0]?.image
    ? `http://localhost:3001/public/${opening[0].image}`
    : "/default.jpg";*/

  return (
    <div className='all'>
        <div className='openning-image-container'>
{opening.length > 0 && (
  <img 
    src={`http://localhost:3001/getOpening/${opening[0]._id}`} 
    alt="Opening" 
    className="openning-image"
  />
)}


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