import { useState, useEffect } from "react";
import PlanCard from "../Components/PlanCard2";
import moment from "moment";

const PatientPlansCard = ({ p }) => {
  const [patientNames, setPatientNames] = useState([]);
  const patientsList = p.selectedPatients;

  useEffect(() => {
    const names = patientsList.map(element => element.name);
    setPatientNames(names);
  }, [patientsList]);
  let formattedDatePurchased = moment(p.Purchased_On).format("MMMM Do, YYYY");
  let formattedDateExpiry = moment(p.Expiry_Date).format("MMMM Do, YYYY");
  return (
    <>
      <div className="patient-plan-container">
        <div className="d-flex">
          <div className="p-2">
            <PlanCard plan={p.plan} />
          </div>
          <div className="p-2 flex-grow-1">
            <div className="patient-plan-card-title">{p.plan.plan_name} Plan</div>
            <div className="patient-plan-card-content"><b>Policy Holders:-</b> <u>{patientNames.join(", ")}.</u></div>
            <div className="patient-plan-card-content"><b>Total Amount Paid:-</b> Rs. {p.total_amount}</div>
            <div className="patient-plan-card-content"><b>Purchased On:-</b>  {formattedDatePurchased}</div>
            <div className="patient-plan-card-content"><b>Expiry Date:-</b> {formattedDateExpiry}</div>
            <div className="patient-plan-card-content"><b>Order ID:-</b> {p.order_id}</div>
            <div className="patient-plan-card-content"><b>Payment ID:-</b> {p.payment_id}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientPlansCard;
