import Hero from "../Hero";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import PatientCard from "./PatientInfo/PatientCard";
const PatientList = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
}) => {
  setLoginStatus(true);
  const location = useLocation();
  const { myUser } = location.state || {};
  const [patientsList, setPatientsList] = useState([]);
  //   console.log("Patient List", myUser);
  useEffect(() => {
    const fetchPatients = async () => {
      if (myUser && myUser.id) {
        try {
          const user_id = myUser.id;
          const response = await axios.get(
            `http://localhost:5000/api/patients/user/${user_id}`
          );
          setPatientsList(response.data.data.patients);
        } catch (error) {
          console.log("Error Fetching Patients", error);
        }
      }
    };
    fetchPatients();
  }, [myUser]);

  if (!myUser) {
    return <p>User not found</p>;
  }

  console.log(patientsList);

  let resultsHTML = null;
  if (patientsList.length > 0) {
    resultsHTML = patientsList.map((patient, i) => {
      return <PatientCard patient={patient} key={i} />;
    });
  } else {
    resultsHTML = <p>No results found</p>;
  }
  return (
    <>
      <Hero
        text="Patient List"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={myUser}
      />
      <div style={{ padding: "20px" }}></div>
      <div className="container">
        <div>{resultsHTML}</div>
      </div>
    </>
  );
};
export default PatientList;
