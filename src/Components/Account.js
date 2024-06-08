import Hero from "./Hero";
import { useNavigate, useLocation } from "react-router-dom";
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
}) => {
  setShowLogout(true);
  const location = useLocation();
  const { myUser } = location.state || {};
  const navigate = useNavigate();
  // console.log("Account:", myUser);
  const clickAccoutDetails = () => {
    setShowLogout(false);
    navigate("/account-details", { state: { myUser } });
  };
  const clickAddPatient = () => {
    setShowLogout(false);
    navigate("/add-patient", { state: { myUser } });
  };
  const clickPatientList = () => {
    setShowLogout(false);
    navigate("/patient-list", { state: { myUser } });
  };
  return (
    <>
      <Hero
        text="My Account"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={myUser}
      />
      <div className="account-links">
        <img className="image-1" src={avatar} alt="avatar" />
        <div className="account-link" onClick={clickAccoutDetails}>
          <img className="image" src={first} alt="Account Details" />
          Account Details
        </div>
        <div className="account-link">
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
