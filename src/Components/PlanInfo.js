import Hero from "./Hero";
import { useLocation, useNavigate } from "react-router-dom";
import PlanCard2 from "./PlanCard2";
import tick from "./Images/3550119.png";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PlanInfo = ({ loginStatus, user }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { plan } = location.state || {};
  const combinedFeaturesHTML = plan.features.map((feature, i) => (
    <div key={i}>
      <b><img className="check2" src={tick} alt="tick" />{feature}</b> {`: ${plan.features_info[i]}`}
      <div style={{ padding: "10px" }}></div>
    </div>
  ));

  const handleProceedClick = () => {
    if(loginStatus){
      navigate("/plan-patient", { state: { plan } });
    }else{
      navigate("/login",{state:{ plan }});
    }
  };

  return (
    <>
      <Hero
        text={"Plan Information"}
        loginStatus={loginStatus}
        user={user}
      />
      <div style={{ padding: "50px" }} />
      <div className="des-pl">{plan.description}</div>
      <div className="p-btn-container">
        <PlanCard2 plan={plan} />
        <div className="p-btn">
          <Button style={{ padding: "10px 50px" }} onClick={handleProceedClick} variant="contained">Proceed<ArrowForwardIcon /></Button>
        </div>
      </div>
      <div className="info-sec">
        {combinedFeaturesHTML}
      </div>
    </>
  );
};

export default PlanInfo;
