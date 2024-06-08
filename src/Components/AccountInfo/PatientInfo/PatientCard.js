import pone from "../../Images/Untitled design.png";
import ptwo from "../../Images/Unknown6.png";
import { useNavigate } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();
  let photo = null;
  if (patient.gender === "Male") {
    photo = ptwo;
  } else {
    photo = pone;
  }
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
  const getDOB = (dob) => {
    const date = dob.substr(0, 2);
    const month = dob.substr(3, 2);
    const year = dob.substr(6, 4);
    return `${year}/${month}/${date}`;
  };
  const dob = getDOB(patient.dob);
  const age = getAge(dob);
  const patientClick = () => {
    const id = patient.patient_id;
    navigate("/patient-info", { state: { id } });
  };
  return (
    <>
      <div className="pcard" onClick={patientClick}>
        <img className="patphoto" src={photo} alt={photo} />
        <div className="pcard-text">
          <span className="pcard-element">{patient.name}</span>
          <span className="pcard-element">{age}</span>
          <span className="pcard-element">{patient.gender}</span>
          <span className="pcard-element">{patient.address}</span>
        </div>
        {/* <span className="pcard-text">{patient.name}</span> */}
      </div>
    </>
  );
};
export default PatientCard;
