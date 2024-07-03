import Hero from "./Hero";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import PlanCard2 from "./PlanCard2";
import tick from "./Images/3550119.png";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PlanInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    setLoginStatus(loginStatus);
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);
  const { plan } = location.state || {};
  const combinedFeaturesHTML = plan.features.map((feature, i) => (
    <div key={i}>
      <b>
        <img className="check2" src={tick} alt="tick" />
        {feature}
      </b>{" "}
      {`: ${plan.features_info[i]}`}
      <div style={{ padding: "10px" }}></div>
    </div>
  ));

  const handleProceedClick = () => {
    if (loginStatus) {
      navigate("/plan-patient", { state: { plan } });
    } else {
      navigate("/login", { state: { plan } });
    }
  };

  return (
    <>
      <Hero text={"Plan Information"} loginStatus={loginStatus} user={user} />
      <div style={{padding:"42px"}} />
      <div className="des-pl">{plan.description}</div>
      <div className="p-btn-container">
        <PlanCard2 plan={plan} />
        <div className="p-btn">
          <Button
            style={{ padding: "10px 50px" }}
            onClick={handleProceedClick}
            variant="contained"
          >
            Proceed
            <ArrowForwardIcon />
          </Button>
        </div>
      </div>
      <div className="info-sec">{combinedFeaturesHTML}</div>
    </>
  );
};

export default PlanInfo;
