import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Hero from "../Hero";
import axios from "axios";
import patientImage from "../Images/Unknown9.png";

const AddPatient = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
}) => {
  setLoginStatus(true);
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [active, setActive] = useState(false);
  const location = useLocation();
  const { myUser } = location.state || {};
  const navigate = useNavigate();
  // console.log("AddPatient:", myUser);
  const handlePatientName = (event) => {
    setPatientName(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const onDateChange = (event) => {
    setDOB(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActive(true); //Just to ignore warnings : Has to be removed later
    const user_id = myUser.id;
    const name = patientName;
    const Reg_date = new Date();
    const response = await axios.post("http://localhost:5000/api/patients", {
      user_id,
      name,
      gender,
      email,
      dob,
      address,
      Reg_date,
      active,
    });
    alert("New Patient Added");
    const patient = response.data;
    console.log(patient);
    navigate("/account-info");
  };
  return (
    <>
      <Hero
        text="Add Patient"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={myUser}
      />
      <div className="container my-5">
        <div className="fw-bold fs-4 font-family-newsreader ghyi">
          Patient's Name:
        </div>
        <input
          className="type"
          type="text"
          placeholder="Enter Full Name"
          value={patientName}
          onChange={handlePatientName}
        />
        <div className="fw-bold fs-4 font-family-newsreader ghyi">Gender:</div>
        <input
          className="type"
          type="text"
          placeholder="(Male/Female)"
          value={gender}
          onChange={handleGender}
        />
        <div className="fw-bold fs-4 font-family-newsreader ghyi">
          Date of Birth:
        </div>
        <input
          className="type"
          type="text"
          placeholder="(DD/MM/YYYY)"
          value={dob}
          onChange={onDateChange}
        />
        <div className="fw-bold fs-4 font-family-newsreader ghyi">
          Email-ID:
        </div>
        <input
          className="type"
          type="text"
          placeholder="abcd@xyz.com"
          value={email}
          onChange={handleEmail}
        />
        <div className="fw-bold fs-4 font-family-newsreader ghyi">Address:</div>
        <input
          className="type"
          type="text"
          placeholder="Enter Your City (eg. Banglore)"
          value={address}
          onChange={handleAddress}
        />
        <div style={{ padding: "20px" }} />
        <button className="abtn" onClick={handleSubmit}>
          Submit
        </button>
        <img className="pt-img" src={patientImage} alt="patient" />
      </div>
    </>
  );
};
export default AddPatient;
