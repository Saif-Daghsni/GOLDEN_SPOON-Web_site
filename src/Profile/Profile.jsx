import React, { useEffect, useState } from "react";
import NavBar from "../tools/NavBar";
import "./Profile.css";
import axios from "axios";
import ServiceLabel from "../tools/ServiceLabel";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Users from "../../models/user/useUsers";


const Profile = (props) => {

  // eslint-disable-next-line no-unused-vars
  const { users, loading1, error1 } = Users();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [imageAmbiance, setImageAmbiance] = useState("");
  const [imagePlate, setPlate] = useState("");
  const [openings, setOpenings] = useState([]);
  const [ambiance, setAmbiance] = useState([]);
  const [selected, setSelected] = useState("profile");
  const [Description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [added, setadded] = useState(false);
  const [plates, setPlates] = useState([]);

  const handleDeletePlate = async (id) => {
    console.log("🟢 Deleting plate with ID:", id);
    try {
      await axios.delete(`http://localhost:3001/deletePlate/${id}`);
      setOpenings((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete opening:", error);
    }
  };
  const handleDeleteOpening = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteOpening/${id}`);
      setOpenings((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete opening:", error);
    }
  };
  const handleDeleteAmbiance = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteAmbiance/${id}`);
      setAmbiance((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete ambiance:", error);
    }
  };
  function covertToBase64(e, a) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        // ✔️ Use ORIGINAL WIDTH — no resize!
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // ✔️ Save as maximum quality JPEG (or PNG if you prefer lossless)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 1.0);

        if (a === 3) {
          setPlate(compressedBase64);
        } else if (a === 1) {
          setImage(compressedBase64);
        } else {
          setImageAmbiance(compressedBase64);
        }

        console.log(
          "✅ Image NOT resized — saved full res @ max quality:",
          compressedBase64.slice(0, 50) + "..."
        );
      };
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function handleUploadPlates() {
    if (!imagePlate || !name || !Description || !price || !type) {
      alert("Please fill out all fields and select an image.");
      return;
    }

    fetch("http://localhost:3001/AddPlates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: Description,
        price: price,
        type: type,
        image: imagePlate,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Server responded:", data);
        setadded(true);
        setName("");
        setDescription("");
        setPrice("");
        setType("");
        setImage("");
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }

  function handleUpload() {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    fetch("http://localhost:3001/uploadOpening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64: image }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Server responded:", data);
        getOpenings();
        setadded(true);
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }

  function handleUploadAmbiance() {
    if (!imageAmbiance) {
      alert("Please select an image first!");
      return;
    }

    fetch("http://localhost:3001/AddAmbiance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageAmbiance }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Server responded:", data);
        getAmbiance();
        setadded(true);
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }

  function getOpenings() {
    fetch("http://localhost:3001/getOpening")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Openings fetched:", data);
        setOpenings(data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  function getAmbiance() {
    fetch("http://localhost:3001/getAmbiance")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Ambiance fetched:", data);
        setAmbiance(data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("❌ No token found.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3001/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("✅ User fetched:", res.data);
        setUser(res.data.user); // Access `.user` because backend returns { user: {...} }
      })
      .catch((err) => {
        console.error("❌ /getUser error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [openingsRes, ambianceRes, platesRes] = await Promise.all([
          fetch("http://localhost:3001/getOpening").then((res) => res.json()),
          fetch("http://localhost:3001/getAmbiance").then((res) => res.json()),
          fetch("http://localhost:3001/getPlates").then((res) => res.json()),
          // axios.get("http://localhost:3001/getPlates"),
        ]);

        setOpenings(openingsRes.data);
        setAmbiance(ambianceRes.data);
        setPlates(platesRes.data.plates);
        console.log("Plates add succecuffuly");
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>⚠️ No user data found.</div>;



  return (
    <div className="Profile">
      <NavBar />
      <div className="Profile-container">
        <div className="Profile-container2">
          <div className="Profile-navbar">
            <button
              id="profile"
              className={
                selected === "profile"
                  ? "Profile-button-active"
                  : "Profile-button-inactive"
              }
              onClick={() => setSelected("profile")}
            >
              Profile information
            </button>
            <button
              id="orders"
              className={
                selected === "orders"
                  ? "Profile-button-active"
                  : "Profile-button-inactive"
              }
              onClick={() => setSelected("orders")}
            >
              Orders
            </button>
            <button
              id="sales"
              className={
                selected === "sales"
                  ? "Profile-button-active"
                  : "Profile-button-inactive"
              }
              onClick={() => setSelected("sales")}
            >
              Sales
            </button>
            <button
              id="plates"
              className={
                selected === "plates"
                  ? "Profile-button-active"
                  : "Profile-button-inactive"
              }
              onClick={() => setSelected("plates")}
            >
              Modify plates
            </button>

            <button
              id="opening"
              className={
                selected === "opening"
                  ? "Profile-button-active"
                  : "Profile-button-inactive"
              }
              onClick={() => setSelected("opening")}
            >
              Modify the Opening
            </button>

            <button
              id="ambiance"
              className={
                selected === "ambiance"
                  ? "Profile-button-active"
                  : "Profile-button-inactive"
              }
              onClick={() => setSelected("ambiance")}
            >
              Modify Ambiance
            </button>

            <button
              id="ambiance"
              className="log-out"
              onClick={() => setSelected("ambiance")}
            >
              Log Out
            </button>
          </div>

          <div className="Profile-details">
            <div className="top-Profile">
              {selected === "profile" && "Profile information"}
              {selected === "plates" && "Modify plates"}
              {selected === "opening" && "Modify the Opening"}
              {selected === "ambiance" && "Modify Ambiance"}
              {selected === "sales" && "Sales"}
              {selected === "orders" && "Orders"}
            </div>

            {selected === "profile" && (
              <div className="bottom-Profile">
                <h2
                  className="plates-titles"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Your informations
                </h2>
                
                <h2
                  className="plates-titles-num2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Name 
                </h2>
                <p className="plates-titles-p">{user.name}</p>
                <h2
                  className="plates-titles-num2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Email
                </h2>
                <p className="plates-titles-p">{user.email}</p>
                <h2
                  className="plates-titles-num2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Phone number  
                </h2>
                <p className="plates-titles-p">{user.phone}</p>
                <h2
                  className="plates-titles-num2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Location 
                </h2>
                <p className="plates-titles-p">{user.location}</p>
              </div>
            )}
            {selected === "orders" && (
              <div className="bottom-Profile">
                <h2
                  className="plates-titles"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  All the orders
                </h2>{" "}
                <div className="sales-table-container">
                  <table className="sales-table">
                    <thead>
                      <tr>
                        <th>The orders</th>
                        <th>Quantity Sold</th>
                        <th>Distination</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Drinks</td>
                        <td>1,245</td>
                        <td>Ariana-BorjLouzir</td>
                      </tr>
                      <tr>
                        <td>Dishes</td>
                        <td>3,572</td>
                        <td>Tunis-Bardou</td>
                      </tr>
                      <tr>
                        <td>Desserts</td>
                        <td>1,803</td>
                        <td>Manouba-Dandan</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {selected === "sales" && (
              <div className="bottom-Profile">
                <h2
                  className="plates-titles"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Total Sales: 20,860 DT
                </h2>

                <div className="sales-table-container">
                  <table className="sales-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Quantity Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Drinks</td>
                        <td>1,245</td>
                      </tr>
                      <tr>
                        <td>Dishes</td>
                        <td>3,572</td>
                      </tr>
                      <tr>
                        <td>Desserts</td>
                        <td>1,803</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selected === "plates" && (
              <div className="bottom-Profile">
                <div className="bottom-Profile-plates">
                  <h2
                    className="plates-titles"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Upload an Informations
                  </h2>
                  <div className="row">
                    <div>
                      {" "}
                      <label className="plates-inder-title">
                        Name of the plate
                      </label>{" "}
                      <br />
                      <input
                        type="text"
                        placeholder="Enter the name of the plate"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      {" "}
                      <label className="plates-inder-title" htmlFor="">
                        description of the plate
                      </label>{" "}
                      <br />
                      <textarea
                        type="text"
                        placeholder="Enter the description of the plate"
                        onChange={(e) => setDescription(e.target.value)}
                      />{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {" "}
                      <label className="plates-inder-title" htmlFor="">
                        Price of the plate
                      </label>{" "}
                      <br />
                      <input
                        type="number"
                        placeholder="Enter the price of the plate"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />{" "}
                    </div>
                    <div>
                      <label className="plates-inder-title" htmlFor="">
                        The type of the plate
                      </label>{" "}
                      <br />
                      <select
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value="Dishes">Dishes</option>
                        <option value="Drinkes">Drinkes</option>
                        <option value="Desserts">Desserts</option>
                      </select>
                    </div>
                  </div>
                  <label className="Upload-button">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => covertToBase64(e, 3)}
                      style={{ display: "none" }}
                    />
                  </label>
                  {imagePlate && (
                    <img
                      src={imagePlate}
                      alt="Preview"
                      width={100}
                      height="auto"
                    />
                  )}
                  <br />
                  <button
                    className="Upload-button"
                    onClick={handleUploadPlates}
                  >
                    Upload
                  </button>
                  {added && (
                    <div className="successfuly">
                      Your photo added successfully
                    </div>
                  )}
                  <h4
                    className="plates-titles"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "30px",
                    }}
                  >
                    Dishes
                  </h4>
                  <div className="platesinRow">
                    {plates.map((plate) => {
                      return "Dishes" === plate.type ? (
                        <div className="showcollumndelete">
                          <ServiceLabel
                            key={plate._id}
                            name={plate.name}
                            description={plate.description}
                            price={plate.price}
                            type={plate.type}
                            image={plate.image}
                            setSelectedItem={props.setSelectedItem}
                            setdescription={props.setdescription}
                          />
                          <div
                            className="delete-button"
                            onClick={() => {
                              console.log("delete button clicked");
                              handleDeletePlate(plate._id);
                            }}
                          >
                            {" "}
                            Delete{" "}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <h4
                    className="plates-titles"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "30px",
                    }}
                  >
                    Drinkes
                  </h4>
                  <div className="platesinRow">
                    {plates.map((plate) => {
                      return "Drinkes" === plate.type ? (
                        <div className="showcollumndelete">
                          <ServiceLabel
                            key={plate._id}
                            name={plate.name}
                            description={plate.description}
                            price={plate.price}
                            type={plate.type}
                            image={plate.image}
                            setSelectedItem={props.setSelectedItem}
                            setdescription={props.setdescription}
                          />
                          <div
                            className="delete-button"
                            onClick={() => {
                              handleDeletePlate(plate._id);
                            }}
                          >
                            {" "}
                            Delete{" "}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <h4
                    className="plates-titles"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "30px",
                    }}
                  >
                    Desserts
                  </h4>
                  <div className="platesinRow">
                    {plates.map((plate) => {
                      return "Desserts" === plate.type ? (
                        <div className="showcollumndelete">
                          <ServiceLabel
                            key={plate._id}
                            name={plate.name}
                            description={plate.description}
                            price={plate.price}
                            type={plate.type}
                            image={plate.image}
                            setSelectedItem={props.setSelectedItem}
                            setdescription={props.setdescription}
                          />
                          <div
                            className="delete-button"
                            onClick={() => {
                              console.log("delete button clicked");
                              handleDeletePlate(plates._id);
                            }}
                          >
                            {" "}
                            Delete{" "}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <br />
                  <br />
                </div>{" "}
              </div>
            )}
            {selected === "opening" && (
              <div className="bottom-Profile">
                <h2 style={{ fontFamily: "Poppins, sans-serif" }}>
                  Upload an Image
                </h2>
                <label className="Upload-button">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => covertToBase64(e, 1)}
                    style={{ display: "none" }}
                  />
                </label>

                <br />
                <br />
                {image && (
                  <img src={image} alt="Preview" width={100} height="auto" />
                )}
                <br />
                <br />
                <button className="Upload-button" onClick={handleUpload}>
                  Upload
                </button>
                {added && (
                  <div className="successfuly">
                    Your photo added successfully
                  </div>
                )}
                <h2
                  style={{
                    marginTop: "10px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Saved Openings
                </h2>
                <div className="row">
                  {loading ? (
                    <div className="plates-loader">
                      <div className="spinner"></div>
                      <p>Loading plates...</p>
                    </div>
                  ) : openings.length > 0 ? (
                    openings.map((data, index) => (
                      <div className="column">
                        <img
                          key={index}
                          src={data.image}
                          alt={`opening-${index}`}
                          width={200}
                          height="auto"
                          style={{ margin: "10px" }}
                        />
                        <button
                          className="delete-button"
                          onClick={() => {
                            console.log("delete button clicked");
                            handleDeleteOpening(data._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No plates found.</p>
                  )}
                </div>
              </div>
            )}
            {selected === "ambiance" && (
              <div className="bottom-Profile">
                <h2
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Add ambiance
                </h2>

                <label className="Upload-button">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => covertToBase64(e, 2)}
                    style={{ display: "none" }}
                  />
                </label>
                <br />
                <br />

                {imageAmbiance && (
                  <img
                    src={imageAmbiance}
                    alt="Preview"
                    width={100}
                    height="auto"
                  />
                )}
                <br />

                <button
                  className="Upload-button"
                  onClick={handleUploadAmbiance}
                >
                  Upload
                </button>
                {added && (
                  <div className="successfuly">
                    Your photo added successfully
                  </div>
                )}
                <h2
                  style={{
                    marginTop: "10px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Saved Ambiance
                </h2>
                <div className="row">
                  {loading ? (
                    <div className="plates-loader">
                      <div className="spinner"></div>
                      <p>Loading plates...</p>
                    </div>
                  ) : ambiance.length > 0 ? (
                    ambiance.map((data, index) => (
                      <div className="column">
                        <img
                          key={index}
                          src={data.image}
                          alt={`opening-${index}`}
                          width={100}
                          height={100}
                          style={{ margin: "10px" }}
                        />
                        <div
                          className="delete-button"
                          onClick={() => {
                            console.log("delete button clicked");
                            handleDeleteAmbiance(data._id);
                          }}
                        >
                          {" "}
                          Delete{" "}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No plates found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

function Info({ name, placeholder, type, value, onChange, icon: Icon }) {
  return (
    <>
      <h1 className="Profile-login">{name}</h1>
      <div className="Profile-password">
        <Icon className="Profile-icon" />
        <input
          placeholder={placeholder}
          type={type}
          id={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </div>
    </>
  );
}
