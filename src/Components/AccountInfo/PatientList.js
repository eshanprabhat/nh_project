import Hero from "../Hero";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import PatientCard from "./PatientInfo/PatientCard";
import { Button } from "@mui/material";
const PatientList = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
  user
}) => {
  setLoginStatus(true);
  const navigate= useNavigate();
  const [patientsList, setPatientsList] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      if (user && user._id) {
        try {
          const user_id = user._id;
          const response = await axios.get(
            `http://localhost:8000/api/patients/user/${user_id}`
          );
          setPatientsList(response.data.data.patients);
        } catch (error) {
          console.log("Error Fetching Patients", error);
        }
      }
    };
    fetchPatients();
  }, [user]);
  const handleEmptyClick =()=>{
    navigate("/add-patient");
  }
  const handleDelete = (deletedPatientId) => {
    setPatientsList(patientsList.filter(patient => patient._id !== deletedPatientId));
  };
  if (!user) {
    return <p>User not found</p>;
  }

  let resultsHTML = null;
  if (patientsList.length > 0) {
    resultsHTML = patientsList.map((patient, i) => {
        return <PatientCard user={user} patient={patient} key={i} onDelete={handleDelete}/>;
    });
  } else {
    resultsHTML = (<div>
    <div style={{"font-family":"Inter", "font-size":"30px"}}>No Patient Found</div>
    <div style={{padding:"10px"}}></div>
    <Button onClick={handleEmptyClick} className="mx-4" variant="contained">Add Patient</Button>
    </div>);
  }
  return (
    <>
      <Hero
        text="Patient List"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div style={{ padding: "20px" }}></div>
      <div className="d-flex justify-content-center">
        <div>{resultsHTML}</div>
      </div>
    </>
  );
};
export default PatientList;
