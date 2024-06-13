import React from "react";
import pone from "../../Images/Untitled design.png";
import ptwo from "../../Images/Unknown6.png";
import Checkbox from '@mui/material/Checkbox';

const PatientCard = ({ selectedPatients, setSelectedPatients, patient }) => {
    const photo = patient.gender === "Male" ? ptwo : pone;

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
  const handleCheckboxChange = (e) => {
    setSelectedPatients((prev) => {
      if (e.target.checked) {
        return [...prev, patient];
      } else {
        return prev.filter((p) => p.patient_id !== patient.patient_id);
      }
    });
  };

  const isChecked = selectedPatients.some((p) => p.patient_id === patient.patient_id);

  return (
    <>
      <div className="pcard-2" >
        <div
          className="pcard-content-2"
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <img className="patphoto-2" src={photo} alt={photo} />
          <div className="pcard-text-2">
            <span className="pcard-element-2">{patient.name}</span>
            <span className="pcard-element-2">{age}</span>
            <span className="pcard-element-2">{patient.gender}</span>
            <span className="pcard-element-2">{patient.address}</span>
          </div>
        </div>
          <div className="dlt-2">
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        </div>
      </div>
    </>
  );
};

export default PatientCard;
