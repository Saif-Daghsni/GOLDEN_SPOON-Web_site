import React, { useEffect, useState } from "react";
import NavBar from "../tools/NavBar";
import "./Profile.css";
import axios from "axios";
import ServiceLabel from "../tools/ServiceLabel";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Users from "../../models/user/useUsers";
import Loading from "../tools/Loading";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { users, loading1, error1 } = Users();

  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [imageAmbiance, setImageAmbiance] = useState("");
  const [imagePlate, setPlate] = useState("");
  const [openings, setOpenings] = useState([]);
  const [ambiance, setAmbiance] = useState([]);
  const [selected, setSelected] = useState("plates");
  const [Description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [added, setadded] = useState(false);
  const [plates, setPlates] = useState([]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };
  const handleDeletePlate = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletePlate/${id}`);
      setPlates((prev) => prev.filter((item) => item._id !== id)); // ✅ fixed
    } catch (error) {
      console.error("❌ Failed to delete plate:", error);
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
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 1.0);

        if (a === 3) setPlate(compressedBase64);
        else if (a === 1) setImage(compressedBase64);
        else setImageAmbiance(compressedBase64);
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

    axios
      .post("http://localhost:3001/AddPlates", {
        name,
        description: Description,
        price,
        type,
        image: imagePlate,
      })
      .then((res) => {
        console.log("✅ Server responded:", res.data);
        setadded(true);
        setName("");
        setDescription("");
        setPrice("");
        setType("");
        setPlate("");
        fetchPlates(); // Refresh plates list
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }

  function handleUpload() {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    axios
      .post("http://localhost:3001/uploadOpening", { base64: image })
      .then((res) => {
        console.log("✅ Server responded:", res.data);
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

    axios
      .post("http://localhost:3001/AddAmbiance", { image: imageAmbiance })
      .then((res) => {
        console.log("✅ Server responded:", res.data);
        getAmbiance();
        setadded(true);
      })
      .catch((err) => console.error("❌ Upload error:", err));
  }

  function getOpenings() {
    axios
      .get("http://localhost:3001/getOpening")
      .then((res) => {
        setOpenings(res.data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  function getAmbiance() {
    axios
      .get("http://localhost:3001/getAmbiance")
      .then((res) => {
        setAmbiance(res.data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  function fetchPlates() {
    axios
      .get("http://localhost:3001/getPlates")
      .then((res) => {
        setPlates(res.data.plates);
      })
      .catch((err) => console.error("❌ Plates fetch error:", err));
  }

  // Get current user
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("❌ No token found.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3001/getUser", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log("✅ User fetched:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("❌ /getUser error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get all data
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:3001/getOpening"),
      axios.get("http://localhost:3001/getAmbiance"),
      axios.get("http://localhost:3001/getPlates"),
    ])
      .then(([openingsRes, ambianceRes, platesRes]) => {
        setOpenings(openingsRes.data.data);
        setAmbiance(ambianceRes.data.data);
        setPlates(platesRes.data.plates);
        console.log("✅ Data fetched successfully");
      })
      .catch((err) => {
        console.error("❌ Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (!user) return <div>⚠️ No user data found.</div>;

  return (
    <div className="Profile">
      <NavBar />
      <div className="Profile-container">
        <div className="Profile-container2">
          <div className="Profile-navbar">
            {user._id === "6851d8128ee75ded21bc64c3" ? (
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
            ) : (
              <>
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
              </>
            )}

            <button
              id="ambiance"
              className="log-out"
              onClick={() => {
                handleLogout();
                navigate("/login");
              }}
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
                      <label className="plates-inder-title">
                        Name of the plate
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Enter the name of the plate"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="plates-inder-title">
                        Description of the plate
                      </label>
                      <br />
                      <textarea
                        type="text"
                        placeholder="Enter the description of the plate"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div>
                      <label className="plates-inder-title">
                        Price of the plate
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="Enter the price of the plate"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="plates-inder-title">
                        The type of the plate
                      </label>
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

                  {/* DISHES */}
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
                    {plates.filter((plate) => plate.type === "Dishes")
                      .length === 0 ? (
                      <Loading />
                    ) : (
                      plates
                        .filter((plate) => plate.type === "Dishes")
                        .map((plate) => (
                          <div className="showcollumndelete" key={plate._id}>
                            <ServiceLabel
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
                              onClick={() => handleDeletePlate(plate._id)}
                            >
                              Delete
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  {/* DRINKES */}
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
                    {plates.filter((plate) => plate.type === "Drinkes")
                      .length === 0 ? (
                      <Loading />
                    ) : (
                      plates
                        .filter((plate) => plate.type === "Drinkes")
                        .map((plate) => (
                          <div className="showcollumndelete" key={plate._id}>
                            <ServiceLabel
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
                              onClick={() => handleDeletePlate(plate._id)}
                            >
                              Delete
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  {/* DESSERTS */}
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
                    {plates.filter((plate) => plate.type === "Desserts")
                      .length === 0 ? (
                      <Loading />
                    ) : (
                      plates
                        .filter((plate) => plate.type === "Desserts")
                        .map((plate) => (
                          <div className="showcollumndelete" key={plate._id}>
                            <ServiceLabel
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
                              onClick={() => handleDeletePlate(plate._id)}
                            >
                              Delete
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  <br />
                  <br />
                </div>
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
                    <Loading />
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
                    <Loading />
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
                    <Loading />
                  ) : ambiance.length > 0 ? (
                    ambiance.map((data, index) => (
                      <div className="column" key={index}>
                        <img
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
                    <Loading />
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

// eslint-disable-next-line no-unused-vars
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
