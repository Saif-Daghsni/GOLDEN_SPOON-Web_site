import React from "react";
import "./ServiceLabel.css";
import Description from "./Description";

const ServiceLabel = (props) => {
  // Function to handle adding an item to the order
  const addToOrder = (itemName, qty) => {
    props.setorder((prevOrder) => {
      // Check if the item already exists
      const existingItem = prevOrder.find((item) => item.name === itemName);

      if (existingItem) {
        // Update the quantity if it exists
        return prevOrder.map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        // Add new item
        return [...prevOrder, { name: itemName, quantity: qty }];
      }
    });
  };

  return (
    <>
      <div className="label">
        <div className="center">
          <img src={props.image} alt="plate1" className="image" />
        </div>
        <div className="text">
          <label htmlFor="name" className="name">
            {props.name}
          </label>
          <a href="prive" className="price">
            {props.price} DT
          </a>
        </div>

        <div className="buttons">
          <div
            className="description"
            id="1"
            onClick={() => {
              props.setSelectedItem({
                image: props.image,
                name: props.name,
                description: props.description,
              });
              props.setdescription(true);
            }}
          >
            Description
          </div>
          <div className="cercle" id="2"
          onClick={() => addToOrder(props.name, 1)}
          >
            +
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceLabel;
