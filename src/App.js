import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import { useState, React, useEffect } from "react";
import Account from "./Components/Account";
import AccountDetails from "./Components/AccountInfo/AccountDetails";
import AddPatient from "./Components/AccountInfo/AddPatient";
import PatientList from "./Components/AccountInfo/PatientList";
import PatientInfo from "./Components/AccountInfo/PatientInfo/PatientInfo";
import PlanInfo from "./Components/PlanInfo";
import PatientPlans from "./Components/PatientPlans";
import MyPlans from "./Components/AccountInfo/MyPlans";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user,setUser]=useState();
  const loadScript =(src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement('script');
      script.src=src;
      script.onload=()=>{
        resolve(true);
      }
      script.onerror=()=>{
        resolve(false);
      }
      document.body.appendChild(script)
    })
  }

  useEffect(()=>{
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
  })

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setLoginStatus={setLoginStatus} setUser={setUser}/>}
        />
        <Route
          path="/signup"
          element={<Signup setLoginStatus={setLoginStatus} setUser={setUser} />}
        />
        <Route
          path="/account-info"
          element={
            <Account
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/account-details"
          element={
            <AccountDetails
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/add-patient"
          element={
            <AddPatient
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/my-plans"
          element={
            <MyPlans
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/patient-list"
          element={
            <PatientList
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/patient-info"
          element={
            <PatientInfo
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/plan-info"
          element={
            <PlanInfo
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/plan-patient"
          element={
            <PatientPlans
              loginStatus={loginStatus}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
