import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Achat.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Order from "./Order"; // Assuming you have an Order component
const Achat = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`Achat ${expanded ? "expanded" : ""}`}
      onClick={!expanded ? handleClick : undefined} // Prevent nested click conflict
    >
      {!expanded && <AiOutlineShoppingCart size={20} color="white" />}

      {expanded && (
        <>
          <div className="panel-content">
            <AiOutlineArrowLeft
              size={30}
              className="LeftArrow"
              onClick={() => {
                props.setorder([]);
                setExpanded(!expanded);
              }}
            />
            {props.order.map((item, index) => (
              <Order key={index} item={item} />
            ))}
          </div>

          <button
            className="thatbutton"
            onClick={(e) => {
              e.stopPropagation();
              props.setorder([]);
              setExpanded(!expanded);
            }}
          >
            Buy
          </button>
        </>
      )}
    </div>
  );
};

export default Achat;
