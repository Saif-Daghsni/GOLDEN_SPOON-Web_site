import React from 'react'
import "./ServiceLabel.css"

const ServiceLabel = () => {
  return (
    <div className='label'>
      <div className='center'>
        <img src="../../public/plate1.jpg" alt="plate1" className='image'/>
      </div>
        <div className='text'>
          <label htmlFor="name" className='name'>Kabsa</label>
          <a href="prive" className='price'>7 DT</a>
        </div>
        
        <div className='buttons'>
          <div className='description' id='1'>Description</div>
          <div className='cercle' id='2'>+</div>
        </div>
    </div>
  )
}

export default ServiceLabel