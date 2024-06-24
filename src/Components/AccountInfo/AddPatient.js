import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "../Hero";
import axios from "axios";
import TextField from "@mui/material/TextField";
import patientImage from "../Images/Unknown9.png";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

dayjs.extend(localizedFormat);

const AddPatient = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
  user
}) => {
  const navigate = useNavigate();
    useEffect(()=>{
      if (loginStatus===false){
        navigate("/");
        window.location.reload();
      }
    },[loginStatus, navigate]);
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState(dayjs(null));
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [Active, setActive] = useState(false);
  const [alert, setAlert] = useState(null); // State for alert

  const location = useLocation();
  const { plan } = location.state || {};

  const handlePatientName = (event) => {
    setPatientName(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const onDateChange = (newValue) => {
    setDOB(newValue);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActive(false); // Just to ignore warnings : Has to be removed later
    const user_id = user._id;
    const name = patientName;
    const Reg_date = new Date();

    try {
      const response = await axios.post("http://localhost:8000/api/patients", {
        user_id,
        name,
        gender,
        email,
        dob: dob.format("DD/MM/YYYY"),
        address,
        Reg_date,
        Active,
      });

      const patient = response.data.data.patient;
      console.log(patient);

      setAlert({
        severity: 'success',
        message: 'Patient added successfully!',
      });

      // Optionally, you can navigate after showing the alert for some time
      setTimeout(() => {
        if(plan){
          navigate("/plan-patient",{state:{plan}});
        }else{
          navigate("/patient-list");
        }
      }, 1000); // Adjust the time as needed

    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to add patient. Please try again.',
      });
    }
  };

  return (
    <>
      <Hero
        text="Add Patient"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div className="m-5">
        {alert && (<>
          <Alert variant="filled" severity={alert.severity}>
            <AlertTitle>{alert.severity === 'success' ? 'Success' : 'Error'}</AlertTitle>
            {alert.message}
          </Alert>
          {alert.severity==='success'?<CircularProgress className="circular" />:<></>}
     </>
        )}
        <div className="fw-bold fs-4 font-family-newsreader ghyi">
          Patient's Name:
        </div>
        <TextField
          className="type"
          label="Name"
          variant="outlined"
          value={patientName}
          onChange={handlePatientName}
        />
        <div className="fw-bold fs-4 font-family-newsreader ghyi">Gender:</div>
        <FormControl className="type">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender-select"
            value={gender}
            label="Gender"
            widt
            onChange={handleGender}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
        <div className="fw-bold fs-4 font-family-newsreader ghyi">
          Date of Birth:
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="type"
            label="DOB"
            value={dob}
            onChange={onDateChange}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="fw-bold fs-4 font-family-newsreader ghyi">
          Email-ID:
        </div>
        <TextField
          variant="outlined"
          className="type"
          label="abcd@xyz.com"
          value={email}
          onChange={handleEmail}
        />
        <div className="fw-bold fs-4 font-family-newsreader ghyi">Address:</div>
        <TextField
          className="type"
          variant="outlined"
          label="Enter Your City (eg. Banglore)"
          value={address}
          onChange={handleAddress}
        />
        <div style={{ padding: "20px" }} />
        <button className="abtn" onClick={handleSubmit}>
          Submit
        </button>
        <img className="pt-img" src={patientImage} alt="patient" />
      </div>
    </>
  );
};

export default AddPatient;
