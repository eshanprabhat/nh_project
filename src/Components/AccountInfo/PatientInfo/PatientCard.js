import React from "react";
import pone from "../../Images/Untitled design.png";
import ptwo from "../../Images/Unknown6.png";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const PatientCard = ({ myUser, patient , onDelete}) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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
    const id = patient._id;
    navigate("/patient-info", { state: { id, myUser } });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/patients/${patient._id}`
      );
      onDelete(patient._id);
      handleClose();
      navigate("/patient-list");
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };
  return (
    <>
      <div className="pcard">
        <div
          className="pcard-content"
          onClick={patientClick}
          style={{
            display: "flex",
            alignItems: "center",
            "padding-right": "10%",
            cursor: "pointer",
          }}
        >
          <img className="patphoto" src={photo} alt={photo} />
          <div className="pcard-text">
            <span className="pcard-element">{patient.name}</span>
            <span className="pcard-element">{age}</span>
            <span className="pcard-element">{patient.gender}</span>
            <span className="pcard-element">{patient.address}</span>
          </div>
        </div>
        <div className="dlt">
          <React.Fragment>
            <IconButton aria-label="delete" onClick={handleOpen}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you Sure, You want to delete this patient record?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  onClick={handleDeleteClick}
                  style={{ "background-color": " rgb(146, 38, 38)" }}
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
      </div>
    </>
  );
};

export default PatientCard;
