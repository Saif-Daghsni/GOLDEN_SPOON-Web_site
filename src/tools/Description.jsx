import React from "react";

import './Description.css'

const Description = (props) => {
  const { item } = props;
  if (!item) return null; // safety check

  return (
    <div>
      <div className="description-label">
        <div className="description-row">
          <div className="description-image">
            <img className="description-image-image" src={item.image} alt="" />
          </div>

          <div className="description-column">
            <div className="descripttion-details">
              <h2>The name</h2>
              <p className="descripttion-details-title">{item.name}</p>
              <h2>The description</h2>
              <p>{item.description}</p>
            </div>
            <button onClick={() => props.setdescription(false)}>
              Go back
            </button>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Description;
