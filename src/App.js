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
  const [showLogout, setShowLogout] = useState(false);
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
            <Home />
          }
        />
        <Route
          path="/about"
          element={
            <About />
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/account-info"
          element={
            <Account
              showLogout={showLogout}
              setShowLogout={setShowLogout}
            />
          }
        />
        <Route
          path="/account-details"
          element={
            <AccountDetails />
          }
        />
        <Route
          path="/add-patient"
          element={
            <AddPatient  />
          }
        />
        <Route
          path="/my-plans"
          element={
            <MyPlans  />
          }
        />
        <Route
          path="/patient-list"
          element={
            <PatientList  />
          }
        />
        <Route
          path="/patient-info"
          element={
            <PatientInfo  />
          }
        />
        <Route
          path="/plan-info"
          element={
            <PlanInfo />
          }
        />
        <Route
          path="/plan-patient"
          element={
            <PatientPlans />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
