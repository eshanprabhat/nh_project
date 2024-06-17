import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import { useState, React } from "react";
import Account from "./Components/Account";
import AccountDetails from "./Components/AccountInfo/AccountDetails";
import AddPatient from "./Components/AccountInfo/AddPatient";
import PatientList from "./Components/AccountInfo/PatientList";
import PatientInfo from "./Components/AccountInfo/PatientInfo/PatientInfo";
import PlanInfo from "./Components/PlanInfo";
import PatientPlans from "./Components/PatientPlans";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [user,setUser]=useState();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              user={user}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              showLogout={showLogout}
              setShowLogout={setShowLogout}
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
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/account-details"
          element={
            <AccountDetails
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/add-patient"
          element={
            <AddPatient
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/patient-list"
          element={
            <PatientList
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/patient-info"
          element={
            <PatientInfo
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/plan-info"
          element={
            <PlanInfo
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
        <Route
          path="/plan-patient"
          element={
            <PatientPlans
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
