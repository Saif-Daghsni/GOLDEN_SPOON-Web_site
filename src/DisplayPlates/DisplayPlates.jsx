import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DisplayPlates.css";
import NavBar from "../tools/NavBar";
import ServiceLabel from "../tools/ServiceLabel";
import { FaSearch } from "react-icons/fa";

const DisplayPlates = ({ setSelectedItem, setdescription, name }) => {
  const [allPlates, setAllPlates] = useState([]);
  const [plates, setPlates] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [recherche, setRecherche] = useState("");
  const [loading, setLoading] = useState(true); // NEW: loading state

  useEffect(() => {
    setLoading(true); // start loading
    axios
      .get("http://localhost:3001/getPlates")
      .then((res) => {
        const filtered = res.data.plates.filter((plate) => plate.type === name);
        setAllPlates(res.data.plates);
        setPlates(filtered);
        setLoading(false); // data fetched, stop loading
        console.log("Plates fetched successfully");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // stop loading even if error
      });
  }, [name]);

  const handleFilter = () => {
    const minPrice = parseFloat(min) || 0;
    const maxPrice = parseFloat(max) || Infinity;

    const filtered = allPlates.filter((plate) => {
      const matchesType = plate.type === name;
      const inPriceRange = plate.price >= minPrice && plate.price <= maxPrice;
      const matchesSearch = recherche
        ? plate.name.toLowerCase().includes(recherche.toLowerCase())
        : true;

      return matchesType && inPriceRange && matchesSearch;
    });

    setPlates(filtered);
  };

  return (
    <div>
      <NavBar />
      <div className="plates-container">
        <div className="plates-research">
          <div className="input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="user-input"
              placeholder="Recherche"
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>
          <label className="plate-research-label" htmlFor="">
            Price
          </label>
          <p className="plate-reaserch-p">Min</p>
          <input
            className="plate-reaserch-input"
            type="number"
            placeholder="The min price"
            onChange={(e) => setMin(e.target.value)}
          />
          <p className="plate-reaserch-p">Max</p>
          <input
            className="plate-reaserch-input"
            type="number"
            placeholder="The max price"
            onChange={(e) => setMax(e.target.value)}
          />
          <button className="plates-research-button" onClick={handleFilter}>
            Filtre
          </button>
        </div>
        <div className="plates-research-column">
          <label className="plates-research-title" htmlFor="">
            The dishes
          </label>

          <div className="display-plates">
            {loading ? (
              <div className="plates-loader">
                <div className="spinner"></div>
                <p>Loading plates...</p>
              </div>
            ) : plates.length > 0 ? (
              plates.map((plate) => (
                <ServiceLabel
                  key={plate._id}
                  name={plate.name}
                  description={plate.description}
                  price={plate.price}
                  type={plate.type}
                  image={plate.image}
                  setSelectedItem={setSelectedItem}
                  setdescription={setdescription}
                />
              ))
            ) : (
              <p>No plates found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPlates;
