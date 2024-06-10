import { useEffect, useState } from "react";
import Hero from "./Hero";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PlanCard from "./PlanCard";

const Home = ({ loginStatus, setLoginStatus, showLogout, setShowLogout }) => {
  setShowLogout(false);
  const location = useLocation();
  const { myUser } = location.state || {};
  const [plans, setPlans] = useState();
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axios.get("http://localhost:5000/api/plans");
      setPlans(response.data.data.plans);
    };
    fetchPlans();
  }, []);
  console.log(plans);
  let plansHtml = null;
  if (plans) {
    plansHtml = plans.map((plan, i) => {
      return <PlanCard plan={plan} key={i} />;
    });
  } else {
    plansHtml = <p>No results found</p>;
  }
  return (
    <>
      <Hero
        text="Health Insurance"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={myUser}
      />
      <div className="lkjh">Plans</div>
      <div className="container">
        <div className="plan-container">{plansHtml}</div>
      </div>
    </>
  );
};

export default Home;
