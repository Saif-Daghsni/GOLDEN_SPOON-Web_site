import { MdEmail } from "react-icons/md";
import { FaLock, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phone, location } = form;

    // --- Client-side validation ---
    let errs = {};
    if (!name) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    if (!password) errs.password = "Password is required";
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!phone) errs.phone = "Phone number is required";
    else if (phone.length > 8)
      errs.phone = "Phone must be 8 digits or fewer";
    if (!location) errs.location = "Location is required";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      // Make request to backend
      const response = await axios.post(
        "http://localhost:3001/addUser",
        { name, email, password, phone, location },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // Store token and user info
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/"); // Go to Home
    } catch (err) {
      console.error("Signup error:", err);
      setErrors({ server: err.response?.data?.error || "Signup failed" });
    }
  };

  return (
    <div className="login-container">
      <div className="topContainer">
        <h1 className="hello">Sign up</h1>
        <p className="welcome">Write your information to create an account.</p>
      </div>
      <div className="downContainer">
        <form onSubmit={handleSubmit}>
          {errors.server && <p className="error-message">{errors.server}</p>}

          <Info
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            icon={FaUser}
            error={errors.name}
          />

          <Info
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            icon={MdEmail}
            error={errors.email}
          />

          <Info
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            icon={FaLock}
            error={errors.password}
          />

          <Info
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            icon={FaLock}
            error={errors.confirmPassword}
          />

          <Info
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            icon={FaPhone}
            error={errors.phone}
          />

          <Info
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            icon={FaMapMarkerAlt}
            error={errors.location}
          />

          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable input field with label, icon, and error
// eslint-disable-next-line no-unused-vars
function Info({ label, name, type = "text", value, onChange, icon: Icon, error }) {
  return (
    <>
      <h1 className="login">{label}</h1>
      <div className="password">
        <Icon className="icon" />
        <input
          name={name}
          placeholder={label}
          type={type}
          value={value}
          onChange={onChange}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
