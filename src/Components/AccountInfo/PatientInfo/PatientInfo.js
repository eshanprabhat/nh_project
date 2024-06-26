import Hero from "../../Hero";
import { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import one from "../../Images/Unknown6.png";
import two from "../../Images/Untitled design.png";
import { CircularProgress } from "@mui/material";

const PatientInfo = ({
  loginStatus,
  user
}) => {
  const navigate = useNavigate();
    useEffect(()=>{
      if (loginStatus===false){
        navigate("/");
        window.location.reload();
      }
    },[loginStatus, navigate]);
  const location = useLocation();
  const { id } = location.state || {};
  const [patient, setPatient] = useState();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/patients/${id}`
        );
        setPatient(response.data.data.patient);
      } catch (error) {
        console.log("Error Fetching Patient Data", error);
      }
    };
    getPatient();
  }, [id]);

  // console.log(patient);

  let picture = null;
  if (patient) {
    picture = patient.gender === "Male" ? one : two;
  }
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
  const getDOB = (dob) => {
    const date = dob.substr(0, 2);
    const month = dob.substr(3, 2);
    const year = dob.substr(6, 4);
    return `${year}/${month}/${date}`;
  };
  let age = null;
  if (patient) {
    const dob = getDOB(patient.dob);
    age = getAge(dob);
  }

  return (
    <>
      <Hero
        text="Patient List"
        loginStatus={loginStatus}
        user={user}
      />
      <div style={{padding:"60px"}} />
      <div>
        {patient ? (
          <>
            <img className="user-logo" src={picture} alt="user-logo" />
            <div className="p-info">
              <div className="p-info-line">Name: {patient.name}</div>
              <div className="p-info-line">Age: {age}</div>
              <div className="p-info-line">Gender: {patient.gender}</div>
              <div className="p-info-line">Email: {patient.email}</div>
              <div className="p-info-line">Date of Birth: {patient.dob}</div>
              <div className="p-info-line">Address: {patient.address}</div>
              <div className="p-info-line">
                Registration Date:{" "}
                {new Date(patient.Reg_date).toLocaleDateString()}
              </div>
            </div>
          </>
        ) : (
          <div style={{margin:"auto 50%"}}><CircularProgress /></div>
        )}
      </div>
    </>
  );
};

export default PatientInfo;
