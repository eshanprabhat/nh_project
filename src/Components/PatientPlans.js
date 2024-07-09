import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import PatientCard from "./AccountInfo/PatientInfo/PatientCard2";
import axios from "axios";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import displayRazorPay from "../utils/PaymentGateway";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PatientPlans = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    setLoginStatus(loginStatus);
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);
  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
      window.location.reload();
    }
  }, [loginStatus, navigate]);

  const location = useLocation();
  const { plan } = location.state || {};
  const [patientList, setPatientList] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [price, setPrice] = useState(plan.price);
  const [tax, setTax] = useState(price * 0.18);
  const [total, setTotal] = useState(price + tax - 500);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const showSnackbar = sessionStorage.getItem("showSnackbar");
    if (showSnackbar) {
      setOpen(true);
      sessionStorage.removeItem("showSnackbar");
    }
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      if (user && user._id) {
        try {
          const user_id = user._id;
          const response = await axios.get(
            `https://nh-project.onrender.com/api/patients/user/${user_id}`
          );
          setPatientList(response.data.data.patients);
        } catch (error) {
          console.log("Error Fetching Patients", error);
        }
      }
    };
    fetchPatients();
  }, [user]);

  const handleEmptyClick = () => {
    navigate("/add-patient", { state: { plan } });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    setShowPayment(selectedPatients.length > 0);
    setPrice(plan.price * selectedPatients.length);
    setTax(price * 0.18);
    setTotal(price + tax - 500);
  }, [selectedPatients, plan.price, price, tax]);

  let resultsHTML = null;
  if (patientList.length > 0) {
    resultsHTML = patientList.map((patient, i) => (
      <PatientCard
        selectedPatients={selectedPatients}
        setSelectedPatients={setSelectedPatients}
        patient={patient}
        key={i}
      />
    ));
  } else {
    resultsHTML = (
      <div>
        <div style={{ fontFamily: "Inter", fontSize: "30px" }}>
          No Patient Registered
        </div>
        <div style={{ padding: "10px" }}></div>
      </div>
    );
  }

  const displayPayment = () => {
    displayRazorPay(total, user, selectedPatients, plan, navigate);
  };

  return (
    <>
      <Hero
        text={`${plan.plan_name} Plan`}
        loginStatus={loginStatus}
        user={user}
      />
      <div style={{padding:"42px"}} />
          <div className="tryr">Select Policy Holders</div>
      <div className="patient-block">
        <div className="pat-ient">
          <div className="patient-card-block">
            {resultsHTML}
            <Button
              onClick={handleEmptyClick}
              style={{ "margin-left": "190px", padding: "15px" }}
              variant="contained"
              color="success"
            >
              <AddCircleOutlineIcon />
              Add Patient
            </Button>
          </div>
        </div>
        {showPayment && (
          <>
            <div className="pay-ment">
              <div className="payment-title">Payment Breakout</div>
              <div className="d-flex flex-row justify-content-between">
                <div className="payment-content-left p-2">Subtotal </div>
                <div className="payment-content-right p-2">Rs. {price}</div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div
                  style={{ color: "red" }}
                  className="payment-content-left p-2"
                >
                  Discount
                </div>
                <div
                  style={{ color: "red" }}
                  className="payment-content-right p-2"
                >
                  -Rs. 500
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="payment-content-left p-2">Tax </div>
                <div className="payment-content-right p-2">Rs. {tax}</div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="payment-content-left p-2">
                  <b>Total</b>
                </div>
                <div className="payment-content-right p-2">
                  <b>Rs. {total}</b>
                </div>
              </div>
              <div className="payment-button">
                <Button onClick={displayPayment} variant="contained">
                  Proceed to Payment
                  <ArrowForwardIcon />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            You are Logged In Successfully!!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default PatientPlans;
