/* eslint-disable no-unused-vars */
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import "./signUp.css";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Users from "../../models/useUsers";
import useAddUser from "../../models/useAddUser";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { addUser, loading, error, successMessage } = useAddUser();
  //const [form, setForm] = useState({ name, email,password, phone, location });
  const navigate = useNavigate();
  const { users, loading1, error1 } = Users();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfPass, setConfPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [nameEx, setNameEx] = useState(false);
  const [emailEx, setEmailEx] = useState(false);
  const [passCon, setPassCon] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPassCon(false);
    setNameEx(false);
    setEmailEx(false);
    if (loading1) {
      console.log("Loading...");
      return;
    } else if (error1) {
      console.error("Error fetching users:", error);
      return;
    } else if (users.some((user) => user.name === name)) {
      setNameEx(true);
      console.log("Username already exists.");
      return;
    } else if (password !== ConfPass) {
      setPassCon(true);
      console.log("Password confirmation does not match.");
      return;
    } else if (users.some((user) => user.email === email)) {
      setEmailEx(true);
      console.log("Email already exists.");
      return;
    } else if (phone.length > 8) {
      console.log("Phone number must be less then 9.");
      return;
    } else {
      await addUser({ name, email, password, phone, location });
      console.log("Sign Up successful!");
      navigate("/home");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="topContainer">
          <h1 className="hello">Sign up</h1>
          <p className="welcome">
            Write your information to create an account.
          </p>
        </div>
        <div className="downContainer">
          <form onSubmit={handleSubmit}>
            <Info
              name="Name"
              placeholder="Name"
              type="name"
              value={name}
              onChange={setName}
              icon={FaUser}
            />
            {nameEx && (
              <p className="error-message">Username already exists.</p>
            )}
            <Info
              name="Email"
              placeholder="Email address"
              type="String"
              value={email}
              onChange={setEmail}
              icon={MdEmail}
            />
            {emailEx && <p className="error-message">Email already exists.</p>}
            <Info
              name="Password"
              placeholder="Password"
              type="Password"
              value={password}
              onChange={setPassword}
              icon={FaLock}
            />
            <Info
              name="Password Confirmation"
              placeholder="Password Confirmation"
              type="Password"
              value={ConfPass}
              onChange={setConfPass}
              icon={FaLock}
            />
            {passCon && (
              <p className="error-message">
                Password confirmation does not match.
              </p>
            )}
            <Info
              name="Phone Number"
              placeholder="Phone Number"
              type="Number"
              value={phone}
              onChange={setPhone}
              icon={FaPhone}
            />
            {phone.length > 8 && (
              <p className="error-message">
                Phone number must be less than 9 digits.
              </p>
            )}
            <Info
              name="Location"
              placeholder="Location"
              type="String"
              value={location}
              onChange={setLocation}
              icon={FaMapMarkerAlt}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function Info({ name, placeholder, type, value, onChange, icon: Icon }) {
  return (
    <>
      <h1 className="login">{name}</h1>
      <div className="password">
        <Icon className="icon" />
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
