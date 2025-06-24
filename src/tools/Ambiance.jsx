import React from 'react'
import './Ambiance.css'
const Ambiance = () => {
  return (
    <div className='principal'>
        <div>
            <h1 className='ambiance-text'>Experience Our Ambiance</h1>
            <p className='ambiance-description'>
                Discover the warm and inviting atmosphere of Golden Spoon. Where tradition meets modern elegance.
            </p>
        </div>
        <div className='ambiance-div'>
            <img src="../../public/nrd.jpg " className='ambiance-image'/>
            <img src="../../public/karol.jpg " className='ambiance-image'/>
            <img src="../../public/alex.jpg " className='ambiance-image'/>
        
            <img src="../../public/volkan.jpg " className='ambiance-image'/>
            <img src="../../public/olga.jpg " className='ambiance-image'/>
            <img src="../../public/spencer.jpg " className='ambiance-image'/>

        </div>
    </div>
  )
}

export default Ambiance