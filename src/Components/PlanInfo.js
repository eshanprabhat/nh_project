import Hero from "./Hero";
import { useLocation, useNavigate } from "react-router-dom";
import PlanCard2 from "./PlanCard2";
import tick from "./Images/3550119.png";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const PlanInfo = ({
  loginStatus,
  setLoginStatus,
  showLogout,
  setShowLogout,
}) => {
  setLoginStatus(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, user } = location.state || { plan: {}, user: {} };
  const combinedFeaturesHTML = plan.features.map((feature, i) => (
    <div key={i}><b><img className="check2" src={tick} alt="tick"/>{feature}</b> {`: ${plan.features_info[i]}`}<div style={{padding:"10px"}}></div></div>
));
const handleProceedClick =()=>{
  navigate("/plan-patient", {state:{plan,user}});
}
  return (
    <>
      <Hero
        text={"Plan Information"}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div className="des-pl">{plan.description}</div>
      <div className="p-btn-container">
      <PlanCard2 plan={plan} />
      <div className="p-btn">
      <Button style={{padding:"10px 50px"}} onClick={handleProceedClick} variant="contained">Proceed<ArrowForwardIcon /></Button>
      </div>
      </div>
      <span className="info-sec">
        {combinedFeaturesHTML}
      </span>
      
    </>
  );
};
export default PlanInfo;
