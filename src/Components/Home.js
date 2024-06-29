import { useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import PlanCard from "./PlanCard";
import { CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Home = ({ loginStatus, user }) => {
  const [plans, setPlans] = useState();
  const [open, setOpen]=useState(false);
  useEffect(() => {
    const showSnackbar = sessionStorage.getItem("showSnackbar");
    if (showSnackbar) {
      setOpen(true);
      sessionStorage.removeItem("showSnackbar");
    }
  }, []);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You are Logged In Successfully!!
        </Alert>
      </Snackbar>
    </div>
    </>
  );
};

export default Home;
