import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Hero";
import axios from "axios";
import PatientPlansCard from "../../utils/PatientPlanCard";


const MyPlans = ({
    loginStatus,
    user
  })=>{
    const navigate = useNavigate();
    useEffect(()=>{
      if (loginStatus===false){
        navigate("/");
        window.location.reload();
      }
    },[loginStatus, navigate]);
    const [patientPlanList, setPatientPlansList]=useState([]);
    useEffect(()=>{
      const fetchPatientPlans=async()=>{
        try{
          const userId = user._id;
          const response= await axios.get(`http://localhost:8000/api/patient-plans/user/${userId}`);
          setPatientPlansList(response.data.data.patientPlans);
        }catch(error){
          console.log("Error Fetching Your Plans")
        }
      }
      fetchPatientPlans();
    },[user])
    let resultsPatientPlan = null;
    resultsPatientPlan = patientPlanList.map((p,i)=>{
      return <PatientPlansCard p={p}  key={i} />
    })
return(
    <>
    <Hero
        text="My Plans"
        loginStatus={loginStatus}
        user={user}
      />
      <div style={{padding:"60px"}} />
      <div>{resultsPatientPlan}</div>

    </>
)
}
export default MyPlans;
