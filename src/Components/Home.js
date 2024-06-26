import { useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import PlanCard from "./PlanCard";
import { CircularProgress } from "@mui/material";

const Home = ({ loginStatus, user }) => {
  const [plans, setPlans] = useState();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axios.get("http://localhost:8000/api/plans");
      setPlans(response.data.data.plans);
    };
    fetchPlans();
  }, []);

  let plansHtml = null;
  if (plans) {
    plansHtml = plans.map((plan, i) => {
      return <PlanCard plan={plan} user={user} key={i}/>;
    });
  } else {
    plansHtml = <CircularProgress />;
  }

  return (
    <>
      <Hero
        text="Health Insurance"
        loginStatus={loginStatus}
      />
      <div style={{padding:"50px"}}/>
      <div className="lkjh">Plans</div>
      <div className="container">
        <div className="plan-container">{plansHtml}</div>
      </div>
    </>
  );
};

export default Home;
