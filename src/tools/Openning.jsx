import React from 'react'
import "./Openning.css"

export const Openning = () => {
  return (
    <div className='all'>
        <div className='openning-image-container'>
        <img src="../../public/federico-ramirez.jpg" alt=""  className='openning-image' />
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
