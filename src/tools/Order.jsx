import React from 'react'
import './Order.css'
const Order = (props) => {
  return (
    <div className='Order'>
        <p>{props.item.name}</p>
        <p>x {props.item.quantity}</p>
    </div>
  )
}

export default Order