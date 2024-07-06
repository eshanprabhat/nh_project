import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { CircularProgress } from "@mui/material";
import Hero from "./Hero";
import Footer from "../utils/Footer";
import first from "./Images/Unknown2.png";
import second from "./Images/Screenshot 2024-05-28 at 12.58.51 PM.png";
import third from "./Images/Unknown3.png";
import fourth from "./Images/Unknown4.png";
import avatarphoto from "./Images/user-member-avatar-face-profile-icon-vector-22965342.jpg";

const Account = ({ setShowLogout, showLogout }) => {
  setShowLogout(true);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [user, setUser] = useState(null);
  // const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    setLoginStatus(loginStatus);
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);


  const clickAccoutDetails = () => {
    navigate("/account-details");
  };

  const clickAddPatient = () => {
    navigate("/add-patient");
  };

  const clickPatientList = () => {
    navigate("/patient-list");
  };

  const clickMyPlans = () => {
    navigate("/my-plans");
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      fetch(`https://nh-project.onrender.com/api/users/${user._id}`, {
        method: "PATCH",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
          sessionStorage.removeItem("user");
          sessionStorage.setItem("user", JSON.stringify(data.data.user));
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  if (!user) {
    return <CircularProgress className="circular" />;
  }

  return (
    <>
      <Hero
        text="My Account"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div style={{ padding: "60px" }} />
      <div className="account-links">
        <img
          className="image-1"
          src={user.photo ? user.photo : avatarphoto} // Display user's photo from AWS S3 or default avatar
          alt="avatar"
          onClick={handlePhotoClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <div style={{ padding: "10px" }} />
        <div className="account-link" onClick={clickAccoutDetails}>
          <img className="image" src={first} alt="Account Details" />
          Account Details
        </div>
        <div className="account-link" onClick={clickMyPlans}>
          <img className="image" src={second} alt="My Plans" />
          My Plans
        </div>
        <div className="account-link" onClick={clickPatientList}>
          <img className="image-2" src={third} alt="Patient List" />
          Patient List
        </div>
        <div className="account-link" onClick={clickAddPatient}>
          <img className="image-2" src={fourth} alt="Add Patient" />
          Add Patients
        </div>
      </div>
      <div style={{ padding: "60px" }} />
      <Footer />
    </>
  );
};

export default Account;
