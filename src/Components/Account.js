import Hero from "./Hero";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import first from "./Images/Unknown2.png";
import second from "./Images/Screenshot 2024-05-28 at 12.58.51 PM.png";
import third from "./Images/Unknown3.png";
import fourth from "./Images/Unknown4.png";
import avatar from "./Images/user-member-avatar-face-profile-icon-vector-22965342.jpg";
const Account = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
  user
}) => {
  const navigate = useNavigate();
    useEffect(()=>{
      if (loginStatus===false){
        navigate("/");
        window.location.reload();
      }
    },[loginStatus, navigate]);
  setShowLogout(true);
  const clickAccoutDetails = () => {
    setShowLogout(false);
    navigate("/account-details");
  };
  const clickAddPatient = () => {
    setShowLogout(false);
    navigate("/add-patient");
  };
  const clickPatientList = () => {
    setShowLogout(false);
    navigate("/patient-list");
  };
  const clickMyPlans = () => {
    setShowLogout(false);
    navigate("/my-plans");
  };
  return (
    <>
      <Hero
        text="My Account"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div className="account-links">
        <img className="image-1" src={avatar} alt="avatar" />
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
