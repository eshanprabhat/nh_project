import React, { useState } from "react";
import second from "./Images/Firefly Health Insurance 82230.jpg";
import one from "./Images/Screenshot 2024-05-30 at 3.27.15 PM.png";
import three from "./Images/Firefly Health Insurance 65632.jpg";
import two from "./Images/download.png";
import logo from "./Images/Narayana_Health_Logo.jpg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [mobileNumber, setmobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleInputChangem = (event) => {
    setmobileNumber(event.target.value);
  };
  const handleInputChangen = (event) => {
    setName(event.target.value);
  };
  const handleInputChangee = (event) => {
    setEmail(event.target.value);
  };

  const handleButtonClick = () => {
    console.log(name);
    console.log(mobileNumber);
    console.log(email);
  };

  return (
    <div className="page">
      <div className="first">
        <div className="login-details">
          <img className="filtered" src={logo} alt="logo" />
          <div className="text-1">Enter Your Details.....</div>
          <input
            className="input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={handleInputChangen}
          />
          <div style={{ padding: "5px" }}></div>
          <input
            className="input"
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={handleInputChangem}
          />
          <div style={{ padding: "5px" }}></div>
          <input
            className="input"
            type="text"
            placeholder="Email ID(Optional)"
            value={email}
            onChange={handleInputChangee}
          />
          <div style={{ padding: "20px" }}></div>
          <button type="button" className="ebtn" onClick={handleButtonClick}>
            Sign Up
          </button>
          <div className="text-2">
            Already Registered?{" "}
            <Link to="/login">
              <b>
                <u>Log In</u>
              </b>
            </Link>
          </div>
          <div style={{ padding: "30px" }}></div>
        </div>
      </div>
      <div className="second">
        <img src={second} alt="" />

        <div className="container text-center erty">
          <div className="row">
            <div className="col one">
              <img src={one} alt="one" />
              <div>Register Patients</div>
            </div>
            <div className="col two">
              <img src={two} alt="two" />
              <div>Manage Plans</div>
            </div>
            <div className="col three">
              <img src={three} alt="three" />
              <div>Secure Health</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
