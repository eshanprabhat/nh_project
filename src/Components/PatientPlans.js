import { useLocation,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Hero from "./Hero";
import PatientCard from "./AccountInfo/PatientInfo/PatientCard2";
import axios from "axios";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const PatientPlans = ({
  loginStatus,
  setLoginStatus,
  showLogout,
  setShowLogout,
}) => {
  setLoginStatus(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, user } = location.state || { plan: {}, user: {} };
  const [patientList, setPatientList]=useState([]);
  const [selectedPatients, setSelectedPatients]=useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      if (user && user.id) {
        try {
          const user_id = user.id;
          const response = await axios.get(
            `http://localhost:8000/api/patients/user/${user_id}`
          );
          setPatientList(response.data.data.patients);
        } catch (error) {
          console.log("Error Fetching Patients", error);
        }
      }
    };
    fetchPatients();
  }, [user]);
  const handleEmptyClick =()=>{
    const myUser=user;
    navigate("/add-patient",{state:{myUser, plan}});
  }
  let resultsHTML = null;
  if (patientList.length > 0) {
    resultsHTML = patientList.map((patient, i) => {
        return <PatientCard selectedPatients={selectedPatients} setSelectedPatients={setSelectedPatients} patient={patient} key={i} />;
    });
  } else {
    resultsHTML = (<div>
        <div style={{"font-family":"Inter", "font-size":"30px"}}>No Patient Registered</div>
        <div style={{padding:"10px"}}></div>
        </div>);
  }
  console.log(selectedPatients);
  return (
    <>
      <Hero
        text={`${plan.plan_name} Plan`}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div className="tryr">Select Patients</div>
      <div className="mx-5">{resultsHTML}</div>
      <Button onClick={handleEmptyClick} style={{"margin-left":"280px", padding:"15px"}} variant="contained"> <AddCircleOutlineIcon />Add Patient</Button>
    </>
  );
};
export default PatientPlans;
