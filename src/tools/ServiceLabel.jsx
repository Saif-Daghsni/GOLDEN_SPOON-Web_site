import React from 'react'
import "./ServiceLabel.css"

const ServiceLabel = (props) => {
  return (
    <div className='label'>
      <div className='center'>
        <img src={props.image} alt="plate1" className='image'/>
      </div>
        <div className='text'>
          <label htmlFor="name" className='name'>{props.name}</label>
          <a href="prive" className='price'>{props.price} DT</a>
        </div>
        
        <div className='buttons'>
          <div className='description' id='1'>Description</div>
          <div className='cercle' id='2'>+</div>
        </div>
    </div>
  )
}

export default ServiceLabel