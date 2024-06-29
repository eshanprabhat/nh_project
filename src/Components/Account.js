import Hero from "./Hero";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import first from "./Images/Unknown2.png";
import second from "./Images/Screenshot 2024-05-28 at 12.58.51 PM.png";
import third from "./Images/Unknown3.png";
import fourth from "./Images/Unknown4.png";
import React, { useRef } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";


const Account = ({
  loginStatus, 
  setLoginStatus,
  setShowLogout,
  showLogout,
  user
}) => {
  setShowLogout(true)
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [myUser, setMyUser]=useState(null);
  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
      window.location.reload();
    } else {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/users/${user._id}`);
          setMyUser(response.data.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, [loginStatus, navigate, user._id]);
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
      // Handle file upload logic here
      // You can use FormData to upload the file to your server
      const formData = new FormData();
      formData.append("photo", file);

      // Example using fetch to upload the file
      fetch(`http://localhost:8000/api/users/${user._id}`, {
        method: "PATCH",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
          // Update the user's photo URL if necessary
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };
  if (!myUser) {
    return <CircularProgress />;
  }

  return (
    <>
      <Hero
        text="My Account"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={myUser}
      />
      <div className="account-links">
        <div style={{padding:"40px"}} />
        <img className="image-1" src={require(`../images/users/${myUser.photo}`)} alt="avatar" onClick={handlePhotoClick}/>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <div style={{padding:"10px"}} />
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
    </>
  );
};

export default Account;
